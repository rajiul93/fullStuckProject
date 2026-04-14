import { mediaAltSchema } from '@/modules/media/media.validation';

export function parseAltFromFormData(formData: FormData) {
  const raw = formData.get('alt');
  let alt: string | undefined;
  if (raw == null || raw === '') alt = undefined;
  else if (typeof raw === 'string') alt = raw;
  else alt = undefined;

  const parsed = mediaAltSchema.safeParse({ alt });
  if (!parsed.success) {
    return { ok: false as const, issues: parsed.error.flatten() };
  }
  return { ok: true as const, alt: parsed.data.alt };
}
