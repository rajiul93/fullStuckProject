import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { projectsData } from '../src/projectData';

const db = new PrismaClient();
async function main() {
  const email = z.email().parse(process.env.ADMIN_EMAIL).toLowerCase();
  const password = z.string().min(12).max(72).parse(process.env.ADMIN_PASSWORD);
  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await db.admin.upsert({
    where: { email },
    create: { email, passwordHash },
    update: { passwordHash },
  });
  await db.session.deleteMany({ where: { adminId: admin.id } });
  for (const [sortOrder, project] of projectsData.entries()) {
    const { id, image, images: gallery, ...data } = project;
    // Existing records are never overwritten when the seed is run again.
    await db.project.upsert({
      where: { id },
      update: {},
      create: {
        ...data,
        id,
        sortOrder,
        images: {
          create: gallery?.length
            ? gallery.map(({ url, name }, sortOrder) => ({
                url,
                name,
                sortOrder,
              }))
            : [
                {
                  url: image,
                  name: image.split('/').pop() || project.title,
                  sortOrder: 0,
                },
              ],
        },
      },
    });
  }
  console.log(
    `Admin ready. Imported ${projectsData.length} existing projects (existing records preserved).`,
  );
}
main()
  .catch((error: unknown) => {
    console.error(
      'Seed failed:',
      error instanceof z.ZodError
        ? error.issues.map((issue) => issue.message).join('; ')
        : error instanceof Error
          ? error.name
          : 'Unknown error',
    );
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
