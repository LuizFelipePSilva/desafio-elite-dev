import { forwardRef, type ButtonHTMLAttributes } from 'react';

import * as S from './styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <S.StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? 'Carregando...' : children}
      </S.StyledButton>
    );
  },
);

Button.displayName = 'Button';
