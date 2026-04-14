import { z } from 'zod';

export const languageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  level: z.string().min(1, 'Level is required').max(100),
});

export const updateLanguageSchema = languageSchema.partial();

export type LanguageInput = z.infer<typeof languageSchema>;
export type UpdateLanguageInput = z.infer<typeof updateLanguageSchema>;
