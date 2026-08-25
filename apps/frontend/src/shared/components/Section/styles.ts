import styled from 'styled-components';

export const Wrapper = styled.section<{ $padding?: 'sm' | 'md' | 'lg' }>`
  padding: ${({ $padding = 'md' }) => {
    switch ($padding) {
      case 'sm':
        return '1.5rem 0';
      case 'md':
        return '3rem 0';
      case 'lg':
        return '5rem 0';
    }
  }};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 0.25rem;
`;
