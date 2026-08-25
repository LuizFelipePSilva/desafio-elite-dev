import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteEvent } from '../api/platform-events.service';

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-events'] });
    },
  });
}
