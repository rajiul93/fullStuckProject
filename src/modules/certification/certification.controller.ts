import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { CertificationService } from './certification.service';
import {
  certificationSchema,
  updateCertificationSchema,
} from './certification.validation';

export class CertificationController {
  static async getAll(userId: string) {
    try {
      const items = await CertificationService.getAll(userId);
      return NextResponse.json(items);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch certifications' },
        { status: 500 },
      );
    }
  }

  static async create(request: NextRequest, userId: string) {
    try {
      const body = await request.json();
      const validated = certificationSchema.parse(body);
      const created = await CertificationService.create(validated, userId);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to create certification' },
        { status: 500 },
      );
    }
  }

  static async update(request: NextRequest, id: string, userId: string) {
    try {
      const body = await request.json();
      const validated = updateCertificationSchema.parse(body);
      const updated = await CertificationService.update(id, validated, userId);
      if (!updated) {
        return NextResponse.json(
          { error: 'Certification not found' },
          { status: 404 },
        );
      }
      return NextResponse.json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }
      return NextResponse.json(
        { error: 'Failed to update certification' },
        { status: 500 },
      );
    }
  }

  static async delete(id: string, userId: string) {
    try {
      const deleted = await CertificationService.delete(id, userId);
      if (!deleted) {
        return NextResponse.json(
          { error: 'Certification not found' },
          { status: 404 },
        );
      }
      return NextResponse.json({ message: 'Certification deleted successfully' });
    } catch {
      return NextResponse.json(
        { error: 'Failed to delete certification' },
        { status: 500 },
      );
    }
  }
}
