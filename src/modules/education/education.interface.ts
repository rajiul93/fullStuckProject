import { Types } from "mongoose";

export interface IEducation {
  _id?: string;
  userId: Types.ObjectId;
  position: number;
  degree: string;
  institution: string;
  period: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}
