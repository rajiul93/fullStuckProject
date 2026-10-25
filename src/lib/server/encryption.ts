import 'server-only';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

function encryptionKey() {
  const key = process.env.SETTINGS_ENCRYPTION_KEY;
  if (!key || !/^[a-f\d]{64}$/i.test(key))
    throw new Error('SETTINGS_ENCRYPTION_KEY must be 64 hex characters.');
  return Buffer.from(key, 'hex');
}

export function encrypt(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(value, 'utf8'),
    cipher.final(),
  ]);
  return [iv, cipher.getAuthTag(), encrypted]
    .map((part) => part.toString('base64'))
    .join('.');
}

export function decrypt(value: string) {
  const [iv, tag, content] = value
    .split('.')
    .map((part) => Buffer.from(part, 'base64'));
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(content), decipher.final()]).toString(
    'utf8',
  );
}
