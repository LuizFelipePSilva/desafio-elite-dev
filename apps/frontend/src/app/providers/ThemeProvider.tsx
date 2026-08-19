import type { ReactNode } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { theme } from '@/shared/theme/theme';
import { GlobalStyle } from '@/styles/global';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <SCThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </SCThemeProvider>
  );
}
