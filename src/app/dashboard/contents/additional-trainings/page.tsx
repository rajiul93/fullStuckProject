'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { AdditionalTrainingInput } from '@/modules/additional-training/additional-training.validation';
import {
  useAdditionalTrainingsQuery,
  useCreateAdditionalTrainingMutation,
  useDeleteAdditionalTrainingMutation,
  useUpdateAdditionalTrainingMutation,
} from '@/hooks/frontend/useAdditionalTraining';
import CreateAdditionalTrainingDialog from './components/create-additional-training-dialog';
import UpdateAdditionalTrainingDialog from './components/update-additional-training-dialog';

export default function AdditionalTrainingsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const { data: items = [], isLoading } = useAdditionalTrainingsQuery();
  const createMutation = useCreateAdditionalTrainingMutation();
  const updateMutation = useUpdateAdditionalTrainingMutation();
  const deleteMutation = useDeleteAdditionalTrainingMutation();

  const handleCreate = async (values: AdditionalTrainingInput) => {
    try {
      await createMutation.mutateAsync(values);
      toast.success('Additional training created');
      setCreateOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to create additional training',
      );
    }
  };

  const handleUpdate = async (id: string, values: AdditionalTrainingInput) => {
    try {
      await updateMutation.mutateAsync({ id, payload: values });
      toast.success('Additional training updated');
      setEditingId(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update additional training',
      );
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Delete this additional training entry?');
    if (!ok) return;

    setPendingDeleteId(id);
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Additional training deleted');
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to delete additional training',
      );
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-background p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Additional Trainings</h1>
          <CreateAdditionalTrainingDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
            isSubmitting={createMutation.isPending}
            onCreate={handleCreate}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-background p-6">
        <h2 className="text-xl font-semibold mb-4">Training List</h2>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No additional training found.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="rounded-md border p-4 flex items-start justify-between gap-3"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <UpdateAdditionalTrainingDialog
                    item={item}
                    open={editingId === item._id}
                    onOpenChange={(open) =>
                      setEditingId(open ? String(item._id) : null)
                    }
                    isSubmitting={updateMutation.isPending}
                    onUpdate={(values) => handleUpdate(String(item._id), values)}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={
                      deleteMutation.isPending && pendingDeleteId === item._id
                    }
                    onClick={() => handleDelete(String(item._id))}
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
