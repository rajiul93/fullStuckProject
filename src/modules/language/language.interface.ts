import { Types } from "mongoose";

export interface ILanguage {
  _id?: string;
  userId: Types.ObjectId;
  name: string;
  level: string;
  createdAt?: Date;
  updatedAt?: Date;
}
