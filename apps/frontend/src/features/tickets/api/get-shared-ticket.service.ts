import { type Ticket, type TicketStatus } from '../types/ticket.types';

import { apiGet } from '@/shared/lib/httpClient';

interface RawSharedTicket {
  ticketId: string;
  ticketCode: string;
  qrCode: string;
  status: string;
  validatedAt?: string | null;
  validatedByUserId?: string | null;
}

export async function getSharedTicket(token: string): Promise<Ticket> {
  const raw = await apiGet<RawSharedTicket>(`/share-links/${token}`);

  return {
    id: raw.ticketId,
    reservationId: '',
    ticketCode: raw.ticketCode,
    qrCode: raw.qrCode,
    status: raw.status as TicketStatus,
    validatedAt: raw.validatedAt ?? null,
    validatedByUserId: raw.validatedByUserId ?? null,
  };
}
