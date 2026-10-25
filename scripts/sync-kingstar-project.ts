import 'dotenv/config';
import { kingstarProject } from '../src/content/kingstar-project';
import { db } from '../src/lib/server/db';
import { syncExistingProject } from './lib/sync-existing-project';

async function main() {
  try {
    const project = await syncExistingProject(kingstarProject, {
      backupName: 'kingstar',
      mediaPrefix: 'kingstar-travel-',
      legacyImageUrls: ['/images/project/ota.png'],
    });
    console.log(
      JSON.stringify({
        title: project.title,
        images: project.images?.length,
        features: project.features.length,
        storage: 'Cloudflare R2',
        database: 'updated',
      }),
    );
  } catch (error) {
    console.error(
      'Kingstar sync failed:',
      error instanceof Error ? error.name : 'Unknown error',
    );
    process.exitCode = 1;
  } finally {
    await db.$disconnect();
  }
}
void main();
