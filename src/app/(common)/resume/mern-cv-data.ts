export const mernCvData = {
  personal: {
    name: 'Rajiul Islam',
    title: 'MERN Stack Developer',
  },
  contact: {
    phone: '+880 1986570093',
    email: 'developer.rajiul@gmail.com',
    linkedInUrl: 'https://www.linkedin.com/in/rajiul-islam-rayhan',
    portfolioUrl: 'https://rajiul-portfolio.vercel.app',
    githubUrl: 'https://github.com/rajiul-islam-rayhan',
    location: 'Khulna, Bangladesh',
  },
  profileImage: '/images/rajiul.jpeg',
  careerObjective:
    'To contribute as a MERN Stack Developer in a product-driven team, building end-to-end web applications with MongoDB, Express.js, React.js, and Node.js — delivering secure APIs, scalable data models, and polished user experiences.',
  careerSummary:
    'MERN Stack Developer with 1+ year of experience building full-stack web applications. Skilled in REST API development with Express.js, MongoDB schema design with Mongoose, JWT authentication, and React/Next.js frontends. Experienced in multi-tenant SaaS, marketplace platforms, and role-based access control.',
  coreStrengths: [
    'End-to-end MERN application development',
    'RESTful API design & Express.js middleware',
    'MongoDB schema modeling with Mongoose',
    'JWT authentication & role-based authorization',
    'React/Next.js integration with TanStack Query',
    'Production debugging & API performance tuning',
  ],
  skillGroups: {
    mern: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    frontend: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Redux Toolkit',
      'Zustand',
      'TanStack Query',
      'React Hook Form',
      'Zod',
    ],
    backend: [
      'REST APIs',
      'JWT',
      'Middleware',
      'Mongoose ODM',
      'Axios',
      'Multi-tenant Architecture',
      'RBAC',
    ],
    tools: ['Git & GitHub', 'Postman', 'VS Code', 'Vercel', 'dayjs'],
  },
  experience: {
    jobTitle: 'Junior MERN Stack Developer',
    company: 'Waditaslim tech',
    period: '2025 - Present',
    location: 'Khulna, Bangladesh (Dubai Base)',
    projects: [
      {
        id: 1,
        title: 'Travel Booking Platform [OTA]',
        liveUrl: 'https://kingstartravel.com',
        description:
          'Full-stack multi-provider travel booking platform with React/Next.js frontend and Node.js backend services, role-based dashboards, and payment integrations.',
        responsibilities: [
          'Built REST API integrations for multi-OTA booking flows and admin reporting modules',
          'Implemented role-based user, agency, and admin access with secure middleware layers',
          'Developed accounts module APIs for expense, invoice, supplier, and financial reports',
        ],
        tech: [
          'React.js',
          'Next.js',
          'Node.js',
          'Express.js',
          'MongoDB',
          'TypeScript',
          'JWT',
          'TanStack Query',
        ],
      },
      {
        id: 2,
        title: 'Multi-Tenant SaaS Platform',
        liveUrl: 'https://ezybuss.com/en',
        description:
          'Scalable MERN-based SaaS platform enabling users to launch portfolio or eCommerce sites with tenant isolation, dynamic templates, and domain integration.',
        responsibilities: [
          'Designed tenant-aware API routes and middleware for secure data isolation',
          'Built dashboard APIs for template selection and dynamic content management',
          'Integrated authentication, authorization, and multi-language content delivery',
        ],
        tech: [
          'React.js',
          'Next.js',
          'Node.js',
          'Express.js',
          'MongoDB',
          'Mongoose',
          'TypeScript',
          'Zustand',
        ],
      },
    ],
  },
  education: [
    {
      id: 1,
      degree: 'B.S.C EEE',
      institution: 'World University of Bangladesh',
      period: '2018 - 2022',
      location: 'Dhaka, Bangladesh',
    },
    {
      id: 2,
      degree: 'DIPLOMA IN ELECTRICAL',
      institution: 'Mangrove Institute of Science and Technology',
      period: '2013 - 2017',
      location: 'Khulna, Bangladesh',
    },
  ],
  additionalTraining: {
    title: 'Programming Hero – Full Stack Web Development',
    description:
      'Front End Web Development Level 1 & 2, Node.js, Express, MongoDB, and API integration (Completed)',
  },
  personalProjects: [
    {
      id: 1,
      title: 'Services Marketplace',
      duration: 'Live Project',
      description:
        'Full-stack location-based marketplace connecting users with nearby service providers — built with MERN stack and JWT-secured APIs.',
      features: [
        'REST APIs for provider discovery, category filtering, and profile management',
        'MongoDB schemas for users, providers, services, and location-based queries',
        'JWT authentication with protected routes and role-scoped endpoints',
        'React/Next.js frontend with TanStack Query for efficient server-state caching',
        'Search, filter, and mobile-first UI for fast local provider lookup',
      ],
      liveLink: 'https://www.service64.com/',
      tech: [
        'MongoDB',
        'Express.js',
        'React.js',
        'Node.js',
        'Next.js',
        'TypeScript',
        'Mongoose',
        'JWT',
        'Zustand',
        'TanStack Query',
      ],
    },
  ],
  softSkills: [
    {
      id: 1,
      title: 'Problem Solving',
      description:
        'Breaks down full-stack issues across API, database, and UI layers to deliver reliable fixes.',
    },
    {
      id: 2,
      title: 'Team Collaboration',
      description:
        'Works closely with frontend, backend, and QA teams in agile delivery cycles.',
    },
    {
      id: 3,
      title: 'Time Management',
      description:
        'Delivers API features and UI integrations on schedule in fast-paced environments.',
    },
  ],
  languages: [
    { id: 1, name: 'Bengali', level: 'Native' },
    { id: 2, name: 'English', level: 'Fluent' },
  ],
  certifications: [
    {
      id: 1,
      name: 'Front End Web Development – Level 1 & 2',
      issuer: 'Programming Hero',
    },
    { id: 2, name: 'Responsive Web Design', issuer: 'freeCodeCamp' },
  ],
};

export type MernCvData = typeof mernCvData;
