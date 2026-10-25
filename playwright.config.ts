import { defineConfig } from '@playwright/test';

const testDatabase = process.env.TEST_DATABASE_URL;
if (!testDatabase || !new URL(testDatabase).pathname.includes('_test')) {
  throw new Error(
    'Set TEST_DATABASE_URL to a disposable PostgreSQL database whose name contains _test.',
  );
}
const origin = 'http://localhost:3107';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: origin,
    trace: 'retain-on-failure',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  webServer: {
    command: 'pnpm db:deploy && pnpm db:seed && pnpm exec next dev --port 3107',
    url: `${origin}/admin/login`,
    reuseExistingServer: false,
    timeout: 120000,
    env: {
      DATABASE_URL: testDatabase,
      DIRECT_URL: testDatabase,
      SETTINGS_ENCRYPTION_KEY: 'a'.repeat(64),
      ADMIN_EMAIL: 'admin@portfolio.test',
      ADMIN_PASSWORD: 'Portfolio-test-only-2026!',
      NEXT_PUBLIC_SITE_URL: origin,
      NEXT_DIST_DIR: '.next-playwright',
      NEXT_PUBLIC_EMAILJS_SERVICE_ID: 'test-service',
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: 'test-template',
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: 'test-public-key',
    },
  },
});
