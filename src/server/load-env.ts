import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

/**
 * Mirror Next.js env file precedence so `ACCESS_TOKEN_SECRET` matches `pnpm dev`.
 * @see https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
 */
const root = process.cwd();
const nodeEnv = process.env.NODE_ENV || 'development';

function loadEnvFile(relative: string, override: boolean) {
  const full = path.resolve(root, relative);
  if (!fs.existsSync(full)) return;
  dotenv.config({ path: full, override, quiet: true });
}

loadEnvFile('.env', false);
loadEnvFile(`.env.${nodeEnv}`, true);
loadEnvFile('.env.local', true);
loadEnvFile(`.env.${nodeEnv}.local`, true);
