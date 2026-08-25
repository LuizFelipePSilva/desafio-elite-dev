import type {
  PaginatedEventsResponse,
  PlatformEvent,
  UpdateEventInput,
} from '../types/platform-event.types';

import { apiDelete, apiGet, apiPatch } from '@/shared/lib/httpClient';

export async function getPlatformEvents(page = 1, limit = 10): Promise<PaginatedEventsResponse> {
  return apiGet<PaginatedEventsResponse>(`/events/?page=${page}&limit=${limit}`);
}
export async function updateEvent(id: string, payload: UpdateEventInput): Promise<PlatformEvent> {
  return apiPatch(`/events/${id}`, payload);
}

export async function deleteEvent(id: string): Promise<void> {
  return apiDelete(`/events/${id}`);
}
