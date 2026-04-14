import mongoose, { Model, Schema } from 'mongoose';
import type { IAdditionalTraining } from './additional-training.interface';

const AdditionalTrainingSchema = new Schema<IAdditionalTraining>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { timestamps: true },
);

const AdditionalTraining: Model<IAdditionalTraining> =
  mongoose.models.AdditionalTraining ||
  mongoose.model<IAdditionalTraining>(
    'AdditionalTraining',
    AdditionalTrainingSchema,
  );

export default AdditionalTraining;
