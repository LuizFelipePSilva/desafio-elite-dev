import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  font-family: ${({ theme }) => theme.fonts.body};
`;
