'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import EditMediaDialog from './components/edit-media-dialog';
import CreateMediaDialog from './components/create-media-dialog';
import { useDeleteMediaMutation, useMediaQuery } from '@/hooks/api/useMedia';

export default function MediaPlaygroundView() {
  const { data, isLoading } = useMediaQuery({
    page: 1,
    limit: 24,
    sortBy: 'createdAt',
    sortDir: 'desc',
  });
  const deleteMutation = useDeleteMediaMutation();

  const items = data?.data ?? [];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Media</h1>
          <p className="text-muted-foreground">Manage your uploaded images.</p>
        </div>
        <CreateMediaDialog />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <Skeleton className="h-5 w-2/3" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            No media found. Upload via `/api/media` first.
          </CardContent>
        </Card>
      ) : (
        <TooltipProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <Card key={item._id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{item.originalName}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.alt || item.r2_key}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Copy URL"
                            onClick={async () => {
                              await navigator.clipboard.writeText(item.url);
                              toast.success('URL copied');
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy URL</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <EditMediaDialog item={item} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Edit (replace)</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Delete"
                            disabled={deleteMutation.isPending}
                            onClick={() => {
                              const ok = window.confirm('Delete this image?');
                              if (!ok) return;
                              deleteMutation.mutate(item._id, {
                                onSuccess: () => toast.success('Deleted'),
                                onError: (e) =>
                                  toast.error(
                                    e instanceof Error ? e.message : 'Delete failed',
                                  ),
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="rounded-lg border overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.alt || item.originalName}
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TooltipProvider>
      )}
    </div>
  );
}
