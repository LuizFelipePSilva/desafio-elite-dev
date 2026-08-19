import styled, { css } from 'styled-components'

const paddings = {
  sm: css`padding: 1rem;`,
  md: css`padding: 1.5rem;`,
  lg: css`padding: 2rem;`,
}

export const StyledCard = styled.div<{ $padding: 'sm' | 'md' | 'lg' }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  ${({ $padding }) => paddings[$padding]}
`
