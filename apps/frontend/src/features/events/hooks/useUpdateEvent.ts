import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateEvent } from '../api/platform-events.service';
import type { UpdateEventInput } from '../types/platform-event.types';

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventInput }) => updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-events'] });
    },
  });
}
