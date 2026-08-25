import type { ReactNode } from 'react';

import * as S from './styles';

interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export function Container({ children, size = 'md' }: ContainerProps) {
  return <S.StyledContainer $size={size}>{children}</S.StyledContainer>;
}
