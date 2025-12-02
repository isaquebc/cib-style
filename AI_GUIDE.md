# AI Assistant Guide - CIB Style Library

Quick reference for AI assistants working with this React component library.

## Project Type
React component library using TypeScript, styled-components, Atomic Design pattern, and Storybook.

## Key Information

**Tech Stack:**
- React 19.2.0 + TypeScript 5.9.3
- styled-components 6.1.19
- Material UI icons
- Storybook 10.0.8

**Commands:**
```bash
npm run storybook       # Dev server on :6006
npm run build-storybook # Build static Storybook
```

## Directory Structure

```
src/
├── components/
│   ├── atoms/          # Basic components (Input, Button, DateInput, etc.)
│   ├── molecules/      # Composite components (InputIcon, InputButton)
│   ├── organisms/      # Complex components
│   ├── templates/      # Page layouts
│   └── pages/          # Page components (NotFound, NotAuthorized)
├── theme/              # Theme configuration (light/dark modes)
├── styled.d.ts         # TypeScript styled-components definitions
└── index.ts            # Main export file
```

## Component File Pattern

Every component follows this structure:
```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.style.ts     # styled-components CSS
├── ComponentName.handler.ts   # Event handlers (if needed)
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts                   # Exports
```

## Path Aliases (tsconfig.json)

```
@components/* → src/components/*
@atoms/*      → src/components/atoms/*
@molecules/*  → src/components/molecules/*
@organisms/*  → src/components/organisms/*
@templates/*  → src/components/templates/*
@pages/*      → src/components/pages/*
```

## Existing Components

### Atoms
- **Input** - Text input with validation, error states, types (text/password/email/etc.)
- **Button** - Variants (primary/secondary/outline/ghost/danger), sizes, loading state
- **DateInput** - Calendar picker, locale support (pt-BR/en-US), UTC storage
- **InputList** - Autocomplete with HTML5 datalist, string/object options
- **MultiSelect** - Multi-selection dropdown with chips, keyboard navigation, optional "other" field for custom values
- **Checkbox** - Styled checkbox with label, error states

### Molecules
- **InputIcon** - Input with Material UI icon (left/right), clickable icon
- **InputButton** - Input with adjacent button, Enter key support

### Organisms
- **FormBuilder** - Dynamic form generator that renders complete forms from configuration object
  - Supports all input types (text, email, password, date, checkbox, select, multiselect)
  - Built-in validation (required, minLength, maxLength, pattern, email, URL, custom validators)
  - Validates on blur and disables submit button when errors exist
  - Accepts `defaultValues` for pre-filling forms
  - Handles form state internally
  - Custom `handleSubmit` receives complete form data
  - Optional reset button with `handleReset` callback
  - Field-level validation functions run on blur
  - MultiSelect fields support `other` prop for custom value input (e.g., `other: "Other Option"`)

### Pages
- **NotFound** - 404 page
- **NotAuthorized** - 403/unauthorized page

## Theme System

**Provider:**
```tsx
import { ThemeProvider } from 'cib-style';
<ThemeProvider defaultMode="light">...</ThemeProvider>
```

**Hook:**
```tsx
import { useTheme } from 'cib-style';
const { mode, toggleTheme } = useTheme();
```

**Theme Colors:** primary, secondary, background, foreground, success, warning, error, info

## Common Patterns

### MultiSelect with Custom Values
```typescript
// In FormBuilder
{
  name: 'skills',
  type: 'multiselect',
  label: 'Skills',
  options: ['JavaScript', 'Python', 'Java'],
  other: 'Other Skill',  // Enables custom value input
  maxSelections: 5,
}

// Standalone MultiSelect
<MultiSelect
  label="Languages"
  options={['English', 'Spanish', 'French']}
  other="Other Language"  // Shows "Other Language" option in dropdown
  handleChange={(values) => console.log(values)}  // May include custom values
/>
```

### Handler Pattern
- Handlers are in separate `.handler.ts` files
- See `HANDLER_PATTERN.md` for detailed conventions
- Event handlers prefixed with `handle` (handleChange, handleClick, handleBlur, handleFocus)

### Component Props Pattern
```typescript
interface ComponentProps {
  // Required props first
  label: string;

  // Optional with defaults
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;

  // Handlers
  handleChange?: (value: string) => void;
  handleClick?: () => void;
}
```

### Styled Components Pattern
```typescript
import styled from 'styled-components';

export const StyledComponent = styled.div<{ $variant?: string }>`
  color: ${({ theme }) => theme.colors.primary};
  // Use $ prefix for transient props that shouldn't pass to DOM
`;
```

## Quick Task Guide

### Adding a New Atom Component
1. Create folder in `src/components/atoms/ComponentName/`
2. Create 4 files: `.tsx`, `.style.ts`, `.stories.tsx`, `index.ts`
3. Add handler file `.handler.ts` if needed
4. Export in `src/components/atoms/index.ts`
5. Export in `src/index.ts`

### Adding a New Molecule
Same as atom but in `src/components/molecules/`

### Adding a New Organism
Same as atom but in `src/components/organisms/`

### Modifying Existing Component
1. Read component files first: `ComponentName.tsx`, `.style.ts`, `.handler.ts`
2. Check `.stories.tsx` for usage examples
3. Maintain existing prop interfaces
4. Update stories if adding new props

### Styling Changes
- Theme colors in `src/theme/`
- Component styles in `.style.ts` files
- Always use theme colors: `${({ theme }) => theme.colors.primary}`

### Testing Changes
Run Storybook and verify component renders correctly

## Important Notes

- All components use controlled inputs pattern
- Theme-aware: all components respond to light/dark mode
- Handlers follow naming convention: `handle[Action]` (handleChange, handleClick)
- Material UI icons imported as: `import IconName from '@mui/icons-material/IconName'`
- Transient props in styled-components use `$` prefix (e.g., `$isOpen`)
- Always provide TypeScript types for props
- Components export both named and default exports

## Reference Files

- `README.md` - Full component API documentation
- `THEME_GUIDE.md` - Theming system details
- `HANDLER_PATTERN.md` - Event handler conventions
- `FORMBUILDER_GUIDE.md` - Complete FormBuilder usage guide
- `USAGE_EXAMPLE.md` - Code examples
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration

## Common Tasks with Commands

**Find all components:**
```bash
find src/components -name "*.tsx" -not -name "*.stories.tsx"
```

**Find component exports:**
```bash
grep -r "export" src/index.ts
```

**Check theme structure:**
```bash
cat src/theme/index.ts
```

This guide provides 80% of what you need without reading multiple files. Refer to specific files only when needed for detailed implementation.
