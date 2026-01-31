import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/),
  published: z.boolean().default(false),
});

export const updateBlogSchema = blogSchema.partial();

export type BlogInput = z.infer<typeof blogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
