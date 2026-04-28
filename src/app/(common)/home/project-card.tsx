import ProjectImage from '@/components/common-component/project-image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Project } from '@/type/front/project-data-type';
import { Github, Globe, Server } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const ProjectCard = ({ project }: { project: Project }) => {
  const isPersonal = project.category === 'personal';
  const githubFrontend =
    isPersonal && project.githubFrontendLink && project.githubFrontendLink !== '#'
      ? project.githubFrontendLink
      : undefined;
  const githubBackend =
    isPersonal && project.githubBackendLink && project.githubBackendLink !== '#'
      ? project.githubBackendLink
      : undefined;

  return (
    <div
      className="group relative bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:border-white/40 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
      role="article"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Image */}
      <Suspense
        fallback={<div className="w-full h-64 bg-white/5 animate-pulse" />}
      >
        <ProjectImage src={project.image} alt={project.title} />
      </Suspense>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3
          id={`project-title-${project.id}`}
          className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors"
        >
          {project.title}
        </h3>

        <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div
          className="flex flex-wrap gap-2"
          role="list"
          aria-label="Project technologies"
        >
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/20 rounded-full border border-blue-400/30"
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
          {project.clientLink && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 text-white transition-all"
              aria-label={`View ${project.title} live demo`}
            >
              <Link
                href={project.clientLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-4 h-4 mr-2" aria-hidden="true" />
                Live Demo
              </Link>
            </Button>
          )}

          {githubFrontend && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 text-white transition-all"
              aria-label={`View ${project.title} frontend source code`}
            >
              <Link href={githubFrontend} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                Frontend
              </Link>
            </Button>
          )}

          {githubBackend && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 text-white transition-all"
              aria-label={`View ${project.title} backend source code`}
            >
              <Link href={githubBackend} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                Backend
              </Link>
            </Button>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 text-white transition-all"
                aria-label={`View ${project.title} details`}
              >
                <Server className="w-4 h-4 mr-2" aria-hidden="true" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="flex h-[85vh] gap-0! max-h-[85vh] max-w-2xl flex-col overflow-hidden border-white/20 bg-slate-950 p-0 text-white">
              <DialogHeader className="space-y-3">
                <DialogTitle className="px-6 pt-6 text-2xl font-bold text-white">
                  <span>{project.title}</span>{' '}
                  <Badge className="text-sm">{project.category}</Badge>
                </DialogTitle>
                <DialogDescription className="px-6 text-sm leading-7 whitespace-pre-line text-white/75">
                  {project.description}
                </DialogDescription>
              </DialogHeader>

              <div className="-mx-4 flex-1 space-y-6 overflow-y-auto px-10 pb-4">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-white">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium text-blue-200 bg-blue-500/20 rounded-full border border-blue-300/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-white">
                    Key Features
                  </p>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li
                        key={`${feature.title}-${index}`}
                        className="rounded-lg border border-white/10 bg-white/5 p-4"
                      >
                        <p className="text-sm font-medium text-white mb-1">
                          {feature.title}
                        </p>
                        <p className="text-sm leading-6 text-white/75 whitespace-pre-line">
                          {feature.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <DialogFooter className="mt-auto flex-col gap-3 border-t border-white/10 bg-slate-950 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:space-x-0">
                <div className="flex flex-wrap items-center gap-2">
                  {project.clientLink && (
                    <Button asChild variant="secondary" size="sm">
                      <Link
                        href={project.clientLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="w-4 h-4 mr-2" aria-hidden="true" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                </div>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto text-black"
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Glassmorphism overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default ProjectCard;
