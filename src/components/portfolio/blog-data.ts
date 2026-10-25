export const blogPosts = [
  {
    id: 1,
    title: 'Performance Optimization',
    description: 'How we optimize rendering, loading, and bundle size.',
    image: '/images/blog/performance.png',
    sections: [
      {
        title: 'Rendering Strategy',
        points: [
          'Split UI into server and client components so only interactive parts hydrate.',
          'Use memoization for expensive components and avoid unnecessary re-renders.',
          'Virtualize long lists when large datasets are rendered in the browser.',
        ],
      },
      {
        title: 'Loading Strategy',
        points: [
          'Use lazy loading for heavy components and below-the-fold sections.',
          'Preload critical assets and defer non-critical scripts.',
          'Cache API responses with a predictable stale-time strategy.',
        ],
      },
      {
        title: 'Bundle Optimization',
        points: [
          'Remove unused libraries and keep dependencies focused.',
          'Prefer tree-shakable modules and code-split route-level features.',
          'Track Core Web Vitals to validate real user performance impact.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Why Next.js',
    description: 'Why Next.js is better for modern production web apps.',
    image: '/images/blog/nextjs.png',
    sections: [
      {
        title: 'Performance by Default',
        points: [
          'Automatic route-level code splitting improves first load times.',
          'Server rendering options (SSR/SSG/ISR) let us pick the best strategy per page.',
          'Built-in image optimization keeps media fast without extra tooling.',
        ],
      },
      {
        title: 'Developer Productivity',
        points: [
          'File-based routing and App Router reduce boilerplate.',
          'Built-in bundling, lint integration, and TypeScript support simplify setup.',
          'Strong ecosystem and Vercel-first deployment workflow speed up shipping.',
        ],
      },
      {
        title: 'Scalability',
        points: [
          'Easy to mix static and dynamic pages in the same project.',
          'Works well with API routes, server actions, and edge runtimes.',
          'Excellent long-term maintainability for teams and products.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Zustand vs Redux',
    description: 'Why Zustand can be easier than Redux for many use-cases.',
    image: '/images/blog/zustand.png',
    sections: [
      {
        title: 'Less Boilerplate',
        points: [
          'No action type constants and reducer ceremony for simple states.',
          'Store setup is lightweight and easy to understand quickly.',
          'Direct state updates reduce mental overhead for small/medium apps.',
        ],
      },
      {
        title: 'Better Developer Experience',
        points: [
          'Simple API with hooks-first usage fits React components naturally.',
          'Selectors help avoid unnecessary re-renders.',
          'Good balance between flexibility and structure.',
        ],
      },
      {
        title: 'When Redux Is Better',
        points: [
          'Very large apps with strict architecture rules and middleware chains.',
          'Advanced debugging/audit requirements with complex action history.',
          'Teams already deeply standardized on Redux toolkit patterns.',
        ],
      },
    ],
  },
];

export type BlogPost = (typeof blogPosts)[number];
