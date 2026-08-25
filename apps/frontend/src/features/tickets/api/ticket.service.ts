import { type Ticket } from '../types/ticket.types';
import type { ValidateTicketPayload, ValidateTicketResponse } from '../types/ticket.types';

import { apiGet, apiPost } from '@/shared/lib/httpClient';

export async function getTicketsByReservations(reservationIds: string[]): Promise<Ticket[]> {
  return apiGet('/tickets', {
    params: { reservationsIds: reservationIds.join(',') },
  });
}

export async function getTicketById(ticketId: string): Promise<Ticket> {
  return apiGet(`/tickets/${ticketId}`);
}

export async function validateTicket(
  payload: ValidateTicketPayload,
): Promise<ValidateTicketResponse> {
  return apiPost('/tickets/validate', payload);
}
