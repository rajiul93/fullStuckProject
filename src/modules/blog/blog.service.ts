import { connectDB } from '@/lib/db';
import Blog from './blog.model';
import { BlogInput, UpdateBlogInput } from './blog.validation';
import { IBlog } from './blog.interface';

export class BlogService {
  static async getAllBlogs(): Promise<IBlog[]> {
    await connectDB();
    return await Blog.find({ published: true }).sort({ createdAt: -1 });
  }

  static async getBlogBySlug(slug: string): Promise<IBlog | null> {
    await connectDB();
    return await Blog.findOne({ slug, published: true });
  }

  static async createBlog(data: BlogInput): Promise<IBlog> {
    await connectDB();
    const blog = new Blog(data);
    return await blog.save();
  }

  static async updateBlog(id: string, data: UpdateBlogInput): Promise<IBlog | null> {
    await connectDB();
    return await Blog.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteBlog(id: string): Promise<IBlog | null> {
    await connectDB();
    return await Blog.findByIdAndDelete(id);
  }
}
