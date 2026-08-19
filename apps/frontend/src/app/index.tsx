import { BrowserRouter } from 'react-router-dom';

import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { Router } from './router';

import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { Toast } from '@/shared/components/Toast';

export function App() {
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
