import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateX(120%); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  pointer-events: none;
`;

export const Container = styled.div<{ $type: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  min-width: 280px;
  max-width: 420px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid
    ${({ theme, $type }) => ($type === 'error' ? theme.colors.danger : theme.colors.lime)};
  pointer-events: auto;
  animation: ${slideIn} 0.3s ease forwards;
`;

export const Icon = styled.span<{ $type: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.bg};
  background-color: ${({ theme, $type }) =>
    $type === 'error' ? theme.colors.danger : theme.colors.lime};
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  flex-shrink: 0;
`;

export const Message = styled.p`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  margin: 0;
`;

export const Close = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
