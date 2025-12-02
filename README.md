# CIB Style - Component Library

A reusable component library built with **React**, **TypeScript**, and **styled-components** following the **Atomic Design** pattern.

## Features

- ⚛️ Built with React 19 and TypeScript
- 💅 Styled with styled-components
- 🎨 Comprehensive theming system with light/dark mode
- 🌈 Theme-aware components using primary, secondary, background, and foreground colors
- 📚 Documentation with Storybook
- 🏗️ Atomic Design pattern (Atoms, Molecules, Organisms, Templates, Pages)
- 🔄 Reusable across multiple frontend projects
- 📦 Well-structured component architecture

## Project Structure

```
cib-style/
├── src/
│   ├── components/
│   │   ├── atoms/           # Basic building blocks (Input, Button, etc.)
│   │   ├── molecules/       # Simple components made of atoms
│   │   ├── organisms/       # Complex components made of molecules/atoms
│   │   ├── templates/       # Page-level layouts
│   │   └── pages/           # Specific page instances
│   └── index.ts
├── .storybook/              # Storybook configuration
├── stories/                 # Additional stories
└── package.json
```

## Component Structure

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx        # Component logic and structure
├── ComponentName.style.ts   # Styled-components CSS
├── ComponentName.handler.ts # Handler functions (optional)
├── ComponentName.stories.tsx # Storybook stories
└── index.ts                # Exports
```

## Getting Started

### Installation

```bash
npm install
```

### Running Storybook

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### Building Storybook

```bash
npm run build-storybook
```

## Available Components

### Organisms

- **FormBuilder** - A dynamic form generator that creates complete forms from configuration:
  - Renders entire forms based on field configuration object
  - Supports all input types: text, email, password, number, tel, url, search, date, checkbox, select, multiselect
  - Built-in validation system:
    - Required fields
    - Min/max length
    - Pattern matching
    - Email validation
    - URL validation
    - Date range validation
    - Custom validation functions
  - Validates fields on blur event
  - Disables submit button when form has errors
  - Accepts `defaultValues` prop for pre-filling form data
  - Manages form state internally
  - `handleSubmit` callback receives complete form data object
  - Optional reset button with `handleReset` callback
  - Optional `handleChange` callback for real-time form data updates
  - Full width and disabled states
  - Reuses all existing atom components (Input, Button, Checkbox, DateInput, InputList, MultiSelect)

### Molecules

- **InputButton** - An input field with an adjacent button:
  - Button can display text or Material UI icons
  - Multiple button variants (primary, secondary, outline, ghost, danger)
  - Multiple button sizes (small, medium, large)
  - Supports Enter key to trigger button click
  - Full width option
  - Can disable input and button independently
  - Custom event handlers for both input and button

- **InputIcon** - An input field with an icon inside:
  - Icon can be positioned left or right
  - Supports Material UI icons
  - Icon can be clickable (e.g., for password visibility toggle)
  - Perfect for search bars, email inputs, password fields
  - Full width option
  - Custom event handlers including handleIconClick

### Atoms

- **Input** - A versatile text input component with support for:
  - Multiple input types (text, password, email, number, tel, url, search)
  - Label and helper text
  - Error state and validation
  - Disabled and read-only states
  - Full width option
  - Custom styling via styled-components

- **Button** - A versatile button component with support for:
  - Multiple variants (primary, secondary, outline, ghost, danger)
  - Multiple sizes (small, medium, large)
  - Loading state with spinner
  - Disabled state
  - Full width option
  - Custom event handlers (handleClick, handleFocus, handleBlur)

- **DateInput** - A date input with calendar picker:
  - Brazilian date format (DD/MM/YYYY) for pt-BR locale
  - US format (MM/DD/YYYY) for en-US locale
  - Auto-detects browser locale
  - Calendar popup for date selection
  - Always stores dates in UTC
  - Min/max date validation
  - Custom event handlers (handleChange, handleBlur, handleFocus, handleCalendarOpen, handleCalendarClose)

- **InputList** - An input field with a datalist for autocomplete suggestions:
  - HTML5 datalist for native autocomplete
  - Supports both string arrays and object arrays (with value/label)
  - Users can select from suggestions or type freely
  - Multiple input types (text, email, tel, url, search)
  - handleSelect event triggered when user selects from the list
  - Perfect for country selectors, language pickers, search suggestions
  - Full width option
  - Custom event handlers (handleChange, handleSelect, handleBlur, handleFocus)

- **MultiSelect** - A multi-selection dropdown with chips:
  - Select multiple options from a searchable dropdown
  - Selected items displayed as removable chips
  - Supports both string arrays and object arrays (with value/label)
  - Keyboard navigation (Arrow keys, Enter, Escape, Backspace)
  - Optional max selections limit
  - Searchable/filterable dropdown
  - Click outside to close
  - Perfect for skills selection, tags, categories
  - Full width option
  - Custom event handlers (handleChange, handleSelect, handleRemove, handleInputChange)

- **Checkbox** - A styled checkbox input with label:
  - Custom styled checkbox with theme colors
  - Label support with inline display
  - Error and helper text
  - Controlled and uncontrolled modes
  - Disabled state
  - Required field indicator
  - Accessible with proper ARIA attributes
  - Perfect for agreements, preferences, multi-selection forms
  - Custom event handlers (handleChange, handleBlur, handleFocus)

## Theming

The library includes a comprehensive theming system with built-in light and dark themes. All components automatically use theme colors.

### Quick Start with Theme

```tsx
import { ThemeProvider, Input } from 'cib-style';

function App() {
  return (
    <ThemeProvider defaultMode="light">
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
    </ThemeProvider>
  );
}
```

### Theme Features

- **Primary & Secondary Colors**: Customizable brand colors
- **Background & Foreground**: Adaptive colors for light/dark modes
- **Status Colors**: Success, warning, error, and info states
- **Spacing & Typography**: Consistent sizing and fonts
- **Shadows & Border Radius**: Elevation and rounded corners

### Toggle Theme

```tsx
import { useTheme } from 'cib-style';

function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
```

For detailed theming documentation, see [THEME_GUIDE.md](THEME_GUIDE.md).

## Using Components in Your Projects

To use these components in your projects, you can import them directly:

### Using FormBuilder (Recommended)

The easiest way to create forms is using the FormBuilder component:

```tsx
import { FormBuilder, ThemeProvider } from 'cib-style';

function RegistrationPage() {
  return (
    <ThemeProvider defaultMode="light">
      <FormBuilder
        fields={[
          {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            required: true,
          },
          {
            name: 'password',
            type: 'password',
            label: 'Password',
            placeholder: 'Create a password',
            required: true,
            minLength: 8,
            validate: (value) => {
              if (!/[A-Z]/.test(value)) return 'Must contain uppercase letter';
              if (!/[0-9]/.test(value)) return 'Must contain a number';
              return undefined;
            },
          },
          {
            name: 'birthDate',
            type: 'date',
            label: 'Date of Birth',
            required: true,
            locale: 'en-US',
          },
          {
            name: 'skills',
            type: 'multiselect',
            label: 'Skills',
            placeholder: 'Select your skills',
            options: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
            maxSelections: 3,
          },
          {
            name: 'terms',
            type: 'checkbox',
            label: 'I agree to the terms and conditions',
            required: true,
          },
        ]}
        submitButtonText="Register"
        showResetButton
        handleSubmit={(data) => {
          console.log('Form submitted:', data);
          // data = { email: '...', password: '...', birthDate: Date, skills: [...], terms: true }
        }}
      />
    </ThemeProvider>
  );
}
```

### Using Individual Components

You can also use components individually for more control:

```tsx
import { Input, Button, DateInput, InputButton, InputList, MultiSelect, Checkbox, ThemeProvider } from 'cib-style';
import SearchIcon from '@mui/icons-material/Search';

function MyForm() {
  return (
    <ThemeProvider defaultMode="light">
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        handleChange={(value) => console.log(value)}
      />

      <InputList
        label="Country"
        placeholder="Select or type a country"
        options={['Brazil', 'United States', 'Canada', 'Mexico']}
        handleChange={(value) => console.log('Typing:', value)}
        handleSelect={(value) => console.log('Selected:', value)}
      />

      <MultiSelect
        label="Skills"
        placeholder="Select your skills..."
        options={['JavaScript', 'TypeScript', 'React', 'Node.js']}
        handleChange={(values) => console.log('Selected skills:', values)}
        maxSelections={3}
      />

      <DateInput
        label="Birth Date"
        locale="pt-BR"
        handleChange={(date, formatted) => {
          console.log('Date in UTC:', date);
          console.log('Formatted:', formatted);
        }}
      />

      <Checkbox
        label="I agree to the terms and conditions"
        required
        handleChange={(checked) => console.log('Agreed:', checked)}
      />

      <InputButton
        label="Search"
        placeholder="Search products..."
        buttonIcon={<SearchIcon />}
        handleButtonClick={(value) => console.log('Search:', value)}
      />

      <Button
        variant="primary"
        handleClick={() => console.log('Submitted!')}
      >
        Submit
      </Button>
    </ThemeProvider>
  );
}
```

## TypeScript Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@components/*` - src/components/*
- `@atoms/*` - src/components/atoms/*
- `@molecules/*` - src/components/molecules/*
- `@organisms/*` - src/components/organisms/*
- `@templates/*` - src/components/templates/*
- `@pages/*` - src/components/pages/*

## Technologies

- **React** 19.2.0
- **TypeScript** 5.9.3
- **styled-components** 6.1.19
- **Storybook** 10.0.8

## License

ISC
