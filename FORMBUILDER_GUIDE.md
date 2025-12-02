# FormBuilder Component Guide

Complete guide for using the FormBuilder component to create dynamic, validated forms.

## Overview

FormBuilder is an organism component that generates complete forms from a configuration object. It handles form state, validation, and submission automatically.

## Basic Usage

```tsx
import { FormBuilder, ThemeProvider } from 'cib-style';

function App() {
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
            required: true,
            minLength: 8,
          },
        ]}
        handleSubmit={(data) => {
          console.log('Form data:', data);
          // data = { email: 'user@example.com', password: 'password123' }
        }}
      />
    </ThemeProvider>
  );
}
```

## Field Types

### Text Inputs
- `text` - Standard text input
- `email` - Email input with validation
- `password` - Password input (masked)
- `number` - Numeric input
- `tel` - Telephone number
- `url` - URL input with validation
- `search` - Search input

### Special Inputs
- `date` - Date picker with calendar
- `checkbox` - Checkbox input
- `select` - Dropdown with autocomplete (uses InputList)
- `multiselect` - Multi-selection dropdown with chips

## Field Configuration

### FormFieldConfig Interface

```typescript
interface FormFieldConfig {
  name: string;                    // Required: unique field identifier
  type: FieldType;                 // Required: field type
  label?: string;                  // Field label
  placeholder?: string;            // Placeholder text
  helperText?: string;            // Help text shown below field
  required?: boolean;             // Mark field as required
  disabled?: boolean;             // Disable the field
  fullWidth?: boolean;            // Make field full width

  // Date field options
  locale?: string;                // 'pt-BR' or 'en-US'
  minDate?: Date;                 // Minimum allowed date
  maxDate?: Date;                 // Maximum allowed date

  // Select/multiselect options
  options?: Array<string | { value: string; label?: string }>;
  maxSelections?: number;         // Max selections for multiselect
  other?: string;                 // For multiselect: enables "Other" option with custom label

  // Validation
  validate?: (value: any) => string | undefined;  // Custom validator
  maxLength?: number;             // Max string length
  minLength?: number;             // Min string length
  pattern?: string;               // Regex pattern
}
```

## Validation

### Built-in Validators

1. **Required Fields**
```tsx
{
  name: 'username',
  type: 'text',
  required: true,  // Error if empty
}
```

2. **Length Validation**
```tsx
{
  name: 'password',
  type: 'password',
  minLength: 8,    // Minimum 8 characters
  maxLength: 50,   // Maximum 50 characters
}
```

3. **Pattern Matching**
```tsx
{
  name: 'username',
  type: 'text',
  pattern: '^[a-zA-Z0-9_]+$',  // Only alphanumeric and underscore
}
```

4. **Email Validation**
```tsx
{
  name: 'email',
  type: 'email',  // Automatically validates email format
}
```

5. **URL Validation**
```tsx
{
  name: 'website',
  type: 'url',  // Automatically validates URL format
}
```

6. **Date Range Validation**
```tsx
{
  name: 'birthDate',
  type: 'date',
  minDate: new Date('1900-01-01'),
  maxDate: new Date(),  // Can't be in the future
}
```

### Custom Validators

```tsx
{
  name: 'age',
  type: 'number',
  validate: (value) => {
    const age = parseInt(value);
    if (isNaN(age)) return 'Age must be a number';
    if (age < 18) return 'Must be 18 or older';
    if (age > 120) return 'Please enter a valid age';
    return undefined;  // No error
  },
}
```

### Validation Behavior

- Validation runs on **blur** (when field loses focus)
- Submit button is **disabled** when form has errors
- Error messages appear below the field
- Fields are marked as "touched" after blur

## Props

### FormBuilderProps

```typescript
interface FormBuilderProps {
  // Required
  fields: FormFieldConfig[];
  handleSubmit: (formData: Record<string, any>) => void;

  // Optional
  defaultValues?: Record<string, any>;
  submitButtonText?: string;
  submitButtonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  resetButtonText?: string;
  showResetButton?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  handleChange?: (formData: Record<string, any>) => void;
  handleReset?: (formData: Record<string, any>) => void;
}
```

## Examples

### Login Form

```tsx
<FormBuilder
  fields={[
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      minLength: 8,
    },
    {
      name: 'remember',
      type: 'checkbox',
      label: 'Remember me',
    },
  ]}
  submitButtonText="Login"
  handleSubmit={(data) => {
    // { email, password, remember }
    loginUser(data);
  }}
/>
```

### Registration Form with Validation

```tsx
<FormBuilder
  fields={[
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: '^[a-zA-Z0-9_]+$',
      helperText: 'Only letters, numbers, and underscores',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      minLength: 8,
      validate: (value) => {
        if (!/[A-Z]/.test(value)) return 'Must contain uppercase letter';
        if (!/[a-z]/.test(value)) return 'Must contain lowercase letter';
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
      maxDate: new Date(),
    },
    {
      name: 'terms',
      type: 'checkbox',
      label: 'I agree to terms and conditions',
      required: true,
    },
  ]}
  submitButtonText="Register"
  showResetButton
  handleSubmit={(data) => registerUser(data)}
/>
```

### Profile Form with Default Values

```tsx
<FormBuilder
  fields={[
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'country',
      type: 'select',
      label: 'Country',
      options: ['United States', 'Canada', 'Brazil', 'United Kingdom'],
    },
    {
      name: 'skills',
      type: 'multiselect',
      label: 'Skills',
      options: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
      maxSelections: 5,
    },
  ]}
  defaultValues={{
    name: 'John Doe',
    email: 'john@example.com',
    country: 'United States',
    skills: ['JavaScript', 'React'],
  }}
  submitButtonText="Update Profile"
  showResetButton
  handleSubmit={(data) => updateProfile(data)}
  handleReset={(data) => console.log('Form reset to:', data)}
/>
```

### Job Application Form

```tsx
<FormBuilder
  fields={[
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'position',
      type: 'select',
      label: 'Position',
      required: true,
      options: [
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'DevOps Engineer',
      ],
    },
    {
      name: 'skills',
      type: 'multiselect',
      label: 'Technical Skills',
      required: true,
      options: [
        'JavaScript',
        'TypeScript',
        'React',
        'Node.js',
        'Python',
        'Docker',
      ],
      maxSelections: 5,
    },
    {
      name: 'experience',
      type: 'number',
      label: 'Years of Experience',
      required: true,
    },
    {
      name: 'linkedin',
      type: 'url',
      label: 'LinkedIn Profile',
      helperText: 'Optional',
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Available Start Date',
      required: true,
    },
    {
      name: 'remote',
      type: 'checkbox',
      label: 'Interested in remote work',
    },
  ]}
  submitButtonText="Submit Application"
  handleSubmit={(data) => submitApplication(data)}
/>
```

### Real-time Form Changes

```tsx
const [formData, setFormData] = useState({});

<FormBuilder
  fields={[...]}
  handleSubmit={(data) => submitForm(data)}
  handleChange={(data) => {
    // Called on every field change
    setFormData(data);
    console.log('Current form state:', data);
  }}
/>
```

### MultiSelect with "Other" Option

The multiselect field supports an "other" option that allows users to add custom values not in the predefined list:

```tsx
<FormBuilder
  fields={[
    {
      name: 'skills',
      type: 'multiselect',
      label: 'Technical Skills',
      placeholder: 'Select your skills...',
      required: true,
      options: [
        'JavaScript',
        'TypeScript',
        'React',
        'Node.js',
        'Python',
        'Docker',
      ],
      other: 'Other Skill',  // Enables custom input
      maxSelections: 5,
      helperText: 'Select up to 5 skills or add your own',
    },
  ]}
  handleSubmit={(data) => {
    // data.skills may include custom values entered by the user
    console.log('Skills:', data.skills);
    // Example: ['JavaScript', 'React', 'Vue.js', 'Svelte']
    // where 'Vue.js' and 'Svelte' were custom entries
  }}
/>
```

**How it works:**
1. Set the `other` prop to a custom label (e.g., "Other Skill", "Add Custom", etc.)
2. An "Other" option appears at the bottom of the dropdown
3. When selected, an input field appears where users can type their custom value
4. Custom values are added to the selected items just like regular options
5. Custom values are included in the form data when submitted

## Form Data Structure

When `handleSubmit` is called, you receive an object with all field values:

```typescript
{
  // Text fields: string
  username: 'johndoe',
  email: 'john@example.com',

  // Number fields: string (you may need to parse)
  age: '25',

  // Date fields: Date object
  birthDate: Date,

  // Checkbox: boolean
  terms: true,

  // Select: string
  country: 'United States',

  // Multiselect: string[]
  skills: ['JavaScript', 'React', 'TypeScript']
}
```

## Best Practices

1. **Use descriptive field names** - They become keys in the submitted data
2. **Provide helpful helperText** - Guide users on what to enter
3. **Use custom validators for complex rules** - Beyond built-in validation
4. **Set appropriate default values** - For edit forms
5. **Handle form submission errors** - In your handleSubmit callback
6. **Use locale prop for dates** - Match user's region
7. **Limit multiselect options** - Use maxSelections when appropriate

## TypeScript Support

All components are fully typed. Import types as needed:

```typescript
import { FormBuilder, FormFieldConfig, FieldType } from 'cib-style';

const fields: FormFieldConfig[] = [...];
```

## Styling

FormBuilder uses the theme system. Customize appearance via ThemeProvider:

```tsx
<ThemeProvider defaultMode="dark">
  <FormBuilder fields={fields} handleSubmit={handleSubmit} />
</ThemeProvider>
```

All fields automatically adapt to light/dark theme.
