import type { ReactNode } from 'react';

import * as S from './styles';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

export function EmptyState({
  title = 'Nada por aqui',
  description = 'Nenhum item encontrado no momento.',
  icon,
}: EmptyStateProps) {
  return (
    <S.Container>
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Container>
  );
}
