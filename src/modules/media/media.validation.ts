import { z } from 'zod';

export const mediaAltSchema = z.object({
  alt: z
    .preprocess(
      (v) => (Array.isArray(v) ? v[0] : v),
      z.string().max(300).optional(),
    )
    .optional(),
});

export type MediaAltInput = z.infer<typeof mediaAltSchema>;

