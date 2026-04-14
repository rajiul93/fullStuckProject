'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/hooks/api/api-client';
import type { IEducation } from '@/modules/education/education.interface';
import type {
  EducationInput,
  UpdateEducationInput,
} from '@/modules/education/education.validation';

const EDUCATIONS_QUERY_KEY = ['educations'];

type UpdateEducationPayload = { id: string; payload: UpdateEducationInput };

export function useEducationsQuery() {
  return useQuery({
    queryKey: EDUCATIONS_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get<IEducation[]>('/api/education');
      return res.data;
    },
  });
}

export function useCreateEducationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: EducationInput) => {
      const res = await api.post<IEducation>('/api/education', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATIONS_QUERY_KEY });
    },
  });
}

export function useUpdateEducationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: UpdateEducationPayload) => {
      const res = await api.put<IEducation>(`/api/education/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATIONS_QUERY_KEY });
    },
  });
}

export function useDeleteEducationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<{ message: string }>(`/api/education/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATIONS_QUERY_KEY });
    },
  });
}
