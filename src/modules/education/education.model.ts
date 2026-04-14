import mongoose, { Model, Schema } from 'mongoose';
import type { IEducation } from './education.interface';

const EducationSchema = new Schema<IEducation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    position: { type: Number, required: true, min: 0 },
    degree: { type: String, required: true, trim: true, maxlength: 200 },
    institution: { type: String, required: true, trim: true, maxlength: 300 },
    period: { type: String, required: true, trim: true, maxlength: 100 },
    location: { type: String, required: true, trim: true, maxlength: 200 },
  },
  { timestamps: true },
);

const Education: Model<IEducation> =
  mongoose.models.Education ||
  mongoose.model<IEducation>('Education', EducationSchema);

export default Education;
