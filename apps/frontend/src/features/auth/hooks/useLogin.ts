import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { login } from '../api/login';
import { setToken } from '../api/token';
import type { LoginCredentials } from '../types';

import { useUiStore } from '@/app/store';
import { AppError } from '@/shared/lib/AppError';

export function useLogin() {
  const navigate = useNavigate();
  const setToast = useUiStore((state) => state.setToast);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      setToken(data.access_token);
      setToast({ message: 'Login realizado com sucesso!', type: 'success' });
      navigate('/');
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
