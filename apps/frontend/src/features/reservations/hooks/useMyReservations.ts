import { useQuery } from '@tanstack/react-query';

import { getMyReservations } from '../services/reservations.api';

export function useMyReservations() {
  return useQuery({
    queryKey: ['my-reservations'],
    queryFn: getMyReservations,
    staleTime: 1000 * 60 * 2,
  });
}
