'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/hooks/api/api-client';
import type { ISoftSkill } from '@/modules/soft-skill/soft-skill.interface';
import type { SoftSkillInput, UpdateSoftSkillInput } from '@/modules/soft-skill/soft-skill.validation';

const SOFT_SKILLS_QUERY_KEY = ['soft-skills'];

type UpdatePayload = { id: string; payload: UpdateSoftSkillInput };

export function useSoftSkillsQuery() {
  return useQuery({
    queryKey: SOFT_SKILLS_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get<ISoftSkill[]>('/api/soft-skill');
      return res.data;
    },
  });
}

export function useCreateSoftSkillMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SoftSkillInput) => {
      const res = await api.post<ISoftSkill>('/api/soft-skill', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOFT_SKILLS_QUERY_KEY });
    },
  });
}

export function useUpdateSoftSkillMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: UpdatePayload) => {
      const res = await api.put<ISoftSkill>(`/api/soft-skill/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOFT_SKILLS_QUERY_KEY });
    },
  });
}

export function useDeleteSoftSkillMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<{ message: string }>(`/api/soft-skill/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SOFT_SKILLS_QUERY_KEY });
    },
  });
}
