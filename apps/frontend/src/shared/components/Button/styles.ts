import styled, { css } from 'styled-components'

interface StyledButtonProps {
  $variant: 'primary' | 'secondary' | 'danger' | 'ghost'
  $size: 'sm' | 'md' | 'lg'
}

const variants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.lime};
    color: ${({ theme }) => theme.colors.bg};
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));

    &:hover:not(:disabled) {
      filter: brightness(1.1);
    }

    &:active:not(:disabled) {
      filter: brightness(0.95);
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.border};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.text};

    &:hover:not(:disabled) {
      filter: brightness(1.1);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textMuted};

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.text};
    }
  `,
}

const sizes = {
  sm: css`
    padding: 0.5rem 1rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  md: css`
    padding: 0.75rem 1.5rem;
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
  lg: css`
    padding: 1rem 2rem;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `,
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: filter 0.15s ease, background-color 0.15s ease, color 0.15s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant }) => variants[$variant]}
  ${({ $size }) => sizes[$size]}
`
