import { useMutation } from '@tanstack/react-query';

import { createReservation } from '../services/reservations.api';
import type { CreateReservationInput } from '../types/reservation.types';

export function useCreateReservation() {
  return useMutation({
    mutationFn: (data: CreateReservationInput) => createReservation(data),
  });
}
