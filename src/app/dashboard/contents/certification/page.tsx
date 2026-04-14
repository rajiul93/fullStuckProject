'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { CertificationInput } from '@/modules/certification/certification.validation';
import {
  useCertificationsQuery,
  useCreateCertificationMutation,
  useDeleteCertificationMutation,
  useUpdateCertificationMutation,
} from '@/hooks/frontend/useCertification';
import CreateCertificationDialog from './components/create-certification-dialog';
import UpdateCertificationDialog from './components/update-certification-dialog';

export default function CertificationPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const { data: items = [], isLoading } = useCertificationsQuery();
  const createMutation = useCreateCertificationMutation();
  const updateMutation = useUpdateCertificationMutation();
  const deleteMutation = useDeleteCertificationMutation();

  const handleCreate = async (values: CertificationInput) => {
    try {
      await createMutation.mutateAsync(values);
      toast.success('Certification created');
      setCreateOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create certification',
      );
    }
  };

  const handleUpdate = async (id: string, values: CertificationInput) => {
    try {
      await updateMutation.mutateAsync({ id, payload: values });
      toast.success('Certification updated');
      setEditingId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update certification',
      );
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Delete this certification entry?');
    if (!ok) return;
    setPendingDeleteId(id);
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Certification deleted');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete certification',
      );
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-background p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Certification</h1>
          <CreateCertificationDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
            isSubmitting={createMutation.isPending}
            onCreate={handleCreate}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-background p-6">
        <h2 className="text-xl font-semibold mb-4">Certification List</h2>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No certification found.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="rounded-md border p-4 flex items-start justify-between gap-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.issuer}</p>
                </div>
                <div className="flex items-center gap-2">
                  <UpdateCertificationDialog
                    item={item}
                    open={editingId === item._id}
                    onOpenChange={(open) => setEditingId(open ? String(item._id) : null)}
                    isSubmitting={updateMutation.isPending}
                    onUpdate={(values) => handleUpdate(String(item._id), values)}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={deleteMutation.isPending && pendingDeleteId === item._id}
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
