import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createUser } from '../api/users.service';
import type { CreateUserInput } from '../types';

import { useUiStore } from '@/app/store';
import { AppError } from '@/shared/lib/AppError';

export function useCreateUser() {
  const queryClient = useQueryClient();
  const setToast = useUiStore((state) => state.setToast);

  return useMutation({
    mutationFn: (data: CreateUserInput) => createUser(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['users'] });
      setToast({ message: 'Usuário criado com sucesso!', type: 'success' });
    },
    onError: (error) => {
      const message = error instanceof AppError ? error.message : 'Falha no registro';

      setToast({
        message,
        type: 'error',
      });
    },
  });
}
