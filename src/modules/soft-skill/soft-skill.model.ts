import mongoose, { Model, Schema } from 'mongoose';
import type { ISoftSkill } from './soft-skill.interface';

const SoftSkillSchema = new Schema<ISoftSkill>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    position: { type: Number, required: true, min: 0 },
    icon: { type: String, required: true, trim: true, maxlength: 500 },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { timestamps: true },
);

const SoftSkill: Model<ISoftSkill> =
  mongoose.models.SoftSkill || mongoose.model<ISoftSkill>('SoftSkill', SoftSkillSchema);

export default SoftSkill;
