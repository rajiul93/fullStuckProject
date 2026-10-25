import 'dotenv/config';
import { ezybussProject } from '../src/content/ezybuss-project';
import { db } from '../src/lib/server/db';
import { syncExistingProject } from './lib/sync-existing-project';

async function main() {
  try {
    const project = await syncExistingProject(ezybussProject, {
      backupName: 'ezybuss',
      mediaPrefix: 'ezybuss-',
      legacyImageUrls: ['/images/project/saas.png'],
    });
    console.log(
      JSON.stringify({
        title: project.title,
        category: project.category,
        images: project.images?.length,
        features: project.features.length,
        storage: 'Cloudflare R2',
        database: 'updated',
      }),
    );
  } catch (error) {
    console.error(
      'EzyBuss sync failed:',
      error instanceof Error ? error.name : 'Unknown error',
    );
    process.exitCode = 1;
  } finally {
    await db.$disconnect();
  }
}
void main();
