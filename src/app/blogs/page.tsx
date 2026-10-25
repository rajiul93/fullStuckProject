import type { Metadata } from 'next';
import { PortfolioShell } from '@/components/portfolio/shell';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { blogPosts } from '@/components/portfolio/blog-data';
import { ArticleCard } from '@/components/portfolio/article-card';
export const metadata: Metadata = {
  title: 'Writing on React, Next.js & the MERN Stack',
  description:
    'Development notes by Rajiul Islam on front-end performance, Next.js and state management for MERN stack apps.',
  alternates: { canonical: '/blogs' },
};
export default function BlogsPage() {
  return (
    <PortfolioShell>
      <main
        id="main-content"
        className="portfolio-container portfolio-articles-page"
      >
        <SectionHeading
          id="writing-heading"
          eyebrow="Notes from my desk"
          title="Thoughts on building for the web."
        />
        <div className="articles-grid">
          {blogPosts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </PortfolioShell>
  );
}
