import { z } from 'zod';

export const skillSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  imageId: z.string().optional(),
  subDescription: z.string().max(500),
  feature: z.boolean().default(false),
});

export const updateSkillSchema = skillSchema.partial();

export type SkillInput = z.infer<typeof skillSchema>;
export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;
