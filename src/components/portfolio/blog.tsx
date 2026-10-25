import { ArrowRight } from 'lucide-react';
import { blogPosts } from './blog-data';
import { ArticleCard } from './article-card';
import { Reveal } from './motion';
import { Eyebrow } from './section-heading';

export default function PortfolioBlog() {
  return (
    <section
      id="blog"
      className="portfolio-section portfolio-container portfolio-blog-section"
      aria-labelledby="blog-heading"
    >
      <Reveal className="blog-heading-row">
        <div>
          <Eyebrow>Notes from my desk</Eyebrow>
          <h2 id="blog-heading">
            Thoughts on building
            <br />
            <span className="lime">for the web.</span>
          </h2>
        </div>
        <a href="/blogs" className="portfolio-text-link">
          View all articles <ArrowRight size={15} />
        </a>
      </Reveal>
      <Reveal group className="articles-grid">
        {blogPosts.map((post) => (
          <div data-reveal-item key={post.id}>
            <ArticleCard post={post} />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
