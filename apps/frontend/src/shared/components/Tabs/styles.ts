import styled from 'styled-components';

export const List = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1.5rem;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  padding: 0.75rem 1.5rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme, $active }) => ($active ? theme.colors.lime : theme.colors.textMuted)};
  background-color: ${({ theme, $active }) => ($active ? theme.colors.olive : 'transparent')};
  border: none;
  border-bottom: 2px solid ${({ theme, $active }) => ($active ? theme.colors.lime : 'transparent')};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition:
    color 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Panel = styled.div`
  padding: 0.5rem 0;
`;
