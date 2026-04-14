'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { LanguageInput } from '@/modules/language/language.validation';
import {
  useCreateLanguageMutation,
  useDeleteLanguageMutation,
  useLanguagesQuery,
  useUpdateLanguageMutation,
} from '@/hooks/frontend/useLanguage';
import CreateLanguageDialog from './components/create-language-dialog';
import UpdateLanguageDialog from './components/update-language-dialog';

export default function LanguagePage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const { data: items = [], isLoading } = useLanguagesQuery();
  const createMutation = useCreateLanguageMutation();
  const updateMutation = useUpdateLanguageMutation();
  const deleteMutation = useDeleteLanguageMutation();

  const handleCreate = async (values: LanguageInput) => {
    try {
      await createMutation.mutateAsync(values);
      toast.success('Language created');
      setCreateOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create language');
    }
  };

  const handleUpdate = async (id: string, values: LanguageInput) => {
    try {
      await updateMutation.mutateAsync({ id, payload: values });
      toast.success('Language updated');
      setEditingId(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update language');
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Delete this language entry?');
    if (!ok) return;
    setPendingDeleteId(id);
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Language deleted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete language');
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-background p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Language</h1>
          <CreateLanguageDialog
            open={createOpen}
            onOpenChange={setCreateOpen}
            isSubmitting={createMutation.isPending}
            onCreate={handleCreate}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-background p-6">
        <h2 className="text-xl font-semibold mb-4">Language List</h2>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No language found.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="rounded-md border p-4 flex items-start justify-between gap-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.level}</p>
                </div>
                <div className="flex items-center gap-2">
                  <UpdateLanguageDialog
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
