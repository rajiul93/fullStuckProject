import { assertMediaMutationRole } from '@/lib/media-auth';
import { requireAuth } from '@/lib/require-auth';
import { MediaService } from '@/modules/media/media.service';
import { NextRequest, NextResponse } from 'next/server';
import { parseAltFromFormData } from './_form-parse';

export const runtime = 'nodejs';

/** GET /api/media — list (public) */
export async function GET(request: NextRequest) {
  try {
    const result = await MediaService.list(request.url);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 },
    );
  }
}

/** POST /api/media — upload (`multipart/form-data`, Web Request API) */
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;

  const forbidden = assertMediaMutationRole(auth.payload);
  if (forbidden) return forbidden;

  const ct = request.headers.get('content-type');
  if (!ct?.includes('multipart/form-data')) {
    return NextResponse.json(
      { error: 'Bad Request', message: 'Expected multipart form data' },
      { status: 400 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: 'Bad Request', message: 'Invalid multipart body' },
      { status: 400 },
    );
  }

  const imageField = formData.get('image');
  if (!(imageField instanceof File)) {
    return NextResponse.json(
      { error: 'Bad Request', message: 'Image file is required (field: image)' },
      { status: 400 },
    );
  }

  const altResult = parseAltFromFormData(formData);
  if (!altResult.ok) {
    return NextResponse.json({ error: altResult.issues }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await imageField.arrayBuffer());
    const mimetype =
      imageField.type && imageField.type !== ''
        ? imageField.type
        : 'application/octet-stream';

    const created = await MediaService.uploadFromBytes(
      {
        buffer,
        mimetype,
        originalname: imageField.name || 'upload',
        size: buffer.length,
      },
      altResult.alt,
    );
    return NextResponse.json(created, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
