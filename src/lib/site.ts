import { resumeData } from '@/app/(common)/resume/resume-data';

/** Public origin used for canonical URLs, the sitemap and OG images (set NEXT_PUBLIC_SITE_URL in production). */
export function siteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (env) return env;
  // Prefer the stable production domain over per-deployment preview URLs.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.NODE_ENV === 'development') return 'http://localhost:3000';
  return resumeData.contact.portfolioUrl;
}

export const site = {
  name: 'Rajiul Islam',
  role: 'MERN Stack Developer',
  title: 'Rajiul Islam | MERN Stack Developer — Front-End Focused',
  description:
    'Rajiul Islam is a front-end focused MERN stack developer from Bangladesh, building fast, accessible React and Next.js interfaces in TypeScript, backed by Node.js, Express and MongoDB.',
  keywords: [
    'Rajiul Islam',
    'MERN Stack Developer',
    'Front-End Developer',
    'Frontend focused MERN developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Remote Web Developer Bangladesh',
    'Portfolio',
  ],
  sameAs: [resumeData.contact.linkedInUrl, 'https://github.com/rajiul93'],
};
