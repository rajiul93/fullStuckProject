import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import { connectDB } from '@/lib/db';
import Image from './image.model';
import type { IImage } from './image.interface';
import { getR2BucketConfig, getR2Client } from './r2';
import { QueryBuilder } from '@/modules/utils/query-builder';

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

/** Web `File` / Multer — same shape for R2 + DB */
export type MediaUploadInput = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
};

export class MediaService {
  static async uploadFromBytes(file: MediaUploadInput, alt?: string): Promise<IImage> {
    if (!file.buffer?.length) throw new Error('Image file is required');
    if (!ALLOWED_MIME.has(file.mimetype)) throw new Error('Invalid image type');
    if (file.size > MAX_BYTES) throw new Error('File too large (max 5MB)');

    await connectDB();

    const r2 = getR2Client();
    const { bucketName, bucketUrl } = getR2BucketConfig();

    const ext = mimeToExt(file.mimetype);
    const key = `images/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}${ext}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const url = `${bucketUrl.replace(/\/$/, '')}/${key}`;

    const created = await Image.create({
      originalName: file.originalname,
      url,
      r2_key: key,
      alt,
    });

    return created.toObject();
  }

  /** @deprecated Prefer `uploadFromBytes`; kept for Express + Multer */
  static async upload(file: Express.Multer.File, alt?: string): Promise<IImage> {
    if (!file) throw new Error('Image file is required');
    return this.uploadFromBytes(
      {
        buffer: file.buffer,
        mimetype: file.mimetype,
        originalname: file.originalname,
        size: file.size,
      },
      alt,
    );
  }

  static async list(requestUrl: string) {
    await connectDB();

    const url = new URL(requestUrl);
    const { search, page, limit, sortBy, sortDir } = QueryBuilder.parse(url);
    const filter = QueryBuilder.buildMongo({
      search,
      searchFields: ['originalName', 'alt'],
    });
    const sort = QueryBuilder.buildSort({ sortBy, sortDir });
    const { skip } = QueryBuilder.paginate({ page, limit });

    const [items, total] = await Promise.all([
      Image.find(filter).sort(sort as any).skip(skip).limit(limit).lean(),
      Image.countDocuments(filter),
    ]);

    return {
      meta: { page, limit, total },
      data: items,
    };
  }

  static async getById(id: string): Promise<IImage | null> {
    if (!isObjectId(id)) throw new Error('Invalid id');
    await connectDB();
    return await Image.findById(id).lean();
  }

  static async updateFromBytes(
    id: string,
    file: MediaUploadInput,
    alt?: string,
  ): Promise<IImage | null> {
    if (!isObjectId(id)) throw new Error('Invalid id');
    if (!file.buffer?.length) throw new Error('Image file is required');
    if (!ALLOWED_MIME.has(file.mimetype)) throw new Error('Invalid image type');
    if (file.size > MAX_BYTES) throw new Error('File too large (max 5MB)');

    await connectDB();
    const existing = await Image.findById(id);
    if (!existing) return null;

    const r2 = getR2Client();
    const { bucketName, bucketUrl } = getR2BucketConfig();

    const ext = mimeToExt(file.mimetype);
    const newKey = `images/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}${ext}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    const newUrl = `${bucketUrl.replace(/\/$/, '')}/${newKey}`;

    const oldKey = existing.r2_key;
    existing.originalName = file.originalname;
    existing.r2_key = newKey;
    existing.url = newUrl;
    if (alt !== undefined) existing.alt = alt;
    await existing.save();

    await r2.send(new DeleteObjectCommand({ Bucket: bucketName, Key: oldKey }));

    return existing.toObject();
  }

  /** @deprecated Prefer `updateFromBytes`; kept for Express + Multer */
  static async update(
    id: string,
    file: Express.Multer.File,
    alt?: string,
  ): Promise<IImage | null> {
    if (!file) throw new Error('Image file is required');
    return this.updateFromBytes(
      id,
      {
        buffer: file.buffer,
        mimetype: file.mimetype,
        originalname: file.originalname,
        size: file.size,
      },
      alt,
    );
  }

  static async delete(id: string): Promise<IImage | null> {
    if (!isObjectId(id)) throw new Error('Invalid id');
    await connectDB();
    const existing = await Image.findById(id);
    if (!existing) return null;

    const r2 = getR2Client();
    const { bucketName } = getR2BucketConfig();

    await r2.send(
      new DeleteObjectCommand({ Bucket: bucketName, Key: existing.r2_key }),
    );

    await existing.deleteOne();
    return existing.toObject();
  }
}

function isObjectId(id: string) {
  return /^[a-f0-9]{24}$/i.test(id);
}

function mimeToExt(mime: string) {
  switch (mime) {
    case 'image/jpeg':
      return '.jpg';
    case 'image/png':
      return '.png';
    case 'image/webp':
      return '.webp';
    case 'image/gif':
      return '.gif';
    default:
      return '';
  }
}
