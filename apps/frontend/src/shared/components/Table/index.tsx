import type { ReactNode, TableHTMLAttributes } from 'react';

import * as S from './styles';

export function Table({ children, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <S.Wrapper>
      <S.StyledTable {...props}>{children}</S.StyledTable>
    </S.Wrapper>
  );
}

export function Thead({ children }: { children: ReactNode }) {
  return <thead>{children}</thead>;
}

export function Tbody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function Th({ children }: { children: ReactNode }) {
  return <S.Th>{children}</S.Th>;
}

export function Td({ children }: { children: ReactNode }) {
  return <S.Td>{children}</S.Td>;
}

export function Tr({ children }: { children: ReactNode }) {
  return <S.Tr>{children}</S.Tr>;
}
