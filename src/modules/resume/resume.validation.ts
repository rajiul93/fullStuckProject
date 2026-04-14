import { z } from 'zod';

const personalSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
});

const contactSchema = z.object({
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Valid email is required'),
  linkedInUrl: z.string().url('Valid LinkedIn URL is required'),
  linkedInLabel: z.string().min(1, 'LinkedIn label is required'),
  portfolioUrl: z.string().url('Valid portfolio URL is required'),
  portfolioLabel: z.string().min(1, 'Portfolio label is required'),
  location: z.string().min(1, 'Location is required'),
});

const sectionLabelsSchema = z.object({
  summary: z.string().min(1),
  education: z.string().min(1),
  experience: z.string().min(1),
  additionalTraining: z.string().min(1),
  industrySkills: z.string().min(1),
  softSkills: z.string().min(1),
  personalProjects: z.string().min(1),
  keyFeatures: z.string().min(1),
  liveDemo: z.string().min(1),
  frontendGit: z.string().min(1),
  backendGit: z.string().min(1),
  project: z.string().min(1),
  languages: z.string().min(1),
  certifications: z.string().min(1),
  bullet: z.string().min(1),
});

const objectIdListSchema = z.array(z.string().min(1)).default([]);

export const resumeSchema = z.object({
  personal: personalSchema,
  contact: contactSchema,
  sectionLabels: sectionLabelsSchema,
  summary: z.string().min(1, 'Summary is required'),
  education: objectIdListSchema,
  experience: objectIdListSchema,
  personalProjects: objectIdListSchema,
  additionalTraining: objectIdListSchema,
  technologies: objectIdListSchema,
  softSkills: objectIdListSchema,
  languages: objectIdListSchema,
  certifications: objectIdListSchema,
});

export const updateResumeSchema = resumeSchema.partial();

export type ResumeInput = z.infer<typeof resumeSchema>;
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>;
