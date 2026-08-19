import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.5;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }

  a {
    color: ${({ theme }) => theme.colors.purple};
    text-decoration: none;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input, textarea {
    font-family: inherit;
    font-size: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 600;
    line-height: 1.2;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.text};
  }
`
