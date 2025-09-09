import axiosInstance, { type ApiResponse } from '@/lib/axios';

export default {
  get: (): Promise<ApiResponse<number>> => axiosInstance.get('/test/123', { timeout: 4000 }),
};
