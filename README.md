## Portfolio (Next.js + Prisma + PostgreSQL + Cloudflare R2)

Personal portfolio built with **Next.js App Router**. Projects are managed through a protected admin panel, stored in PostgreSQL using Prisma, and displayed with ordered image sliders. Existing portfolio sections, categories, links, tags and features are retained.

## Portfolio design and dashboard

The homepage follows the supplied graphite/lime reference: Navbar → Hero → Selected Work → All Projects → About & Expertise → Experience & Education → Blog → Contact → Footer. It uses the existing portrait, real project screenshots, stored descriptions and links, and source-backed resume history. No sample results, revenue or credentials are presented as real data.

- Selected Work curates existing project IDs `3`, `4` and `6`; All Projects renders every published project with All, Personal, Small, Medium and Large filters.
- The project grid has three desktop columns, two tablet columns and one mobile column. Filter tabs support arrow keys, Home and End.
- Project details and existing local articles use Radix dialogs with focus trapping, Escape dismissal and focus restoration. Placeholder `github.com/example` links are hidden from the public interface.
- Shared Framer Motion settings and progressive reveals live in `src/components/portfolio/motion.tsx`. Content is rendered visibly by the server before animation enhancement; `prefers-reduced-motion` disables movement and smooth scrolling. Hover effects apply only to fine pointers.
- The actual `dashboard-01` shadcn block was installed and adapted for `/admin`: responsive sidebar, real summary counts, searchable/status-filtered project table, image management and R2 settings. `/dashboard` redirects to the protected admin route. Template revenue, customers and analytics were removed.
- `/blogs` now reuses the existing local article content, and `/contact` reuses the homepage contact form.

For email delivery, supply the three `NEXT_PUBLIC_EMAILJS_*` variables from `.env.example` and restart/rebuild. The form includes validation, pending, success and provider-error states; without configuration it offers the real direct email address and never claims delivery succeeded. The tests use test-only EmailJS values and intercept the transport, so they never send email.

The design checks in `tests/portfolio-design.spec.ts` cover section order, the full collection, all filters, responsive column counts, same-page scrolling, mobile navigation, keyboard dialogs, reduced motion, server-visible content with JavaScript disabled and contact states. Browser tests use `.next-playwright` so they can run alongside the local development server.

### Interactive grid background

`src/components/portfolio/interactive-grid-background.tsx` supplies one fixed, viewport-sized Canvas behind the public portfolio. Neutral square cells and centered dots stay anchored to the viewport while content scrolls. Pointer movement emits soft, overlapping wave packets that displace only the pattern and briefly highlight dots in lime; no cursor spotlight or ripple outline is drawn.

Configure the component in `src/components/portfolio/shell.tsx`. Defaults are exported as `DEFAULT_GRID_SETTINGS`:

```tsx
<InteractiveGridBackground
  gridSpacing={56}
  dotSize={0.9}
  opacity={0.42}
  rippleRadius={420}
  strength={5}
  speed={160}
  damping={1.35}
  highlightColor="#baff4b"
  maxRipples={8}
  maxDpr={1.5}
/>
```

Spacing, dot radius, propagation radius and displacement use CSS pixels; speed is pixels per second, and damping is exponential decay per second. Higher damping settles waves faster. Safe bounds prevent unusually small cells or excessive ripple counts from overloading the renderer.

The layer never captures pointer events. Passive pointer tracking requires both movement distance and a 110 ms interval before emitting another wave. Animation uses refs and requestAnimationFrame, sleeps after settling, pauses when hidden, and handles resize/pixel-ratio changes. Touch/reduced-motion devices render a static pattern; CSS provides the same fallback before hydration or when Canvas is unavailable. Listeners, observers and animation frames are cleaned up on unmount. `tests/interactive-grid.spec.ts` verifies these behaviors alongside the existing portfolio interactions.

### Kingstar Travel project refresh

The current public [Kingstar homepage](https://www.kingstartravel.com/), [visa catalog](https://www.kingstartravel.com/visa) and [agency registration](https://www.kingstartravel.com/become-an-agent/registration) were reviewed on 2026-10-25. The project definition in `src/content/kingstar-project.ts` uses the observed flight/fare controls, visa details and onboarding form. Private ticketing tools are presented as an overview of public agency copy; no authenticated portal or live booking was tested. Hotel booking, inventory totals and accreditation claims are not asserted as verified features.

The cover is a browser/phone mockup made with HTML/CSS from actual desktop and mobile screenshots. The three PNG assets in `public/images/project/kingstar-travel-*` are also retained locally for fresh deployments and database seeds.

```bash
# Capture the public UI and rebuild the thumbnail (requires Playwright/Chrome).
pnpm assets:kingstar
# Upload captures to the configured R2 bucket and update only project ID 3 in DATABASE_URL.
pnpm project:kingstar:sync
```

The sync preserves publishing status, existing real source links and separately added gallery images. Content hashes allow uploaded captures to be reused on repeat runs. Previous generated captures move to unused uploads; rollback snapshots are stored under ignored `.portfolio-backups/kingstar/`. Regular `db:seed` continues to preserve existing project records and imports this three-image gallery only for a new record.

### Dream travel projects

`src/content/dream-tourism-projects.ts` contains three separate **Medium** entries: [Dream Ziarah](https://dreamziarah.com/), [Dream Tourism Italy](https://dreamtourism.it/) and [Dream Tourism UK](https://dreamtourism.co.uk/). The supplied Ziarah showcase is its cover; both Italy attachments belong to the Italy gallery. UK uses a thumbnail composed from its actual public homepage capture. Local copies are in `public/images/project/dream/`.

```bash
pnpm assets:dream-uk
pnpm project:dream:sync
```

The sync uploads/reuses content-hashed R2 images, matches existing entries by stable ID or website hostname to avoid duplicates, preserves existing publishing status, and moves refreshed/new projects to the front. Only these three travel entries are affected; rollback snapshots are kept in ignored `.portfolio-backups/dream-projects/`. Public UI features were reviewed on 2026-10-25; no checkout, payments, reviews or private-account results are claimed as verified.

### EzyBuss project refresh

Project ID `4` is **EzyBuss — Multi-Tenant Website Builder**, defined in `src/content/ezybuss-project.ts`. It uses actual homepage, mobile and public template-gallery captures from [EzyBuss](https://ezybuss.com/en), reviewed on 2026-10-25, with a composed browser/phone cover. Domain controls were observed at [the domain page](https://ezybuss.com/en/domain), and the [ecommerce preview](https://ezybuss.com/preview/ecommerce) was populated. Private administration/tenant features are represented from public product descriptions and the existing resume record; no authenticated dashboard, domain purchase, published site, uptime or customer results were independently tested.

```bash
pnpm assets:ezybuss
pnpm project:ezybuss:sync
```

The refresh keeps the Large category, publishing status, real source links and custom gallery uploads. New images are stored in R2 and the existing Neon record is updated, without adding another project. Durable rollback snapshots use `.portfolio-backups/ezybuss/`. A refresh moves the project to the first position, following the same rule as admin saves. Existing-project image syncing is shared with the Kingstar utility in `scripts/lib/sync-existing-project.ts`.

## Backend setup (Neon)

Use Node.js 20.19+ or 22.12+ and pnpm. Prisma Client and CLI are pinned together at 6.19.0.

```bash
pnpm install
cp .env.example .env
openssl rand -hex 32
```

Fill in `.env`:

- `DATABASE_URL`: Neon pooled PostgreSQL connection string, with `sslmode=require`.
- `DIRECT_URL`: Neon direct/unpooled connection string for migrations, with `sslmode=require`.
- `SETTINGS_ENCRYPTION_KEY`: the 64 hex characters from the command above. Keep this stable and backed up: R2 credentials cannot be decrypted without it.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: your admin login; password must be 12–72 characters.
- `NEXT_PUBLIC_SITE_URL`: the site's actual origin, e.g. `https://your-domain.com`. This is also used to validate admin request origins. For local development use `http://localhost:3000`.

Neon connection details stay in environment variables. R2 configuration is entered through the Settings form and stored in the database; no R2 environment variables are needed.

```bash
pnpm db:deploy
pnpm db:seed
pnpm dev
```

Visit `/admin/login`. The seed imports the current projects from `src/projectData.ts` and creates the admin. Existing project records are preserved when seeding again. Rerunning the seed updates the specified admin's password and signs out its active sessions. Existing local project images continue working without uploading them to R2.

For future schema changes use `pnpm db:migrate --name your_change` locally and commit the resulting migration. Apply committed migrations with `pnpm db:deploy` during deployment.

## Cloudflare R2 Settings

1. Create an R2 bucket. Enable its public development URL or connect a public custom domain.
2. Create an R2 S3 API token with **Object Read & Write** access scoped to this bucket.
3. Open `/admin/settings`, then enter the Cloudflare account ID, bucket name, public HTTPS URL, access key ID and secret access key.
4. Use **Test connection** to check bucket access and upload/delete permissions. Save the configuration with **Save settings**.
5. Open `/admin` → **Add project** and upload images. Confirm the previews load to verify the public URL.

The public URL is an `https://pub-….r2.dev` address or your custom domain, not the S3 endpoint (`*.r2.cloudflarestorage.com`). Uploads go through the authenticated server, so browser-to-R2 CORS configuration is unnecessary. The test button checks the values currently in the form without saving them.

Access keys are encrypted with AES-256-GCM and are never returned by the Settings API. Leave either credential field blank when editing to retain its saved value. Each saved configuration retains its own credentials so images uploaded to a previous bucket can still be deleted. Existing image URLs remain as originally stored; changing the public URL does not migrate existing objects. Keep old bucket access available until those images are no longer needed.

## Project management

- Add/edit/delete projects with the existing personal, small, medium and large categories.
- Manage description, technology tags, frontend/backend GitHub URLs, live/server URLs and repeatable feature fields.
- Upload up to **12 images per project**, each up to **4 MB** (JPEG, PNG, WebP or GIF). Files upload one at a time to stay within common hosting request limits. Server validation checks MIME types and image signatures.
- Reorder images with arrows. The first image becomes the cover. The public cards and details dialog have previous/next controls, slide indicators and touch swiping.
- Save a project as a draft or publish it. New uploads and content updates move to the first position. Drag project rows in the admin collection to save a custom homepage order, or focus a handle and use Space → arrow keys → Space. Clear search/status filters and use display order before reordering. Saving a project later moves that project to the front again; everyone else keeps their relative order. All homepage category tabs share this order. Selected Work uses its curated order: Kingstar, EzyBuss, then Prep. The public API only returns published projects; database failures show an explicit retry state.
- Removed images and images from cancelled edits/deleted projects appear under **Unused uploads**. They can be reused or permanently deleted from storage. Saving/deleting a project does not silently destroy its images.

Admin access uses hashed database sessions in HttpOnly cookies, bcrypt password hashing, origin checks on writes, server-side authorization on every admin API, and login throttling (10 attempts per email per 15 minutes).

## Verification

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Browser/API integration tests use a **separate disposable PostgreSQL database**, never your Neon production database. Its database name must contain `_test`. Tests apply migrations and seed an admin with test-only credentials, then exercise authentication, encrypted settings, project CRUD, publication, image ordering, the public slider, validation and concurrent image ownership. They use local image fixtures; actual Cloudflare upload/delete requires your live R2 settings and the connection test.

```bash
pnpm exec playwright install chromium
TEST_DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/portfolio_test" pnpm test:e2e
TEST_DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/portfolio_test" pnpm test:storage
```

If using an already-installed Chrome, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. Do not expose the test server (port 3107) publicly.

`test:storage` uses the migrated test database and a mocked S3 transport to verify image uploads, metadata persistence, deletion using the original bucket, failure recovery and authenticated encryption. Run it after `test:e2e` has applied the test database migrations. These tests do not contact Cloudflare.

## Deployment environment

Set the same environment variables in your hosting provider. Install dependencies, run `pnpm db:deploy`, then `pnpm build`. Run `pnpm db:seed` once with your chosen admin credentials. The host must support Node.js runtime route handlers. Cloudflare R2 credentials are entered after deployment through `/admin/settings`. After deployment, verify login, **Test connection**, a multiple-image upload, public slider, draft visibility and unused-image deletion with your real services.

Provider references: [Prisma + Neon](https://www.prisma.io/docs/orm/v6/overview/databases/neon), [Cloudflare R2 S3 SDK setup](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/).

## Getting Started

Install deps and run the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
pnpm start
```

## Features

- **Scroll animations (GSAP + ScrollTrigger)**: smooth fade-in + slide-up for sections and card stagger reveals.
- **Hero animations**:
  - Split text effect with animated gradient sweep (Motion).
  - Profile image floating + mouse-follow shadow/glow effect.
  - Tech stack icon badges (free Devicon SVGs) with smooth stagger.
- **Projects**:
  - Category tabs with smooth sliding active indicator (Motion).
  - Tab change animation: cards load from the right with stagger.
  - Personal projects show **GitHub Frontend/Backend** buttons conditionally.
- **UI/UX**: hover interactions (scale/shadow/glow), glassmorphism styling, responsive layout.
- **Favicon**: uses `public/logo.png` via app metadata icons.

## Routes

- **`/`**: landing page (Hero, Skills, Projects, Blog, Contact)
- **`/blogs`**: blogs page
- **`/contact`**: contact page
- **`/resume`**: resume viewer

## Key files

- **Landing page composition**: `src/app/(common)/home/landing-page.tsx`
- **Sections**:
  - `src/app/(common)/home/hero-section.tsx`
  - `src/app/(common)/home/skills-section.tsx`
  - `src/app/(common)/home/project-section.tsx`
  - `src/app/(common)/home/blog-section.tsx`
  - `src/app/(common)/home/contact-section.tsx`
- **Project cards**: `src/app/(common)/home/project-card.tsx`
- **Project data**: PostgreSQL (`prisma/schema.prisma`); `src/projectData.ts` is used only for the initial seed
- **Navbar**: `src/components/common-component/navbar.tsx`
- **App metadata / favicon**: `src/app/layout.tsx`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy

Deploy on Vercel (recommended) or any Node.js platform that supports Next.js.

## Ekboi project replacement

The former Large ecommerce entry (ID `6`) is replaced with [Ekboi](https://www.ekboi.com/). The description and eight features follow its public learning-platform overview, reviewed on 2026-10-25. Next.js/React and Tailwind are visible in the public frontend; unrelated ecommerce/backend tags and source links are removed. No private learner account or exam results were used.

```bash
pnpm assets:ekboi
pnpm project:ekboi:sync
```

The capture command saves actual desktop, mobile and learning-overview screenshots and renders a browser/phone thumbnail. The sync command updates the same project in Neon, uploads assets to configured R2 storage and keeps a rollback snapshot in ignored `.portfolio-backups/ekboi`. Previous ecommerce media become unused uploads; they are not deleted from storage.

## Prep project

[Prep](https://ai-assistant-one-rouge.vercel.app/) is a separate Large project with a three-image gallery supplied by the owner. Public feature copy was reviewed on 2026-10-25; authenticated tools, AI responses and payments were not tested. The third supplied image is the cover, followed by the responsive showcase and the study-tools showcase. Artwork is displayed without cropping.

```bash
pnpm project:prep:sync
```

The importer creates or updates the same stable project ID (`prep-study-platform`) and also matches the website hostname to avoid duplicate entries. It uploads/reuses content-hashed assets in configured R2 storage and saves the project in Neon at the first position. Existing custom gallery images and real source links are retained. Rollback snapshots are kept under ignored `.portfolio-backups/prep/`. Normal seeding only imports new records and preserves existing ones.
