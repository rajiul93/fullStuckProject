'use client';
/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  GripVertical,
  Pencil,
  Search,
  Trash2,
} from 'lucide-react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';
import type { Project } from '@/type/front/project-data-type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function SortableProjectRow({
  project,
  disabled,
  position,
  children,
}: {
  project: Project;
  disabled: boolean;
  position: number;
  children: ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id, disabled });
  return (
    <TableRow
      ref={setNodeRef}
      aria-label={project.title}
      data-project-id={project.id}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        position: 'relative',
        zIndex: isDragging ? 1 : undefined,
        opacity: isDragging ? 0.75 : 1,
      }}
    >
      <TableCell className="w-16">
        <div className="flex items-center gap-1">
          <button
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            type="button"
            disabled={disabled}
            aria-label={`Move ${project.title}`}
            title="Drag to reorder, or press Space then use arrow keys"
            className="admin-row-action touch-none cursor-grab active:cursor-grabbing disabled:cursor-default disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <GripVertical size={16} />
          </button>
          <span className="text-[10px] tabular-nums text-muted-foreground">
            {position}
          </span>
        </div>
      </TableCell>
      {children}
    </TableRow>
  );
}

export function DataTable({
  projects,
  busy,
  onEdit,
  onDelete,
  onReorder,
}: {
  projects: Project[];
  busy: boolean;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onReorder: (ids: string[]) => void;
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [reverse, setReverse] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const reorderDisabled = busy || !!search || status !== 'all' || reverse;
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
        .sort((a, b) => (reverse ? b.title.localeCompare(a.title) : 0)),
    [projects, search, status, reverse],
  );
  function onDragEnd({ active, over }: DragEndEvent) {
    if (reorderDisabled || !over || active.id === over.id) return;
    const from = projects.findIndex((project) => project.id === active.id);
    const to = projects.findIndex((project) => project.id === over.id);
    if (from < 0 || to < 0) return;
    onReorder(arrayMove(projects, from, to).map((project) => project.id));
  }
  return (
    <section className="admin-project-table" aria-label="Project collection">
      <div className="admin-table-toolbar">
        <div>
          <h2 className="text-sm font-semibold">Project collection</h2>
          <p className="mt-1 text-[11px] text-muted-foreground">
            New and updated projects appear first. Drag rows to change the
            homepage order.
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
      <p className="px-4 pb-3 text-[11px] text-muted-foreground">
        {search || status !== 'all' || reverse
          ? 'Clear search, select All statuses and use display order to reorder projects.'
          : 'Use the drag handle, or focus it and press Space, arrow keys, then Space to save.'}
      </p>
      {reverse && (
        <button
          type="button"
          className="mx-4 mb-3 text-xs underline"
          onClick={() => setReverse(false)}
        >
          Use display order
        </button>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <span className="sr-only">Position</span>
              </TableHead>
              <TableHead>
                <button
                  type="button"
                  aria-pressed={reverse}
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
            <SortableContext
              items={rows.map((project) => project.id)}
              strategy={verticalListSortingStrategy}
            >
              {rows.map((project) => (
                <SortableProjectRow
                  key={project.id}
                  project={project}
                  disabled={reorderDisabled}
                  position={projects.indexOf(project) + 1}
                >
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
                </SortableProjectRow>
              ))}
            </SortableContext>
          </TableBody>
        </Table>
      </DndContext>
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
