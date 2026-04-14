import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { AdditionalTrainingService } from './additional-training.service';
import {
  additionalTrainingSchema,
  updateAdditionalTrainingSchema,
} from './additional-training.validation';

export class AdditionalTrainingController {
  static async getAll(userId: string) {
    try {
      const items = await AdditionalTrainingService.getAll(userId);
      return NextResponse.json(items);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch additional trainings' },
        { status: 500 },
      );
    }
  }

  static async create(request: NextRequest, userId: string) {
    try {
      const body = await request.json();
      const validated = additionalTrainingSchema.parse(body);
      const created = await AdditionalTrainingService.create(validated, userId);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to create additional training' },
        { status: 500 },
      );
    }
  }

  static async update(request: NextRequest, id: string, userId: string) {
    try {
      const body = await request.json();
      const validated = updateAdditionalTrainingSchema.parse(body);
      const updated = await AdditionalTrainingService.update(id, validated, userId);
      if (!updated) {
        return NextResponse.json(
          { error: 'Additional training not found' },
          { status: 404 },
        );
      }
      return NextResponse.json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to update additional training' },
        { status: 500 },
      );
    }
  }

  static async delete(id: string, userId: string) {
    try {
      const deleted = await AdditionalTrainingService.delete(id, userId);
      if (!deleted) {
        return NextResponse.json(
          { error: 'Additional training not found' },
          { status: 404 },
        );
      }
      return NextResponse.json({
        message: 'Additional training deleted successfully',
      });
    } catch {
      return NextResponse.json(
        { error: 'Failed to delete additional training' },
        { status: 500 },
      );
    }
  }
}
