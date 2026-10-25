import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Project } from '../../src/type/front/project-data-type';
import { db } from '../../src/lib/server/db';
import { uploadImage, latestStorage } from '../../src/lib/server/storage';
import { saveProject, withImages } from '../../src/lib/server/projects';

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

/** Refresh one existing project, retaining publication settings and custom media. */
export async function syncExistingProject(
  definition: Project,
  options: {
    backupName: string;
    mediaPrefix: string;
    legacyImageUrls: string[];
  },
) {
  const current = await db.project.findUniqueOrThrow({
    where: { id: definition.id },
    include: withImages,
  });
  if (!(await latestStorage()))
    throw new Error('Configure R2 before syncing project images.');
  const backupDirectory = path.join(
    root,
    '.portfolio-backups',
    options.backupName,
  );
  await mkdir(backupDirectory, { recursive: true });
  await writeFile(
    path.join(backupDirectory, `project-before-sync-${Date.now()}.json`),
    JSON.stringify(current, null, 2),
  );
  const imageIds: string[] = [];
  for (const image of definition.images || []) {
    const bytes = await readFile(path.join(root, 'public', image.url));
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
    const name = path.basename(image.url).replace(/\.png$/, `-${hash}.png`);
    const reusable = await db.media.findFirst({
      where: {
        name,
        storageConfigId: { not: null },
        OR: [{ projectId: current.id }, { projectId: null }],
      },
    });
    const media =
      reusable ||
      (await uploadImage(
        new File([new Uint8Array(bytes)], name, { type: 'image/png' }),
      ));
    imageIds.push(media.id);
  }
  imageIds.push(
    ...current.images
      .filter(
        (image) =>
          !options.legacyImageUrls.includes(image.url) &&
          !image.name.startsWith(options.mediaPrefix),
      )
      .map((image) => image.id),
  );
  const serverLink =
    current.serverLink &&
    !/^https?:\/\/github\.com\/example\//i.test(current.serverLink)
      ? current.serverLink
      : '';
  return saveProject(
    {
      ...definition,
      imageIds,
      published: current.published,
      sortOrder: current.sortOrder,
      githubFrontendLink: current.githubFrontendLink || '',
      githubBackendLink: current.githubBackendLink || '',
      serverLink,
    },
    current.id,
  );
}
