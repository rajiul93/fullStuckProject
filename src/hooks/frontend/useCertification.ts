'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/hooks/api/api-client';
import type { ICertification } from '@/modules/certification/certification.interface';
import type {
  CertificationInput,
  UpdateCertificationInput,
} from '@/modules/certification/certification.validation';

const CERTIFICATIONS_QUERY_KEY = ['certifications'];
type UpdatePayload = { id: string; payload: UpdateCertificationInput };

export function useCertificationsQuery() {
  return useQuery({
    queryKey: CERTIFICATIONS_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get<ICertification[]>('/api/certification');
      return res.data;
    },
  });
}

export function useCreateCertificationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CertificationInput) => {
      const res = await api.post<ICertification>('/api/certification', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATIONS_QUERY_KEY });
    },
  });
}

export function useUpdateCertificationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: UpdatePayload) => {
      const res = await api.put<ICertification>(`/api/certification/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATIONS_QUERY_KEY });
    },
  });
}

export function useDeleteCertificationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<{ message: string }>(`/api/certification/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATIONS_QUERY_KEY });
    },
  });
}
