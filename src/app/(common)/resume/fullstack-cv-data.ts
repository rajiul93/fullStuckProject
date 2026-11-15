import { resumeData } from './resume-data';

type Project = {
  id: number;
  title: string;
  liveUrl: string | string[];
  description: string;
  responsibilities: string[];
  tech: string[];
};

type Experience = {
  jobTitle: string;
  company: string;
  period: string;
  location: string;
  projects: Project[];
};

const experiences: Experience[] = [
  {
    jobTitle: 'Full-Stack Developer',
    company: 'Waditaslim Tech',
    period: 'Jan 2025 - Jun 2026',
    location: 'Remote — Dubai-based company',
    projects: [
      {
        id: 1,
        title: 'Travel Booking Platform (OTA)',
        liveUrl: 'https://kingstartravel.com',
        description:
          'Multi-provider online travel booking platform with role-based dashboards, multiple payment gateways and back-office management.',
        responsibilities: [
          'Developed booking flows for multiple OTA providers inside one Next.js app, with One Way, Round Trip and Multi City search and Regular, Family, Student and Umrah fares.',
          'Delivered role-based dashboards for users, agencies and admins, using TanStack Table to keep data-heavy booking and finance tables fast and manageable.',
          'Built the agency onboarding flow — company and representative details, currency preference, logo and digital-signature uploads — validated end to end with React Hook Form and Zod.',
          'Turned the back-office finance workflow into an accounts module covering expenses, invoices, suppliers and financial reports, giving the team one place to track the business.',
        ],
        tech: [
          'Next.js',
          'React.js',
          'TypeScript',
          'Zustand',
          'TanStack Query',
          'TanStack Table',
          'Stripe',
          'WebSocket',
        ],
      },
      {
        id: 2,
        title: 'VLife — Rewards & Partner Network Platform',
        liveUrl: 'https://vlifebiz.com',
        description:
          'Membership platform where users earn points from missions and partner purchases, level up through membership tiers and redeem exclusive benefits.',
        responsibilities: [
          'Owned the rewards engine end to end — designed the database schema, built the REST API for points, missions and redemptions, and shipped the member dashboard on top of it.',
          'Modelled the partner network so each partner carries its own offers and earning rules, and every partner purchase credits points to the right member automatically.',
          'Implemented authenticated sessions and role-based access across member, partner and admin areas, so each role only reaches its own data.',
        ],
        tech: [
          'Next.js',
          'React.js',
          'TypeScript',
          'Node.js',
          'REST API',
          'TanStack Query',
          'Tailwind CSS',
        ],
      },
      {
        id: 3,
        title: 'Multi-Tenant SaaS Website Builder',
        liveUrl: 'https://ezybuss.com/en',
        description:
          'SaaS platform where businesses launch their own portfolio or eCommerce website from dynamic templates, with custom domains and isolated tenant data.',
        responsibilities: [
          'Built the central dashboard where businesses choose a template and customise their content live before publishing their site.',
          'Localised every portfolio and eCommerce template into 2 languages (English and Arabic), with full right-to-left (RTL) layouts using next-intl.',
          'Implemented route protection and role-based access in Next.js middleware, so each tenant and role only reaches its own pages.',
        ],
        tech: [
          'Next.js',
          'React.js',
          'TypeScript',
          'shadcn/ui',
          'Zustand',
          'TanStack Query',
          'Next Intl',
          'Stripe',
        ],
      },
    ],
  },
];

export const fullstackCvData = {
  personal: {
    ...resumeData.personal,
    title:
      'Full-Stack Developer  |  Next.js · React · TypeScript · Node.js · PostgreSQL',
  },
  contact: { ...resumeData.contact, githubUrl: 'https://github.com/rajiul93' },
  profileImage: '/images/rajiul-formal.jpg',
  summary:
    'Full-Stack Developer with 2 years of experience shipping production web apps end to end — Next.js and React on the front, Node.js, Prisma and PostgreSQL behind them. I start from the business need and own the whole slice: data model, REST API, authentication and the UI on top. Delivered a multi-provider travel booking platform (OTA), a rewards and partner-network platform and a multi-tenant SaaS website builder, and I run my own AI-powered study platform end to end.',
  experiences,
  projects: [
    {
      id: 1,
      title: 'Prep — AI Study Platform for Job-Exam Candidates',
      liveUrl: 'https://ai-assistant-one-rouge.vercel.app/',
      description:
        'Bangla-first study platform with study planning, question banks and exams, vocabulary and typing labs, an AI assistant with voice, group chat and paid plans — built and run solo.',
      responsibilities: [
        'Designed a 59-model Prisma schema on Neon PostgreSQL and exposed it through 30 server actions and 32 route handlers, with 41 hand-written idempotent SQL migrations applied to production.',
        'Built the AI layer on OpenAI: an assistant with voice in and out, image-to-question extraction, spell-check, and auto-solving for MCQ and short-question sets.',
        'Implemented authentication and access control end to end — Firebase Auth with server-side admin sessions, device binding, and USER/ADMIN/SUPER_ADMIN roles checked inside every server action.',
        'Monetised the product with SSLCommerz checkout and IPN, plan entitlements and metered AI credits, plus an affiliate system tracking clicks, commissions and payouts.',
        'Added real-time chat and notifications over a standalone Socket.IO server with token auth and a polling fallback, and covered the logic with 26 Vitest suites including integration tests on a separate database branch.',
      ],
      tech: [
        'Next.js',
        'React.js',
        'TypeScript',
        'Prisma',
        'PostgreSQL',
        'Firebase Auth',
        'OpenAI',
        'Socket.IO',
        'Vitest',
      ],
    },
  ] as Project[],
  skillGroups: [
    {
      label: 'Frontend',
      items: [
        'React.js',
        'Next.js (App Router)',
        'TypeScript',
        'JavaScript (ES6+)',
        'HTML5',
        'CSS3',
      ],
    },
    {
      label: 'Backend & API',
      items: [
        'Node.js',
        'NestJS',
        'Express.js',
        'REST API Design',
        'Authentication & RBAC',
        'Socket.IO',
        'OpenAI API',
      ],
    },
    {
      label: 'Database',
      items: [
        'PostgreSQL',
        'Neon',
        'Prisma ORM',
        'Schema Design & Migrations',
        'MongoDB',
      ],
    },
    {
      label: 'UI & State',
      items: [
        'Tailwind CSS',
        'shadcn/ui',
        'Zustand',
        'Redux Toolkit',
        'TanStack Query',
        'TanStack Table',
        'React Hook Form',
      ],
    },
    {
      label: 'Cloud & Tools',
      items: [
        'Vercel',
        'Netlify',
        'Firebase',
        'Cloudflare R2 / S3',
        'Git',
        'GitHub',
        'Figma',
      ],
    },
    {
      label: 'Testing',
      items: ['Vitest', 'Playwright', 'Node Test Runner'],
    },
    { label: 'Currently Learning', items: ['Python'] },
  ],
  education: [
    {
      id: 1,
      degree: 'B.Sc. in Electrical & Electronic Engineering (EEE)',
      institution: 'World University of Bangladesh, Dhaka',
      period: '2018 - 2022',
    },
    {
      id: 2,
      degree: 'Diploma in Electrical',
      institution: 'Mangrove Institute of Science and Technology, Khulna',
      period: '2013 - 2017',
    },
  ],
};

export type FullstackCvData = typeof fullstackCvData;
