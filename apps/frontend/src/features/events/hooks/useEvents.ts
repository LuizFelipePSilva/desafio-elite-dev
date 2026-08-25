import { useQuery } from '@tanstack/react-query';

import { getTicketmasterEvents } from '../api/events.service';

export function useEvents(page = 0, size = 20) {
  return useQuery({
    queryKey: ['ticketmaster-events', page, size],
    queryFn: () => getTicketmasterEvents(page, size),
    staleTime: 1000 * 60 * 10,
  });
}
