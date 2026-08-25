import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
`;

export const Crumb = styled(Link)`
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.purple};
  }
`;

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.border};
`;

export const Current = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;
