import { Types } from "mongoose";

export interface ResumeData {
  userId: Types.ObjectId;
  personal: Personal;
  contact: Contact;
  sectionLabels: SectionLabels;
  summary: string;
  education: Types.ObjectId[];

  experience: Types.ObjectId[];
  personalProjects: Types.ObjectId[];
  additionalTraining: Types.ObjectId[];
  technologies: Types.ObjectId[];
  softSkills: Types.ObjectId[];
  languages: Types.ObjectId[];
  certifications: Types.ObjectId[];
}
export interface SectionLabels {
  summary: string;
  education: string;
  experience: string;
  additionalTraining: string;
  industrySkills: string;
  softSkills: string;
  personalProjects: string;
  keyFeatures: string;
  liveDemo: string;
  frontendGit: string;
  backendGit: string;
  project: string;
  languages: string;
  certifications: string;
  bullet: string;
}
export interface Personal {
  name: string;
  title: string;
}
export interface Contact {
  phone: string;
  email: string;
  linkedInUrl: string;
  linkedInLabel: string;
  portfolioUrl: string;
  portfolioLabel: string;
  location: string;
}
