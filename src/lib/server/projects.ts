import 'server-only';
import { Prisma } from '@prisma/client';
import { db } from './db';
import { HttpError } from './http';
import { projectOrderSchema, projectSchema } from '../project-validation';
import type { Project } from '@/type/front/project-data-type';

export const withImages = {
  images: { orderBy: { sortOrder: 'asc' as const } },
};
export const projectOrder: Prisma.ProjectOrderByWithRelationInput[] = [
  { sortOrder: 'asc' },
  { createdAt: 'desc' },
  { id: 'asc' },
];
type StoredProject = Prisma.ProjectGetPayload<{ include: typeof withImages }>;

async function lockProjectOrder(tx: Prisma.TransactionClient) {
  // Serialize saves/reorders so a concurrent upload cannot lose its position.
  await tx.$queryRaw`SELECT pg_advisory_xact_lock(726451903)::text`;
}

export async function reorderProjects(body: unknown) {
  const { ids } = projectOrderSchema.parse(body);
  return db.$transaction(async (tx) => {
    await lockProjectOrder(tx);
    const current = await tx.project.findMany({ select: { id: true } });
    const known = new Set(current.map((project) => project.id));
    if (ids.length !== known.size || ids.some((id) => !known.has(id)))
      throw new HttpError(
        409,
        'The project collection changed. Reload and try again.',
      );
    if (ids.length) {
      const positions = ids.map(
        (id, index) => Prisma.sql`(${id}, ${index}::integer)`,
      );
      // Ordering is presentation data: keep the actual content update dates.
      await tx.$executeRaw`UPDATE "Project" AS project
        SET "sortOrder" = positions.position
        FROM (VALUES ${Prisma.join(positions)}) AS positions(id, position)
        WHERE project.id = positions.id`;
    }
    return (
      await tx.project.findMany({ orderBy: projectOrder, include: withImages })
    ).map(serializeProject);
  });
}

export async function deleteProject(id: string) {
  return db.$transaction(async (tx) => {
    await lockProjectOrder(tx);
    await tx.project.delete({ where: { id } });
  });
}

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

export async function saveProject(
  body: unknown,
  id?: string,
  options?: { createId?: string },
) {
  const { imageIds, ...data } = projectSchema.parse(body);
  return db.$transaction(async (tx) => {
    await lockProjectOrder(tx);
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
      ? await tx.project.update({
          where: { id },
          data: { ...data, sortOrder: 0 },
        })
      : await tx.project.create({
          // Import scripts can supply a stable ID; HTTP routes never pass it.
          data: { ...data, id: options?.createId, sortOrder: 0 },
        });
    // A new upload or content update goes first. Keep everyone else's relative order.
    await tx.$executeRaw`WITH positions AS (
      SELECT id, ROW_NUMBER() OVER (ORDER BY "sortOrder", "createdAt" DESC, id)::integer AS position
      FROM "Project" WHERE id <> ${project.id}
    ) UPDATE "Project" AS project SET "sortOrder" = positions.position
      FROM positions WHERE project.id = positions.id`;
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
