import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/app/store';
import type { UserRole } from '@/app/store/useAuthStore';

interface RequireRoleProps {
  roles: UserRole[];
  children: ReactNode;
}

export function RequireRole({ roles, children }: RequireRoleProps) {
  const user = useAuthStore((state) => state.user);

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
