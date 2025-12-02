# Handler Pattern Guide

## Overview

All components in CIB Style follow a consistent handler pattern for managing events. This guide explains the naming conventions and best practices for implementing handlers.

## Handler Naming Convention

### Pattern

Components accept props with the "handle" prefix instead of the traditional React "on" prefix:

- **Component Props**: `handleChange`, `handleBlur`, `handleFocus`, `handleClick`, etc.
- **Internal Handlers**: Same names as props, connecting to utility functions
- **Utility Functions**: Simple verbs (e.g., `validate`, `format`)

### Example

```typescript
// ✅ Component Usage
<Input
  handleChange={(value) => console.log(value)}
  handleBlur={(value) => validateField(value)}
  handleFocus={() => setActive(true)}
/>

// Traditional React pattern (NOT used in this library)
<input
  onChange={...}
  onBlur={...}
  onFocus={...}
/>
```

## Handler Implementation

### File Structure

Each component has a `.handler.ts` file that exports:
1. Handler interface
2. Event handler functions
3. Utility functions

### Example: Input.handler.ts

```typescript
import { ChangeEvent, FocusEvent, MouseEvent, KeyboardEvent } from 'react';

// 1. Handler Interface
export interface InputHandlers {
  handleChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (value: string, event: FocusEvent<HTMLInputElement>) => void;
  handleFocus?: (value: string, event: FocusEvent<HTMLInputElement>) => void;
  handleClick?: (value: string, event: MouseEvent<HTMLInputElement>) => void;
  handleKeyDown?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
  handleKeyUp?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
  handleKeyPress?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
}

// 2. Event Handler Functions
export const handleChange = (
  event: ChangeEvent<HTMLInputElement>,
  callback?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
): void => {
  const value = event.target.value;
  if (callback) {
    callback(value, event);
  }
};

export const handleClick = (
  event: MouseEvent<HTMLInputElement>,
  callback?: (value: string, event: MouseEvent<HTMLInputElement>) => void
): void => {
  const value = event.currentTarget.value;
  if (callback) {
    callback(value, event);
  }
};

// 3. Utility Functions
export const validate = (value: string, pattern?: RegExp): boolean => {
  if (!pattern) return true;
  return pattern.test(value);
};

export const format = (
  value: string,
  formatter?: (value: string) => string
): string => {
  if (!formatter) return value;
  return formatter(value);
};
```

## Component Integration

### In the Component File

```typescript
import { handleChange, handleBlur, handleFocus } from './Component.handler';

export const Component = ({ handleChange: handleChangeProp, handleBlur: handleBlurProp, handleFocus: handleFocusProp }) => {
  // Internal handler that calls the exported handler
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event, handleChangeProp);
  };

  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    handleBlur(event, handleBlurProp);
  };

  return (
    <input
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
    />
  );
};
```

## Available Event Handlers

### Common Events

| Handler | Event Type | Use Case |
|---------|-----------|----------|
| `handleChange` | `ChangeEvent` | Input value changes |
| `handleClick` | `MouseEvent` | Element is clicked |
| `handleBlur` | `FocusEvent` | Element loses focus |
| `handleFocus` | `FocusEvent` | Element gains focus |

### Keyboard Events

| Handler | Event Type | Use Case |
|---------|-----------|----------|
| `handleKeyDown` | `KeyboardEvent` | Key is pressed down |
| `handleKeyUp` | `KeyboardEvent` | Key is released |
| `handleKeyPress` | `KeyboardEvent` | Character key is pressed |

### Mouse Events

| Handler | Event Type | Use Case |
|---------|-----------|----------|
| `handleClick` | `MouseEvent` | Element is clicked |
| `handleDoubleClick` | `MouseEvent` | Element is double-clicked |
| `handleMouseEnter` | `MouseEvent` | Mouse enters element |
| `handleMouseLeave` | `MouseEvent` | Mouse leaves element |

## Callback Pattern

All handlers follow this pattern:

```typescript
export const handle[Event] = (
  event: EventType,
  callback?: (value: string, event: EventType) => void
): void => {
  const value = event.target.value; // or event.currentTarget.value
  if (callback) {
    callback(value, event);
  }
};
```

### Key Points:

1. **Event Parameter**: Always the first parameter
2. **Optional Callback**: Second parameter, always optional
3. **Value Extraction**: Extract value from event before passing to callback
4. **Both Arguments**: Callback receives both value and original event

## Usage Examples

### Basic Usage

```tsx
import { Input } from 'cib-style';

<Input
  handleChange={(value, event) => {
    console.log('New value:', value);
    console.log('Event:', event);
  }}
/>
```

### Multiple Handlers

```tsx
<Input
  handleChange={(value) => setValue(value)}
  handleBlur={(value) => validateField(value)}
  handleFocus={() => setActiveField(true)}
  handleKeyDown={(value, event) => {
    if (event.key === 'Enter') {
      submitForm();
    }
  }}
/>
```

### With Validation

```tsx
import { Input } from 'cib-style';

const [value, setValue] = useState('');
const [error, setError] = useState('');

<Input
  value={value}
  error={error}
  handleChange={(newValue) => {
    setValue(newValue);
    if (newValue.length < 3) {
      setError('Must be at least 3 characters');
    } else {
      setError('');
    }
  }}
  handleBlur={(value) => {
    // Final validation on blur
    if (!value) {
      setError('This field is required');
    }
  }}
/>
```

## Creating New Handlers

When creating a new component, follow these steps:

### 1. Create the Handler Interface

```typescript
export interface [Component]Handlers {
  handleChange?: (value: string, event: ChangeEvent) => void;
  handleClick?: (value: string, event: MouseEvent) => void;
  // ... other handlers
}
```

### 2. Implement Handler Functions

```typescript
export const handleChange = (
  event: ChangeEvent<HTMLElement>,
  callback?: (value: string, event: ChangeEvent<HTMLElement>) => void
): void => {
  const value = event.target.value;
  if (callback) {
    callback(value, event);
  }
};
```

### 3. Use in Component

```typescript
export interface [Component]Props extends [Component]Handlers {
  // ... other props
}

export const [Component] = ({ handleChange: handleChangeProp, handleClick: handleClickProp, ...props }) => {
  const onChangeHandler = (event) => handleChange(event, handleChangeProp);
  const onClickHandler = (event) => handleClick(event, handleClickProp);

  return <element onChange={onChangeHandler} onClick={onClickHandler} />;
};
```

## Best Practices

1. **Consistent Naming**: Always use `handle[Event]` for event handlers
2. **Simple Utilities**: Use simple verb names for utility functions (`validate`, `format`, etc.)
3. **Type Safety**: Always include proper TypeScript types
4. **Optional Callbacks**: Make all callbacks optional with `?`
5. **Value Extraction**: Extract and pass value as first argument to callbacks
6. **Event Access**: Always pass the original event as second argument
7. **Documentation**: Document each handler with JSDoc comments

## Anti-Patterns to Avoid

❌ **Don't**: Use verbose prefixes
```typescript
// Bad
handleInputChange()
handleButtonClick()
```

✅ **Do**: Use simple, consistent names
```typescript
// Good
handleChange()
handleClick()
```

❌ **Don't**: Create handlers without callbacks
```typescript
// Bad
export const handleClick = (event: MouseEvent): void => {
  // Do something directly
};
```

✅ **Do**: Accept optional callbacks
```typescript
// Good
export const handleClick = (
  event: MouseEvent,
  callback?: (value: string, event: MouseEvent) => void
): void => {
  const value = event.currentTarget.value;
  if (callback) {
    callback(value, event);
  }
};
```
