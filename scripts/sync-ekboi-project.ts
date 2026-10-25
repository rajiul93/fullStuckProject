import 'dotenv/config';
import { ekboiProject } from '../src/content/ekboi-project';
import { db } from '../src/lib/server/db';
import { syncExistingProject } from './lib/sync-existing-project';

syncExistingProject(ekboiProject, {
  backupName: 'ekboi',
  mediaPrefix: 'ekboi-',
  legacyImageUrls: ['/images/project/ecommerce-home.png'],
  replaceExisting: true,
})
  .then((project) =>
    console.log(
      JSON.stringify({
        title: project.title,
        category: project.category,
        images: project.images?.length,
        features: project.features.length,
        storage: 'Cloudflare R2',
        database: 'updated',
      }),
    ),
  )
  .catch((error: unknown) => {
    console.error(
      'Project sync failed:',
      error instanceof Error ? error.name : 'UnknownError',
    );
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
