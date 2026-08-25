import { useMutation } from '@tanstack/react-query';

import { createShareLink } from '../api/share-link.service';

import { type AppError } from '@/shared/lib/AppError';

export function useCreateShareLink() {
  return useMutation({
    mutationFn: createShareLink,
    onError: (error: AppError) => {
      throw error;
    },
  });
}
