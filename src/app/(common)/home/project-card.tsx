'use client';

import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ProjectGallery from '@/components/common-component/project-gallery';
import {
  ProjectDetails,
  publicProjectLink,
} from '@/components/portfolio/project-details';
import type { Project } from '@/type/front/project-data-type';

export default function ProjectCard({
  project,
  variant = 'collection',
}: {
  project: Project;
  variant?: 'collection' | 'selected' | 'featured';
}) {
  const live = publicProjectLink(project.clientLink);
  const images = project.images?.length
    ? project.images.map((image) => image.url)
    : [project.image];
  return (
    <article
      className={`portfolio-project-card project-${variant}`}
      data-category={project.category}
      data-project-id={project.id}
    >
      <div className="project-visual">
        <ProjectGallery images={images} title={project.title} />
      </div>
      <div className="project-card-copy">
        {variant === 'featured' && (
          <span className="featured-label">FEATURED PROJECT</span>
        )}
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="technology-tags" aria-label="Project technologies">
          {project.tags
            .slice(0, variant === 'collection' ? 3 : 4)
            .map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          {project.tags.length > (variant === 'collection' ? 3 : 4) && (
            <span
              className="more-tags"
              aria-label={`${project.tags.length - (variant === 'collection' ? 3 : 4)} more technologies`}
            >
              +{project.tags.length - (variant === 'collection' ? 3 : 4)}
            </span>
          )}
        </div>
        <div className="project-card-links">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-text-link"
              aria-label={`View ${project.title} live demo`}
            >
              Live Demo <ArrowUpRight size={15} />
            </a>
          )}
          <ProjectDetails project={project}>
            <button
              type="button"
              className={
                variant === 'collection'
                  ? 'project-text-link'
                  : 'project-circle-link'
              }
              aria-label={`View ${project.title} details`}
            >
              <span className={variant === 'collection' ? '' : 'sr-only'}>
                Details
              </span>
              <ArrowRight size={variant === 'collection' ? 16 : 21} />
            </button>
          </ProjectDetails>
        </div>
      </div>
    </article>
  );
}
