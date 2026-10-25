'use client';
/* eslint-disable @next/next/no-img-element */
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import type { Project } from '@/type/front/project-data-type';
import { projectSchema } from '@/lib/project-validation';
import { adminApi } from './api';
import { SectionCards } from '@/components/section-cards';
import { DataTable } from '@/components/data-table';
import { Plus } from 'lucide-react';

type ImageItem = { id: string; url: string; name: string };
type Draft = {
  id?: string;
  title: string;
  description: string;
  category: Project['category'];
  githubFrontendLink: string;
  githubBackendLink: string;
  clientLink: string;
  serverLink: string;
  tags: string;
  features: Project['features'];
  images: ImageItem[];
  published: boolean;
  sortOrder: number;
};
const blank = (): Draft => ({
  title: '',
  description: '',
  category: 'personal',
  githubFrontendLink: '',
  githubBackendLink: '',
  clientLink: '',
  serverLink: '',
  tags: '',
  features: [],
  images: [],
  published: true,
  sortOrder: 0,
});
const inputClass =
  'w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-blue-400';
const buttonClass =
  'rounded-lg border border-input px-3 py-2 text-sm hover:bg-white/10 disabled:opacity-40';

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [unused, setUnused] = useState<ImageItem[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const load = useCallback(async () => {
    const [projectData, mediaData] = await Promise.all([
      adminApi<{ projects: Project[] }>('/api/admin/projects'),
      adminApi<{ images: ImageItem[] }>('/api/admin/media'),
    ]);
    setProjects(projectData.projects);
    setUnused(mediaData.images);
    setError('');
  }, []);
  useEffect(() => {
    load()
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [load]);
  function edit(project: Project) {
    window.scrollTo({ top: 0 });
    setDraft({
      ...blank(),
      ...project,
      githubFrontendLink: project.githubFrontendLink || '',
      githubBackendLink: project.githubBackendLink || '',
      clientLink: project.clientLink || '',
      serverLink: project.serverLink || '',
      tags: project.tags.join(', '),
      images: project.images || [],
      published: project.published ?? true,
      sortOrder: project.sortOrder ?? 0,
    });
  }
  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => current && { ...current, [key]: value });
  }
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!draft || !files.length) return;
    if (draft.images.length + files.length > 12) {
      toast.error('A project can have up to 12 images.');
      return;
    }
    if (
      files.some(
        (file) =>
          file.size > 4 * 1024 * 1024 ||
          !['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(
            file.type,
          ),
      )
    ) {
      toast.error('Use JPEG, PNG, WebP or GIF files, up to 4 MB each.');
      return;
    }
    setBusy('Uploading images…');
    try {
      for (const [index, file] of files.entries()) {
        setBusy(`Uploading image ${index + 1} of ${files.length}…`);
        const form = new FormData();
        form.append('file', file);
        const { image } = await adminApi<{ image: ImageItem }>(
          '/api/admin/media',
          { method: 'POST', body: form },
        );
        setDraft(
          (current) =>
            current && { ...current, images: [...current.images, image] },
        );
      }
      toast.success(
        'Images uploaded. Save the project to publish your changes.',
      );
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy('');
      await load().catch(() => undefined);
    }
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    const payload = {
      ...draft,
      tags: draft.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      imageIds: draft.images.map((image) => image.id),
    };
    const validation = projectSchema.safeParse(payload);
    if (!validation.success) {
      toast.error(
        validation.error.issues
          .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
          .join('; '),
      );
      return;
    }
    setBusy('Saving project…');
    try {
      await adminApi(`/api/admin/projects${draft.id ? `/${draft.id}` : ''}`, {
        method: draft.id ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });
      setDraft(null);
      window.scrollTo({ top: 0 });
      toast.success('Project saved.');
      await load();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy('');
    }
  }
  async function remove(project: Project) {
    if (
      !window.confirm(
        `Delete “${project.title}”? Its images will move to unused uploads.`,
      )
    )
      return;
    setBusy('Deleting project…');
    try {
      await adminApi(`/api/admin/projects/${project.id}`, { method: 'DELETE' });
      toast.success('Project deleted.');
      await load();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy('');
    }
  }
  async function removeImage(image: ImageItem) {
    if (!window.confirm(`Permanently delete “${image.name}” from storage?`))
      return;
    setBusy('Deleting image…');
    try {
      await adminApi(`/api/admin/media/${image.id}`, { method: 'DELETE' });
      await load();
      toast.success('Image deleted.');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy('');
    }
  }
  function moveImage(index: number, direction: number) {
    if (!draft) return;
    const images = [...draft.images];
    [images[index], images[index + direction]] = [
      images[index + direction],
      images[index],
    ];
    update('images', images);
  }
  if (loading) return <p role="status">Loading projects…</p>;
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-2 text-muted-foreground">
            Manage projects, galleries and publishing.
          </p>
        </div>
        {!draft && (
          <button
            disabled={!!busy}
            onClick={() => setDraft(blank())}
            className="rounded-lg bg-primary text-primary-foreground px-5 py-3 font-medium disabled:opacity-50"
          >
            <Plus size={15} className="mr-2 inline" />
            Add project
          </button>
        )}
      </div>
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/30 p-4 text-red-300"
        >
          {error}
          <button
            onClick={() => load().catch((error) => setError(error.message))}
            className="ml-4 underline"
          >
            Retry
          </button>
        </div>
      )}
      {busy && (
        <p role="status" className="text-primary">
          {busy}
        </p>
      )}
      {draft ? (
        <form onSubmit={save}>
          <fieldset
            disabled={!!busy}
            className="space-y-6 rounded-xl border border-border bg-card p-4 md:p-6"
          >
            <h2 className="text-xl font-semibold">
              {draft.id ? 'Edit project' : 'New project'}
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span>Project title</span>
                <input
                  className={inputClass}
                  value={draft.title}
                  onChange={(event) => update('title', event.target.value)}
                  required
                  maxLength={160}
                />
              </label>
              <label className="space-y-2">
                <span>Category</span>
                <select
                  className={inputClass}
                  value={draft.category}
                  onChange={(event) =>
                    update(
                      'category',
                      event.target.value as Project['category'],
                    )
                  }
                >
                  {['personal', 'small', 'medium', 'large'].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 md:col-span-2">
                <span>Description</span>
                <textarea
                  className={inputClass}
                  rows={4}
                  value={draft.description}
                  onChange={(event) =>
                    update('description', event.target.value)
                  }
                  required
                  minLength={10}
                  maxLength={12000}
                />
              </label>
              {(
                [
                  ['clientLink', 'Live demo URL'],
                  ['serverLink', 'Server URL'],
                  ['githubFrontendLink', 'GitHub frontend URL'],
                  ['githubBackendLink', 'GitHub backend URL'],
                ] as const
              ).map(([key, label]) => (
                <label className="space-y-2" key={key}>
                  <span>{label}</span>
                  <input
                    type="url"
                    className={inputClass}
                    value={draft[key]}
                    onChange={(event) => update(key, event.target.value)}
                    placeholder="https://"
                  />
                </label>
              ))}
              <label className="space-y-2">
                <span>Technologies (comma separated)</span>
                <input
                  className={inputClass}
                  value={draft.tags}
                  onChange={(event) => update('tags', event.target.value)}
                  placeholder="Next.js, TypeScript, PostgreSQL"
                />
              </label>
              <label className="space-y-2">
                <span>Display order (lowest first)</span>
                <input
                  type="number"
                  min="0"
                  max="100000"
                  required
                  className={inputClass}
                  value={draft.sortOrder}
                  onChange={(event) =>
                    update('sortOrder', Number(event.target.value))
                  }
                />
              </label>
            </div>
            <section className="space-y-4" aria-label="Project features">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Key features</h3>
                <button
                  type="button"
                  className={buttonClass}
                  disabled={draft.features.length >= 30}
                  onClick={() =>
                    update('features', [
                      ...draft.features,
                      { title: '', description: '' },
                    ])
                  }
                >
                  Add feature
                </button>
              </div>
              {draft.features.map((feature, index) => (
                <div
                  key={index}
                  className="space-y-3 rounded-lg border border-border p-4"
                >
                  <label className="block space-y-2">
                    <span className="text-sm">Feature {index + 1} title</span>
                    <input
                      className={inputClass}
                      value={feature.title}
                      required
                      onChange={(event) =>
                        update(
                          'features',
                          draft.features.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, title: event.target.value }
                              : item,
                          ),
                        )
                      }
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm">
                      Feature {index + 1} description
                    </span>
                    <textarea
                      rows={2}
                      className={inputClass}
                      value={feature.description}
                      required
                      onChange={(event) =>
                        update(
                          'features',
                          draft.features.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, description: event.target.value }
                              : item,
                          ),
                        )
                      }
                    />
                  </label>
                  <button
                    type="button"
                    className={buttonClass}
                    onClick={() =>
                      update(
                        'features',
                        draft.features.filter(
                          (_, itemIndex) => itemIndex !== index,
                        ),
                      )
                    }
                  >
                    Remove feature
                  </button>
                </div>
              ))}
            </section>
            <section className="space-y-4" aria-label="Project images">
              <h3 className="text-lg font-semibold">
                Project images ({draft.images.length}/12)
              </h3>
              <p className="text-sm text-muted-foreground">
                The first image is the cover. Reorder images to change the
                slider sequence. JPEG, PNG, WebP or GIF, up to 4 MB each.
              </p>
              <label className="block rounded-lg border border-dashed border-blue-400/50 p-5">
                <span className="mb-3 block">Upload multiple images</span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={upload}
                  disabled={draft.images.length >= 12}
                  className="w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary text-primary-foreground file:px-4 file:py-2 file:text-white"
                />
              </label>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {draft.images.map((image, index) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-lg border border-border"
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="h-32 w-full bg-slate-800 object-cover"
                    />
                    <div className="space-y-2 p-3">
                      <p className="truncate text-xs">
                        {index === 0 ? 'Cover · ' : `${index + 1} · `}
                        {image.name}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          aria-label={`Move image ${index + 1} earlier`}
                          disabled={index === 0}
                          className={buttonClass}
                          onClick={() => moveImage(index, -1)}
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          aria-label={`Move image ${index + 1} later`}
                          disabled={index === draft.images.length - 1}
                          className={buttonClass}
                          onClick={() => moveImage(index, 1)}
                        >
                          →
                        </button>
                        <button
                          type="button"
                          className={buttonClass}
                          onClick={() =>
                            update(
                              'images',
                              draft.images.filter(
                                (item) => item.id !== image.id,
                              ),
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {unused.filter(
                (image) =>
                  !draft.images.some((selected) => selected.id === image.id),
              ).length > 0 && (
                <details>
                  <summary className="cursor-pointer text-sm text-primary">
                    Choose from unused uploads
                  </summary>
                  <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {unused
                      .filter(
                        (image) =>
                          !draft.images.some(
                            (selected) => selected.id === image.id,
                          ),
                      )
                      .map((image) => (
                        <button
                          type="button"
                          disabled={draft.images.length >= 12}
                          key={image.id}
                          className="overflow-hidden rounded border border-input text-left disabled:opacity-40"
                          onClick={() =>
                            update('images', [...draft.images, image])
                          }
                        >
                          <img
                            className="h-24 w-full object-cover"
                            src={image.url}
                            alt=""
                          />
                          <span className="block truncate p-2 text-xs">
                            Use {image.name}
                          </span>
                        </button>
                      ))}
                  </div>
                </details>
              )}
            </section>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(event) => update('published', event.target.checked)}
                className="h-4 w-4"
              />
              <span>Published — show on portfolio</span>
            </label>
            <div className="flex gap-3 border-t border-border pt-5">
              <button className="rounded-lg bg-primary text-primary-foreground px-5 py-3 font-semibold">
                Save project
              </button>
              <button
                type="button"
                className={buttonClass}
                onClick={() => {
                  setDraft(null);
                  load().catch((error) => toast.error(error.message));
                }}
              >
                Cancel
              </button>
            </div>
          </fieldset>
        </form>
      ) : (
        <>
          <SectionCards projects={projects} />
          <DataTable
            projects={projects}
            busy={!!busy}
            onEdit={edit}
            onDelete={remove}
          />
          {!projects.length && !error && (
            <p className="rounded-xl border border-dashed border-input p-8 text-center text-muted-foreground">
              No projects yet. Configure{' '}
              <Link href="/admin/settings" className="text-primary underline">
                R2 settings
              </Link>
              , then add your first project or run the seed command to import
              existing projects.
            </p>
          )}
          {unused.length > 0 && (
            <section
              id="unused-uploads"
              className="space-y-4 border-t border-border pt-6"
            >
              <h2 className="text-xl font-semibold">
                Unused uploads ({unused.length})
              </h2>
              <p className="text-sm text-muted-foreground">
                Images from cancelled edits or deleted projects. Reuse them in a
                project, or permanently remove them from storage.
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {unused.map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-lg border border-border bg-card"
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="h-28 w-full object-cover"
                    />
                    <div className="space-y-2 p-3">
                      <p className="truncate text-xs">{image.name}</p>
                      <button
                        disabled={!!busy}
                        className={`${buttonClass} text-red-300`}
                        onClick={() => removeImage(image)}
                      >
                        Delete permanently
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
