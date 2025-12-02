# Theme Guide

## Overview

The CIB Style component library includes a comprehensive theming system built with styled-components. All components automatically use theme colors for consistent styling across your application.

## Theme Structure

The theme includes the following properties:

### Colors

#### Primary Colors
- `primary.main` - Main primary color
- `primary.light` - Lighter shade
- `primary.dark` - Darker shade
- `primary.contrastText` - Text color on primary background

#### Secondary Colors
- `secondary.main` - Main secondary color
- `secondary.light` - Lighter shade
- `secondary.dark` - Darker shade
- `secondary.contrastText` - Text color on secondary background

#### Background Colors
- `background.default` - Default page background
- `background.paper` - Card/paper background
- `background.elevated` - Elevated component background

#### Foreground Colors
- `foreground.primary` - Primary text color
- `foreground.secondary` - Secondary/muted text
- `foreground.disabled` - Disabled text color
- `foreground.hint` - Placeholder/hint text

#### Border Colors
- `border.main` - Default border color
- `border.light` - Lighter border
- `border.focus` - Focus state border

#### Status Colors
- `status.success` - Success states
- `status.warning` - Warning states
- `status.error` - Error states
- `status.info` - Info states

### Other Theme Properties

- **Spacing**: `xs`, `sm`, `md`, `lg`, `xl`
- **Border Radius**: `sm`, `md`, `lg`, `full`
- **Typography**: Font family, sizes, and weights
- **Shadows**: Shadow styles for elevation

## Using the Theme in Your App

### Basic Setup

Wrap your application with the `ThemeProvider`:

```tsx
import { ThemeProvider } from 'cib-style';

function App() {
  return (
    <ThemeProvider defaultMode="light">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Using the Theme Hook

Access the current theme and toggle between light/dark modes:

```tsx
import { useTheme } from 'cib-style';

function MyComponent() {
  const { theme, mode, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Current mode: {mode}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
    </div>
  );
}
```

### Creating Custom Themes

You can create custom themes by extending the base theme structure:

```tsx
import { Theme, ThemeProvider } from 'cib-style';

const customLightTheme: Theme = {
  colors: {
    primary: {
      main: '#ff6b6b',
      light: '#ff8787',
      dark: '#ee5a6f',
      contrastText: '#ffffff',
    },
    // ... rest of the theme
  },
  // ... spacing, typography, etc.
};

function App() {
  return (
    <ThemeProvider
      defaultMode="light"
      customLightTheme={customLightTheme}
    >
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Using Theme in Custom Styled Components

When creating your own styled components, you can access the theme:

```tsx
import styled from 'styled-components';

const CustomButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;
```

## Available Themes

### Light Theme

The light theme uses bright backgrounds with dark text:
- Background: White/Light Gray
- Text: Dark Gray/Black
- Primary: Blue (#3b82f6)
- Secondary: Violet (#8b5cf6)

### Dark Theme

The dark theme uses dark backgrounds with light text:
- Background: Slate 900 (#0f172a)
- Text: Light Gray/White
- Primary: Light Blue (#60a5fa)
- Secondary: Light Violet (#a78bfa)

## Storybook Integration

In Storybook, you can toggle between light and dark themes using the toolbar at the top of the page. Look for the theme toggle button (sun/moon icon).

## Component Examples

### Input Component with Theme

The Input component automatically uses theme colors:

```tsx
import { Input } from 'cib-style';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  // Uses theme.colors.primary.main for focus
  // Uses theme.colors.status.error for errors
  // Uses theme.colors.foreground.primary for text
/>
```

### Full Example with Theme Toggle

```tsx
import { ThemeProvider, useTheme, Input } from 'cib-style';

function ThemedForm() {
  const { toggleTheme, mode } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <Input
        label="Username"
        placeholder="Enter username"
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultMode="light">
      <ThemedForm />
    </ThemeProvider>
  );
}
```

## TypeScript Support

The theme is fully typed with TypeScript. You get autocomplete for all theme properties when using styled-components:

```tsx
import styled from 'styled-components';

const MyComponent = styled.div`
  // TypeScript will autocomplete theme properties
  color: ${({ theme }) => theme.colors./* autocomplete here */};
`;
```

## Best Practices

1. **Always use theme values** instead of hardcoded colors
2. **Wrap your app** with ThemeProvider at the root level
3. **Use semantic color names** (e.g., `status.error` instead of `red`)
4. **Test both themes** to ensure your components look good in light and dark modes
5. **Keep custom themes consistent** with the base theme structure

## Extending the Theme

To add new properties to the theme, update the `Theme` interface in `src/theme/types.ts` and add the values to both light and dark themes.
