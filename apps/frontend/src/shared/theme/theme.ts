export const theme = {
  colors: {
    bg: '#0A0C10',
    surface: '#14171E',
    surfaceAlt: '#1B1F28',
    border: '#262B35',
    text: '#F2F3F5',
    textMuted: '#8D93A0',
    purple: '#6E5EF5',
    lime: '#C6F135',
    olive: '#2E3B1E',
    danger: '#FF5C5C',
  },
  fonts: {
    display: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
} as const;

export type Theme = typeof theme;
