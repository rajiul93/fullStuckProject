import { Types } from "mongoose";

export interface ICertification {
  _id?: string;
  userId: Types.ObjectId;
  name: string;
  issuer: string;
  createdAt?: Date;
  updatedAt?: Date;
}
