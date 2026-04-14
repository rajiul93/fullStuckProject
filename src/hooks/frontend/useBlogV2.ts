'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { IBlogV2 } from '@/modules/blog-v2/blog-v2.interface';
import type {
  BlogV2Input,
  UpdateBlogV2Input,
} from '@/modules/blog-v2/blog-v2.validation';
import { api } from '@/hooks/api/api-client';

const BLOG_V2_QUERY_KEY = ['blog-v2'];

type UpdatePayload = { id: string; payload: UpdateBlogV2Input };

export function useBlogV2Query() {
  return useQuery({
    queryKey: BLOG_V2_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get<IBlogV2[]>('/api/blog');
      return res.data;
    },
  });
}

export function useCreateBlogV2Mutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: BlogV2Input) => {
      const res = await api.post<IBlogV2>('/api/blog', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_V2_QUERY_KEY });
    },
  });
}

export function useUpdateBlogV2Mutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: UpdatePayload) => {
      const res = await api.put<IBlogV2>(`/api/blog/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_V2_QUERY_KEY });
    },
  });
}

export function useDeleteBlogV2Mutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<{ message: string }>(`/api/blog/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_V2_QUERY_KEY });
    },
  });
}
