import type { TicketmasterEventsResponse } from '../types';

import { apiGet } from '@/shared/lib/httpClient';

export async function getTicketmasterEvents(
  page = 0,
  size = 20,
): Promise<TicketmasterEventsResponse> {
  return apiGet<TicketmasterEventsResponse>(`/ticketmaster/events?page=${page}&size=${size}`);
}
