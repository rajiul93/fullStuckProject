import { SkillService } from './skill.service';
import { skillSchema, updateSkillSchema } from './skill.validation';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export class SkillController {
  static async getAll() {
    try {
      const skills = await SkillService.getAll();
      return NextResponse.json(skills);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch skills' },
        { status: 500 },
      );
    }
  }

  static async getById(id: string) {
    try {
      const skill = await SkillService.getById(id);
      if (!skill) {
        return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
      }
      return NextResponse.json(skill);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch skill' },
        { status: 500 },
      );
    }
  }

  static async create(request: NextRequest) {
    try {
      const body = await request.json();
      const validatedData = skillSchema.parse(body);
      const skill = await SkillService.create(validatedData);
      return NextResponse.json(skill, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to create skill' },
        { status: 500 },
      );
    }
  }

  static async update(request: NextRequest, id: string) {
    try {
      const body = await request.json();
      const validatedData = updateSkillSchema.parse(body);
      const skill = await SkillService.update(id, validatedData);
      if (!skill) {
        return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
      }
      return NextResponse.json(skill);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to update skill' },
        { status: 500 },
      );
    }
  }

  static async delete(id: string) {
    try {
      const skill = await SkillService.delete(id);
      if (!skill) {
        return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Skill deleted successfully' });
    } catch {
      return NextResponse.json(
        { error: 'Failed to delete skill' },
        { status: 500 },
      );
    }
  }
}
