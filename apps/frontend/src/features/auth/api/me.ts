import type { AuthenticatedUser } from '@/app/store/useAuthStore';
import { apiGet } from '@/shared/lib/httpClient';

export async function getMe(): Promise<AuthenticatedUser> {
  return apiGet<AuthenticatedUser>('/auth/me');
}
