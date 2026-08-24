import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { Router } from './router';
import { useAuthStore } from './store';

import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { Toast } from '@/shared/components/Toast';
import { apiGet } from '@/shared/lib/httpClient';

export function App() {
  useEffect(() => {
    apiGet<{ id: string; role: 'ORGANIZER' | 'CUSTOMER' | 'GATEKEEPER' }>('/auth/me')
      .then((data) => {
        useAuthStore.setState({
          user: { id: data.id, role: data.role },
          isAuthenticated: true,
        });
      })
      .catch(() => {
        // não autenticado, silencioso
      });
  }, []);

  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Router />
            <Toast />
          </BrowserRouter>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}
