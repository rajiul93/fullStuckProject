import mongoose, { Schema } from "mongoose";
import type { Experience } from "../../../abc";

const ExperienceProjectSchema = new Schema(
  {
    userId: { type: String, required: true, trim: true },
    id: { type: Number, required: true, min: 0 },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    responsibilities: {
      type: [String],
      required: true,
      default: [],
    },
    tech: {
      type: [String],
      required: true,
      default: [],
    },
    liveUrl: { type: String, trim: true },
    gitFrontendUrl: { type: String, trim: true },
    gitBackendUrl: { type: String, trim: true },
  },
  { _id: false },
);

const ExperienceSchema = new Schema<Experience>(
  {
    userId: { type: String, required: true, trim: true, index: true },
    jobTitle: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    projects: {
      type: [ExperienceProjectSchema],
      required: true,
      default: [],
    },
  },
  { timestamps: true },
);

export const ExperienceModel =
  mongoose.models.Experience ||
  mongoose.model<Experience>("Experience", ExperienceSchema);

export default ExperienceModel;
