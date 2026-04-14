import { connectDB } from '@/lib/db';
import Certification from './certification.model';
import type { ICertification } from './certification.interface';
import type {
  CertificationInput,
  UpdateCertificationInput,
} from './certification.validation';

export class CertificationService {
  static async getAll(userId: string): Promise<ICertification[]> {
    await connectDB();
    return await Certification.find({ userId }).sort({ createdAt: -1 }).lean();
  }

  static async create(
    data: CertificationInput,
    userId: string,
  ): Promise<ICertification> {
    await connectDB();
    const doc = new Certification({ ...data, userId });
    const saved = await doc.save();
    return saved.toObject();
  }

  static async update(
    id: string,
    data: UpdateCertificationInput,
    userId: string,
  ): Promise<ICertification | null> {
    await connectDB();
    return await Certification.findOneAndUpdate({ _id: id, userId }, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async delete(id: string, userId: string): Promise<ICertification | null> {
    await connectDB();
    return await Certification.findOneAndDelete({ _id: id, userId }).lean();
  }
}
