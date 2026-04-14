import { connectDB } from '@/lib/db';
import SoftSkill from './soft-skill.model';
import type { ISoftSkill } from './soft-skill.interface';
import type { SoftSkillInput, UpdateSoftSkillInput } from './soft-skill.validation';

export class SoftSkillService {
  static async getAll(userId: string): Promise<ISoftSkill[]> {
    await connectDB();
    return await SoftSkill.find({ userId }).sort({ position: 1 }).lean();
  }

  static async create(data: SoftSkillInput, userId: string): Promise<ISoftSkill> {
    await connectDB();
    const doc = new SoftSkill({ ...data, userId });
    const saved = await doc.save();
    return saved.toObject();
  }

  static async update(
    id: string,
    data: UpdateSoftSkillInput,
    userId: string,
  ): Promise<ISoftSkill | null> {
    await connectDB();
    return await SoftSkill.findOneAndUpdate({ _id: id, userId }, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async delete(id: string, userId: string): Promise<ISoftSkill | null> {
    await connectDB();
    return await SoftSkill.findOneAndDelete({ _id: id, userId }).lean();
  }
}
