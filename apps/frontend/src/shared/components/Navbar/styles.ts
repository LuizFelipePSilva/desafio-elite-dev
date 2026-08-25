import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Brand = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.lime};
  letter-spacing: 0.1em;
  text-decoration: none;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const NavLink = styled(Link)<{ $active?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme, $active }) => ($active ? theme.colors.lime : theme.colors.textMuted)};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const LogoutButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.danger};
  background: none;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    opacity: 0.8;
  }
`;
