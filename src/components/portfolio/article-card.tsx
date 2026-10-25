'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { BlogPost } from './blog-data';

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="article-card">
      <div className="article-image">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="article-copy">
        <p className="article-category">DEVELOPMENT NOTES</p>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="project-circle-link"
              aria-label={`Read article: ${post.title}`}
            >
              <ArrowRight size={17} />
            </button>
          </DialogTrigger>
          <DialogContent className="portfolio-modal article-modal">
            <DialogHeader>
              <p className="portfolio-eyebrow">NOTES FROM MY DESK</p>
              <DialogTitle>{post.title}</DialogTitle>
              <DialogDescription>{post.description}</DialogDescription>
            </DialogHeader>
            <div className="article-modal-body">
              {post.sections.map((section) => (
                <section key={section.title}>
                  <h3>{section.title}</h3>
                  <ul>
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}
