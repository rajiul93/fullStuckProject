export interface ResumeData {
  personal: Personal;
  contact: Contact;
  sectionLabels: SectionLabels;
  summary: string;
  education: Education[];
  experience: Experience;
  additionalTraining: AdditionalTraining;
  technologies: string[];
  softSkills: SoftSkill[];
  personalProjects: Experience[];
  languages: Language[];
  certifications: Certification[];
}

// ─────────────────────────────────────

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

// ─────────────────────────────────────

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

// ─────────────────────────────────────

export interface Education {
  position: number;
  degree: string;
  institution: string;
  period: string;
  location: string;
}

// ─────────────────────────────────────

export interface Experience {
  jobTitle: string;
  company: string;
  period: string;
  location: string;
  projects: ExperienceProject[];
}

export interface ExperienceProject {
  id: number;
  title: string;
  description: string;
  responsibilities: string[];
  tech: string[];
  liveUrl?: string;
  gitFrontendUrl?: string;
  gitBackendUrl?: string;
}

// ─────────────────────────────────────

export interface AdditionalTraining {
  title: string;
  description: string;
}

// ─────────────────────────────────────

export interface SoftSkill {
  position: number;
  icon: string;
  title: string;
  description: string;
}

// ─────────────────────────────────────

// ─────────────────────────────────────

export interface Language {
  name: string;
  level: string;
}

// ─────────────────────────────────────

export interface Certification {
  name: string;
  issuer: string;
}
