import { useMutation, useQueryClient } from '@tanstack/react-query';

import { revokeShareLink } from '../api/share-link.service';

import { type AppError } from '@/shared/lib/AppError';

export function useRevokeShareLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokeShareLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets-by-reservations'] });
    },
    onError: (error: AppError) => {
      throw error;
    },
  });
}
