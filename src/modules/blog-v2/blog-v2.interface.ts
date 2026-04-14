export type BlogV2ListContainer = {
  listTitle: string;
  list: string[];
};

export interface IBlogV2 {
  _id?: string;
  title: string;
  shortDescription: string;
  description: string;
  listContainer: BlogV2ListContainer[];
  createdAt?: Date;
  updatedAt?: Date;
}

