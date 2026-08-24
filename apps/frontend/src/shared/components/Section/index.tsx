import type { ReactNode } from 'react';

import * as S from './styles';

interface SectionProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Section({ title, subtitle, action, padding = 'md', children }: SectionProps) {
  return (
    <S.Wrapper $padding={padding}>
      {(title || action) && (
        <S.Header>
          <div>
            {title && <S.Title>{title}</S.Title>}
            {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
          </div>
          {action}
        </S.Header>
      )}
      {children}
    </S.Wrapper>
  );
}
