'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/hooks/api/api-client';
import type { IAdditionalTraining } from '@/modules/additional-training/additional-training.interface';
import type {
  AdditionalTrainingInput,
  UpdateAdditionalTrainingInput,
} from '@/modules/additional-training/additional-training.validation';

const ADDITIONAL_TRAININGS_QUERY_KEY = ['additional-trainings'];

type UpdatePayload = { id: string; payload: UpdateAdditionalTrainingInput };

export function useAdditionalTrainingsQuery() {
  return useQuery({
    queryKey: ADDITIONAL_TRAININGS_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get<IAdditionalTraining[]>('/api/additional-training');
      return res.data;
    },
  });
}

export function useCreateAdditionalTrainingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: AdditionalTrainingInput) => {
      const res = await api.post<IAdditionalTraining>(
        '/api/additional-training',
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDITIONAL_TRAININGS_QUERY_KEY });
    },
  });
}

export function useUpdateAdditionalTrainingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: UpdatePayload) => {
      const res = await api.put<IAdditionalTraining>(
        `/api/additional-training/${id}`,
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDITIONAL_TRAININGS_QUERY_KEY });
    },
  });
}

export function useDeleteAdditionalTrainingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<{ message: string }>(
        `/api/additional-training/${id}`,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDITIONAL_TRAININGS_QUERY_KEY });
    },
  });
}
