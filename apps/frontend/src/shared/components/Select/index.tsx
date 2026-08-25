import { forwardRef, type SelectHTMLAttributes } from 'react';

import * as S from './styles';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, ...props }, ref) => {
    return (
      <S.Container>
        {label && <S.Label>{label}</S.Label>}
        <S.StyledSelect ref={ref} $hasError={!!error} {...props}>
          {children}
        </S.StyledSelect>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.Container>
    );
  },
);

Select.displayName = 'Select';
