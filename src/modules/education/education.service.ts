import { connectDB } from '@/lib/db';
import Education from './education.model';
import type { IEducation } from './education.interface';
import type {
  EducationInput,
  UpdateEducationInput,
} from './education.validation';

export class EducationService {
  static async getAll(userId: string): Promise<IEducation[]> {
    await connectDB();
    return await Education.find({ userId }).sort({ position: 1 }).lean();
  }

  static async create(data: EducationInput, userId: string): Promise<IEducation> {
    await connectDB();
    const doc = new Education({ ...data, userId });
    const saved = await doc.save();
    return saved.toObject();
  }

  static async update(
    id: string,
    data: UpdateEducationInput,
    userId: string,
  ): Promise<IEducation | null> {
    await connectDB();
    return await Education.findOneAndUpdate({ _id: id, userId }, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async delete(id: string, userId: string): Promise<IEducation | null> {
    await connectDB();
    return await Education.findOneAndDelete({ _id: id, userId }).lean();
  }
}
