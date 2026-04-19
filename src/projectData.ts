import { Project } from './type/front/project-data-type';

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description:
      'Modern personal portfolio with responsive layout, animations, and project showcase.',
    category: 'small',
    image: '/images/project/portfolio.png',
    clientLink: 'https://rajiul-portfolio.vercel.app',
    serverLink: 'https://github.com/example/portfolio',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: '2',
    title: 'Business Dashboard',
    description:
      'Admin dashboard with analytics widgets, role-based modules, and clean UI components.',
    category: 'medium',
    image: '/images/project/agency.png',
    clientLink: 'https://example.com/dashboard',
    serverLink: 'https://github.com/example/dashboard',
    tags: ['React', 'TanStack Query', 'Shadcn UI'],
  },
  {
    id: '3',
    title: 'Business Dashboard',
    description:
      'Admin dashboard with analytics widgets, role-based modules, and clean UI components.',
    category: 'large',
    image: '/images/project/ota.png',
    clientLink: 'https://example.com/dashboard',
    serverLink: 'https://github.com/example/dashboard',
    tags: ['React', 'TanStack Query', 'Shadcn UI'],
  },
  {
    id: '4',
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce platform with products, cart, checkout and order tracking.',
    category: 'large',
    image: '/images/project/ecommerce-home.png',
    clientLink: 'https://example.com/shop',
    serverLink: 'https://github.com/example/ecommerce',
    tags: ['Next.js', 'MongoDB', 'Stripe'],
  },
  {
    id: '5',
    title: 'Multi-tenant Architecture',
    description:
      'Full-stack e-commerce platform with products, cart, checkout and order tracking.',
    category: 'large',
    image: '/images/project/saas.png',
    clientLink: 'https://example.com/shop',
    serverLink: 'https://github.com/example/ecommerce',
    tags: ['Next.js', 'MongoDB', 'Stripe'],
  },
  {
    id: '5',
    title: 'Services Marketplace',
    description:
      'Full-stack e-commerce platform with products, cart, checkout and order tracking.',
    category: 'medium',
    image: '/images/project/service.png',
    clientLink: 'https://example.com/shop',
    serverLink: 'https://github.com/example/ecommerce',
    tags: ['Next.js', 'MongoDB', 'Stripe'],
  },
];
