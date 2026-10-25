import 'dotenv/config';
import { Prisma } from '@prisma/client';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dreamTourismProjects } from '../src/content/dream-tourism-projects';
import { projectSchema } from '../src/lib/project-validation';
import { db } from '../src/lib/server/db';
import { saveProject, withImages } from '../src/lib/server/projects';
import { latestStorage, uploadImage } from '../src/lib/server/storage';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function hostname(url?: string | null) {
  try {
    return new URL(url || '').hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

async function main() {
  try {
    if (!(await latestStorage()))
      throw new Error('Configure R2 before importing project images.');
    const projects = await db.project.findMany({ include: withImages });
    let lastOrder = Math.max(
      -1,
      ...projects.map((project) => project.sortOrder),
    );
    const affected = projects.filter((project) =>
      dreamTourismProjects.some(
        (definition) =>
          definition.id === project.id ||
          hostname(definition.clientLink) === hostname(project.clientLink),
      ),
    );
    await mkdir(path.join(root, '.portfolio-backups/dream-projects'), {
      recursive: true,
    });
    await writeFile(
      path.join(
        root,
        `.portfolio-backups/dream-projects/projects-before-sync-${Date.now()}.json`,
      ),
      JSON.stringify(affected, null, 2),
    );

    for (const definition of dreamTourismProjects) {
      const matches = projects.filter(
        (project) =>
          project.id === definition.id ||
          hostname(project.clientLink) === hostname(definition.clientLink),
      );
      if (matches.length > 1)
        throw new Error(
          'Multiple matching projects require review before import.',
        );
      const current = matches[0];
      if (
        current &&
        hostname(current.clientLink) !== hostname(definition.clientLink)
      )
        throw new Error('Project ID belongs to a different website.');
      const imageIds: string[] = [];
      for (const image of definition.images || []) {
        const bytes = await readFile(path.join(root, 'public', image.url));
        const hash = createHash('sha256')
          .update(bytes)
          .digest('hex')
          .slice(0, 12);
        const name = path.basename(image.url).replace('.png', `-${hash}.png`);
        const reusable = await db.media.findFirst({
          where: {
            name,
            storageConfigId: { not: null },
            OR: [
              { projectId: null },
              ...(current ? [{ projectId: current.id }] : []),
            ],
          },
        });
        const uploaded =
          reusable ||
          (await uploadImage(
            new File([new Uint8Array(bytes)], name, { type: 'image/png' }),
          ));
        imageIds.push(uploaded.id);
      }
      imageIds.push(
        ...(current?.images || [])
          .filter((image) => !image.name.startsWith(`${definition.id}-`))
          .map((image) => image.id),
      );
      const payload = {
        ...definition,
        imageIds,
        category: 'medium',
        published: current?.published ?? true,
        sortOrder: current?.sortOrder ?? ++lastOrder,
        githubFrontendLink: current?.githubFrontendLink || '',
        githubBackendLink: current?.githubBackendLink || '',
        serverLink: current?.serverLink || '',
      };
      if (current) {
        await saveProject(payload, current.id);
      } else {
        const { imageIds: selected, ...data } = projectSchema.parse(payload);
        // Claim the newly uploaded images atomically with the new project. Stable
        // IDs also make future seeds/imports safe to run without duplicate rows.
        await db.$transaction(async (tx) => {
          await tx.$queryRaw`SELECT id FROM "Media" WHERE id IN (${Prisma.join(selected)}) FOR UPDATE`;
          const media = await tx.media.findMany({
            where: { id: { in: selected } },
          });
          if (
            media.length !== selected.length ||
            media.some((image) => image.projectId)
          )
            throw new Error('One of the selected uploads is already in use.');
          for (const [sortOrder, id] of selected.entries())
            await tx.media.update({ where: { id }, data: { sortOrder } });
          await tx.project.create({
            data: {
              ...data,
              id: definition.id,
              images: { connect: selected.map((id) => ({ id })) },
            },
          });
        });
      }
      console.log(
        JSON.stringify({
          project: definition.title,
          category: 'medium',
          images: imageIds.length,
          action: current ? 'updated' : 'created',
          storage: 'Cloudflare R2',
        }),
      );
    }
  } catch (error) {
    console.error(
      'Dream projects sync failed:',
      error instanceof Error ? error.name : 'Unknown error',
    );
    process.exitCode = 1;
  } finally {
    await db.$disconnect();
  }
}
void main();
