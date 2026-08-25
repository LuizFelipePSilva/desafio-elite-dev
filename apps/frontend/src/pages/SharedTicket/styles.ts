import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.lg};
`;

export const Container = styled.div`
  width: 100%;
  max-width: 480px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.xl};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  text-align: center;
`;

export const Badge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.bg};
  background: ${(props) => props.$color};
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    background: ${({ theme }) => theme.colors.bg};
    opacity: 0.6;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
`;

export const QrWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.space.lg};
  background: #ffffff;
  border: 1px dashed ${({ theme }) => theme.colors.border};

  svg {
    display: block;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.space.sm} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const DetailLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const DetailValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
  max-width: 60%;
`;

export const CodeValue = styled(DetailValue)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

export const StatusBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.bg};
  background: ${(props) => props.$color};
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    background: ${({ theme }) => theme.colors.bg};
    opacity: 0.6;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
`;

export const Footer = styled.div`
  padding-top: ${({ theme }) => theme.space.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
`;

export const FooterText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;
