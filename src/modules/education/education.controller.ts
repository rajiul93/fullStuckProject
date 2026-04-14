import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { EducationService } from './education.service';
import {
  educationSchema,
  updateEducationSchema,
} from './education.validation';

export class EducationController {
  static async getAll(userId: string) {
    try {
      const educations = await EducationService.getAll(userId);
      return NextResponse.json(educations);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch educations' },
        { status: 500 },
      );
    }
  }

  static async create(request: NextRequest, userId: string) {
    try {
      const body = await request.json();
      const validated = educationSchema.parse(body);
      const created = await EducationService.create(validated, userId);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to create education' },
        { status: 500 },
      );
    }
  }

  static async update(request: NextRequest, id: string, userId: string) {
    try {
      const body = await request.json();
      const validated = updateEducationSchema.parse(body);
      const updated = await EducationService.update(id, validated, userId);
      if (!updated) {
        return NextResponse.json(
          { error: 'Education not found' },
          { status: 404 },
        );
      }
      return NextResponse.json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to update education' },
        { status: 500 },
      );
    }
  }

  static async delete(id: string, userId: string) {
    try {
      const deleted = await EducationService.delete(id, userId);
      if (!deleted) {
        return NextResponse.json(
          { error: 'Education not found' },
          { status: 404 },
        );
      }
      return NextResponse.json({ message: 'Education deleted successfully' });
    } catch {
      return NextResponse.json(
        { error: 'Failed to delete education' },
        { status: 500 },
      );
    }
  }
}
