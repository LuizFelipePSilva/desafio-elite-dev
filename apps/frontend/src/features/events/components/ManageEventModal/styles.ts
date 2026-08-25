import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    min-width: unset;
    max-width: 100%;
  }
`;

export const Tabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.space.sm};
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme, $active }) => ($active ? theme.colors.bg : theme.colors.textMuted)};
  background: ${({ theme, $active }) => ($active ? theme.colors.purple : 'transparent')};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme, $active }) => ($active ? theme.colors.bg : theme.colors.text)};
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const Count = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
`;

export const SectorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

export const SectorRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};

  & > *:first-child {
    flex: 1;
  }
`;

export const SectorActions = styled.div`
  flex-shrink: 0;
`;

export const EditSectorCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.purple};
  border-radius: 14px;
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

export const EditRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: ${({ theme }) => theme.space.md};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const EditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.sm};
`;

export const EmptyText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  padding: ${({ theme }) => theme.space.xl} 0;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.space.md};
`;

export const SettingsForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.md};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const SettingsActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.space.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const RightActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
`;
