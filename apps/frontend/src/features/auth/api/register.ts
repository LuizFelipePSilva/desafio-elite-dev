import type { RegisterCredentials, RegisterResponse } from '../types';

import { apiPost } from '@/shared/lib/httpClient';

export async function register(credentials: RegisterCredentials): Promise<RegisterResponse> {
  return apiPost<RegisterResponse>('/users/', credentials);
}
