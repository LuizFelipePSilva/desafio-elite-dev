import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const Th = styled.th`
  padding: 0.875rem 1rem;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Td = styled.td`
  padding: 0.875rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Tr = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;
