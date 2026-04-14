import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ProjectService } from './project.service';
import { projectSchema, updateProjectSchema } from './project.validation';

export class ProjectController {
  static async getAll() {
    try {
      const projects = await ProjectService.getAll();
      return NextResponse.json(projects);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 },
      );
    }
  }

  static async getById(id: string) {
    try {
      const project = await ProjectService.getById(id);
      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 },
        );
      }
      return NextResponse.json(project);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch project' },
        { status: 500 },
      );
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const validated = projectSchema.parse(body);
      const created = await ProjectService.create(validated);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 },
      );
    }
  }

  static async update(request: NextRequest, id: string) {
    try {
      const body = await request.json();
      const validated = updateProjectSchema.parse(body);
      const updated = await ProjectService.update(id, validated);
      if (!updated) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 },
        );
      }
      return NextResponse.json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 },
      );
    }
  }

  static async delete(id: string) {
    try {
      const deleted = await ProjectService.delete(id);
      if (!deleted) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 },
        );
      }
      return NextResponse.json({ message: 'Project deleted successfully' });
    } catch {
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: 500 },
      );
    }
  }
}

