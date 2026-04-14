import { Schema, model, Types } from "mongoose";
import { ResumeData } from "./resume.interface";

// ─────────────────────────────────────
// Sub Schemas
// ─────────────────────────────────────

const PersonalSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
  },
  { _id: false }
);

const ContactSchema = new Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    linkedInUrl: { type: String },
    linkedInLabel: { type: String },
    portfolioUrl: { type: String },
    portfolioLabel: { type: String },
    location: { type: String },
  },
  { _id: false }
);

const SectionLabelsSchema = new Schema(
  {
    summary: { type: String },
    education: { type: String },
    experience: { type: String },
    additionalTraining: { type: String },
    industrySkills: { type: String },
    softSkills: { type: String },
    personalProjects: { type: String },
    keyFeatures: { type: String },
    liveDemo: { type: String },
    frontendGit: { type: String },
    backendGit: { type: String },
    project: { type: String },
    languages: { type: String },
    certifications: { type: String },
    bullet: { type: String },
  },
  { _id: false }
);

// ─────────────────────────────────────
// Main Resume Schema
// ─────────────────────────────────────

const ResumeSchema = new Schema<ResumeData>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    personal: { type: PersonalSchema, required: true },
    contact: { type: ContactSchema, required: true },
    sectionLabels: { type: SectionLabelsSchema, required: true },
    summary: { type: String },

    education: [{ type: Types.ObjectId, ref: "Education" }],
    experience: [{ type: Types.ObjectId, ref: "Experience" }],
    personalProjects: [{ type: Types.ObjectId, ref: "PersonalProject" }],
    additionalTraining: [{ type: Types.ObjectId, ref: "AdditionalTraining" }],
    technologies: [{ type: Types.ObjectId, ref: "Technology" }],
    softSkills: [{ type: Types.ObjectId, ref: "SoftSkill" }],
    languages: [{ type: Types.ObjectId, ref: "Language" }],
    certifications: [{ type: Types.ObjectId, ref: "Certification" }],
  },
  {
    timestamps: true,
  }
);

// ─────────────────────────────────────
// Model
// ─────────────────────────────────────

export const ResumeModel = model("Resume", ResumeSchema);