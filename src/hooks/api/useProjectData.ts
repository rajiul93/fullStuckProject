import { Project } from '@/type/front/project-data-type';

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    category: 'large',
    image: '/projects/ecommerce.jpg',
    clientLink: 'https://demo-ecommerce.com',
    serverLink: 'https://github.com/user/ecommerce-server',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
  },
  {
    id: 'proj-2',
    title: 'Task Management App',
    description:
      'Collaborative task management tool with real-time updates and team features.',
    category: 'medium',
    image: '/projects/task-app.jpg',
    clientLink: 'https://demo-tasks.com',
    serverLink: 'https://github.com/user/task-server',
    tags: ['React', 'Express', 'MongoDB', 'Socket.io'],
  },
  {
    id: 'proj-3',
    title: 'Portfolio Website',
    description:
      'Modern portfolio website with smooth animations and responsive design.',
    category: 'small',
    image: '/projects/portfolio.jpg',
    clientLink: 'https://demo-portfolio.com',
    tags: ['Next.js', 'Tailwind', 'Framer Motion'],
  },
  {
    id: 'proj-4',
    title: 'Blog Platform',
    description:
      'Content management system with markdown support and SEO optimization.',
    category: 'medium',
    image: '/projects/blog.jpg',
    clientLink: 'https://demo-blog.com',
    serverLink: 'https://github.com/user/blog-server',
    tags: ['Next.js', 'MDX', 'Prisma'],
  },
  {
    id: 'proj-5',
    title: 'Landing Page',
    description:
      'High-converting landing page with form integration and analytics.',
    category: 'small',
    image: '/projects/landing.jpg',
    clientLink: 'https://demo-landing.com',
    tags: ['React', 'Tailwind', 'EmailJS'],
  },
  {
    id: 'proj-6',
    title: 'Social Media Dashboard',
    description:
      'Analytics dashboard for managing multiple social media accounts with scheduling features.',
    category: 'large',
    image: '/projects/social-dashboard.jpg',
    clientLink: 'https://demo-social.com',
    serverLink: 'https://github.com/user/social-server',
    tags: ['Next.js', 'Node.js', 'Redis', 'Chart.js'],
  },
];
