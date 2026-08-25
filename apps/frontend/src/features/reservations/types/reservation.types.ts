export type PaymentMethod = 'CREDIT_CARD' | 'PIX';

export const ReservationStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
} as const;
export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus];

export interface Reservation {
  id: string;
  eventId: string;
  sectorId: string;
  userId: string;
  status: ReservationStatus;
  method: PaymentMethod;
  createdAt: string;
}

export interface CreateReservationInput {
  eventId: string;
  sectorId: string;
  method: PaymentMethod;
}
