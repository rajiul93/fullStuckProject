import { z } from 'zod';

export const educationSchema = z.object({
  position: z.number().int().nonnegative(),
  degree: z.string().min(1, 'Degree is required').max(200),
  institution: z.string().min(1, 'Institution is required').max(300),
  period: z.string().min(1, 'Period is required').max(100),
  location: z.string().min(1, 'Location is required').max(200),
});

export const updateEducationSchema = educationSchema.partial();

export type EducationInput = z.infer<typeof educationSchema>;
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;
