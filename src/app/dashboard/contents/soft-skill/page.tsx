'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { SoftSkillInput } from '@/modules/soft-skill/soft-skill.validation';
import {
  useCreateSoftSkillMutation,
  useDeleteSoftSkillMutation,
  useSoftSkillsQuery,
  useUpdateSoftSkillMutation,
} from '@/hooks/frontend/useSoftSkill';
import CreateSoftSkillDialog from './components/create-soft-skill-dialog';
import UpdateSoftSkillDialog from './components/update-soft-skill-dialog';

export default function SoftSkillPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const { data: items = [], isLoading } = useSoftSkillsQuery();
  const createMutation = useCreateSoftSkillMutation();
  const updateMutation = useUpdateSoftSkillMutation();
  const deleteMutation = useDeleteSoftSkillMutation();

  const handleCreate = async (values: SoftSkillInput) => {
    try {
      await createMutation.mutateAsync(values);
      toast.success('Soft skill created');
      setCreateOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create soft skill',
      );
    }
  };

  const handleUpdate = async (id: string, values: SoftSkillInput) => {
    try {
      await updateMutation.mutateAsync({ id, payload: values });
      toast.success('Soft skill updated');
      setEditingId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update soft skill',
      );
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Delete this soft skill entry?');
    if (!ok) return;

    setPendingDeleteId(id);
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Soft skill deleted');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete soft skill',
      );
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-background p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">SoftSkill</h1>
          <CreateSoftSkillDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
            isSubmitting={createMutation.isPending}
            onCreate={handleCreate}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-background p-6">
        <h2 className="text-xl font-semibold mb-4">SoftSkill List</h2>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No soft skill found.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="rounded-md border p-4 flex items-start justify-between gap-3"
              >
                <div>
                  <p className="font-medium">
                    {item.position}. {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">Icon: {item.icon}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <UpdateSoftSkillDialog
                    item={item}
                    open={editingId === item._id}
                    onOpenChange={(open) => setEditingId(open ? String(item._id) : null)}
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
