import 'dotenv/config';
import { aplintoProject } from '../src/content/aplinto-project';
import { db } from '../src/lib/server/db';
import { projectSchema } from '../src/lib/project-validation';

// Saves Aplinto as an unpublished draft without images. saveProject() requires at
// least one image, so this writes the text fields directly; the owner then uploads
// images and publishes from the admin panel, which goes through saveProject().
// Re-running updates the text only and keeps images, publish state and position.
async function main() {
  // Same validation as the admin form, minus the image requirement.
  const data = projectSchema
    .omit({ imageIds: true, published: true })
    .parse(aplintoProject);

  const existing = await db.project.findUnique({
    where: { id: aplintoProject.id },
    include: { images: true },
  });
  const project = existing
    ? await db.project.update({ where: { id: existing.id }, data })
    : await db.project.create({
        data: { ...data, id: aplintoProject.id, published: false },
      });

  console.log(
    JSON.stringify({
      project: project.title,
      action: existing ? 'updated' : 'created',
      published: project.published,
      images: existing?.images.length ?? 0,
      features: aplintoProject.features.length,
    }),
  );
}

main()
  .catch((error: unknown) => {
    console.error(
      'Aplinto import failed:',
      error instanceof Error ? error.message : 'UnknownError',
    );
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
