import 'server-only';
import { Prisma } from '@prisma/client';
import { db } from './db';
import { HttpError } from './http';
import { projectSchema } from '../project-validation';
import type { Project } from '@/type/front/project-data-type';

export const withImages = {
  images: { orderBy: { sortOrder: 'asc' as const } },
};
type StoredProject = Prisma.ProjectGetPayload<{ include: typeof withImages }>;

export function serializeProject(project: StoredProject): Project {
  return {
    ...project,
    features: project.features as Project['features'],
    image: project.images[0]?.url || '',
    images: project.images.map(({ id, url, name }) => ({ id, url, name })),
    githubFrontendLink: project.githubFrontendLink ?? undefined,
    githubBackendLink: project.githubBackendLink ?? undefined,
    clientLink: project.clientLink ?? undefined,
    serverLink: project.serverLink ?? undefined,
  };
}

export async function saveProject(body: unknown, id?: string) {
  const { imageIds, ...data } = projectSchema.parse(body);
  return db.$transaction(async (tx) => {
    if (id && !(await tx.project.findUnique({ where: { id } })))
      throw new HttpError(404, 'Project not found.');
    // Lock selected media so concurrent saves cannot claim the same upload.
    await tx.$queryRaw`SELECT id FROM "Media" WHERE id IN (${Prisma.join(imageIds)}) FOR UPDATE`;
    const images = await tx.media.findMany({ where: { id: { in: imageIds } } });
    if (
      images.length !== imageIds.length ||
      images.some((image) => image.projectId && image.projectId !== id)
    ) {
      throw new HttpError(
        400,
        'Some selected images are unavailable. Reload and try again.',
      );
    }
    const project = id
      ? await tx.project.update({ where: { id }, data })
      : await tx.project.create({ data });
    await tx.media.updateMany({
      where: { projectId: project.id, id: { notIn: imageIds } },
      data: { projectId: null },
    });
    for (const [sortOrder, imageId] of imageIds.entries()) {
      await tx.media.update({
        where: { id: imageId },
        data: { projectId: project.id, sortOrder },
      });
    }
    return serializeProject(
      await tx.project.findUniqueOrThrow({
        where: { id: project.id },
        include: withImages,
      }),
    );
  });
}
