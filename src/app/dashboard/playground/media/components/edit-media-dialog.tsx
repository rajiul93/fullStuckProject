'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateMediaMutation, type MediaItem } from '@/hooks/api/useMedia';
import { toast } from 'sonner';

export default function EditMediaDialog({ item }: { item: MediaItem }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState('');
  const updateMutation = useUpdateMediaMutation();

  useEffect(() => {
    if (open) {
      setAlt(item.alt ?? '');
      setFile(null);
    }
  }, [open, item.alt]);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="Edit media">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[60vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Replace Image</DialogTitle>
          <DialogDescription>
            Upload a new image to replace the existing one.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="rounded-lg border overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl ?? item.url}
                alt={alt || item.originalName}
                className="h-56 w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`file-${item._id}`}>New image</Label>
            <Input
              id={`file-${item._id}`}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`alt-${item._id}`}>Alt (optional)</Label>
            <Input
              id={`alt-${item._id}`}
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Alt text"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={updateMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (!file) {
                toast.error('Please choose a new image');
                return;
              }
              try {
                await updateMutation.mutateAsync({ id: item._id, file, alt });
                toast.success('Image updated');
                setOpen(false);
              } catch (e) {
                toast.error(e instanceof Error ? e.message : 'Update failed');
              }
            }}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? 'Updating…' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

