import ProjectImage from '@/components/common-component/project-image';
import { Button } from '@/components/ui/button';
import { Project } from '@/type/front/project-data-type';
import { ExternalLink, Globe, Server } from 'lucide-react';
import Link from 'next/dist/client/link';
import { Suspense } from 'react';

const ProjectCard = ({ project }: { project: Project }) => {
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
        <div className="flex gap-3 pt-4 border-t border-white/10">
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
          {project.serverLink && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 text-white transition-all"
              aria-label={`View ${project.title} source code`}
            >
              <Link
                href={project.serverLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Server className="w-4 h-4 mr-2" aria-hidden="true" />
                Source Code
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Glassmorphism overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default ProjectCard;
