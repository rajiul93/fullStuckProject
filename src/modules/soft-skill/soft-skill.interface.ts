import { Types } from "mongoose";

export interface ISoftSkill {
  _id?: string;
  userId: Types.ObjectId;
  position: number;
  icon: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
