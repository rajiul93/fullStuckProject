import 'dotenv/config';
import { prepProject } from '../src/content/prep-project';
import { db } from '../src/lib/server/db';
import { syncExistingProject } from './lib/sync-existing-project';

syncExistingProject(prepProject, {
  backupName: 'prep',
  mediaPrefix: 'prep-',
  legacyImageUrls: [],
  createIfMissing: true,
})
  .then((project) =>
    console.log(
      JSON.stringify({
        project: project.title,
        category: project.category,
        images: project.images?.length,
        features: project.features.length,
        storage: 'Cloudflare R2',
        database: 'saved',
      }),
    ),
  )
  .catch((error: unknown) => {
    console.error(
      'Prep import failed:',
      error instanceof Error ? error.name : 'UnknownError',
    );
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
