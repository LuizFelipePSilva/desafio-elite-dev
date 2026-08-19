import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.body};
`

export const StyledInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  outline: none;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.purple)};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.fonts.body};
`
