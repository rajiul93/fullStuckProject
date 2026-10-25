import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
import { createDecipheriv } from 'node:crypto';

const db = new PrismaClient({ datasourceUrl: process.env.TEST_DATABASE_URL });
const origin = 'http://localhost:3107';
test.afterAll(async () => {
  await db.$disconnect();
});

test('protected admin, encrypted settings, project editing, public galleries and media ownership', async ({
  page,
  request,
}) => {
  const suffix = Date.now().toString();
  const title = `Browser portfolio ${suffix}`;
  const images = await Promise.all([
    db.media.create({
      data: {
        url: '/images/project/portfolio.png',
        name: `first-${suffix}.png`,
      },
    }),
    db.media.create({
      data: { url: '/images/project/agency.png', name: `second-${suffix}.png` },
    }),
  ]);
  let projectId: string | undefined;
  try {
    expect((await request.get('/api/admin/projects')).status()).toBe(401);
    expect((await request.get('/api/admin/settings')).status()).toBe(401);
    expect((await request.get('/api/admin/media')).status()).toBe(401);
    expect(
      (
        await request.post('/api/admin/projects', {
          headers: { Origin: origin },
          data: {},
        })
      ).status(),
    ).toBe(401);
    expect(
      (
        await request.post('/api/admin/login', {
          headers: { Origin: 'https://evil.test' },
          data: {
            email: 'admin@portfolio.test',
            password: 'Portfolio-test-only-2026!',
          },
        })
      ).status(),
    ).toBe(403);
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin\/login$/);
    await page
      .getByLabel('Email', { exact: true })
      .fill('admin@portfolio.test');
    await page
      .getByLabel('Password', { exact: true })
      .fill('incorrect-password');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(
      page.getByText('Incorrect email or password.', { exact: true }),
    ).toBeVisible();
    await page
      .getByLabel('Password', { exact: true })
      .fill('Portfolio-test-only-2026!');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(
      page.getByRole('heading', { name: 'Projects', exact: true }),
    ).toBeVisible();
    const cookie = (await page.context().cookies()).find(
      (item) => item.name === 'portfolio_admin',
    );
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.sameSite).toBe('Lax');
    const session = await db.session.findFirst({
      where: { admin: { email: 'admin@portfolio.test' } },
    });
    expect(session?.tokenHash).not.toBe(cookie?.value);

    await page.getByRole('link', { name: 'Settings', exact: true }).click();
    await page.getByLabel('Cloudflare account ID').fill('b'.repeat(32));
    await page
      .getByLabel('Bucket name', { exact: true })
      .fill('portfolio-test-bucket');
    await page
      .getByLabel('Public bucket URL / custom domain')
      .fill('https://images.example.com');
    await page
      .getByLabel('Access key ID', { exact: true })
      .fill('test-access-key');
    await page
      .getByLabel('Secret access key', { exact: true })
      .fill('test-secret-value');
    await page
      .getByRole('button', { name: 'Save settings', exact: true })
      .click();
    await expect(
      page.getByText('R2 settings saved.', { exact: true }),
    ).toBeVisible();
    const config = await db.storageConfig.findFirstOrThrow({
      orderBy: { createdAt: 'desc' },
    });
    expect(config.secretAccessKey).not.toContain('test-secret-value');
    const [iv, tag, encrypted] = config.secretAccessKey
      .split('.')
      .map((value) => Buffer.from(value, 'base64'));
    const decipher = createDecipheriv(
      'aes-256-gcm',
      Buffer.from('a'.repeat(64), 'hex'),
      iv,
    );
    decipher.setAuthTag(tag);
    expect(
      Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(),
    ).toBe('test-secret-value');
    const safeSettings = await (
      await page.request.get('/api/admin/settings')
    ).text();
    expect(safeSettings).not.toContain('test-secret-value');
    expect(safeSettings).not.toContain('test-access-key');
    await page
      .getByLabel('Bucket name', { exact: true })
      .fill('portfolio-test-updated');
    const settingsResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith('/api/admin/settings') &&
        response.request().method() === 'PUT',
    );
    await page
      .getByRole('button', { name: 'Save settings', exact: true })
      .click();
    expect((await settingsResponse).status()).toBe(200);
    const updated = await db.storageConfig.findFirstOrThrow({
      orderBy: { createdAt: 'desc' },
    });
    expect(updated.secretAccessKey).toBe(config.secretAccessKey);

    await page.getByRole('link', { name: 'Projects', exact: true }).click();
    await page
      .getByRole('button', { name: 'Add project', exact: true })
      .click();
    await page.getByLabel('Project title', { exact: true }).fill(title);
    await page
      .getByLabel('Description', { exact: true })
      .fill('A dynamic project with multiple images and editable features.');
    await page
      .getByLabel('Technologies (comma separated)')
      .fill('Next.js, Prisma, PostgreSQL');
    await page
      .getByRole('button', { name: 'Add feature', exact: true })
      .click();
    await page
      .getByLabel('Feature 1 title', { exact: true })
      .fill('Image gallery');
    await page
      .getByLabel('Feature 1 description', { exact: true })
      .fill('Ordered images with cover selection.');
    await page.getByText('Choose from unused uploads', { exact: true }).click();
    for (const image of images)
      await page
        .getByRole('button', { name: `Use ${image.name}`, exact: true })
        .click();
    await page
      .getByRole('button', { name: 'Move image 2 earlier', exact: true })
      .click();
    await page.getByLabel('Published — show on portfolio').uncheck();
    await page
      .getByRole('button', { name: 'Save project', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: title, exact: true }),
    ).toBeVisible();
    await page.screenshot({ path: 'test-results/admin-projects.png' });
    const stored = await db.project.findFirstOrThrow({
      where: { title },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
    projectId = stored.id;
    expect(stored.images.map((image) => image.id)).toEqual(
      images.map((image) => image.id).reverse(),
    );
    expect(
      (await (await request.get('/api/projects')).json()).projects.some(
        (project: { id: string }) => project.id === projectId,
      ),
    ).toBe(false);
    const projectCard = page
      .getByRole('row')
      .filter({ has: page.getByRole('heading', { name: title, exact: true }) });
    await projectCard
      .getByRole('button', { name: 'Edit', exact: true })
      .click();
    await page.getByLabel('Published — show on portfolio').check();
    await page
      .getByRole('button', { name: 'Save project', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: title, exact: true }),
    ).toBeVisible();
    const payload = {
      title,
      description: stored.description,
      category: 'personal',
      tags: [],
      features: [],
      imageIds: images.map((image) => image.id),
      published: true,
      sortOrder: 0,
    };
    expect(
      (
        await page.request.post('/api/admin/projects', {
          headers: { Origin: origin },
          data: payload,
        })
      ).status(),
    ).toBe(400);
    expect(
      (
        await page.request.put(`/api/admin/projects/${projectId}`, {
          headers: { Origin: origin },
          data: { ...payload, clientLink: 'javascript:alert(1)' },
        })
      ).status(),
    ).toBe(400);
    expect(
      (
        await page.request.put(`/api/admin/projects/${projectId}`, {
          headers: { Origin: origin },
          data: { ...payload, imageIds: [images[0].id, images[0].id] },
        })
      ).status(),
    ).toBe(400);
    expect(
      (
        await page.request.delete(`/api/admin/media/${images[0].id}`, {
          headers: { Origin: origin },
        })
      ).status(),
    ).toBe(409);
    expect(
      (
        await page.request.post('/api/admin/media', {
          headers: { Origin: origin },
          multipart: {
            file: {
              name: 'fake.png',
              mimeType: 'image/png',
              buffer: Buffer.from('not-an-image'),
            },
          },
        })
      ).status(),
    ).toBe(400);
    expect(
      (
        await page.request.delete(`/api/admin/projects/${projectId}`, {
          headers: { Origin: 'https://evil.test' },
        })
      ).status(),
    ).toBe(403);

    await page.goto('/');
    const publicCard = page
      .getByRole('article')
      .filter({ has: page.getByRole('heading', { name: title, exact: true }) });
    await expect(publicCard).toBeVisible();
    await expect(publicCard.getByRole('img')).toHaveAttribute(
      'src',
      /agency.png/,
    );
    await publicCard
      .getByRole('button', { name: 'Next image', exact: true })
      .click();
    await expect(publicCard.getByRole('img')).toHaveAttribute(
      'src',
      /portfolio.png/,
    );
    await expect(publicCard.locator('..')).toHaveCSS('opacity', '1');
    await expect(publicCard.getByRole('img')).toHaveCSS('opacity', '1');
    await publicCard.getByRole('img').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'test-results/public-projects.png' });
    await publicCard
      .getByRole('button', { name: `View ${title} details`, exact: true })
      .click();
    const dialog = page.getByRole('dialog');
    await expect(
      dialog.getByText('Ordered images with cover selection.'),
    ).toBeVisible();
    await expect(
      dialog.getByRole('button', { name: 'Next image', exact: true }),
    ).toBeVisible();
    await dialog
      .getByRole('button', { name: 'Close', exact: true })
      .first()
      .click();

    await page.goto('/admin');
    page.once('dialog', (dialog) => dialog.accept());
    await page
      .getByRole('row')
      .filter({ has: page.getByRole('heading', { name: title, exact: true }) })
      .getByRole('button', { name: 'Delete', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: title, exact: true }),
    ).toHaveCount(0);
    expect(
      await db.media.count({
        where: { id: { in: images.map((image) => image.id) }, projectId: null },
      }),
    ).toBe(2);
    const unusedSection = page
      .getByRole('heading', { name: /Unused uploads/ })
      .locator('..');
    page.once('dialog', (dialog) => dialog.accept());
    await unusedSection
      .getByText(images[0].name, { exact: true })
      .locator('..')
      .getByRole('button', { name: 'Delete permanently' })
      .click();
    await expect(
      unusedSection.getByText(images[0].name, { exact: true }),
    ).toHaveCount(0);
    await page.getByRole('button', { name: 'Sign out', exact: true }).click();
    await expect(page).toHaveURL(/\/admin\/login$/);
    expect((await page.request.get('/api/admin/projects')).status()).toBe(401);
  } finally {
    if (projectId) await db.project.deleteMany({ where: { id: projectId } });
    await db.media.deleteMany({
      where: { id: { in: images.map((image) => image.id) } },
    });
  }
});

test('concurrent saves cannot claim the same uploaded image', async ({
  request,
}) => {
  const login = await request.post('/api/admin/login', {
    headers: { Origin: origin },
    data: {
      email: 'admin@portfolio.test',
      password: 'Portfolio-test-only-2026!',
    },
  });
  expect(login.ok()).toBe(true);
  const image = await db.media.create({
    data: { url: '/images/project/portfolio.png', name: 'concurrent-test.png' },
  });
  const payload = {
    title: 'Concurrent project',
    description: 'A concurrency test for exclusive image ownership.',
    category: 'personal',
    tags: [],
    features: [],
    imageIds: [image.id],
    published: false,
    sortOrder: 0,
  };
  try {
    const responses = await Promise.all(
      [0, 1].map(() =>
        request.post('/api/admin/projects', {
          headers: { Origin: origin },
          data: payload,
        }),
      ),
    );
    expect(responses.map((response) => response.status()).sort()).toEqual([
      201, 400,
    ]);
  } finally {
    const stored = await db.media.findUnique({ where: { id: image.id } });
    if (stored?.projectId)
      await db.project.delete({ where: { id: stored.projectId } });
    await db.media.delete({ where: { id: image.id } });
  }
});
