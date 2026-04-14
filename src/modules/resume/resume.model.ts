import mongoose, { Schema } from "mongoose";
import { ResumeData } from "./resume.interface";

const ResumeSchema = new Schema<ResumeData>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    personal: {
      name: { type: String, required: true },
      title: { type: String, required: true },
    },

    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      linkedInUrl: { type: String, required: true },
      linkedInLabel: { type: String, required: true },
      portfolioUrl: { type: String, required: true },
      portfolioLabel: { type: String, required: true },
      location: { type: String, required: true },
    },

    sectionLabels: {
      summary: { type: String, required: true },
      education: { type: String, required: true },
      experience: { type: String, required: true },
      additionalTraining: { type: String, required: true },
      industrySkills: { type: String, required: true },
      softSkills: { type: String, required: true },
      personalProjects: { type: String, required: true },
      keyFeatures: { type: String, required: true },
      liveDemo: { type: String, required: true },
      frontendGit: { type: String, required: true },
      backendGit: { type: String, required: true },
      project: { type: String, required: true },
      languages: { type: String, required: true },
      certifications: { type: String, required: true },
      bullet: { type: String, required: true },
    }, 
    summary: { type: String, required: true },

    /* ───────────── RELATIONS (ObjectId) ───────────── */
    education: [{ type: Schema.Types.ObjectId, ref: "Education" }],
    experience: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
    personalProjects: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
    additionalTraining: [
      {
        type: Schema.Types.ObjectId,
        ref: "AdditionalTraining",
      },
    ],
    softSkills: [{ type: Schema.Types.ObjectId, ref: "SoftSkill" }],
    languages: [{ type: Schema.Types.ObjectId, ref: "Language" }],
    certifications: [{ type: Schema.Types.ObjectId, ref: "Certification" }],

    technologies: [{ type: Schema.Types.ObjectId, ref: "Technologies" }],
  },
  { timestamps: true },
);

export const Resume =
  mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);

export default Resume;
