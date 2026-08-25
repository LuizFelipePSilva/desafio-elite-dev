import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createSector } from '../api/sectors.service';
import type { CreateSectorInput } from '../types/sector.types';

export function useCreateSector() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSectorInput) => createSector(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sectors', variables.eventId] });
    },
  });
}
