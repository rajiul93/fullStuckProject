import 'server-only';
import { randomUUID } from 'node:crypto';
import {
  DeleteObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import type { StorageConfig } from '@prisma/client';
import { db } from './db';
import { encrypt, decrypt } from './encryption';
import { HttpError } from './http';
import { storageSchema } from '../project-validation';

export async function latestStorage() {
  return db.storageConfig.findFirst({
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
  });
}

export function storageClient(config: StorageConfig) {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: decrypt(config.accessKeyId),
      secretAccessKey: decrypt(config.secretAccessKey),
    },
    requestChecksumCalculation: 'WHEN_REQUIRED',
    responseChecksumValidation: 'WHEN_REQUIRED',
    maxAttempts: 1,
    requestHandler: { connectionTimeout: 5000, requestTimeout: 15000 },
  });
}

export async function prepareStorage(body: unknown) {
  const data = storageSchema.parse(body);
  const current = await latestStorage();
  if ((!data.accessKeyId || !data.secretAccessKey) && !current)
    throw new HttpError(
      400,
      'Both R2 credentials are required for the first configuration.',
    );
  return {
    ...data,
    accessKeyId: data.accessKeyId
      ? encrypt(data.accessKeyId)
      : current!.accessKeyId,
    secretAccessKey: data.secretAccessKey
      ? encrypt(data.secretAccessKey)
      : current!.secretAccessKey,
  };
}

export async function testStorage(config: StorageConfig) {
  const client = storageClient(config);
  const key = `portfolio/connection-test/${randomUUID()}.txt`;
  await client.send(new HeadBucketCommand({ Bucket: config.bucket }));
  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: 'Portfolio storage connection test',
      ContentType: 'text/plain',
    }),
  );
  await client.send(
    new DeleteObjectCommand({ Bucket: config.bucket, Key: key }),
  );
}

export async function removeUnusedMedia(id: string) {
  // Keep the row locked until deletion completes; project saves lock these rows too.
  await db.$transaction(
    async (tx) => {
      await tx.$queryRaw`SELECT id FROM "Media" WHERE id = ${id} FOR UPDATE`;
      const media = await tx.media.findUnique({
        where: { id },
        include: { storageConfig: true },
      });
      if (!media) throw new HttpError(404, 'Image not found.');
      if (media.projectId)
        throw new HttpError(
          409,
          'This image belongs to a project. Remove it from the project first.',
        );
      if (media.key && media.storageConfig) {
        await storageClient(media.storageConfig).send(
          new DeleteObjectCommand({
            Bucket: media.storageConfig.bucket,
            Key: media.key,
          }),
        );
      }
      await tx.media.delete({ where: { id } });
    },
    { timeout: 20000 },
  );
}

export const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
export function imageExtension(bytes: Buffer, mime: string) {
  if (
    mime === 'image/jpeg' &&
    bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))
  )
    return 'jpg';
  if (
    mime === 'image/png' &&
    bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  )
    return 'png';
  if (
    mime === 'image/gif' &&
    ['GIF87a', 'GIF89a'].includes(bytes.subarray(0, 6).toString())
  )
    return 'gif';
  if (
    mime === 'image/webp' &&
    bytes.subarray(0, 4).toString() === 'RIFF' &&
    bytes.subarray(8, 12).toString() === 'WEBP'
  )
    return 'webp';
  throw new HttpError(
    400,
    'Only valid JPEG, PNG, WebP and GIF images are supported.',
  );
}

export async function uploadImage(file: FormDataEntryValue | null) {
  if (!(file instanceof File) || !file.size || file.size > MAX_IMAGE_SIZE)
    throw new HttpError(400, 'Choose one image, up to 4 MB.');
  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = imageExtension(bytes, file.type);
  const config = await latestStorage();
  if (!config)
    throw new HttpError(
      400,
      'Configure Cloudflare R2 in Settings before uploading.',
    );
  const key = `portfolio/projects/${randomUUID()}.${extension}`;
  const client = storageClient(config);
  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: bytes,
      ContentType: file.type,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );
  try {
    const media = await db.media.create({
      data: {
        key,
        url: `${config.publicUrl}/${key}`,
        name: file.name.slice(0, 255),
        storageConfigId: config.id,
      },
    });
    return { id: media.id, url: media.url, name: media.name };
  } catch (error) {
    await client
      .send(new DeleteObjectCommand({ Bucket: config.bucket, Key: key }))
      .catch(() => undefined);
    throw error;
  }
}
