'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  useCreateEducationMutation,
  useDeleteEducationMutation,
  useEducationsQuery,
  useUpdateEducationMutation,
} from '@/hooks/frontend/useEducation';
import type { EducationInput } from '@/modules/education/education.validation';
import type { IEducation } from '@/modules/education/education.interface';
import { Button } from '@/components/ui/button';
import CreateEducationDialog from './components/create-education-dialog';
import UpdateEducationDialog from './components/update-education-dialog';

export default function EducationsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [draggingEducationId, setDraggingEducationId] = useState<string | null>(
    null,
  );
  const [orderedEducations, setOrderedEducations] = useState<IEducation[]>([]);
  const { data: educations = [], isLoading } = useEducationsQuery();
  const createMutation = useCreateEducationMutation();
  const updateMutation = useUpdateEducationMutation();
  const deleteMutation = useDeleteEducationMutation();

  useEffect(() => {
    const sorted = [...educations].sort((a, b) => a.position - b.position);
    setOrderedEducations(sorted);
  }, [educations]);

  const handleCreate = async (values: EducationInput) => {
    try {
      await createMutation.mutateAsync(values);
      toast.success('Education created');
      setCreateOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create education',
      );
    }
  };

  const handleUpdate = async (id: string, values: EducationInput) => {
    try {
      await updateMutation.mutateAsync({ id, payload: values });
      toast.success('Education updated');
      setEditingEducationId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update education',
      );
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Delete this education entry?');
    if (!ok) return;

    setPendingDeleteId(id);
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Education deleted');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete education',
      );
    } finally {
      setPendingDeleteId(null);
    }
  };

  const handleDrop = async (targetEducationId: string) => {
    if (!draggingEducationId || draggingEducationId === targetEducationId) return;

    const sourceIndex = orderedEducations.findIndex(
      (item) => String(item._id) === draggingEducationId,
    );
    const targetIndex = orderedEducations.findIndex(
      (item) => String(item._id) === targetEducationId,
    );
    if (sourceIndex < 0 || targetIndex < 0) return;

    const next = [...orderedEducations];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    setOrderedEducations(next);
    setDraggingEducationId(null);

    const changedItems = next
      .map((item, index) => ({ id: String(item._id), position: index + 1 }))
      .filter(({ id, position }) => {
        const current = orderedEducations.find((item) => String(item._id) === id);
        return current && current.position !== position;
      });

    if (changedItems.length === 0) return;

    try {
      await Promise.all(
        changedItems.map((item) =>
          updateMutation.mutateAsync({
            id: item.id,
            payload: { position: item.position },
          }),
        ),
      );
      toast.success('Education positions updated');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update positions',
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-background p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Educations</h1>
          <CreateEducationDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
            isSubmitting={createMutation.isPending}
            onCreate={handleCreate}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-background p-6">
        <h2 className="text-xl font-semibold mb-1">Education List</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop items to reorder. Position will be updated automatically.
        </p>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : orderedEducations.length === 0 ? (
          <p className="text-sm text-muted-foreground">No education found.</p>
        ) : (
          <div className="space-y-3">
            {orderedEducations.map((education) => (
              <div
                key={education._id}
                draggable
                onDragStart={() => setDraggingEducationId(String(education._id))}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(String(education._id))}
                onDragEnd={() => setDraggingEducationId(null)}
                className={`rounded-md border p-4 flex items-start justify-between gap-3 cursor-move ${
                  draggingEducationId === String(education._id) ? 'opacity-60' : ''
                }`}
              >
                <div>
                  <p className="font-medium">
                    {education.position}. {education.degree}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {education.institution}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {education.period} — {education.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <UpdateEducationDialog
                    education={education}
                    open={editingEducationId === education._id}
                    onOpenChange={(open) =>
                      setEditingEducationId(open ? String(education._id) : null)
                    }
                    isSubmitting={updateMutation.isPending}
                    onUpdate={(values) =>
                      handleUpdate(String(education._id), values)
                    }
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={
                      deleteMutation.isPending && pendingDeleteId === education._id
                    }
                    onClick={() => handleDelete(String(education._id))}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
