export type ProjectDetail = {
  title: string;
  description: string;
  comment?: string;
};

export interface IProject {
  _id?: string;
  imageUrl: string;
  title: string;
  subTitle: string;
  /** Array of Skill _id strings */
  skills: string[];
  liveUrl: string;
  gitFront: string;
  gitBackend: string;
  details: ProjectDetail[];
  createdAt?: Date;
  updatedAt?: Date;
}

