import 'server-only';
import { revalidatePath } from 'next/cache';

// Public project pages are cached (ISR); call after any admin change so visitors see it immediately.
export function revalidatePublicProjects() {
  revalidatePath('/');
  revalidatePath('/api/projects');
}
