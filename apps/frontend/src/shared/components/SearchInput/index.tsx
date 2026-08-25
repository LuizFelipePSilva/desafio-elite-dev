import { forwardRef, type InputHTMLAttributes } from 'react';

import * as S from './styles';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ icon, ...props }, ref) => {
    return (
      <S.Wrapper>
        {icon && <S.Icon>{icon}</S.Icon>}
        <S.Input ref={ref} {...props} />
      </S.Wrapper>
    );
  },
);

SearchInput.displayName = 'SearchInput';
