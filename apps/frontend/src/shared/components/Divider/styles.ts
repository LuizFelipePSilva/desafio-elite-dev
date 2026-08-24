import styled from 'styled-components';

export const Line = styled.hr<{ $spacing?: 'sm' | 'md' | 'lg' }>`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ $spacing = 'md' }) => {
    switch ($spacing) {
      case 'sm':
        return '0.75rem 0';
      case 'md':
        return '1.5rem 0';
      case 'lg':
        return '3rem 0';
    }
  }};
`;
