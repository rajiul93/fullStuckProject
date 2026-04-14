import { z } from 'zod';

export const additionalTrainingSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(1000),
});

export const updateAdditionalTrainingSchema = additionalTrainingSchema.partial();

export type AdditionalTrainingInput = z.infer<typeof additionalTrainingSchema>;
export type UpdateAdditionalTrainingInput = z.infer<
  typeof updateAdditionalTrainingSchema
>;
