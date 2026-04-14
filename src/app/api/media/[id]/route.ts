import { assertMediaMutationRole } from '@/lib/media-auth';
import { requireAuth } from '@/lib/require-auth';
import { MediaService } from '@/modules/media/media.service';
import { NextRequest, NextResponse } from 'next/server';
import { parseAltFromFormData } from '../_form-parse';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

/** GET /api/media/:id — public */
export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  try {
    const doc = await MediaService.getById(id);
    if (!doc) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    return NextResponse.json(doc);
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Invalid request' },
      { status: 400 },
    );
  }
}

/** PUT /api/media/:id — replace image (multipart) */
export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;

  const forbidden = assertMediaMutationRole(auth.payload);
  if (forbidden) return forbidden;

  const { id } = await context.params;

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

    const updated = await MediaService.updateFromBytes(
      id,
      {
        buffer,
        mimetype,
        originalname: imageField.name || 'upload',
        size: buffer.length,
      },
      altResult.alt,
    );
    if (!updated) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Update failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/** DELETE /api/media/:id */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (!auth.ok) return auth.response;

  const forbidden = assertMediaMutationRole(auth.payload);
  if (forbidden) return forbidden;

  const { id } = await context.params;
  try {
    const deleted = await MediaService.delete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Delete failed' },
      { status: 400 },
    );
  }
}
