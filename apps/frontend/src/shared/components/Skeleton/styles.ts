import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const Bone = styled.div<{ $width?: string; $height?: string; $circle?: boolean }>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '1rem'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surfaceAlt} 25%,
    ${({ theme }) => theme.colors.border} 50%,
    ${({ theme }) => theme.colors.surfaceAlt} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  ${({ $circle }) => $circle && 'border-radius: 50%;'}
`;
