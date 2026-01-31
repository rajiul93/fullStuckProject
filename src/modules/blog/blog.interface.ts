export interface IBlog {
  _id?: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
