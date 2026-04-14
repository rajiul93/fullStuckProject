
export interface Education {
  userId:string;
  position: number;
  degree: string;
  institution: string;
  period: string;
  location: string;
}

// ─────────────────────────────────────

export interface Experience {
  userId:string;
  jobTitle: string;
  company: string;
  period: string;
  location: string;
  projects: ExperienceProject[];
}

export interface ExperienceProject {
  userId:string;
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
  userId:string;
  title: string;
  description: string;
}

// ─────────────────────────────────────

export interface SoftSkill {
  userId:string;
  position: number;
  icon: string;
  title: string;
  description: string;
}

// ─────────────────────────────────────

// ─────────────────────────────────────

export interface Language {
  userId:string;
  name: string;
  level: string;
}

// ─────────────────────────────────────

export interface Certification {
  userId:string;
  name: string;
  issuer: string;
}
