'use client';

import type { ReactElement } from 'react';
import { ArrowUpRight, Github, Globe, Server } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ProjectGallery from '@/components/common-component/project-gallery';
import type { Project } from '@/type/front/project-data-type';

export function publicProjectLink(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (
      !['https:', 'http:'].includes(url.protocol) ||
      (url.hostname === 'github.com' &&
        /^\/example(?:\/|$)/i.test(url.pathname))
    )
      return undefined;
    return value;
  } catch {
    return undefined;
  }
}

export function ProjectDetails({
  project,
  children,
}: {
  project: Project;
  children: ReactElement;
}) {
  const links = [
    { name: 'Live Demo', value: project.clientLink, Icon: Globe },
    {
      name: 'Frontend source',
      value: project.githubFrontendLink,
      Icon: Github,
    },
    { name: 'Backend source', value: project.githubBackendLink, Icon: Github },
    { name: 'Server', value: project.serverLink, Icon: Server },
  ].filter((link) => publicProjectLink(link.value));
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="portfolio-modal project-modal"
        data-project-id={project.id}
      >
        <DialogHeader>
          <p className="portfolio-eyebrow">
            PROJECT DETAILS · {project.category}
          </p>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        <div className="project-modal-body">
          <DialogDescription className="project-full-description">
            {project.description}
          </DialogDescription>
          <ProjectGallery
            images={
              project.images?.length
                ? project.images.map((image) => image.url)
                : [project.image]
            }
            title={project.title}
          />
          <section aria-label="Project technologies">
            <h3>Built with</h3>
            <div className="technology-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
          {project.features.length > 0 && (
            <section aria-label="Project features">
              <h3>Inside the project</h3>
              <ul className="project-features">
                {project.features.map((feature, index) => (
                  <li key={`${feature.title}-${index}`}>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        {links.length > 0 && (
          <div className="project-modal-links">
            {links.map(({ name, value, Icon }) => (
              <a
                key={name}
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-button button-secondary button-small"
              >
                <Icon size={15} />
                {name}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
