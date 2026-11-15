/**
 * Renders a CV template to a real PDF file, headlessly (no browser).
 *
 *   npm run cv:export -- "/path/to/output.pdf"
 *
 * The template addresses its fonts and icons by web path (/font/..., /images/...),
 * which only resolves in the browser. So we write a copy of the template with
 * those rewritten to absolute paths on disk, and render that copy.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const RESUME_DIR = join(ROOT, 'src/app/(common)/resume');

const OUT_FILE = resolve(
  process.argv[2] ?? join(ROOT, 'Rajiul-Islam-Full-Stack-Developer.pdf'),
);

const templateSource =
  // The app's tsconfig keeps JSX for Next to compile, so tsx emits classic
  // React.createElement calls here — React has to be in scope.
  "import React from 'react';\n" +
  readFileSync(join(RESUME_DIR, 'template-frontend-cv.tsx'), 'utf8')
    .replace(
      /'\.\/frontend-cv-data'/g,
      `'${join(RESUME_DIR, 'frontend-cv-data')}'`,
    )
    .replace(/(['"])\/(font|images|icons)\//g, `$1${PUBLIC}/$2/`);

// Inside node_modules so bare imports resolve, and so it stays out of git.
const buildDir = join(ROOT, 'node_modules/.cache/cv-export');
mkdirSync(buildDir, { recursive: true });
const templateFile = join(buildDir, 'template.tsx');
writeFileSync(templateFile, templateSource);

const React = (await import('react')).default;
const { Font, renderToFile } = await import('@react-pdf/renderer');

// pnpm can hand the copied template its own @react-pdf/font instance, so the
// family the template registers is not always the one renderToFile looks in.
Font.register({
  family: 'Roboto',
  fonts: [
    { src: join(PUBLIC, 'font/Roboto/roboto.ttf'), fontWeight: 400 },
    { src: join(PUBLIC, 'font/Roboto/static/Roboto-Bold.ttf'), fontWeight: 700 },
    { src: join(PUBLIC, 'font/Roboto/static/Roboto-Italic.ttf'), fontStyle: 'italic' },
  ],
});
Font.registerHyphenationCallback((word) => [word]);
const { FrontendCvDocument } = await import(templateFile);
const { fullstackCvData } = await import(join(RESUME_DIR, 'fullstack-cv-data.ts'));

const data = {
  ...fullstackCvData,
  profileImage: join(PUBLIC, 'images/rajiul-formal.jpg'),
};

// The template is imported from a generated path, so TypeScript only sees `any`.
const element = React.createElement(FrontendCvDocument, {
  data,
}) as Parameters<typeof renderToFile>[0];

await renderToFile(element, OUT_FILE);
console.log(`CV written to ${OUT_FILE}`);
