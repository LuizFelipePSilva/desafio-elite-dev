import type { ReactNode } from 'react';

import * as S from './styles';

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridProps {
  cols?: Cols;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  colsMobile?: Cols;
  colsTablet?: Cols;
  children: ReactNode;
}

interface GridItemProps {
  span?: Cols;
  spanMobile?: Cols;
  spanTablet?: Cols;
  children: ReactNode;
}

export function Grid({ cols = 12, gap = 'md', colsMobile, colsTablet, children }: GridProps) {
  return (
    <S.Grid $cols={cols} $gap={gap} $colsMobile={colsMobile} $colsTablet={colsTablet}>
      {children}
    </S.Grid>
  );
}

export function GridItem({ span = 1, spanMobile, spanTablet, children }: GridItemProps) {
  return (
    <S.GridItem $span={span} $spanMobile={spanMobile} $spanTablet={spanTablet}>
      {children}
    </S.GridItem>
  );
}
