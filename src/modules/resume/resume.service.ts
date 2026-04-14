import { connectDB } from '@/lib/db';
import Resume from './resume.model';
import type { ResumeInput, UpdateResumeInput } from './resume.validation';
import type { ResumeData } from './resume.interface';
import { Types, type Connection } from 'mongoose';
import Education from '@/modules/education/education.model';
import AdditionalTraining from '@/modules/additional-training/additional-training.model';
import SoftSkill from '@/modules/soft-skill/soft-skill.model';
import Language from '@/modules/language/language.model';
import Certification from '@/modules/certification/certification.model';
import Project from '@/modules/project/project.model';
import Skill from '@/modules/skill/skill.model';

const REFERENCE_CONFIG = {
  education: { collection: 'educations', requireOwnership: true },
  experience: { collection: 'projects', requireOwnership: true },
  personalProjects: { collection: 'projects', requireOwnership: true },
  additionalTraining: {
    collection: 'additionaltrainings',
    requireOwnership: true,
  },
  technologies: { collection: 'skills', requireOwnership: false },
  softSkills: { collection: 'softskills', requireOwnership: true },
  languages: { collection: 'languages', requireOwnership: true },
  certifications: { collection: 'certifications', requireOwnership: true },
} as const;

type ReferenceField = keyof typeof REFERENCE_CONFIG;

function parseObjectIds(ids: string[], field: string) {
  const unique = [...new Set(ids)];
  const invalid = unique.filter((id) => !Types.ObjectId.isValid(id));
  if (invalid.length > 0) {
    throw new Error(`Invalid ${field} id format`);
  }
  return unique.map((id) => new Types.ObjectId(id));
}

function userIdMatchers(userId: string) {
  const matchers: Array<{ userId: string | Types.ObjectId }> = [{ userId }];
  if (Types.ObjectId.isValid(userId)) {
    matchers.push({ userId: new Types.ObjectId(userId) });
  }
  return matchers;
}

async function assertReferenceOwnership(
  conn: Connection,
  userId: string,
  field: ReferenceField,
  ids: string[],
) {
  if (ids.length === 0) return;
  if (!conn.db) throw new Error('Database connection is not ready');

  const objectIds = parseObjectIds(ids, field);
  const { collection, requireOwnership } = REFERENCE_CONFIG[field];
  const query = requireOwnership
    ? { _id: { $in: objectIds }, $or: userIdMatchers(userId) }
    : { _id: { $in: objectIds } };

  const count = await conn.db.collection(collection).countDocuments(query);

  if (count !== objectIds.length) {
    throw new Error(
      `Some ${field} ids are invalid or do not belong to the authenticated user`,
    );
  }
}

async function validateResumeReferences(data: ResumeInput, userId: string) {
  const conn = await connectDB();
  await Promise.all(
    (Object.keys(REFERENCE_CONFIG) as ReferenceField[]).map((field) =>
      assertReferenceOwnership(conn.connection, userId, field, data[field]),
    ),
  );
}

export class ResumeService {
  static async getAll(userId: string): Promise<ResumeData[]> {
    await connectDB();
    return await Resume.find({ userId }).sort({ createdAt: -1 }).lean();
  }

  static async getById(id: string, userId: string): Promise<ResumeData | null> {
    await connectDB();
    return await Resume.findOne({ _id: id, userId })
      .populate({ path: 'education', model: Education })
      .populate({ path: 'experience', model: Project })
      .populate({ path: 'personalProjects', model: Project })
      .populate({ path: 'additionalTraining', model: AdditionalTraining })
      .populate({ path: 'technologies', model: Skill })
      .populate({ path: 'softSkills', model: SoftSkill })
      .populate({ path: 'languages', model: Language })
      .populate({ path: 'certifications', model: Certification })
      .lean();
  }

  static async create(data: ResumeInput, userId: string): Promise<ResumeData> {
    await connectDB();
    const isExist = await Resume.findOne({ userId });
    if (isExist) throw new Error('Resume already exists for this user');

    await validateResumeReferences(data, userId);

    const doc = new Resume({ ...data, userId });
    const saved = await doc.save();
    return saved.toObject();
  }

  static async update(
    id: string,
    data: UpdateResumeInput,
    userId: string,
  ): Promise<ResumeData | null> {
    await connectDB();
    const fields = Object.keys(REFERENCE_CONFIG) as ReferenceField[];
    const hasReferenceField = fields.some(
      (field) => Array.isArray(data[field]) && data[field] !== undefined,
    );
    if (hasReferenceField) {
      const current = await Resume.findOne({ _id: id, userId }).lean();
      if (!current) return null;

      const merged: ResumeInput = {
        ...current,
        ...data,
        userId: current.userId,
      } as ResumeInput;
      await validateResumeReferences(merged, userId);
    }

    return await Resume.findOneAndUpdate({ _id: id, userId }, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async delete(id: string, userId: string): Promise<ResumeData | null> {
    await connectDB();
    return await Resume.findOneAndDelete({ _id: id, userId }).lean();
  }
}
