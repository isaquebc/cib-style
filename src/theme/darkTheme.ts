import { Theme } from './types';

export const darkTheme: Theme = {
  colors: {
    primary: {
      main: '#60a5fa',      // Blue 400
      light: '#93c5fd',     // Blue 300
      dark: '#3b82f6',      // Blue 500
      contrastText: '#0f172a', // Slate 900
    },
    secondary: {
      main: '#a78bfa',      // Violet 400
      light: '#c4b5fd',     // Violet 300
      dark: '#8b5cf6',      // Violet 500
      contrastText: '#0f172a', // Slate 900
    },
    background: {
      default: '#0f172a',   // Slate 900
      paper: '#1e293b',     // Slate 800
      elevated: '#334155',  // Slate 700
    },
    foreground: {
      primary: '#f1f5f9',   // Slate 100
      secondary: '#cbd5e1', // Slate 300
      disabled: '#64748b',  // Slate 500
      hint: '#475569',      // Slate 600
    },
    border: {
      main: '#475569',      // Slate 600
      light: '#334155',     // Slate 700
      focus: '#60a5fa',     // Blue 400
    },
    status: {
      success: '#34d399',   // Green 400
      warning: '#fbbf24',   // Amber 400
      error: '#f87171',     // Red 400
      info: '#60a5fa',      // Blue 400
    },
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
  },
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    full: '9999px',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      md: '1rem',      // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    focus: '0 0 0 3px rgba(96, 165, 250, 0.2)',
  },
};
