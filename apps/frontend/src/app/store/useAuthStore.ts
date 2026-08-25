import { create } from 'zustand';

import { decodeJwt } from '@/shared/lib/decodeJwt';
import type { JwtPayload } from '@/shared/lib/decodeJwt';

export type UserRole = JwtPayload['role'];

export interface AuthenticatedUser {
  id: string;
  role: UserRole;
}

interface AuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (token) => {
    const payload = decodeJwt(token);
    if (payload) {
      set({
        user: { id: payload.sub, role: payload.role },
        isAuthenticated: true,
      });
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
