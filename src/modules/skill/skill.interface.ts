export interface ISkill {
  _id?: string;
  title: string;
  /** Reference id for an image (e.g. upload / storage id). */
  imageId: string;
  subDescription: string;
  feature: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
