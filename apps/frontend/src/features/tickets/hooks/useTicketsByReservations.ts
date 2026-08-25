import { useQuery } from '@tanstack/react-query';
import { getTicketsByReservations } from '../api/ticket.service';

export function useTicketsByReservations(reservationIds: string[]) {
  return useQuery({
    queryKey: ['tickets-by-reservations', reservationIds],
    queryFn: () => getTicketsByReservations(reservationIds),
    enabled: reservationIds.length > 0,
    staleTime: 1000 * 60 * 2,
  });
}
