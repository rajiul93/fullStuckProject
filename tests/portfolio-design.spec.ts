import { expect, test, type Page } from '@playwright/test';

async function openPortfolio(page: Page) {
  await page.goto('/');
  await expect(page.locator('#project-grid article').first()).toBeVisible();
}

test('homepage preserves real projects, section order, every filter and same-page navigation', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const projects = (await (await request.get('/api/projects')).json())
    .projects as { id: string; title: string; category: string }[];
  await openPortfolio(page);
  await expect(page.locator('#project-grid article')).toHaveCount(
    projects.length,
  );
  expect(
    await page
      .locator('#main-content > section')
      .evaluateAll((sections) => sections.map((section) => section.id)),
  ).toEqual([
    'home',
    'selected-work',
    'projects',
    'about',
    'experience',
    'blog',
    'contact',
  ]);
  await expect(page.locator('#selected-work article')).toHaveCount(3);
  for (const category of ['personal', 'small', 'medium', 'large', 'all']) {
    await page
      .getByRole('tab', {
        name: category.charAt(0).toUpperCase() + category.slice(1),
        exact: true,
      })
      .click();
    await expect(page.locator('#project-grid article')).toHaveCount(
      category === 'all'
        ? projects.length
        : projects.filter((project) => project.category === category).length,
    );
    if (category !== 'all')
      expect(
        await page
          .locator('#project-grid article')
          .evaluateAll(
            (cards, expectedCategory) =>
              cards.every(
                (card) =>
                  card.getAttribute('data-category') === expectedCategory,
              ),
            category,
          ),
      ).toBe(true);
  }
  const all = page.getByRole('tab', { name: 'All', exact: true });
  await all.focus();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('tab', { name: 'Personal', exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole('tab', { name: 'Personal', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(
    page.getByRole('tab', { name: 'Large', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Home');
  await expect(all).toBeFocused();
  await expect(page.locator('#project-grid article')).toHaveCount(
    projects.length,
  );
  await page
    .getByRole('link', { name: 'Browse all projects', exact: true })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect
    .poll(() =>
      page
        .locator('#projects')
        .evaluate((section) => Math.round(section.getBoundingClientRect().top)),
    )
    .toBeGreaterThanOrEqual(75);
  await expect
    .poll(() =>
      page
        .locator('#projects')
        .evaluate((section) => Math.round(section.getBoundingClientRect().top)),
    )
    .toBeLessThan(140);
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'About', exact: true })
    .click();
  await expect(page).toHaveURL(/#about$/);
  await expect
    .poll(() =>
      page
        .locator('#about')
        .evaluate((section) => Math.round(section.getBoundingClientRect().top)),
    )
    .toBeLessThan(140);
  await expect(
    page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'About', exact: true }),
  ).toHaveAttribute('aria-current', 'location');
  expect(await page.locator('a[href*="github.com/example/"]').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('project and article dialogs support keyboard activation, focus trapping, Escape and focus restoration', async ({
  page,
}) => {
  await openPortfolio(page);
  const trigger = page.locator('#project-grid').getByRole('button', {
    name: 'View Portfolio Website details',
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', {
    name: 'Portfolio Website',
    exact: true,
  });
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press(index % 3 === 0 ? 'Shift+Tab' : 'Tab');
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page
    .getByRole('button', {
      name: 'Read article: Performance Optimization',
      exact: true,
    })
    .focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('dialog', { name: 'Performance Optimization', exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole('dialog')
      .getByRole('heading', { name: 'Rendering Strategy' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('button', {
      name: 'Read article: Performance Optimization',
      exact: true,
    }),
  ).toBeFocused();
});

test('responsive grid uses three, two and one columns without horizontal overflow', async ({
  page,
}) => {
  for (const [width, columns] of [
    [1440, 3],
    [820, 2],
    [390, 1],
  ] as const) {
    await page.setViewportSize({ width, height: 1000 });
    await openPortfolio(page);
    const actual = await page
      .locator('#project-grid')
      .evaluate(
        (grid) => getComputedStyle(grid).gridTemplateColumns.split(' ').length,
      );
    expect(actual).toBe(columns);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await expect(
      page.locator('#project-grid article').first().locator('..'),
    ).toHaveCSS('opacity', '1');
    await page.screenshot({
      path: `test-results/design/projects-${width}.png`,
    });
  }
});

test('mobile navigation closes on selection and Escape and touch cards have no hover lift', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  try {
    await openPortfolio(page);
    const toggle = page.getByRole('button', {
      name: 'Open navigation',
      exact: true,
    });
    await toggle.click();
    await expect(
      page.getByRole('navigation', { name: 'Mobile navigation' }),
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(
      page.getByRole('navigation', { name: 'Mobile navigation' }),
    ).toHaveCount(0);
    await expect(toggle).toBeFocused();
    await toggle.click();
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Contact', exact: true })
      .click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(
      page.getByRole('navigation', { name: 'Mobile navigation' }),
    ).toHaveCount(0);
    expect(
      await page.evaluate(
        () => matchMedia('(hover: hover) and (pointer: fine)').matches,
      ),
    ).toBe(false);
    await expect(page.locator('#project-grid article').first()).toHaveCSS(
      'transform',
      'none',
    );
  } finally {
    await context.close();
  }
});

test('reduced motion and disabled JavaScript preserve visible portfolio content', async ({
  page,
  browser,
}) => {
  const publishedCount = (
    await (await page.request.get('/api/projects')).json()
  ).projects.length;
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openPortfolio(page);
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  await page
    .getByRole('link', { name: 'Browse all projects', exact: true })
    .click();
  await page.getByRole('tab', { name: 'Large', exact: true }).click();
  await expect(page.locator('#project-grid article')).toHaveCount(3);
  for (const card of await page.locator('#project-grid article').all())
    await expect(card).toHaveCSS('transform', 'none');
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const noJs = await context.newPage();
    await noJs.goto('/');
    await expect(noJs.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(noJs.locator('#project-grid article')).toHaveCount(
      publishedCount,
    );
    await expect(noJs.locator('#project-grid article').first()).toHaveCSS(
      'opacity',
      '1',
    );
    await expect(noJs.locator('#project-grid img').first()).toHaveCSS(
      'opacity',
      '1',
    );
  } finally {
    await context.close();
  }
});

test('contact form exposes validation, loading, delivery success and provider errors', async ({
  page,
}) => {
  await openPortfolio(page);
  const form = page.getByRole('form', { name: 'Contact Rajiul' });
  await form.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(
    form.getByText('Please enter your name.', { exact: true }),
  ).toBeVisible();
  await expect(form.getByLabel('Your name', { exact: true })).toBeFocused();
  await form.getByLabel('Your name', { exact: true }).fill('Portfolio Visitor');
  await form
    .getByLabel('Email address', { exact: true })
    .fill('visitor@example.com');
  await form
    .getByLabel('Your message', { exact: true })
    .fill('I would like to discuss a new website project.');
  let release: () => void = () => undefined;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(
    'https://api.emailjs.com/api/v1.0/email/send',
    async (route) => {
      await pending;
      await route.fulfill({ status: 200, body: 'OK' });
    },
  );
  await form.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(
    form.getByRole('button', { name: 'Sending message…', exact: true }),
  ).toBeDisabled();
  release();
  await expect(form.getByRole('status')).toHaveText(
    'Your message has been sent. Thanks for getting in touch.',
  );
  await expect(form.getByLabel('Your name', { exact: true })).toHaveValue('');
  await page.unroute('https://api.emailjs.com/api/v1.0/email/send');
  await page.route('https://api.emailjs.com/api/v1.0/email/send', (route) =>
    route.fulfill({ status: 500, body: 'Provider error' }),
  );
  await form.getByLabel('Your name', { exact: true }).fill('Portfolio Visitor');
  await form
    .getByLabel('Email address', { exact: true })
    .fill('visitor@example.com');
  await form
    .getByLabel('Your message', { exact: true })
    .fill('This message should show a delivery error.');
  await form.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(form.getByRole('alert')).toContainText(
    'Your message could not be sent.',
  );
  await expect(form.getByLabel('Your message', { exact: true })).toHaveValue(
    'This message should show a delivery error.',
  );
});

test('dashboard-01 uses live collection counts, searchable rows and a working mobile sidebar', async ({
  page,
}) => {
  await page.goto('/admin/login');
  await page.getByLabel('Email', { exact: true }).fill('admin@portfolio.test');
  await page
    .getByLabel('Password', { exact: true })
    .fill('Portfolio-test-only-2026!');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page).toHaveURL(/\/admin$/);
  const projectCount = (
    await (await page.request.get('/api/admin/projects')).json()
  ).projects.length;
  await expect(page.locator('.admin-project-table tbody tr')).toHaveCount(
    projectCount,
  );
  await expect(page.locator('.admin-summary-card')).toHaveCount(4);
  await expect(
    page
      .locator('.admin-summary-card')
      .filter({ hasText: 'Total projects' })
      .getByText(String(projectCount), { exact: true }),
  ).toBeVisible();
  await page
    .getByRole('textbox', { name: 'Search projects', exact: true })
    .fill('Library');
  await expect(page.locator('.admin-project-table tbody tr')).toHaveCount(1);
  await expect(
    page.getByRole('heading', {
      name: 'Library Management (Personal)',
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole('textbox', { name: 'Search projects', exact: true })
    .clear();
  await page
    .getByLabel('Filter projects by status', { exact: true })
    .selectOption('draft');
  await expect(
    page.getByText('No projects match your search.', { exact: true }),
  ).toBeVisible();
  await page
    .getByLabel('Filter projects by status', { exact: true })
    .selectOption('all');
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole('button', { name: 'Toggle Sidebar', exact: true })
    .click();
  await expect(
    page.getByRole('dialog', { name: 'Sidebar', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('dialog')
    .getByRole('link', { name: 'Settings', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Storage settings', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('dialog', { name: 'Sidebar', exact: true }),
  ).toHaveCount(0);
});
