import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AppError } from '@/modules/utils/app-error';

export class ValidationService {
  /**
   * Validate request body with Zod schema
   */
  static async validateBody<T>(
    request: NextRequest,
    schema: z.ZodSchema<T>,
  ): Promise<T> {
    try {
      const body: unknown = await request.json();
      return schema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map(
          (err) => `${err.path.join('.')}: ${err.message}`,
        );
        throw new AppError(
          `Validation failed: ${errorMessages.join(', ')}`,
          400,
        );
      }
      throw new AppError('Invalid request body', 400);
    }
  }

  /**
   * Validate query parameters
   */
  static validateQuery<T>(
    searchParams: URLSearchParams,
    schema: z.ZodSchema<T>,
  ): T {
    try {
      const queryObj: Record<string, string> = Object.fromEntries(
        searchParams.entries(),
      );
      return schema.parse(queryObj);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map(
          (err) => `${err.path.join('.')}: ${err.message}`,
        );
        throw new AppError(
          `Query validation failed: ${errorMessages.join(', ')}`,
          400,
        );
      }
      throw new AppError('Invalid query parameters', 400);
    }
  }

  /**
   * Validate any data with schema
   */
  static validate<T>(data: unknown, schema: z.ZodSchema<T>): T {
    try {
      return schema.parse(data);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map(
          (err) => `${err.path.join('.')}: ${err.message}`,
        );
        throw new AppError(
          `Validation failed: ${errorMessages.join(', ')}`,
          400,
        );
      }
      throw new AppError('Validation failed', 400);
    }
  }

  /**
   * Safe validation (returns success/error instead of throwing)
   */
  static safeValidate<T>(
    data: unknown,
    schema: z.ZodSchema<T>,
  ): { success: true; data: T } | { success: false; errors: string[] } {
    const result = schema.safeParse(data);

    if (result.success) {
      return { success: true, data: result.data };
    }

    return {
      success: false,
      errors: result.error.issues.map(
        (err) => `${err.path.join('.')}: ${err.message}`,
      ),
    };
  }
}
