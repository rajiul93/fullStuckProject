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
import { toast } from 'sonner';
import { useUploadMediaMutation } from '@/hooks/api/useMedia';

export default function CreateMediaDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState('');
  const uploadMutation = useUploadMediaMutation();

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) {
          setFile(null);
          setAlt('');
        }
        setOpen(next);
      }}
    >
      <DialogTrigger asChild>
        <Button>Add New Image</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[60vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>Upload a new image to your media library.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="rounded-lg border overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl ?? 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}
                alt={alt || 'Preview'}
                className="h-56 w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-media-file">Image</Label>
            <Input
              id="new-media-file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-media-alt">Alt (optional)</Label>
            <Input
              id="new-media-alt"
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
            disabled={uploadMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (!file) {
                toast.error('Please choose an image');
                return;
              }
              try {
                await uploadMutation.mutateAsync({ file, alt });
                toast.success('Image uploaded');
                setOpen(false);
              } catch (e) {
                toast.error(e instanceof Error ? e.message : 'Upload failed');
              }
            }}
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? 'Uploading…' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

