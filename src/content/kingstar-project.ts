import type { Project } from '@/type/front/project-data-type';

// Public UI reviewed on 2026-10-25. Private agent tools are described as an
// overview because the authenticated agency portal was not inspected.
export const kingstarProject: Project = {
  id: '3',
  title: 'Kingstar Travel — Flight & B2B Travel Platform',
  description:
    'A refreshed travel platform combining flexible flight search, fare categories, visa discovery and agency onboarding, with a public-facing introduction to B2B ticketing tools.',
  category: 'large',
  image: '/images/project/kingstar-travel-thumbnail.png',
  images: [
    {
      id: 'kingstar-thumbnail',
      url: '/images/project/kingstar-travel-thumbnail.png',
      name: 'Kingstar Travel — desktop and mobile thumbnail',
    },
    {
      id: 'kingstar-desktop',
      url: '/images/project/kingstar-travel-desktop.png',
      name: 'Kingstar Travel — current desktop homepage',
    },
    {
      id: 'kingstar-mobile',
      url: '/images/project/kingstar-travel-mobile.png',
      name: 'Kingstar Travel — current mobile homepage',
    },
  ],
  clientLink: 'https://www.kingstartravel.com/',
  tags: [
    'Next.js',
    'React.js',
    'TypeScript',
    'Tailwind CSS',
    'Zustand',
    'TanStack Query',
    'TanStack Table',
    'Axios',
    'Stripe',
    'WebSocket',
    'Zod',
    'React Hook Form',
  ],
  features: [
    {
      title: 'Flexible Flight Search',
      description:
        'Airport, date, traveler and cabin controls with One Way, Round Trip and Multi City trip options.',
    },
    {
      title: 'Fare Categories',
      description:
        'Regular, Family, Student and Umrah fare choices are available directly in the flight-search interface.',
    },
    {
      title: 'Visa Catalog & Details',
      description:
        'Visa listings present categories, pricing, processing information and required-document details.',
    },
    {
      title: 'Agency Registration',
      description:
        'Company and representative information, currency preferences, logo uploads and digital-signature uploads in one onboarding form.',
    },
    {
      title: 'B2B Partner Journey',
      description:
        'A public onboarding guide explains account creation, agency requests, review and partner access.',
    },
    {
      title: 'Agent Ticketing Overview',
      description:
        'Public agency pages describe fare holds, issuance, e-tickets, branded invoices, markups and sub-agent tools.',
    },
    {
      title: 'Tour Discovery',
      description:
        'Homepage destination cards introduce travel packages and provide navigation to the tour collection.',
    },
    {
      title: 'Support & Contact',
      description:
        'Chat and WhatsApp entry points, with office contact information for Bangladesh and the UAE.',
    },
  ],
};
