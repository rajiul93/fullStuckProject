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
    jobTitle: 'Front-End Developer',
    company: 'Digeon (digeon.co.uk)',
    period: 'May 2026 - Present',
    location: 'Remote — UK-based company',
    projects: [
      {
        id: 1,
        title: 'Multi-Brand Tourism Platform',
        liveUrl: [
          'https://dreamziarah.com',
          'https://dreamtourism.co.uk',
          'https://dreamtourism.it',
        ],
        description:
          'Tourism and pilgrimage booking ecosystem where one shared backend powers three brand websites for the UK and Italian markets.',
        responsibilities: [
          'Shipped three brand-specific Next.js frontends on one shared REST API, each tailored to its market: Saudi Ziyarat tours, UK day trips and European tour packages.',
          'Designed a shared component library and TanStack Query data layer used by all three sites, so a new feature ships to every brand at once instead of being rebuilt three times.',
          'Developed the tour discovery journey: destination and date search, filters by city, duration, language and price, detailed itinerary pages, and date/traveller availability with a price summary.',
          'Introduced a shared currency selector so visitors in 2 markets (UK and Italy) see prices in their own currency on every brand.',
        ],
        tech: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'TanStack Query'],
      },
    ],
  },
  {
    jobTitle: 'Junior Front-End Developer',
    company: 'Waditaslim Tech',
    period: 'Jan 2025 - May 2026',
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
          'Created the agency onboarding form (company and representative details, currency preference, logo and digital-signature uploads) with React Hook Form and Zod validation.',
          'Turned the back-office finance workflow into an accounts module covering expenses, invoices, suppliers and financial reports, giving the team one place to track the business.',
        ],
        tech: ['Next.js', 'React.js', 'TypeScript', 'shadcn/ui', 'Zustand', 'TanStack Query', 'TanStack Table'],
      },
      {
        id: 2,
        title: 'Multi-Tenant SaaS Website Builder',
        liveUrl: 'https://ezybuss.com/en',
        description:
          'SaaS platform where businesses launch their own portfolio or eCommerce website from dynamic templates, with custom domains and isolated tenant data.',
        responsibilities: [
          'Built the central dashboard where businesses choose a template and customise their content live before publishing their site.',
          'Localised every portfolio and eCommerce template into 2 languages (English and Arabic), with full right-to-left (RTL) layouts using next-intl.',
          'Implemented route protection and role-based access in Next.js middleware, so each tenant and role only reaches its own pages.',
        ],
        tech: ['Next.js', 'React.js', 'TypeScript', 'shadcn/ui', 'Zustand', 'TanStack Query'],
      },
    ],
  },
];

export const frontendCvData = {
  personal: { ...resumeData.personal, title: 'Front-End Developer  |  React.js · Next.js · TypeScript' },
  contact: { ...resumeData.contact, githubUrl: 'https://github.com/rajiul93' },
  profileImage: '/images/rajiul-formal.jpg',
  summary:
    'Front-End Developer with 2 years of experience building production apps in React.js, Next.js and TypeScript. I start by understanding the business need, then turn it into clear, responsive UI — including a multi-provider travel booking platform (OTA) with role-based dashboards and payment gateways, a multi-tenant SaaS website builder, and three brand websites running on one shared backend. Day to day I work with Zustand, TanStack Query and REST APIs, building reusable components that teams can extend.',
  experiences,
  projects: [
    {
      id: 1,
      title: 'Aplinto — AI Customer Support SaaS',
      liveUrl: 'https://aplinto.ai/',
      description:
        'Multi-tenant SaaS where an AI answers a business’s WhatsApp, Messenger, Instagram and Gmail messages from one inbox, using only what the business taught it.',
      responsibilities: [
        'Engineered the seller dashboard: a real-time unified inbox over Socket.IO for 4 channels, with one-click human takeover from the AI.',
        'Designed the AI knowledge tools: a knowledge base editor, website scanning with review before the AI learns, and an unanswered-questions flow that turns missed questions into new answers.',
        'Delivered all 4 apps of the platform: the seller and super admin dashboards, the Next.js marketing site with Stripe checkout, and the NestJS API behind them, covered by 200+ Vitest tests.',
      ],
      tech: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'Socket.IO', 'NestJS'],
    },
  ] as Project[],
  skillGroups: [
    { label: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'] },
    { label: 'UI & Styling', items: ['Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'Responsive Design'] },
    {
      label: 'State & Data',
      items: ['Redux Toolkit', 'Zustand', 'TanStack Query', 'TanStack Table', 'React Hook Form', 'Zod', 'REST API Integration'],
    },
    { label: 'Testing & Tools', items: ['Vitest', 'Playwright', 'Git', 'GitHub', 'Figma'] },
    { label: 'Backend (working knowledge)', items: ['Node.js', 'NestJS', 'Express.js', 'PostgreSQL', 'Prisma', 'MongoDB'] },
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

export type FrontendCvData = typeof frontendCvData;
