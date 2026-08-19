import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { register } from '../api/register';
import type { RegisterCredentials } from '../types';

import { useUiStore } from '@/app/store';
import { AppError } from '@/shared/lib/AppError';

export function useRegister() {
  const navigate = useNavigate();
  const setToast = useUiStore((state) => state.setToast);

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => register(credentials),
    onSuccess: () => {
      setToast({ message: 'Conta criada com sucesso! Faça login.', type: 'success' });
      navigate('/login');
    },
    onError: (error) => {
      const message = error instanceof AppError ? error.message : 'Falha no login';

      setToast({
        message,
        type: 'error',
      });
    },
  });
}
