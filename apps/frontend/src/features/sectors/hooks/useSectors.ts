import { useQuery } from '@tanstack/react-query';

import { getSectorsByEventId } from '../api/sectors.service';

export function useSectors(eventId: string | undefined, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['sectors', eventId, page, limit],
    queryFn: () => getSectorsByEventId(eventId!, page, limit),
    enabled: !!eventId,
    staleTime: 1000 * 60 * 2,
  });
}
