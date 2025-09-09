// src/hooks/useApi.ts
import { useQuery, useMutation, type UseQueryOptions } from '@tanstack/react-query';

import axiosInstance from '@/lib/axios';

type ApiFn<T> = () => Promise<T>;

// GET wrapper
export function useApiQuery<T>(key: string[], apiFn: ApiFn<T>, options?: UseQueryOptions<T>) {
  return useQuery<T>({
    queryKey: key,
    queryFn: apiFn,
    ...options,
  });
}

// POST/PUT/DELETE wrapper
export function useApiMutation<T>(apiFn: (data: any) => Promise<T>, onSuccess?: (data: T) => void) {
  return useMutation({
    mutationFn: apiFn,
    onSuccess,
  });
}

// Example API call
export const getUsers = async () => {
  const res = await axiosInstance.get('/users');
  return res.data;
};
