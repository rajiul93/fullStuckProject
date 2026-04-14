import mongoose, { Model, Schema } from 'mongoose';
import type { IBlogV2 } from './blog-v2.interface';

const ListContainerSchema = new Schema(
  {
    listTitle: { type: String, required: true, trim: true, maxlength: 200 },
    list: { type: [String], required: true, default: [] },
  },
  { _id: false },
);

const BlogV2Schema = new Schema<IBlogV2>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    listContainer: { type: [ListContainerSchema], required: true, default: [] },
  },
  { timestamps: true },
);

const BlogV2: Model<IBlogV2> =
  mongoose.models.BlogV2 || mongoose.model<IBlogV2>('BlogV2', BlogV2Schema);

export default BlogV2;

