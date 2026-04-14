import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ResumeService } from './resume.service';
import { resumeSchema, updateResumeSchema } from './resume.validation';

export class ResumeController {
  static async getAll(userId: string) {
    try {
      const resumes = await ResumeService.getAll(userId);
      return NextResponse.json(resumes);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch resumes' },
        { status: 500 },
      );
    }
  }

  static async getById(id: string, userId: string) {
    try {
      const resume = await ResumeService.getById(id, userId);
      if (!resume) {
        return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
      }
      return NextResponse.json(resume);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch resume' },
        { status: 500 },
      );
    }
  }

  static async create(request: NextRequest, userId: string) {
    try {
      const body = await request.json();
      const validated = resumeSchema.parse(body);
      const created = await ResumeService.create(validated, userId);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json(
        { error: 'Failed to create resume' },
        { status: 500 },
      );
    }
  }

  static async update(request: NextRequest, id: string, userId: string) {
    try {
      const body = await request.json();
      const validated = updateResumeSchema.parse(body);
      const updated = await ResumeService.update(id, validated, userId);
      if (!updated) {
        return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
      }
      return NextResponse.json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to update resume' },
        { status: 500 },
      );
    }
  }

  static async delete(id: string, userId: string) {
    try {
      const deleted = await ResumeService.delete(id, userId);
      if (!deleted) {
        return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Resume deleted successfully' });
    } catch {
      return NextResponse.json(
        { error: 'Failed to delete resume' },
        { status: 500 },
      );
    }
  }
}
