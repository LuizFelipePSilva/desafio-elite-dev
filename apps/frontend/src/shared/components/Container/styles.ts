import styled from 'styled-components';

export const StyledContainer = styled.div<{ $size?: 'sm' | 'md' | 'lg' | 'full' }>`
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;

  ${({ $size = 'md' }) => {
    switch ($size) {
      case 'sm':
        return 'max-width: 640px;';
      case 'md':
        return 'max-width: 900px;';
      case 'lg':
        return 'max-width: 1200px;';
      case 'full':
        return 'max-width: none;';
    }
  }}
`;
