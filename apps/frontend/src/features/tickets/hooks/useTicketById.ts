import { useQuery } from '@tanstack/react-query';

import { getTicketById } from '../api/ticket.service';

export function useTicketById(ticketId: string | undefined) {
  return useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => getTicketById(ticketId!),
    enabled: !!ticketId,
    staleTime: 1000 * 60 * 5,
  });
}
