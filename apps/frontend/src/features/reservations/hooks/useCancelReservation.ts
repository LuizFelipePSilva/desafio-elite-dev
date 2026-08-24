import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cancelReservation } from '../api/reservations.service';

export function useCancelReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: string) => cancelReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-reservations'] });
    },
  });
}
