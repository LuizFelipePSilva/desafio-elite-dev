import type { LoginCredentials, LoginResponse } from '../types';

import { apiPost } from '@/shared/lib/httpClient';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return apiPost<LoginResponse>('/auth/login', credentials);
}
