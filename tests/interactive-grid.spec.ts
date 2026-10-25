import { expect, test, type Page } from '@playwright/test';

declare global {
  interface Window {
    __gridFrames: number;
    __gridHidden: boolean;
  }
}

async function instrument(page: Page) {
  await page.addInitScript(() => {
    window.__gridFrames = 0;
    window.__gridHidden = false;
    const clear = CanvasRenderingContext2D.prototype.clearRect;
    CanvasRenderingContext2D.prototype.clearRect = function (...args) {
      if (this.canvas.hasAttribute('data-grid-canvas')) window.__gridFrames++;
      return clear.apply(this, args);
    };
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get: () => window.__gridHidden,
    });
  });
}

async function ready(page: Page) {
  await page.goto('/');
  await expect(page.locator('.portfolio-grid-background')).toHaveAttribute(
    'data-renderer',
    'canvas',
  );
  await expect
    .poll(() => page.evaluate(() => window.__gridFrames))
    .toBeGreaterThan(0);
}

async function idle(page: Page) {
  await expect
    .poll(
      async () => {
        const before = await page.evaluate(() => window.__gridFrames);
        await page.waitForTimeout(200);
        return (await page.evaluate(() => window.__gridFrames)) - before;
      },
      { timeout: 6000 },
    )
    .toBe(0);
}

async function moveAcross(page: Page) {
  await page.mouse.move(220, 200);
  await page.mouse.move(780, 420, { steps: 24 });
}

test('grid animates traveling waves, restores its static pixels and stops drawing while idle', async ({
  page,
}) => {
  await instrument(page);
  await ready(page);
  const layer = page.locator('.portfolio-grid-background');
  await expect(layer).toHaveAttribute('data-grid-mode', 'interactive');
  await expect(layer).toHaveCSS('pointer-events', 'none');
  await expect(layer).toHaveAttribute('aria-hidden', 'true');
  await expect(layer.locator('canvas')).toHaveCount(1);
  await idle(page);
  const staticImage = await layer
    .locator('canvas')
    .evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  const frames = await page.evaluate(() => window.__gridFrames);
  await moveAcross(page);
  await expect
    .poll(() => page.evaluate(() => window.__gridFrames))
    .toBeGreaterThan(frames + 3);
  const movingImage = await layer
    .locator('canvas')
    .evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  expect(movingImage !== staticImage).toBe(true);
  await idle(page);
  const finalImage = await layer
    .locator('canvas')
    .evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  expect(finalImage === staticImage).toBe(true);
  const settledFrames = await page.evaluate(() => window.__gridFrames);
  await page.waitForTimeout(350);
  expect(await page.evaluate(() => window.__gridFrames)).toBe(settledFrames);
});

test('pointer bursts are throttled, hidden pages pause and visible pages resume', async ({
  page,
}) => {
  await instrument(page);
  await ready(page);
  await idle(page);
  await page.evaluate(() => {
    for (let index = 0; index < 250; index++)
      window.dispatchEvent(
        new PointerEvent('pointermove', {
          pointerType: 'mouse',
          clientX: 240 + index,
          clientY: 240 + (index % 40),
        }),
      );
  });
  const before = await page.evaluate(() => window.__gridFrames);
  await expect
    .poll(() => page.evaluate(() => window.__gridFrames))
    .toBeGreaterThan(before + 2);
  await page.evaluate(() => {
    window.__gridHidden = true;
    document.dispatchEvent(new Event('visibilitychange'));
  });
  const hiddenFrames = await page.evaluate(() => window.__gridFrames);
  await page.waitForTimeout(250);
  expect(await page.evaluate(() => window.__gridFrames)).toBe(hiddenFrames);
  await page.evaluate(() => {
    window.__gridHidden = false;
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect
    .poll(() => page.evaluate(() => window.__gridFrames))
    .toBeGreaterThan(hiddenFrames);
  await idle(page);
});

test('the viewport pattern stays fixed during scrolling, resizes and never blocks controls', async ({
  page,
}) => {
  await instrument(page);
  await ready(page);
  await idle(page);
  const canvas = page.locator('[data-grid-canvas]');
  const before = await canvas.evaluate((element: HTMLCanvasElement) =>
    element.toDataURL(),
  );
  await page.evaluate(() =>
    window.scrollTo({ top: 1600, behavior: 'instant' }),
  );
  await expect(page.locator('.portfolio-grid-background')).toHaveCSS(
    'position',
    'fixed',
  );
  expect((await canvas.boundingBox())?.y).toBe(0);
  expect(
    (await canvas.evaluate((element: HTMLCanvasElement) =>
      element.toDataURL(),
    )) === before,
  ).toBe(true);
  await page.setViewportSize({ width: 980, height: 720 });
  await expect
    .poll(() => canvas.evaluate((element: HTMLCanvasElement) => element.width))
    .toBe(980);
  await expect
    .poll(() => canvas.evaluate((element: HTMLCanvasElement) => element.height))
    .toBe(720);
  await page.getByRole('tab', { name: 'Personal', exact: true }).click();
  await expect(page.locator('#project-grid article')).toHaveCount(4);
  const details = page
    .locator('#project-grid')
    .getByRole('button', {
      name: 'View Portfolio Website details',
      exact: true,
    });
  await details.click();
  await expect(
    page.getByRole('dialog', { name: 'Portfolio Website', exact: true }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(details).toBeFocused();
  await page.getByLabel('Your name', { exact: true }).fill('Background check');
  await expect(page.getByLabel('Your name', { exact: true })).toHaveValue(
    'Background check',
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test('reduced-motion preference changes immediately settle the grid', async ({
  page,
}) => {
  await instrument(page);
  await ready(page);
  await moveAcross(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.portfolio-grid-background')).toHaveAttribute(
    'data-grid-mode',
    'static',
  );
  await idle(page);
  const frames = await page.evaluate(() => window.__gridFrames);
  await moveAcross(page);
  await page.waitForTimeout(250);
  expect(await page.evaluate(() => window.__gridFrames)).toBe(frames);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('.portfolio-grid-background')).toHaveAttribute(
    'data-grid-mode',
    'interactive',
  );
  await idle(page);
});

test('touch devices use a static grid and the drawing buffer caps high pixel ratios', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();
  try {
    await instrument(page);
    await ready(page);
    await expect(page.locator('.portfolio-grid-background')).toHaveAttribute(
      'data-grid-mode',
      'static',
    );
    const width = await page
      .locator('[data-grid-canvas]')
      .evaluate((element: HTMLCanvasElement) => element.width);
    expect(width).toBe(585);
    await idle(page);
    const frames = await page.evaluate(() => window.__gridFrames);
    await page.mouse.move(100, 150);
    await page.mouse.move(300, 300, { steps: 10 });
    await page.waitForTimeout(250);
    expect(await page.evaluate(() => window.__gridFrames)).toBe(frames);
    await page
      .getByRole('button', { name: 'Open navigation', exact: true })
      .tap();
    await expect(
      page.getByRole('navigation', { name: 'Mobile navigation' }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});

test('a CSS grid remains available when Canvas cannot initialize', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof getContext>
    ) {
      return this.hasAttribute('data-grid-canvas')
        ? null
        : getContext.apply(this, args);
    } as typeof getContext;
  });
  await page.goto('/');
  const layer = page.locator('.portfolio-grid-background');
  await expect(layer).toHaveAttribute('data-grid-mode', 'static');
  expect(
    await layer.evaluate(
      (element) => getComputedStyle(element).backgroundImage,
    ),
  ).toContain('radial-gradient');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('tab', { name: 'Large', exact: true }).click();
  await expect(page.locator('#project-grid article')).toHaveCount(3);
});
