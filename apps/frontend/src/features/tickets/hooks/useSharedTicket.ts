import { useQuery } from '@tanstack/react-query';

import { getSharedTicket } from '../api/get-shared-ticket.service';
import type { Ticket } from '../types/ticket.types';

export function useSharedTicket(token: string | undefined) {
  return useQuery<Ticket>({
    queryKey: ['shared-ticket', token],
    queryFn: () => getSharedTicket(token!),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
