'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowRight } from 'lucide-react';
import type { Project } from '@/type/front/project-data-type';
import ProjectCard from '@/app/(common)/home/project-card';
import { Reveal, entrance } from './motion';
import { SectionHeading } from './section-heading';

const filters = ['all', 'personal', 'small', 'medium', 'large'] as const;
type Filter = (typeof filters)[number];
export default function PortfolioProjects({
  initialProjects,
  initialError = false,
}: {
  initialProjects?: Project[];
  initialError?: boolean;
}) {
  const {
    data: projects = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['public-projects'],
    initialData: initialProjects,
    queryFn: async (): Promise<Project[]> => {
      const response = await fetch('/api/projects', { cache: 'no-store' });
      if (!response.ok)
        throw new Error('Projects are temporarily unavailable.');
      return (await response.json()).projects;
    },
    refetchOnWindowFocus: true,
  });
  const [filter, setFilter] = useState<Filter>('all');
  const [filteredOnce, setFilteredOnce] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const curated = ['3', '4', 'prep-study-platform'].flatMap(
    (id) => projects.find((project) => project.id === id) || [],
  );
  const visible = projects.filter(
    (project) => filter === 'all' || project.category === filter,
  );
  function onFilterKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % filters.length;
    else if (event.key === 'ArrowLeft')
      next = (index - 1 + filters.length) % filters.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = filters.length - 1;
    else return;
    event.preventDefault();
    setFilteredOnce(true);
    setFilter(filters[next]);
    tabs.current[next]?.focus();
  }
  const failed = isError || (initialError && isPending);
  return (
    <>
      <section
        id="selected-work"
        className="portfolio-section portfolio-container"
        aria-labelledby="selected-heading"
      >
        <Reveal>
          <SectionHeading
            id="selected-heading"
            eyebrow="Selected work"
            title={
              <>
                A few things I&apos;ve built<span className="lime">.</span>
              </>
            }
          >
            <div className="selected-heading-aside">
              <p>
                Production React and Next.js work across travel booking,
                multi-tenant SaaS and commerce platforms. Front-end first,
                built on REST APIs and the MERN stack.
              </p>
              <a href="#projects" className="portfolio-text-link">
                Browse all projects <ArrowDown size={15} />
              </a>
            </div>
          </SectionHeading>
        </Reveal>
        {curated.length > 0 && (
          <Reveal group className="selected-projects">
            {curated.map((project, index) => (
              <div
                key={project.id}
                data-reveal-item
                className={index === 0 ? 'selected-lead' : ''}
              >
                <ProjectCard
                  project={project}
                  variant={index === 0 ? 'featured' : 'selected'}
                />
              </div>
            ))}
          </Reveal>
        )}
        {!curated.length && !isPending && !failed && (
          <p className="portfolio-empty">
            Selected projects will appear here as they are published.
          </p>
        )}
      </section>
      <section
        id="projects"
        className="portfolio-section portfolio-container"
        aria-labelledby="projects-heading"
      >
        <Reveal>
          <SectionHeading
            id="projects-heading"
            eyebrow="All projects"
            title={
              <>
                More things I&apos;ve built<span className="lime">.</span>
              </>
            }
          >
            <p className="collection-intro">Explore the full collection.</p>
          </SectionHeading>
        </Reveal>
        <div className="project-collection-toolbar">
          <p className="project-count" aria-live="polite">
            {isPending
              ? 'Loading projects…'
              : `${visible.length} ${visible.length === 1 ? 'project' : 'projects'}${filter === 'all' ? ' in the collection' : ` · ${filter}`}`}
          </p>
          <LayoutGroup id="project-filters">
            <div
              role="tablist"
              aria-label="Project categories"
              className="project-filters"
            >
              {filters.map((value, index) => (
                <button
                  key={value}
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`filter-${value}`}
                  aria-controls="project-grid"
                  aria-selected={filter === value}
                  tabIndex={filter === value ? 0 : -1}
                  onKeyDown={(event) => onFilterKey(event, index)}
                  onClick={() => {
                    setFilteredOnce(true);
                    setFilter(value);
                  }}
                  className={`project-filter ${filter === value ? 'is-active' : ''}`}
                >
                  {filter === value && (
                    <motion.span
                      className="filter-indicator"
                      layoutId="active-project-filter"
                      transition={{ duration: reduced ? 0 : 0.25 }}
                    />
                  )}
                  <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>
        {failed && (
          <div role="alert" className="portfolio-empty">
            Projects are temporarily unavailable.{' '}
            <button
              type="button"
              className="portfolio-text-link"
              onClick={() => refetch()}
            >
              Try again <ArrowRight size={14} />
            </button>
          </div>
        )}
        <div
          role="tabpanel"
          id="project-grid"
          aria-labelledby={`filter-${filter}`}
          tabIndex={0}
          className="project-grid"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((project, index) => (
              <motion.div
                key={project.id}
                layout={!reduced}
                data-project-item
                initial={
                  filteredOnce && !reduced ? { opacity: 0, y: 16 } : false
                }
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                transition={{
                  layout: { duration: reduced ? 0 : 0.3 },
                  opacity: { duration: reduced ? 0 : 0.22 },
                  y: {
                    ...entrance,
                    duration: reduced ? 0 : 0.45,
                    delay: Math.min(index, 5) * 0.04,
                  },
                }}
              >
                <Reveal delay={Math.min(index % 3, 2) * 0.07}>
                  <ProjectCard project={project} />
                </Reveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {!visible.length && !isPending && !failed && (
          <p className="portfolio-empty">No projects in this category yet.</p>
        )}
      </section>
    </>
  );
}
