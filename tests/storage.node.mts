import assert from 'node:assert/strict';
import { after, mock, test } from 'node:test';
import { readFile } from 'node:fs/promises';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

const testUrl = process.env.TEST_DATABASE_URL;
if (!testUrl || !new URL(testUrl).pathname.includes('_test'))
  throw new Error(
    'Use a disposable TEST_DATABASE_URL with _test in its database name.',
  );
process.env.DATABASE_URL = testUrl;
process.env.SETTINGS_ENCRYPTION_KEY = 'a'.repeat(64);
const { db } = await import('../src/lib/server/db');
const { encrypt, decrypt } = await import('../src/lib/server/encryption');
const { uploadImage, removeUnusedMedia, testStorage, MAX_IMAGE_SIZE } =
  await import('../src/lib/server/storage');
after(async () => {
  mock.restoreAll();
  await db.$disconnect();
});

test('encrypted storage credentials reject tampering', () => {
  const secret = encrypt('test-secret');
  assert.equal(decrypt(secret), 'test-secret');
  assert.notEqual(secret, encrypt('test-secret'));
  const parts = secret.split('.');
  const ciphertext = Buffer.from(parts[2], 'base64');
  ciphertext[0] ^= 1;
  parts[2] = ciphertext.toString('base64');
  assert.throws(() => decrypt(parts.join('.')));
});

test('upload persists media and deletion uses its original bucket; provider failures keep retryable records', async () => {
  const commands: unknown[] = [];
  let shouldFail = false;
  mock.method(S3Client.prototype, 'send', async (command: unknown) => {
    commands.push(command);
    if (shouldFail) throw new Error('Simulated storage failure');
    return {};
  });
  const config = await db.storageConfig.create({
    data: {
      accountId: 'b'.repeat(32),
      bucket: 'node-storage-test',
      publicUrl: 'https://images.example.com',
      accessKeyId: encrypt('test-access'),
      secretAccessKey: encrypt('test-secret'),
    },
  });
  let mediaId: string | undefined;
  let newerConfigId: string | undefined;
  try {
    const source = await readFile('public/images/project/portfolio.png');
    const file = new File([new Uint8Array(source)], 'project.png', {
      type: 'image/png',
    });
    const image = await uploadImage(file);
    mediaId = image.id;
    const stored = await db.media.findUniqueOrThrow({
      where: { id: image.id },
    });
    assert.equal(stored.storageConfigId, config.id);
    assert.equal(stored.projectId, null);
    assert.equal(image.url, `${config.publicUrl}/${stored.key}`);
    const put = commands[0];
    assert.ok(put instanceof PutObjectCommand);
    assert.equal(put.input.Bucket, config.bucket);
    assert.equal(put.input.ContentType, 'image/png');
    assert.deepEqual(put.input.Body, source);
    assert.match(stored.key!, /^portfolio\/projects\/.+\.png$/);

    const newerConfig = await db.storageConfig.create({
      data: {
        accountId: config.accountId,
        bucket: 'new-bucket-test',
        publicUrl: config.publicUrl,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
    newerConfigId = newerConfig.id;
    shouldFail = true;
    await assert.rejects(removeUnusedMedia(image.id));
    assert.ok(await db.media.findUnique({ where: { id: image.id } }));
    const countBefore = await db.media.count();
    await assert.rejects(uploadImage(file));
    assert.equal(await db.media.count(), countBefore);
    shouldFail = false;
    await removeUnusedMedia(image.id);
    assert.equal(await db.media.findUnique({ where: { id: image.id } }), null);
    const deleted = commands.at(-1);
    assert.ok(deleted instanceof DeleteObjectCommand);
    assert.equal(deleted.input.Bucket, config.bucket);
    assert.equal(deleted.input.Key, stored.key);
    await testStorage(config);
    assert.ok(commands.at(-2) instanceof PutObjectCommand);
    assert.ok(commands.at(-1) instanceof DeleteObjectCommand);

    const commandCount = commands.length;
    await assert.rejects(
      uploadImage(new File(['invalid'], 'fake.png', { type: 'image/png' })),
    );
    await assert.rejects(
      uploadImage(
        new File([new Uint8Array(MAX_IMAGE_SIZE + 1)], 'huge.png', {
          type: 'image/png',
        }),
      ),
    );
    assert.equal(commands.length, commandCount);
  } finally {
    if (mediaId) await db.media.deleteMany({ where: { id: mediaId } });
    await db.storageConfig.deleteMany({
      where: {
        id: { in: [config.id, ...(newerConfigId ? [newerConfigId] : [])] },
      },
    });
    mock.restoreAll();
  }
});
