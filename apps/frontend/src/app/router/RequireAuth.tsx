import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { getToken } from '@/features/auth';

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const token = getToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
