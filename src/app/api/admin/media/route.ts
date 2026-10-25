import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/auth';
import { db } from '@/lib/server/db';
import { apiError, HttpError } from '@/lib/server/http';
import { MAX_IMAGE_SIZE, uploadImage } from '@/lib/server/storage';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(
      {
        images: await db.media.findMany({
          where: { projectId: null },
          select: { id: true, url: true, name: true },
          orderBy: { createdAt: 'desc' },
        }),
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    return apiError(error);
  }
}
export async function POST(request: Request) {
  try {
    await requireAdmin(request);
    if (
      Number(request.headers.get('content-length') || 0) >
      MAX_IMAGE_SIZE + 65536
    )
      throw new HttpError(413, 'Each image must be 4 MB or smaller.');
    const form = await request.formData();
    const image = await uploadImage(form.get('file'));
    return NextResponse.json({ image }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
