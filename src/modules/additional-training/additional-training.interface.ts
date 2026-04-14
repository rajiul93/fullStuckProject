import { Types } from "mongoose";

export interface IAdditionalTraining {
  _id?: string;
  userId: Types.ObjectId;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
