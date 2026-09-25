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
          'Built three brand-specific Next.js frontends consuming one shared REST API, each with its own branding and content.',
          'Created a reusable component library and data-fetching layer shared across all three sites, so new features ship to every brand without duplicate code.',
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
          'Built separate booking UIs for multiple OTA providers inside a single Next.js application.',
          'Built role-based dashboards for users, agencies and admins, with data-heavy tables using TanStack Table.',
          'Built an accounts module covering expenses, invoices, suppliers and financial reports.',
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
          'Built the central dashboard for template selection and live content customisation.',
          'Added multi-language support across portfolio and eCommerce templates.',
          'Implemented route protection and role-based access in middleware, keeping each tenant’s data separate.',
        ],
        tech: ['Next.js', 'React.js', 'TypeScript', 'shadcn/ui', 'Zustand', 'TanStack Query'],
      },
    ],
  },
];

export const frontendCvData = {
  personal: { ...resumeData.personal, title: 'Front-End Developer  |  React.js · Next.js · TypeScript' },
  contact: resumeData.contact,
  profileImage: '/images/rajiul-formal.jpg',
  summary:
    'Front-End Developer specialising in React.js, Next.js and TypeScript. Built production interfaces for a multi-provider travel booking platform (OTA), a multi-tenant SaaS website builder, and three brand websites running on one shared backend. Focused on reusable component architecture, responsive UI, predictable state management and clean REST API integration.',
  experiences,
  projects: [
    {
      id: 1,
      title: 'Services Marketplace',
      liveUrl: 'https://www.service64.com/',
      description:
        'Location-based marketplace connecting users with nearby service providers.',
      responsibilities: [
        'Built a mobile-first UI for location-based provider discovery with category filters and search.',
        'Created provider profile pages with service details and coverage area.',
        'Built validated forms with React Hook Form and Zod, and integrated JWT-based authentication with the API.',
      ],
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'TanStack Query', 'React Hook Form', 'Zod'],
    },
  ] as Project[],
  skillGroups: [
    { label: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'] },
    { label: 'UI & Styling', items: ['Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'Responsive Design'] },
    {
      label: 'State & Data',
      items: ['Redux Toolkit', 'Zustand', 'TanStack Query', 'TanStack Table', 'React Hook Form', 'Zod', 'REST API Integration'],
    },
    { label: 'Testing & Tools', items: ['Jest', 'Git', 'GitHub', 'Figma'] },
    { label: 'Backend (working knowledge)', items: ['Node.js', 'Express.js', 'MongoDB'] },
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
  certifications: [
    { id: 1, name: 'Front End Web Development – Level 1 & 2', issuer: 'Programming Hero' },
  ],
};

export type FrontendCvData = typeof frontendCvData;
