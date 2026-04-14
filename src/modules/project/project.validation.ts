import { z } from 'zod';

const urlSchema = z
  .string()
  .min(1, 'URL is required')
  .regex(/^https?:\/\//, 'Enter a valid URL');

export const projectDetailSchema = z.object({
  title: z.string().min(1, 'Detail title is required').max(200),
  description: z.string().min(1, 'Description is required').max(2000),
  comment: z.string().max(500).optional(),
});

export const projectSchema = z.object({
  imageUrl: urlSchema,
  title: z.string().min(1, 'Title is required').max(200),
  subTitle: z.string().min(1, 'Subtitle is required').max(300),
  skills: z.array(z.string().min(1)).min(1, 'Select at least one skill'),
  liveUrl: urlSchema,
  gitFront: urlSchema,
  gitBackend: urlSchema,
  details: z.array(projectDetailSchema).min(1, 'Add at least one detail'),
});

export const updateProjectSchema = projectSchema.partial();

export type ProjectInput = z.infer<typeof projectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

