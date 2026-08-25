import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Aside = styled.aside<{ $collapsed?: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? '64px' : '240px')};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease;
  flex-shrink: 0;
`;

export const LogoArea = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 0.75rem;
  flex: 1;
`;

export const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme, $active }) => ($active ? theme.colors.lime : theme.colors.textMuted)};
  background-color: ${({ theme, $active }) => ($active ? theme.colors.olive : 'transparent')};
  text-decoration: none;
  transition:
    color 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const Footer = styled.div`
  padding: 1rem 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
