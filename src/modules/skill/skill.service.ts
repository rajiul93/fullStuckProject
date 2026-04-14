import { connectDB } from '@/lib/db';
import Skill from './skill.model';
import { SkillInput, UpdateSkillInput } from './skill.validation';
import { ISkill } from './skill.interface';

export class SkillService {
  static async getAll(): Promise<ISkill[]> {
    await connectDB();
    return await Skill.find().sort({ createdAt: -1 }).lean();
  }

  static async getById(id: string): Promise<ISkill | null> {
    await connectDB();
    return await Skill.findById(id).lean();
  }

  static async create(data: SkillInput): Promise<ISkill> {
    await connectDB();
    const skill = new Skill(data);
    const saved = await skill.save();
    return saved.toObject();
  }

  static async update(
    id: string,
    data: UpdateSkillInput,
  ): Promise<ISkill | null> {
    await connectDB();
    const doc = await Skill.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    return doc;
  }

  static async delete(id: string): Promise<ISkill | null> {
    await connectDB();
    return await Skill.findByIdAndDelete(id).lean();
  }
}
