import mongoose, { Model, Schema } from "mongoose";
import type { IProject } from "./project.interface";

const ProjectDetailSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    comment: { type: String, trim: true, maxlength: 500 },
  },
  { _id: false },
);

const ProjectSchema = new Schema<IProject>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    subTitle: { type: String, required: true, trim: true, maxlength: 300 },
    skills: {
      type: [Schema.Types.ObjectId],
      ref: "Skill",
      required: true,
      default: [],
      set: (value: unknown) => {
        if (!Array.isArray(value)) return [];
        const flat: unknown[] = [];
        const stack: unknown[] = [...value];
        while (stack.length > 0) {
          const current = stack.shift();
          if (Array.isArray(current)) {
            stack.unshift(...current);
          } else if (current !== undefined && current !== null) {
            flat.push(current);
          }
        }
        return flat;
      },
    },
    liveUrl: { type: String, required: true, trim: true },
    gitFront: { type: String, required: true, trim: true },
    gitBackend: { type: String, required: true, trim: true },
    details: { type: [ProjectDetailSchema], required: true, default: [] },
  },
  { timestamps: true },
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
