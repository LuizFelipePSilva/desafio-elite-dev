import { useQuery } from '@tanstack/react-query';

import { getPlatformEvents } from '../api/platform-events.service';

export function usePlatformEvents(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['platform-events', page, limit],
    queryFn: () => getPlatformEvents(page, limit),
    staleTime: 1000 * 60 * 5,
  });
}
