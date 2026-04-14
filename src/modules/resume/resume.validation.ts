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

const educationSchema = z.object({
  position: z.number().int().nonnegative(),
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  period: z.string().min(1, 'Period is required'),
  location: z.string().min(1, 'Location is required'),
});

const experienceProjectSchema = z.object({
  id: z.number().int().nonnegative(),
  title: z.string().min(1, 'Project title is required'),
  description: z.string().min(1, 'Project description is required'),
  responsibilities: z.array(z.string().min(1)).default([]),
  tech: z.array(z.string().min(1)).default([]),
  liveUrl: z.string().url('Invalid live URL').optional(),
  gitFrontendUrl: z.string().url('Invalid frontend Git URL').optional(),
  gitBackendUrl: z.string().url('Invalid backend Git URL').optional(),
});

const experienceSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  period: z.string().min(1, 'Period is required'),
  location: z.string().min(1, 'Location is required'),
  projects: z.array(experienceProjectSchema).default([]),
});

const additionalTrainingSchema = z.object({
  title: z.string().min(1, 'Training title is required'),
  description: z.string().min(1, 'Training description is required'),
});

const softSkillSchema = z.object({
  position: z.number().int().nonnegative(),
  icon: z.string().min(1, 'Icon is required'),
  title: z.string().min(1, 'Soft skill title is required'),
  description: z.string().min(1, 'Soft skill description is required'),
});

const languageSchema = z.object({
  name: z.string().min(1, 'Language name is required'),
  level: z.string().min(1, 'Language level is required'),
});

const certificationSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Certification issuer is required'),
});

export const resumeSchema = z.object({
  personal: personalSchema,
  contact: contactSchema,
  sectionLabels: sectionLabelsSchema,
  summary: z.string().min(1, 'Summary is required'),
  education: z.array(educationSchema).default([]),
  experience: experienceSchema,
  additionalTraining: additionalTrainingSchema,
  technologies: z.array(z.string().min(1)).default([]),
  softSkills: z.array(softSkillSchema).default([]),
  personalProjects: z.array(experienceSchema).default([]),
  languages: z.array(languageSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
});

export type ResumeInput = z.infer<typeof resumeSchema>;
