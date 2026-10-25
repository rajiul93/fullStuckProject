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

/** Import or refresh one project, retaining publication settings and custom media. */
export async function syncExistingProject(
  definition: Project,
  options: {
    backupName: string;
    mediaPrefix: string;
    legacyImageUrls: string[];
    replaceExisting?: boolean;
    createIfMissing?: boolean;
  },
) {
  const hostname = (url?: string | null) => {
    try {
      return new URL(url || '').hostname.replace(/^www\./, '').toLowerCase();
    } catch {
      return '';
    }
  };
  const candidates = options.createIfMissing
    ? await db.project.findMany({ include: withImages })
    : [
        await db.project.findUniqueOrThrow({
          where: { id: definition.id },
          include: withImages,
        }),
      ];
  const targetHost = hostname(definition.clientLink);
  const matches = candidates.filter(
    (project) =>
      project.id === definition.id ||
      (targetHost && hostname(project.clientLink) === targetHost),
  );
  if (matches.length > 1)
    throw new Error('Multiple matching projects require review before import.');
  const current = matches[0];
  if (
    options.createIfMissing &&
    current &&
    hostname(current.clientLink) !== targetHost
  )
    throw new Error('Project ID belongs to a different website.');
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
    JSON.stringify(
      {
        project: current || null,
        order: candidates.map(({ id, sortOrder }) => ({ id, sortOrder })),
      },
      null,
      2,
    ),
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
        OR: [
          ...(current ? [{ projectId: current.id }] : []),
          { projectId: null },
        ],
      },
    });
    const media =
      reusable ||
      (await uploadImage(
        new File([new Uint8Array(bytes)], name, { type: 'image/png' }),
      ));
    imageIds.push(media.id);
  }
  if (!options.replaceExisting)
    imageIds.push(
      ...(current?.images || [])
        .filter(
          (image) =>
            !options.legacyImageUrls.includes(image.url) &&
            !image.name.startsWith(options.mediaPrefix),
        )
        .map((image) => image.id),
    );
  const serverLink =
    current?.serverLink &&
    !/^https?:\/\/github\.com\/example\//i.test(current.serverLink)
      ? current.serverLink
      : '';
  return saveProject(
    {
      ...definition,
      imageIds,
      published: current?.published ?? definition.published ?? true,
      githubFrontendLink: options.replaceExisting
        ? definition.githubFrontendLink || ''
        : current?.githubFrontendLink || definition.githubFrontendLink || '',
      githubBackendLink: options.replaceExisting
        ? definition.githubBackendLink || ''
        : current?.githubBackendLink || definition.githubBackendLink || '',
      serverLink: options.replaceExisting
        ? definition.serverLink || ''
        : serverLink,
    },
    current?.id,
    { createId: definition.id },
  );
}
