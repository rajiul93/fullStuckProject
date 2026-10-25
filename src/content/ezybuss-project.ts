import type { Project } from '@/type/front/project-data-type';

// Public UI reviewed on 2026-10-25. Dashboard/tenant capabilities are described
// from the public product overview and the existing frontend CV project record.
export const ezybussProject: Project = {
  id: '4',
  title: 'EzyBuss — Multi-Tenant Website Builder',
  description:
    'A multi-tenant website builder with industry templates, storefront previews, domain-management interfaces and a guided publishing workflow for branded ecommerce, portfolio and business websites.',
  category: 'large',
  image: '/images/project/ezybuss-thumbnail.png',
  images: [
    {
      id: 'ezybuss-thumbnail',
      url: '/images/project/ezybuss-thumbnail.png',
      name: 'EzyBuss — desktop and mobile thumbnail',
    },
    {
      id: 'ezybuss-desktop',
      url: '/images/project/ezybuss-desktop.png',
      name: 'EzyBuss — current desktop homepage',
    },
    {
      id: 'ezybuss-templates',
      url: '/images/project/ezybuss-templates.png',
      name: 'EzyBuss — public template gallery',
    },
    {
      id: 'ezybuss-mobile',
      url: '/images/project/ezybuss-mobile.png',
      name: 'EzyBuss — current mobile homepage',
    },
  ],
  clientLink: 'https://ezybuss.com/en',
  tags: [
    'Next.js',
    'React.js',
    'TypeScript',
    'Tailwind CSS',
    'Lexical Editor',
    'Zustand',
    'TanStack Query',
    'TanStack Table',
    'Axios',
    'Stripe',
    'Next Intl',
    'Recharts',
    'Zod',
    'React Hook Form',
  ],
  features: [
    {
      title: 'Industry Template Gallery',
      description:
        'Browse designs for ecommerce, portfolios, business services and consulting, with category and template-selection controls.',
    },
    {
      title: 'Live Template Previews',
      description:
        'Template cards provide preview links; the ecommerce preview opens a sample storefront for inspecting the design.',
    },
    {
      title: 'Independent Site Branding',
      description:
        'The multi-tenant platform presents separate branding, themes, site content and administration for each business.',
    },
    {
      title: 'Domain Search & Selection',
      description:
        'Domain search controls, extension pricing and a domain cart form the public domain-selection interface.',
    },
    {
      title: 'Content & Commerce Dashboard Overview',
      description:
        'The product overview describes centralized controls for pages, products, orders, media and analytics.',
    },
    {
      title: 'Language & RTL Support',
      description:
        'English and Arabic language choices are visible; the platform also advertises right-to-left layout support.',
    },
    {
      title: 'Guided Website Launch',
      description:
        'A visible setup sequence connects template selection, domain configuration, content customization and publication.',
    },
    {
      title: 'SEO & Media Overview',
      description:
        'Public feature descriptions cover page metadata, server-rendered content and image optimization.',
    },
  ],
};
