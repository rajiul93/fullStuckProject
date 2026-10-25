import 'server-only';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const expected =
    process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  if (!origin || origin !== new URL(expected).origin) {
    throw new HttpError(403, 'Invalid request origin.');
  }
}

export function apiError(error: unknown) {
  if (error instanceof HttpError)
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  if (error instanceof ZodError)
    return NextResponse.json(
      {
        error: error.issues
          .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
          .join('; '),
      },
      { status: 400 },
    );
  if (error instanceof SyntaxError)
    return NextResponse.json(
      { error: 'Invalid JSON request.' },
      { status: 400 },
    );
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  ) {
    return NextResponse.json({ error: 'Record not found.' }, { status: 404 });
  }
  // Do not include provider errors: they can contain connection strings or credentials.
  console.error(
    'Backend request failed:',
    error instanceof Error ? error.name : 'UnknownError',
  );
  return NextResponse.json(
    {
      error:
        'Service unavailable. Check database, encryption key and storage configuration.',
    },
    { status: 503 },
  );
}
