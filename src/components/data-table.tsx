'use client';
/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Pencil,
  Search,
  Trash2,
} from 'lucide-react';
import type { Project } from '@/type/front/project-data-type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function DataTable({
  projects,
  busy,
  onEdit,
  onDelete,
}: {
  projects: Project[];
  busy: boolean;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [reverse, setReverse] = useState(false);
  const rows = useMemo(
    () =>
      projects
        .filter(
          (project) =>
            (!search ||
              `${project.title} ${project.tags.join(' ')}`
                .toLowerCase()
                .includes(search.toLowerCase())) &&
            (status === 'all' ||
              (status === 'published'
                ? project.published
                : !project.published)),
        )
        .sort((a, b) =>
          reverse
            ? b.title.localeCompare(a.title)
            : (a.sortOrder || 0) - (b.sortOrder || 0),
        ),
    [projects, search, status, reverse],
  );
  return (
    <section className="admin-project-table" aria-label="Project collection">
      <div className="admin-table-toolbar">
        <div>
          <h2 className="text-sm font-semibold">Project collection</h2>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Manage what the world sees.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="admin-table-search">
            <Search size={14} />
            <input
              aria-label="Search projects"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects…"
            />
          </label>
          <select
            aria-label="Filter projects by status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="admin-table-select"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <button
                type="button"
                onClick={() => setReverse(!reverse)}
                className="flex items-center gap-2"
              >
                Project{' '}
                {reverse ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
              </button>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Images</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((project) => (
            <TableRow key={project.id} aria-label={project.title}>
              <TableCell>
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={project.image}
                    alt=""
                    width="58"
                    height="42"
                    className="h-[42px] w-[58px] shrink-0 rounded-md border border-white/10 bg-muted object-cover object-top"
                  />
                  <div className="min-w-0">
                    <h3 className="max-w-[280px] truncate text-xs font-semibold">
                      {project.title}
                    </h3>
                    <p className="mt-1 hidden text-[10px] text-muted-foreground sm:block">
                      {project.tags.slice(0, 3).join(' · ')}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-xs capitalize text-muted-foreground">
                {project.category}
              </TableCell>
              <TableCell>
                <span
                  className={`admin-status ${project.published ? 'status-published' : 'status-draft'}`}
                >
                  <span />
                  {project.published ? 'Published' : 'Draft'}
                </span>
              </TableCell>
              <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                {project.images?.length || 0}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  {project.clientLink && (
                    <a
                      aria-label={`Visit ${project.title}`}
                      href={project.clientLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-row-action hidden sm:inline-flex"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => onEdit(project)}
                    className="admin-row-action"
                    aria-label="Edit"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => onDelete(project)}
                    className="admin-row-action text-red-300"
                    aria-label="Delete"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!rows.length && (
        <p className="px-6 py-12 text-center text-sm text-muted-foreground">
          No projects match your search.
        </p>
      )}
      <div className="admin-table-footer">
        {rows.length} of {projects.length} projects
      </div>
    </section>
  );
}
