import { connectDB } from '@/lib/db';
import AdditionalTraining from './additional-training.model';
import type { IAdditionalTraining } from './additional-training.interface';
import type {
  AdditionalTrainingInput,
  UpdateAdditionalTrainingInput,
} from './additional-training.validation';

export class AdditionalTrainingService {
  static async getAll(userId: string): Promise<IAdditionalTraining[]> {
    await connectDB();
    return await AdditionalTraining.find({ userId }).sort({ createdAt: -1 }).lean();
  }

  static async create(
    data: AdditionalTrainingInput,
    userId: string,
  ): Promise<IAdditionalTraining> {
    await connectDB();
    const doc = new AdditionalTraining({ ...data, userId });
    const saved = await doc.save();
    return saved.toObject();
  }

  static async update(
    id: string,
    data: UpdateAdditionalTrainingInput,
    userId: string,
  ): Promise<IAdditionalTraining | null> {
    await connectDB();
    return await AdditionalTraining.findOneAndUpdate({ _id: id, userId }, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async delete(
    id: string,
    userId: string,
  ): Promise<IAdditionalTraining | null> {
    await connectDB();
    return await AdditionalTraining.findOneAndDelete({ _id: id, userId }).lean();
  }
}
