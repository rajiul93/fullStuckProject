'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/hooks/api/api-client';

export type MediaItem = {
  _id: string;
  originalName: string;
  url: string;
  r2_key: string;
  alt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MediaListResponse = {
  meta: { page: number; limit: number; total: number };
  data: MediaItem[];
};

const MEDIA_QUERY_KEY = ['media'];

const mediaTimeout = { timeout: 20_000 };

export function useMediaQuery(params?: {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}) {
  return useQuery({
    queryKey: [...MEDIA_QUERY_KEY, params ?? {}],
    queryFn: async () => {
      const res = await api.get<MediaListResponse>('/api/media', {
        params,
        ...mediaTimeout,
      });
      return res.data;
    },
  });
}

export function useUploadMediaMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { file: File; alt?: string }) => {
      const form = new FormData();
      form.append('image', payload.file);
      if (payload.alt) form.append('alt', payload.alt);
      const res = await api.post<MediaItem>('/api/media', form, mediaTimeout);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: MEDIA_QUERY_KEY }),
  });
}

export function useUpdateMediaMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string; file: File; alt?: string }) => {
      const form = new FormData();
      form.append('image', payload.file);
      if (payload.alt !== undefined) form.append('alt', payload.alt);
      const res = await api.put<MediaItem>(
        `/api/media/${payload.id}`,
        form,
        mediaTimeout,
      );
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: MEDIA_QUERY_KEY }),
  });
}

export function useDeleteMediaMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<{ message: string }>(
        `/api/media/${id}`,
        mediaTimeout,
      );
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: MEDIA_QUERY_KEY }),
  });
}
