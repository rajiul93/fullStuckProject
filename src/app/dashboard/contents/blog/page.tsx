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
import {
  useBlogV2Query,
  useCreateBlogV2Mutation,
  useDeleteBlogV2Mutation,
  useUpdateBlogV2Mutation,
} from '@/hooks/frontend/useBlogV2';
import CreateBlogV2Dialog from './components/create-blog-v2-dialog';
import UpdateBlogV2Dialog from './components/update-blog-v2-dialog';
import { toast } from 'sonner';
import { toApiPayload, type BlogV2FormValues } from './components/blog-v2-types';

export default function BlogPage() {
  const { data: blogs = [], isLoading } = useBlogV2Query();
  const createMutation = useCreateBlogV2Mutation();
  const updateMutation = useUpdateBlogV2Mutation();
  const deleteMutation = useDeleteBlogV2Mutation();

  const handleCreate = async (values: BlogV2FormValues) => {
    const payload = toApiPayload(values);
    await createMutation.mutateAsync(payload, {
      onSuccess: () => toast.success('Blog created'),
      onError: (err) =>
        toast.error(err instanceof Error ? err.message : 'Create failed'),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Blog</h1>
        <CreateBlogV2Dialog
          isSubmitting={createMutation.isPending}
          onCreate={handleCreate}
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Blog Table</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading blogs…</p>
          ) : blogs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No blogs found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-14">SL</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Short Description</TableHead>
                  <TableHead className="w-32">Sections</TableHead>
                  <TableHead className="text-right w-[260px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((b, idx) => (
                  <TableRow key={String(b._id ?? idx)}>
                    <TableCell className="text-muted-foreground">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="font-medium">{b.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {b.shortDescription}
                    </TableCell>
                    <TableCell>{b.listContainer?.length ?? 0}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <UpdateBlogV2Dialog
                          blogId={String(b._id)}
                          defaultValues={{
                            title: b.title,
                            shortDescription: b.shortDescription,
                            description: b.description,
                            listContainer: b.listContainer ?? [],
                          }}
                          isSubmitting={updateMutation.isPending}
                          onUpdate={async (values) => {
                            const payload = toApiPayload(values);
                            await updateMutation.mutateAsync(
                              { id: String(b._id), payload },
                              {
                                onSuccess: () => toast.success('Blog updated'),
                                onError: (err) =>
                                  toast.error(
                                    err instanceof Error
                                      ? err.message
                                      : 'Update failed',
                                  ),
                              },
                            );
                          }}
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={deleteMutation.isPending}
                          onClick={() => {
                            const ok = window.confirm(
                              `Delete "${b.title}" permanently?`,
                            );
                            if (!ok) return;
                            deleteMutation.mutate(String(b._id), {
                              onSuccess: () => toast.success('Blog deleted'),
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
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
