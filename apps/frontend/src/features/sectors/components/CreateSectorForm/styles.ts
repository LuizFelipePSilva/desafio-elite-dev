import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  width: 100%;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr auto;
  gap: ${({ theme }) => theme.space.md};
  align-items: flex-end;
  width: 100%;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  min-width: 0;
  width: 100%;

  & > * {
    width: 100%;
  }
`;

export const SubmitWrapper = styled.div`
  padding-bottom: 2px;
  flex-shrink: 0;
`;

export const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.danger};
`;
