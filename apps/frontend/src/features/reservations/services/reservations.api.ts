import type { CreateReservationInput, Reservation } from '../types/reservation.types';

import { apiGet, apiPost } from '@/shared/lib/httpClient';

export async function createReservation(payload: CreateReservationInput): Promise<Reservation> {
  return apiPost('/reservations', payload);
}

export async function finishReservation(reservationId: string): Promise<Reservation> {
  return apiPost(`/reservations/${reservationId}/finish`);
}

export async function getMyReservations(): Promise<Reservation[]> {
  return apiGet('/reservations/me');
}

export async function cancelReservation(reservationId: string): Promise<void> {
  return apiPost(`/reservations/${reservationId}/cancel`);
}
