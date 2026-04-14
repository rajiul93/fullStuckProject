import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { LanguageService } from './language.service';
import { languageSchema, updateLanguageSchema } from './language.validation';

export class LanguageController {
  static async getAll(userId: string) {
    try {
      const items = await LanguageService.getAll(userId);
      return NextResponse.json(items);
    } catch {
      return NextResponse.json({ error: 'Failed to fetch languages' }, { status: 500 });
    }
  }

  static async create(request: NextRequest, userId: string) {
    try {
      const body = await request.json();
      const validated = languageSchema.parse(body);
      const created = await LanguageService.create(validated, userId);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to create language' }, { status: 500 });
    }
  }

  static async update(request: NextRequest, id: string, userId: string) {
    try {
      const body = await request.json();
      const validated = updateLanguageSchema.parse(body);
      const updated = await LanguageService.update(id, validated, userId);
      if (!updated) {
        return NextResponse.json({ error: 'Language not found' }, { status: 404 });
      }
      return NextResponse.json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to update language' }, { status: 500 });
    }
  }

  static async delete(id: string, userId: string) {
    try {
      const deleted = await LanguageService.delete(id, userId);
      if (!deleted) {
        return NextResponse.json({ error: 'Language not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Language deleted successfully' });
    } catch {
      return NextResponse.json({ error: 'Failed to delete language' }, { status: 500 });
    }
  }
}
