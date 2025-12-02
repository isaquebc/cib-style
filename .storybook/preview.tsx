import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react-webpack5';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { lightTheme, darkTheme } from '../src/theme';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.foreground.primary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

const withTheme = (Story: any, context: any) => {
  const theme = context.globals.theme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = theme.colors.background.default;
    body.style.color = theme.colors.foreground.primary;
  }, [theme]);

  return (
    <ThemeProvider defaultMode={context.globals.theme || 'light'}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;