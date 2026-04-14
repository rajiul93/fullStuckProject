'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDeleteProjectMutation, useProjectsQuery } from '@/hooks/frontend/useProject';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import UpdateProjectDialog from './components/update-project-dialog';
import type { ProjectInput } from '@/modules/project/project.validation';

function safeUrl(url?: string) {
  if (!url) return '';
  return url;
}

function ImageCell({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-12 w-12 overflow-hidden rounded border bg-muted">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
}

export default function ProjectsPage() {
  const { data: projects = [], isLoading } = useProjectsQuery();
  const deleteMutation = useDeleteProjectMutation();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Projects</h1>
        <Link href="/dashboard/contents/projects/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add new project
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Project Table</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading projects…</p>
          ) : projects.length === 0 ? (
            <p className="text-sm text-muted-foreground">No projects found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-14">SL</TableHead>
                  <TableHead className="w-20">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-32">Type</TableHead>
                  <TableHead className="w-24">Live</TableHead>
                  <TableHead className="w-28">Frontend</TableHead>
                  <TableHead className="w-28">Backend</TableHead>
                  <TableHead className="w-24">Image URL</TableHead>
                  <TableHead className="text-right w-[220px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((p, idx) => {
                  const defaultValues: ProjectInput = {
                    projectType: p.projectType ?? 'personal',
                    imageUrl: p.imageUrl,
                    title: p.title,
                    subTitle: p.subTitle,
                    skills: p.skills.map((skillId) => String(skillId)),
                    liveUrl: p.liveUrl,
                    gitFront: p.gitFront,
                    gitBackend: p.gitBackend,
                    details: p.details,
                  };

                  return (
                    <TableRow key={p._id ?? idx}>
                      <TableCell className="text-muted-foreground">
                        {idx + 1}
                      </TableCell>
                      <TableCell>
                        <ImageCell src={p.imageUrl} alt={p.title} />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <div>{p.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {p.subTitle}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{p.projectType ?? '-'}</TableCell>
                      <TableCell>
                        <a
                          className="underline underline-offset-4 text-sm"
                          href={safeUrl(p.liveUrl)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          className="underline underline-offset-4 text-sm"
                          href={safeUrl(p.gitFront)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Frontend
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          className="underline underline-offset-4 text-sm"
                          href={safeUrl(p.gitBackend)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Backend
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          className="underline underline-offset-4 text-sm"
                          href={safeUrl(p.imageUrl)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Image
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                        

                          <UpdateProjectDialog
                            projectId={String(p._id)}
                            defaultValues={defaultValues}
                          />

                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={deleteMutation.isPending}
                            onClick={() => {
                              const ok = window.confirm(
                                `Delete "${p.title}" permanently?`,
                              );
                              if (!ok) return;
                              deleteMutation.mutate(String(p._id), {
                                onSuccess: () => toast.success('Project deleted'),
                                onError: (err) =>
                                  toast.error(
                                    err instanceof Error
                                      ? err.message
                                      : 'Delete failed',
                                  ),
                              });
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
