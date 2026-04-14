import { z } from 'zod';

export const skillFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  imageId: z.string().min(1, 'Image ID is required'),
  subDescription: z
    .string()
    .min(1, 'Sub description is required')
    .max(500, 'Sub description is too long'),
  feature: z.boolean(),
});

export type SkillFormValues = z.infer<typeof skillFormSchema>;

export type SkillItem = {
  _id: string;
  title: string;
  imageId: string;
  subDescription: string;
  feature: boolean;
  createdAt?: string;
  updatedAt?: string;
};
