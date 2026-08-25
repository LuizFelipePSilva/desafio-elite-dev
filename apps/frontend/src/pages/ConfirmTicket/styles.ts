import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  font-family: ${({ theme }) => theme.fonts.body};
`;

export const Content = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const ScannerBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ScanFrame = styled.div`
  position: absolute;
  inset: 15%;
  border: 2px solid ${({ theme }) => theme.colors.lime};
  pointer-events: none;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

export const ManualRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  align-items: flex-end;
`;

export const ResultCard = styled.div<{ $status: 'VALID' | 'INVALID' }>`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid
    ${({ theme, $status }) => ($status === 'VALID' ? theme.colors.lime : theme.colors.danger)};
  padding: ${({ theme }) => theme.space.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

export const ResultStatus = styled.span<{ $status: 'VALID' | 'INVALID' }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme, $status }) => ($status === 'VALID' ? theme.colors.lime : theme.colors.danger)};
`;

export const ResultMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const ResultMeta = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const UnsupportedText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EventOption = styled.button`
  width: 100%;
  text-align: left;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space.md};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};

  &:hover {
    border-color: ${({ theme }) => theme.colors.purple};
  }
`;

export const EventOptionTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
`;

export const EventOptionMeta = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;
