## Portfolio (Next.js + Tailwind + GSAP + Motion)

Personal portfolio site built with **Next.js App Router**. Includes a landing page with animated sections, a projects showcase with filtering, blogs, contact, and a resume page.

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
- **Project data**: `src/projectData.ts`
- **Navbar**: `src/components/common-component/navbar.tsx`
- **App metadata / favicon**: `src/app/layout.tsx`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy

Deploy on Vercel (recommended) or any Node.js platform that supports Next.js.
