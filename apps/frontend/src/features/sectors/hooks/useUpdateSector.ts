import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateSector } from '../api/sectors.service';
import type { UpdateSectorInput } from '../types/sector.types';

export function useUpdateSector() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data, eventId }: { id: string; data: UpdateSectorInput; eventId: string }) =>
      updateSector(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sectors', variables.eventId] });
    },
  });
}
