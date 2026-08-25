import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  width: 100%;
  min-width: 360px;
  max-width: 420px;

  @media (max-width: 768px) {
    min-width: unset;
    max-width: 100%;
  }
`;

export const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.sm};
  padding-top: ${({ theme }) => theme.space.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
