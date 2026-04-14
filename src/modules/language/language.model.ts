import mongoose, { Model, Schema } from 'mongoose';
import type { ILanguage } from './language.interface';

const LanguageSchema = new Schema<ILanguage>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    level: { type: String, required: true, trim: true, maxlength: 100 },
  },
  { timestamps: true },
);

const Language: Model<ILanguage> =
  mongoose.models.Language || mongoose.model<ILanguage>('Language', LanguageSchema);

export default Language;
