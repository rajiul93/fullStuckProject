import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/auth';
import { db } from '@/lib/server/db';
import { apiError } from '@/lib/server/http';
import { latestStorage, prepareStorage } from '@/lib/server/storage';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await requireAdmin();
    const settings = await latestStorage();
    return NextResponse.json(
      {
        settings: settings
          ? {
              accountId: settings.accountId,
              bucket: settings.bucket,
              publicUrl: settings.publicUrl,
              hasCredentials: true,
            }
          : null,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    return apiError(error);
  }
}
export async function PUT(request: Request) {
  try {
    await requireAdmin(request);
    const data = await prepareStorage(await request.json());
    await db.storageConfig.create({ data });
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
