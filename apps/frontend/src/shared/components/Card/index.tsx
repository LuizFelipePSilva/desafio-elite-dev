import type { ReactNode } from 'react';

import * as S from './styles';

export interface CardProps {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, padding = 'md' }: CardProps) {
  return <S.StyledCard $padding={padding}>{children}</S.StyledCard>;
}
