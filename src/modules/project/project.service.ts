import { connectDB } from '@/lib/db';
import Project from './project.model';
import type { IProject } from './project.interface';
import type { ProjectInput, UpdateProjectInput } from './project.validation';

function normalizeSkills(skills: unknown): string[] {
  if (!Array.isArray(skills)) return [];
  const flat: unknown[] = [];
  const stack: unknown[] = [...skills];

  while (stack.length > 0) {
    const current = stack.shift();
    if (Array.isArray(current)) {
      stack.unshift(...current);
      continue;
    }
    if (current !== undefined && current !== null) {
      flat.push(current);
    }
  }

  return flat.map((item) => String(item));
}

function normalizeProject(project: IProject): IProject {
  return {
    ...project,
    skills: normalizeSkills(project.skills) as unknown as IProject['skills'],
  };
}

export class ProjectService {
  static async getAll(userId: string): Promise<IProject[]> {
    await connectDB();
    const projects = await Project.find({ userId }).sort({ createdAt: -1 }).lean();
    return projects.map((project) => normalizeProject(project));
  }

  static async getById(id: string): Promise<IProject | null> {
    await connectDB();
    const project = await Project.findById(id).lean();
    if (!project) return null;
    return normalizeProject(project);
  }

  static async create(data: ProjectInput, userId: string): Promise<IProject> {
    await connectDB();
    const doc = new Project({ ...data, userId });
    const saved = await doc.save();
    return normalizeProject(saved.toObject());
  }

  static async update(
    id: string,
    data: UpdateProjectInput,
    userId: string,
  ): Promise<IProject | null> {
    await connectDB();
    const updated = await Project.findOneAndUpdate({ _id: id, userId }, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updated) return null;
    return normalizeProject(updated);
  }

  static async delete(id: string): Promise<IProject | null> {
    await connectDB();
    return await Project.findByIdAndDelete(id).lean();
  }
}

