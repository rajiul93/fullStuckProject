import LandingPage from './home/landing-page';
import { db } from '@/lib/server/db';
import { serializeProject, withImages } from '@/lib/server/projects';

export const dynamic = 'force-dynamic';
export default async function HomePage() {
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: withImages,
    });
    return <LandingPage projects={projects.map(serializeProject)} />;
  } catch {
    return <LandingPage error />;
  }
}
