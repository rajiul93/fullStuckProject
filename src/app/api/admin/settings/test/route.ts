import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/auth';
import { apiError, HttpError } from '@/lib/server/http';
import { prepareStorage, testStorage } from '@/lib/server/storage';

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
    const config = await prepareStorage(await request.json());
    try {
      await testStorage({ ...config, id: 'test', createdAt: new Date() });
    } catch {
      throw new HttpError(
        400,
        'R2 connection test failed. Check the account ID, bucket, credentials and Object Read & Write permissions.',
      );
    }
    return NextResponse.json({
      success: true,
      message: 'R2 connection and upload/delete permissions verified.',
    });
  } catch (error) {
    return apiError(error);
  }
}
