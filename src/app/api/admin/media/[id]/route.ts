import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/auth';
import { apiError } from '@/lib/server/http';
import { removeUnusedMedia } from '@/lib/server/storage';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin(request);
    await removeUnusedMedia((await params).id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
