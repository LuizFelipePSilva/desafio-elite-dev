import { type CreateEventInput } from '../types';

import { apiPost } from '@/shared/lib/httpClient';

export async function createEvent(data: CreateEventInput) {
  return apiPost('/events', data);
}
