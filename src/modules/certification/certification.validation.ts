import { z } from 'zod';

export const certificationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  issuer: z.string().min(1, 'Issuer is required').max(200),
});

export const updateCertificationSchema = certificationSchema.partial();

export type CertificationInput = z.infer<typeof certificationSchema>;
export type UpdateCertificationInput = z.infer<typeof updateCertificationSchema>;
