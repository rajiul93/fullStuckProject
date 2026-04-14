import { connectDB } from '@/lib/db';
import Language from './language.model';
import type { ILanguage } from './language.interface';
import type { LanguageInput, UpdateLanguageInput } from './language.validation';

export class LanguageService {
  static async getAll(userId: string): Promise<ILanguage[]> {
    await connectDB();
    return await Language.find({ userId }).sort({ createdAt: -1 }).lean();
  }

  static async create(data: LanguageInput, userId: string): Promise<ILanguage> {
    await connectDB();
    const doc = new Language({ ...data, userId });
    const saved = await doc.save();
    return saved.toObject();
  }

  static async update(
    id: string,
    data: UpdateLanguageInput,
    userId: string,
  ): Promise<ILanguage | null> {
    await connectDB();
    return await Language.findOneAndUpdate({ _id: id, userId }, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async delete(id: string, userId: string): Promise<ILanguage | null> {
    await connectDB();
    return await Language.findOneAndDelete({ _id: id, userId }).lean();
  }
}
