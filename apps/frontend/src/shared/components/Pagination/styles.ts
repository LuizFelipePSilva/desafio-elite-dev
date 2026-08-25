import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Button = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 0.75rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme, $active }) => ($active ? theme.colors.bg : theme.colors.text)};
  background-color: ${({ theme, $active }) => ($active ? theme.colors.lime : 'transparent')};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.lime : theme.colors.border)};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $active }) => ($active ? theme.colors.lime : theme.colors.surfaceAlt)};
    border-color: ${({ theme }) => theme.colors.purple};
  }
`;

export const Info = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 1rem;
`;
