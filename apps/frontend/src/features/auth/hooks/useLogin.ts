import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { login } from '../api/login';
import type { LoginCredentials } from '../types';

import { useAuthStore } from '@/app/store';
import { useUiStore } from '@/app/store';
import type { UserRole } from '@/app/store/useAuthStore';
import { AppError } from '@/shared/lib/AppError';
import { apiGet } from '@/shared/lib/httpClient';

export function useLogin() {
  const navigate = useNavigate();
  const setToast = useUiStore((state) => state.setToast);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: async () => {
      try {
        const data = await apiGet<{ id: string; role: UserRole }>('/auth/me');

        useAuthStore.setState({
          user: { id: data.id, role: data.role },
          isAuthenticated: true,
        });

        setToast({ message: 'Login realizado com sucesso!', type: 'success' });
        navigate('/');
      } catch {
        setToast({ message: 'Erro ao recuperar sessão', type: 'error' });
      }
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
