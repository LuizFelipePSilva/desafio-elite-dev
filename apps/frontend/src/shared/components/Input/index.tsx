import { forwardRef, type InputHTMLAttributes } from 'react';

import * as S from './styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | undefined;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}
      <S.StyledInput ref={ref} $hasError={!!error} {...props} />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Container>
  );
});

Input.displayName = 'Input';
