import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { logout } from '../api/logout';

import { useAuthStore } from '@/app/store';
import { useUiStore } from '@/app/store';

export function useLogout() {
  const navigate = useNavigate();
  const authLogout = useAuthStore((state) => state.logout);
  const setToast = useUiStore((state) => state.setToast);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      authLogout();
      setToast({ message: 'Logout realizado com sucesso!', type: 'success' });
      navigate('/login');
    },
    onError: () => {
      authLogout();
      navigate('/login');
    },
  });
}
