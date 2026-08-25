export type TicketStatus = 'VALID' | 'USED' | 'CANCELLED';

export interface Ticket {
  id: string;
  reservationId: string;
  ticketCode: string;
  qrCode: string;
  status: TicketStatus;
  validatedAt: string | null;
  validatedByUserId: string | null;
}

export const TicketValidationResult = {
  VALID: 'VALID',
  ALREADY_USED: 'ALREADY_USED',
  WRONG_EVENT: 'WRONG_EVENT',
  CANCELLED: 'CANCELLED',
  NOT_FOUND: 'NOT_FOUND',
} as const;
export type TicketValidationResult =
  (typeof TicketValidationResult)[keyof typeof TicketValidationResult];

export interface ValidateTicketPayload {
  code: string;
  eventId: string;
}

export interface ValidateTicketResponse {
  result: TicketValidationResult;
  message: string;
  ticket?: {
    id: string;
    ticketCode: string;
    status: string;
    validatedAt: string | null;
  };
}
