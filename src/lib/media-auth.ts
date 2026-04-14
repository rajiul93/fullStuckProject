import { NextResponse } from 'next/server';
import type { TokenPayload } from '@/lib/jwt';

const MEDIA_MUTATION_ROLES = ['user', 'admin', 'sub-admin'] as const;

export function assertMediaMutationRole(payload: TokenPayload) {
  if (
    !MEDIA_MUTATION_ROLES.includes(
      payload.role as (typeof MEDIA_MUTATION_ROLES)[number],
    )
  ) {
    return NextResponse.json(
      { error: 'Forbidden', message: 'Insufficient role' },
      { status: 403 },
    );
  }
  return null;
}
