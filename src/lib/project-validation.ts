import { z } from 'zod';

const optionalLink = z
  .string()
  .trim()
  .max(2000)
  .refine(
    (value) => !value || (/^https?:\/\//i.test(value) && URL.canParse(value)),
    'Use an http(s) URL.',
  )
  .optional()
  .transform((value) => value || null);
export const projectSchema = z.object({
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().min(10).max(12000),
  category: z.enum(['personal', 'small', 'medium', 'large']),
  githubFrontendLink: optionalLink,
  githubBackendLink: optionalLink,
  clientLink: optionalLink,
  serverLink: optionalLink,
  tags: z.array(z.string().trim().min(1).max(60)).max(30),
  features: z
    .array(
      z.object({
        title: z.string().trim().min(1).max(160),
        description: z.string().trim().min(1).max(3000),
      }),
    )
    .max(30),
  imageIds: z
    .array(z.string().min(1))
    .min(1, 'Upload at least one image.')
    .max(12)
    .refine(
      (ids) => new Set(ids).size === ids.length,
      'Images must be unique.',
    ),
  published: z.boolean(),
  sortOrder: z.number().int().min(0).max(100000).optional(),
});

export const projectOrderSchema = z.object({
  ids: z
    .array(z.string().min(1))
    .max(100000)
    .refine(
      (ids) => new Set(ids).size === ids.length,
      'Projects must be unique.',
    ),
});

export const storageSchema = z.object({
  accountId: z
    .string()
    .trim()
    .regex(/^[a-f\d]{32}$/i, 'Use your 32-character Cloudflare account ID.'),
  bucket: z
    .string()
    .trim()
    .min(3)
    .max(63)
    .regex(/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/, 'Invalid bucket name.'),
  publicUrl: z
    .string()
    .trim()
    .url()
    .refine((value) => {
      const url = new URL(value);
      return (
        url.protocol === 'https:' &&
        !url.username &&
        !url.password &&
        !url.search &&
        !url.hash &&
        !url.hostname.endsWith('.r2.cloudflarestorage.com')
      );
    }, 'Use the public HTTPS bucket URL or custom domain, without query parameters.')
    .transform((value) => value.replace(/\/+$/, '')),
  accessKeyId: z.string().trim().max(256).optional().default(''),
  secretAccessKey: z.string().trim().max(256).optional().default(''),
});
