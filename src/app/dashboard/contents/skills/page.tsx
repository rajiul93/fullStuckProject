'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { useMemo, useState } from 'react';
import CreateSkillDialog from './components/create-skill-dialog';
import UpdateSkillDialog from './components/update-skill-dialog';
import type { SkillFormValues } from './components/skill-types';
import {
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useSkillsQuery,
  useUpdateSkillMutation,
} from '@/hooks/frontend/useSkills';

function formatDate(value?: string) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString();
}

export default function BogControl() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  const { data: skills = [], isLoading } = useSkillsQuery();
  const createMutation = useCreateSkillMutation();
  const updateMutation = useUpdateSkillMutation();
  const deleteMutation = useDeleteSkillMutation();

  const handleCreate = async (values: SkillFormValues) => {
    try {
      await createMutation.mutateAsync(values);
      toast.success('Skill created');
      setCreateOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create skill',
      );
    }
  };

  const handleUpdate = async (id: string, values: SkillFormValues) => {
    try {
      await updateMutation.mutateAsync({ id, payload: values });
      toast.success('Skill updated');
      setEditingSkillId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update skill',
      );
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const ok = window.confirm(`Delete "${title}" permanently?`);
    if (!ok) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Skill deleted');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete skill',
      );
    }
  };

  const featuredCount = useMemo(
    () => skills.filter((skill) => skill.feature).length,
    [skills],
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Skill Collection</CardTitle>
            <CardDescription>
              CRUD dashboard for skill API using TanStack Query and Mutation.
            </CardDescription>
          </div>

          <CreateSkillDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
            isSubmitting={createMutation.isPending}
            onCreate={handleCreate}
          />
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border p-3">
            <p className="text-sm text-muted-foreground">Total Skills</p>
            <p className="text-2xl font-semibold">{skills.length}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-sm text-muted-foreground">Featured Skills</p>
            <p className="text-2xl font-semibold">{featuredCount}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-sm text-muted-foreground">Loading State</p>
            <p className="text-2xl font-semibold">{isLoading ? 'Yes' : 'No'}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {isLoading && (
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              Loading skills...
            </CardContent>
          </Card>
        )}

        {!isLoading && skills.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              No skills found. Create one from the top-right button.
            </CardContent>
          </Card>
        )}

        {skills.map((skill) => (
          <Card key={skill._id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base">{skill.title}</CardTitle>
                  <CardDescription className="pt-1">
                    Image ID: {skill.imageId}
                  </CardDescription>
                </div>
                {skill.feature ? <Badge>Featured</Badge> : <Badge variant="secondary">Normal</Badge>}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{skill.subDescription}</p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Created: {formatDate(skill.createdAt)}
                </p>
                <div className="flex items-center gap-2">
                  <UpdateSkillDialog
                    skill={skill}
                    open={editingSkillId === skill._id}
                    onOpenChange={(open) =>
                      setEditingSkillId(open ? skill._id : null)
                    }
                    isSubmitting={updateMutation.isPending}
                    onUpdate={(values) => handleUpdate(skill._id, values)}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={deleteMutation.isPending}
                    onClick={() => handleDelete(skill._id, skill.title)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
