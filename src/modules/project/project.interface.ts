import { Types } from "mongoose";

export type ProjectDetail = {
  title: string;
  description: string;
  comment?: string;
};

export interface IProject {
  userId: Types.ObjectId;
  _id?: string;
  imageUrl: string;
  title: string;
  subTitle: string;
  /** Array of Skill _id strings */
  skills: Types.ObjectId[];
  liveUrl: string;
  gitFront: string;
  gitBackend: string;
  details: ProjectDetail[];
  createdAt?: Date;
  updatedAt?: Date;
}

