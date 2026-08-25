import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  width: 100%;
  max-width: 720px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

export const SectionTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
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

export const SectorOption = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  background: ${({ theme, $selected }) => ($selected ? theme.colors.olive : theme.colors.surface)};
  border: 1px solid
    ${({ theme, $selected }) => ($selected ? theme.colors.lime : theme.colors.border)};
  border-radius: 14px;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: ${({ theme, $selected }) => ($selected ? theme.colors.lime : theme.colors.purple)};
  }
`;

export const SectorLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  min-width: 0;
`;

export const SectorIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.lime};
  flex-shrink: 0;
`;

export const SectorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

export const SectorName = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const SectorCapacity = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SectorPrice = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.lime};
  flex-shrink: 0;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.space.sm};
`;

export const EmptyText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  padding: ${({ theme }) => theme.space.xl} 0;
`;

export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.md};
`;

export const PaymentOption = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  border-radius: 12px;
  background: ${({ theme, $selected }) => ($selected ? theme.colors.olive : theme.colors.surface)};
  border: 1px solid
    ${({ theme, $selected }) => ($selected ? theme.colors.lime : theme.colors.border)};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme, $selected }) => ($selected ? theme.colors.lime : theme.colors.purple)};
  }
`;

export const PaymentDot = styled.div<{ $selected: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid
    ${({ theme, $selected }) => ($selected ? theme.colors.lime : theme.colors.border)};
  background: ${({ theme, $selected }) => ($selected ? theme.colors.lime : 'transparent')};
  transition: all 0.2s ease;
  flex-shrink: 0;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.md};
  padding-top: ${({ theme }) => theme.space.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.xl} 0;
  text-align: center;
`;

export const SuccessIcon = styled.div`
  font-size: 3rem;
  line-height: 1;
`;

export const SuccessTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const SuccessText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 400px;
  line-height: 1.6;
`;

export const SuccessActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.md};
`;
