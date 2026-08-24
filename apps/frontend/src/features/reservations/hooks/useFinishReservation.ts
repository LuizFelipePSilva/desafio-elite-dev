import { useMutation } from '@tanstack/react-query';

import { finishReservation } from '../services/reservations.api';

export function useFinishReservation() {
  return useMutation({
    mutationFn: (reservationId: string) => finishReservation(reservationId),
  });
}
