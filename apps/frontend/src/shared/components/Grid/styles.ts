import styled from 'styled-components';

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridProps {
  $cols?: Cols;
  $gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  $colsMobile?: Cols;
  $colsTablet?: Cols;
}

interface GridItemProps {
  $span?: Cols;
  $spanMobile?: Cols;
  $spanTablet?: Cols;
}

const gapMap = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
};

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${({ $cols = 12 }) => $cols}, 1fr);
  gap: ${({ $gap = 'md' }) => gapMap[$gap]};

  @media (max-width: 768px) {
    grid-template-columns: repeat(${({ $colsMobile = 1 }) => $colsMobile}, 1fr);
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(${({ $colsTablet = 6 }) => $colsTablet}, 1fr);
  }
`;

export const GridItem = styled.div<GridItemProps>`
  grid-column: span ${({ $span = 1 }) => $span};

  @media (max-width: 768px) {
    grid-column: span ${({ $spanMobile = 12 }) => $spanMobile};
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-column: span ${({ $spanTablet = 6 }) => $spanTablet};
  }
`;
