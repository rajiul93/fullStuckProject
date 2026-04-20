// import CustomButton from '@/components/common-component/coustom-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import React from 'react';

const BlogSection = () => {
  const blogPosts = [
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
      image: '/images/blog/performance.png',
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

  return (
    <section
      id="blog"
      className="scroll-mt-24 max-w-7xl mx-auto px-6 py-16"
      aria-labelledby="blog-heading"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 id="blog-heading" className="text-3xl font-bold">BLOG</h2>
        {/* <CustomButton title="VIEW BLOG" /> */}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Dialog key={post.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2 text-white">{post.title}</h3>
                  <p className="text-sm text-gray-300">{post.description}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl border-white/20 bg-slate-950 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl">{post.title}</DialogTitle>
                <DialogDescription className="text-white/70 leading-7">
                  {post.description}
                </DialogDescription>
              </DialogHeader>

              <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-5">
                {post.sections.map((section) => (
                  <div
                    key={section.title}
                    className="rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <h4 className="mb-2 text-base font-semibold text-white">
                      {section.title}
                    </h4>
                    <ul className="space-y-2 text-sm leading-6 text-white/75">
                      {section.points.map((point) => (
                        <li key={point} className="list-disc ml-5">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      {/* <div className="text-center mt-8">
        <Button className="bg-gradient-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 backdrop-blur-sm border border-white/20 transition-all duration-300">
          READ ALL POSTS
        </Button>
      </div> */}
    </section>
  );
};

export default BlogSection;
