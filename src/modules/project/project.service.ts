import { connectDB } from '@/lib/db';
import Project from './project.model';
import type { IProject } from './project.interface';
import type { ProjectInput, UpdateProjectInput } from './project.validation';

export class ProjectService {
  static async getAll(): Promise<IProject[]> {
    await connectDB();
    return await Project.find().sort({ createdAt: -1 }).lean();
  }

  static async getById(id: string): Promise<IProject | null> {
    await connectDB();
    return await Project.findById(id).lean();
  }

  static async create(data: ProjectInput): Promise<IProject> {
    await connectDB();
    const doc = new Project(data);
    const saved = await doc.save();
    return saved.toObject();
  }

  static async update(id: string, data: UpdateProjectInput): Promise<IProject | null> {
    await connectDB();
    return await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async delete(id: string): Promise<IProject | null> {
    await connectDB();
    return await Project.findByIdAndDelete(id).lean();
  }
}

