import styled from 'styled-components';

export const Wrapper = styled.div<{ $size: 'sm' | 'md' | 'lg' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.bg};
  background-color: ${({ theme }) => theme.colors.lime};
  overflow: hidden;

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return 'width: 32px; height: 32px; font-size: 0.75rem;';
      case 'md':
        return 'width: 48px; height: 48px; font-size: 1rem;';
      case 'lg':
        return 'width: 64px; height: 64px; font-size: 1.25rem;';
    }
  }}
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
