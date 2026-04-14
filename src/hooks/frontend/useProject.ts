'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { IProject } from '@/modules/project/project.interface';
import type {
  ProjectInput,
  UpdateProjectInput,
} from '@/modules/project/project.validation';
import { api } from '@/hooks/api/api-client';

const PROJECTS_QUERY_KEY = ['projects'];

type UpdateProjectPayload = { id: string; payload: UpdateProjectInput };

export function useProjectsQuery() {
  return useQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get<IProject[]>('/api/project');
      return res.data;
    },
  });
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ProjectInput) => {
      const res = await api.post<IProject>('/api/project', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

export function useUpdateProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: UpdateProjectPayload) => {
      const res = await api.patch<IProject>(`/api/project/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<{ message: string }>(`/api/project/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}
