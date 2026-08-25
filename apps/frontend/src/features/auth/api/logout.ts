import { apiPost } from '@/shared/lib/httpClient';

export async function logout(): Promise<{ message: string }> {
  return apiPost<{ message: string }>('/auth/logout');
}
