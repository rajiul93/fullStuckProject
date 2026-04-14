import { z } from 'zod';

export const softSkillSchema = z.object({
  position: z.coerce.number().int().nonnegative(),
  icon: z.string().min(1, 'Icon is required').max(500),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(1000),
});

export const updateSoftSkillSchema = softSkillSchema.partial();

export type SoftSkillInput = z.infer<typeof softSkillSchema>;
export type UpdateSoftSkillInput = z.infer<typeof updateSoftSkillSchema>;
