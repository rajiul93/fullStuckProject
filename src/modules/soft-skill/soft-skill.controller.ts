import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { SoftSkillService } from './soft-skill.service';
import { softSkillSchema, updateSoftSkillSchema } from './soft-skill.validation';

export class SoftSkillController {
  static async getAll(userId: string) {
    try {
      const items = await SoftSkillService.getAll(userId);
      return NextResponse.json(items);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch soft skills' },
        { status: 500 },
      );
    }
  }

  static async create(request: NextRequest, userId: string) {
    try {
      const body = await request.json();
      const validated = softSkillSchema.parse(body);
      const created = await SoftSkillService.create(validated, userId);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to create soft skill' },
        { status: 500 },
      );
    }
  }

  static async update(request: NextRequest, id: string, userId: string) {
    try {
      const body = await request.json();
      const validated = updateSoftSkillSchema.parse(body);
      const updated = await SoftSkillService.update(id, validated, userId);
      if (!updated) {
        return NextResponse.json({ error: 'Soft skill not found' }, { status: 404 });
      }
      return NextResponse.json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to update soft skill' },
        { status: 500 },
      );
    }
  }

  static async delete(id: string, userId: string) {
    try {
      const deleted = await SoftSkillService.delete(id, userId);
      if (!deleted) {
        return NextResponse.json({ error: 'Soft skill not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Soft skill deleted successfully' });
    } catch {
      return NextResponse.json(
        { error: 'Failed to delete soft skill' },
        { status: 500 },
      );
    }
  }
}
