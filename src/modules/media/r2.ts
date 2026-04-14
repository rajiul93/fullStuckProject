import { S3Client } from '@aws-sdk/client-s3';

export function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      'Missing R2 env vars: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY',
    );
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export function getR2BucketConfig() {
  const bucketName = process.env.R2_BUCKET_NAME;
  const bucketUrl = process.env.R2_BUCKET_URL;
  if (!bucketName || !bucketUrl) {
    throw new Error('Missing R2 env vars: R2_BUCKET_NAME, R2_BUCKET_URL');
  }
  return { bucketName, bucketUrl };
}

