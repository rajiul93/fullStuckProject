import { connectDB } from '@/lib/db';
import BlogV2 from './blog-v2.model';
import type { IBlogV2 } from './blog-v2.interface';
import type { BlogV2Input, UpdateBlogV2Input } from './blog-v2.validation';

export class BlogV2Service {
  static async getAll(): Promise<IBlogV2[]> {
    await connectDB();
    return await BlogV2.find().sort({ createdAt: -1 }).lean();
  }

  static async getById(id: string): Promise<IBlogV2 | null> {
    await connectDB();
    return await BlogV2.findById(id).lean();
  }

  static async create(data: BlogV2Input): Promise<IBlogV2> {
    await connectDB();
    const doc = new BlogV2(data);
    const saved = await doc.save();
    return saved.toObject();
  }

  static async update(id: string, data: UpdateBlogV2Input): Promise<IBlogV2 | null> {
    await connectDB();
    return await BlogV2.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async delete(id: string): Promise<IBlogV2 | null> {
    await connectDB();
    return await BlogV2.findByIdAndDelete(id).lean();
  }
}

