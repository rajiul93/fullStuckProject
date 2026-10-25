import type { Metadata } from 'next';
import { PortfolioShell } from '@/components/portfolio/shell';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { blogPosts } from '@/components/portfolio/blog-data';
import { ArticleCard } from '@/components/portfolio/article-card';
export const metadata: Metadata = { title: 'Writing | Rajiul Islam' };
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
