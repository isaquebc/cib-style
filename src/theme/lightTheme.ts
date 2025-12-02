import { Theme } from './types';

export const lightTheme: Theme = {
  colors: {
    primary: {
      main: '#3b82f6',      // Blue 500
      light: '#60a5fa',     // Blue 400
      dark: '#2563eb',      // Blue 600
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6',      // Violet 500
      light: '#a78bfa',     // Violet 400
      dark: '#7c3aed',      // Violet 600
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f9fafb',     // Gray 50
      elevated: '#ffffff',
    },
    foreground: {
      primary: '#1f2937',   // Gray 800
      secondary: '#6b7280', // Gray 500
      disabled: '#9ca3af',  // Gray 400
      hint: '#d1d5db',      // Gray 300
    },
    border: {
      main: '#d1d5db',      // Gray 300
      light: '#e5e7eb',     // Gray 200
      focus: '#3b82f6',     // Blue 500
    },
    status: {
      success: '#10b981',   // Green 500
      warning: '#f59e0b',   // Amber 500
      error: '#ef4444',     // Red 500
      info: '#3b82f6',      // Blue 500
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
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    focus: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
};
