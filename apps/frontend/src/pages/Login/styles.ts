import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.bg};
`

export const Brand = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`

export const Logo = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.lime};
  letter-spacing: 0.1em;
`

export const Tagline = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 0.5rem;
`

export const Footer = styled.p`
  margin-top: 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`
