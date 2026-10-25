import { expect, test } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({ datasourceUrl: process.env.TEST_DATABASE_URL });
const origin = 'http://localhost:3107';
test.afterAll(() => db.$disconnect());

test('new uploads and updates go first; pointer and keyboard reordering persist across homepage tabs', async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const endpoint = '/api/admin/projects/order';
  expect(
    (
      await request.put(endpoint, {
        headers: { Origin: origin },
        data: { ids: [] },
      })
    ).status(),
  ).toBe(401);
  const login = await page.request.post('/api/admin/login', {
    headers: { Origin: origin },
    data: {
      email: 'admin@portfolio.test',
      password: 'Portfolio-test-only-2026!',
    },
  });
  expect(login.ok()).toBe(true);
  const original = (
    await (await page.request.get('/api/admin/projects')).json()
  ).projects as { id: string }[];
  const originalIds = original.map((project) => project.id);
  const images = await Promise.all(
    ['one', 'two'].map((name) =>
      db.media.create({
        data: {
          name: `order-${name}-${Date.now()}.png`,
          url: '/images/project/portfolio.png',
        },
      }),
    ),
  );
  const ids: string[] = [];
  const payload = (index: number) => ({
    title: `Ordering fixture ${index}`,
    description: 'A published fixture to verify persistent portfolio ordering.',
    category: 'large',
    tags: [],
    features: [],
    imageIds: [images[index].id],
    published: true,
  });
  try {
    for (let index = 0; index < 2; index++) {
      const response = await page.request.post('/api/admin/projects', {
        headers: { Origin: origin },
        data: payload(index),
      });
      expect(response.status()).toBe(201);
      ids.push((await response.json()).project.id);
    }
    const publicIds = async () =>
      (
        (await (await request.get('/api/projects')).json()).projects as {
          id: string;
        }[]
      ).map((project) => project.id);
    expect((await publicIds()).slice(0, 2)).toEqual([ids[1], ids[0]]);
    expect(
      (
        await page.request.put(`/api/admin/projects/${ids[0]}`, {
          headers: { Origin: origin },
          data: payload(0),
        })
      ).ok(),
    ).toBe(true);
    expect((await publicIds()).slice(0, 2)).toEqual(ids);

    const allIds = [...ids, ...originalIds];
    expect(
      (
        await page.request.put(endpoint, {
          headers: { Origin: 'https://evil.test' },
          data: { ids: allIds },
        })
      ).status(),
    ).toBe(403);
    expect(
      (
        await page.request.put(endpoint, {
          headers: { Origin: origin },
          data: { ids: [ids[0], ids[0]] },
        })
      ).status(),
    ).toBe(400);
    expect(
      (
        await page.request.put(endpoint, {
          headers: { Origin: origin },
          data: { ids: allIds.slice(1) },
        })
      ).status(),
    ).toBe(409);
    expect((await publicIds()).slice(0, 2)).toEqual(ids);

    const beforeDates = await db.project.findMany({
      orderBy: { id: 'asc' },
      select: { id: true, updatedAt: true },
    });
    await page.goto('/admin');
    const rows = page.locator('.admin-project-table tbody tr');
    await expect(rows).toHaveCount(allIds.length);
    const firstHandle = rows
      .first()
      .getByRole('button', { name: 'Move Ordering fixture 0', exact: true });
    const secondHandle = rows
      .nth(1)
      .getByRole('button', { name: 'Move Ordering fixture 1', exact: true });
    await firstHandle.evaluate((element) => element.scrollIntoView({ block: 'center' }));
    const first = (await firstHandle.boundingBox())!;
    const second = (await secondHandle.boundingBox())!;
    const saved = page.waitForResponse(
      (response) =>
        response.url().endsWith(endpoint) &&
        response.request().method() === 'PUT',
    );
    await page.mouse.move(
      first.x + first.width / 2,
      first.y + first.height / 2,
    );
    await page.mouse.down();
    await page.mouse.move(
      second.x + second.width / 2,
      second.y + second.height / 2,
      { steps: 12 },
    );
    await page.mouse.up();
    expect((await saved).ok()).toBe(true);
    await expect(rows.first()).toHaveAttribute('data-project-id', ids[1]);
    expect((await publicIds()).slice(0, 2)).toEqual([ids[1], ids[0]]);
    expect(
      await db.project.findMany({
        orderBy: { id: 'asc' },
        select: { id: true, updatedAt: true },
      }),
    ).toEqual(beforeDates);

    await page.reload();
    await expect(rows.first()).toHaveAttribute('data-project-id', ids[1]);
    const handle = rows
      .first()
      .getByRole('button', { name: 'Move Ordering fixture 1', exact: true });
    await handle.focus();
    await page.keyboard.press('Space');
    await expect(handle).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('ArrowDown');
    await expect(
      page.locator('[role="status"][id^="DndLiveRegion"]'),
    ).toContainText(`over droppable area ${ids[0]}`);
    const keyboardSave = page.waitForResponse(
      (response) =>
        response.url().endsWith(endpoint) &&
        response.request().method() === 'PUT',
    );
    await page.keyboard.press('Space');
    expect((await keyboardSave).ok()).toBe(true);
    await expect(rows.first()).toHaveAttribute('data-project-id', ids[0]);

    await page
      .getByLabel('Search projects', { exact: true })
      .fill('Ordering fixture');
    await expect(
      rows
        .first()
        .getByRole('button', { name: 'Move Ordering fixture 0', exact: true }),
    ).toBeDisabled();
    await page.getByLabel('Search projects', { exact: true }).clear();
    await page.route(`**${endpoint}`, (route) =>
      route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Order could not be saved.' }),
      }),
    );
    await rows
      .first()
      .getByRole('button', { name: 'Move Ordering fixture 0', exact: true })
      .focus();
    await page.keyboard.press('Space');
    await expect(
      rows
        .first()
        .getByRole('button', { name: 'Move Ordering fixture 0', exact: true }),
    ).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('ArrowDown');
    await expect(
      page.locator('[role="status"][id^="DndLiveRegion"]'),
    ).toContainText(`over droppable area ${ids[1]}`);
    await page.keyboard.press('Space');
    await expect(
      page.getByText('Order could not be saved.', { exact: true }),
    ).toBeVisible();
    await expect(rows.first()).toHaveAttribute('data-project-id', ids[0]);
    expect((await publicIds()).slice(0, 2)).toEqual(ids);
    await page.unroute(`**${endpoint}`);

    await page.goto('/');
    await expect(page.locator('#project-grid article').first()).toHaveAttribute(
      'data-project-id',
      ids[0],
    );
    await page.getByRole('tab', { name: 'Large', exact: true }).click();
    await expect(page.locator('#project-grid article').first()).toHaveAttribute(
      'data-project-id',
      ids[0],
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/admin');
    await expect(rows.first()).toHaveAttribute('data-project-id', ids[0]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  } finally {
    await db.project.deleteMany({ where: { id: { in: ids } } });
    await db.media.deleteMany({
      where: { id: { in: images.map((image) => image.id) } },
    });
    await page.request.put(endpoint, {
      headers: { Origin: origin },
      data: { ids: originalIds },
    });
  }
});
