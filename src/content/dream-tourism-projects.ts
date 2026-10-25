import type { Project } from '@/type/front/project-data-type';

// Technology details come from the existing frontend CV's multi-brand tourism
// project. Features describe public interfaces reviewed on 2026-10-25.
const tags = [
  'Next.js',
  'React.js',
  'TypeScript',
  'Tailwind CSS',
  'TanStack Query',
  'REST API',
];

export const dreamTourismProjects: Project[] = [
  {
    id: 'dream-ziarah',
    title: 'Dream Ziarah',
    category: 'medium',
    description:
      'A Saudi Ziyarat tour discovery frontend with destination and date search, tour filters, detailed itineraries and availability controls for Makkah, Madinah, Jeddah and Taif.',
    clientLink: 'https://dreamziarah.com/',
    image: '/images/project/dream/dream-ziarah-showcase.png',
    images: [
      {
        id: 'dream-ziarah-cover',
        url: '/images/project/dream/dream-ziarah-showcase.png',
        name: 'Dream Ziarah — supplied travel showcase',
      },
    ],
    tags: [...tags],
    features: [
      {
        title: 'Destination & Date Search',
        description: 'Search Ziyarat experiences by location and travel dates.',
      },
      {
        title: 'Tour Catalog Filters',
        description:
          'Refine the collection by city, duration, language, cancellation options and price.',
      },
      {
        title: 'Destination Pages',
        description:
          'Dedicated discovery pages for Makkah, Madinah, Jeddah and Taif.',
      },
      {
        title: 'Tour Details & Availability',
        description:
          'Photo galleries, tour sections, traveler/date selection and availability controls.',
      },
      {
        title: 'Currency Selection',
        description:
          'A shared currency selector supports international visitors across the travel interface.',
      },
    ],
  },
  {
    id: 'dream-tourism-italy',
    title: 'Dream Tourism Italy',
    category: 'medium',
    description:
      'An Italy and Europe tour discovery frontend with destination search, catalog filters, detailed itineraries and date-based availability controls, connected to a shared travel API.',
    clientLink: 'https://dreamtourism.it/',
    image: '/images/project/dream/dream-tourism-italy-showcase.png',
    images: [
      {
        id: 'dream-italy-cover',
        url: '/images/project/dream/dream-tourism-italy-showcase.png',
        name: 'Dream Tourism Italy — supplied travel showcase',
      },
      {
        id: 'dream-italy-alternate',
        url: '/images/project/dream/dream-tourism-italy-showcase-alternate.png',
        name: 'Dream Tourism Italy — alternate supplied showcase',
      },
    ],
    tags: [...tags],
    features: [
      {
        title: 'Tour Search & Categories',
        description:
          'Popular, attraction, daily and multi-day categories with destination, tour type and duration search.',
      },
      {
        title: 'Catalog Filtering & Sorting',
        description:
          'Country, tour type, price and language filters with sorting controls.',
      },
      {
        title: 'Detailed Tour Pages',
        description:
          'Galleries, highlights, itineraries, meeting points and inclusions/exclusions help visitors compare experiences.',
      },
      {
        title: 'Date & Traveler Controls',
        description:
          'Date, time and traveler selectors display a price summary and availability control.',
      },
      {
        title: 'Destinations & Travel Content',
        description:
          'Destination pages, travel articles and a currency selector support the discovery experience.',
      },
    ],
  },
  {
    id: 'dream-tourism-uk',
    title: 'Dream Tourism UK',
    category: 'medium',
    description:
      'A UK-branded European travel frontend with destination search, European tour collections, UK day-trip discovery and multi-day packages, powered by the shared multi-brand travel API.',
    clientLink: 'https://dreamtourism.co.uk/',
    image: '/images/project/dream/dream-tourism-uk-thumbnail.png',
    images: [
      {
        id: 'dream-uk-cover',
        url: '/images/project/dream/dream-tourism-uk-thumbnail.png',
        name: 'Dream Tourism UK — current website thumbnail',
      },
      {
        id: 'dream-uk-desktop',
        url: '/images/project/dream/dream-tourism-uk-desktop.png',
        name: 'Dream Tourism UK — actual desktop homepage',
      },
    ],
    tags: [...tags],
    features: [
      {
        title: 'Destination Search',
        description:
          'A location search interface helps visitors start exploring available tours.',
      },
      {
        title: 'UK & European Collections',
        description:
          'Separate homepage collections present European trips and UK day tours.',
      },
      {
        title: 'Multi-Day Discovery',
        description:
          'A dedicated collection introduces longer European tour packages.',
      },
      {
        title: 'Tour Cards & Detail Links',
        description:
          'Tour cards present duration, pricing and links into the tour detail experience.',
      },
      {
        title: 'International Visitor Controls',
        description:
          'Currency selection, account access and contact navigation support the UK-facing site.',
      },
    ],
  },
];
