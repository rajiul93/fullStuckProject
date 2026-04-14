import mongoose, { Schema, Model } from 'mongoose';
import { ISkill } from './skill.interface';

const SkillSchema = new Schema<ISkill>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    imageId: {
      type: String,
      trim: true,
    },
    subDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    feature: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
