'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/hooks/api/api-client';
import type { ILanguage } from '@/modules/language/language.interface';
import type { LanguageInput, UpdateLanguageInput } from '@/modules/language/language.validation';

const LANGUAGES_QUERY_KEY = ['languages'];
type UpdatePayload = { id: string; payload: UpdateLanguageInput };

export function useLanguagesQuery() {
  return useQuery({
    queryKey: LANGUAGES_QUERY_KEY,
    queryFn: async () => {
      const res = await api.get<ILanguage[]>('/api/language');
      return res.data;
    },
  });
}

export function useCreateLanguageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: LanguageInput) => {
      const res = await api.post<ILanguage>('/api/language', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LANGUAGES_QUERY_KEY });
    },
  });
}

export function useUpdateLanguageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: UpdatePayload) => {
      const res = await api.put<ILanguage>(`/api/language/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LANGUAGES_QUERY_KEY });
    },
  });
}

export function useDeleteLanguageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete<{ message: string }>(`/api/language/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LANGUAGES_QUERY_KEY });
    },
  });
}
