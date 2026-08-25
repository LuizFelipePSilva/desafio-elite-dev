import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.purple};
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  min-width: 0;
`;

export const QrPreview = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

export const Code = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Status = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.bg};
  background: ${({ $color }) => $color};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.bg};
    opacity: 0.6;
  }
`;

export const Right = styled.div`
  flex-shrink: 0;
`;

export const ViewButton = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.purple};
`;
