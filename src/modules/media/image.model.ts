import mongoose, { Model, Schema } from 'mongoose';
import type { IImage } from './image.interface';

const ImageSchema = new Schema<IImage>(
  {
    originalName: { type: String, required: true, trim: true, maxlength: 300 },
    url: { type: String, required: true, trim: true },
    r2_key: { type: String, required: true, trim: true, unique: true },
    alt: { type: String, trim: true, maxlength: 300 },
  },
  { timestamps: true },
);

const Image: Model<IImage> =
  mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);

export default Image;

