import mongoose, { Model, Schema } from 'mongoose';
import type { ICertification } from './certification.interface';

const CertificationSchema = new Schema<ICertification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 200 },
    issuer: { type: String, required: true, trim: true, maxlength: 200 },
  },
  { timestamps: true },
);

const Certification: Model<ICertification> =
  mongoose.models.Certification ||
  mongoose.model<ICertification>('Certification', CertificationSchema);

export default Certification;
