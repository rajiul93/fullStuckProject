'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  SkillFormValues,
  SkillItem,
} from '@/app/dashboard/contents/skills/components/skill-types';
import { api } from '@/hooks/api/api-client';

const SKILLS_QUERY_KEY = ['skills'];

type UpdateSkillPayload = { id: string; payload: SkillFormValues };

export function useSkillsQuery() {
  return useQuery({
    queryKey: SKILLS_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get<SkillItem[]>('/api/skill');
      return res.data;
    },
  });
}

export function useCreateSkillMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SkillFormValues) => {
      const res = await api.post<SkillItem>('/api/skill', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY });
    },
  });
}

export function useUpdateSkillMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: UpdateSkillPayload) => {
      const res = await api.put<SkillItem>(`/api/skill/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY });
    },
  });
}

export function useDeleteSkillMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<{ message: string }>(`/api/skill/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY });
    },
  });
}
