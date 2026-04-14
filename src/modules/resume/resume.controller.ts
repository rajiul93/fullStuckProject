import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ResumeService } from './resume.service';
import { resumeSchema } from './resume.validation';

export class ResumeController {
  static async getAll() {
    try {
      const resumes = await ResumeService.getAll();
      return NextResponse.json(resumes);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch resumes' },
        { status: 500 },
      );
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const validated = resumeSchema.parse(body);
      const created = await ResumeService.create(validated);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }

      return NextResponse.json(
        { error: 'Failed to create resume' },
        { status: 500 },
      );
    }
  }
}
