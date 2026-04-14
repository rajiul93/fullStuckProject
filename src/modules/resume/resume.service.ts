import { connectDB } from '@/lib/db';
import Resume from './resume.model'; 
import type { ResumeInput } from './resume.validation';
import { ResumeData } from './resume.interface';

export class ResumeService {
  static async getAll(): Promise<ResumeData[]> {
    await connectDB();
    return await Resume.find().sort({ createdAt: -1 }).lean();
  }

  static async create(data: ResumeInput): Promise<ResumeData> {
    const isExist = await Resume.findOne({ email: data.contact.email });
    if (isExist) {
      throw new Error('Resume already exists');
    }

    await connectDB();
    const doc = new Resume(data);
    const saved = await doc.save();
    return saved.toObject();
  }
}
