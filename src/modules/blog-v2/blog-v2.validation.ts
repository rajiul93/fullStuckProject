import { z } from 'zod';

export const blogV2ListContainerSchema = z.object({
  listTitle: z.string().min(1, 'List title is required').max(200),
  list: z.array(z.string().min(1)).default([]),
});

export const blogV2Schema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  shortDescription: z.string().min(1, 'Short description is required').max(500),
  description: z.string().min(1, 'Description is required').max(5000),
  listContainer: z.array(blogV2ListContainerSchema).default([]),
});

export const updateBlogV2Schema = blogV2Schema.partial();

export type BlogV2Input = z.infer<typeof blogV2Schema>;
export type UpdateBlogV2Input = z.infer<typeof updateBlogV2Schema>;

