# Usage Examples

## How to Use Components in Your Projects

### Installing

If you want to use this library in other projects, you can link it locally or publish it to npm.

#### Local Development Link

```bash
# In the cib-style directory
npm link

# In your project directory
npm link cib-style
```

### Importing Components

```tsx
// Import specific components
import { Input } from 'cib-style';

// Or import using path aliases (if configured in your project)
import { Input } from '@atoms/Input';
```

### Basic Usage Examples

#### Simple Text Input

```tsx
import { Input } from 'cib-style';

function App() {
  return (
    <Input
      placeholder="Enter your name"
    />
  );
}
```

#### Input with Label

```tsx
import { Input } from 'cib-style';

function LoginForm() {
  return (
    <Input
      label="Username"
      type="text"
      placeholder="Enter your username"
      required
    />
  );
}
```

#### Controlled Input with State

```tsx
import { Input } from 'cib-style';
import { useState } from 'react';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (value: string) => {
    setEmail(value);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };

  return (
    <Input
      label="Email Address"
      type="email"
      value={email}
      onChange={handleChange}
      error={error}
      placeholder="name@example.com"
      fullWidth
    />
  );
}
```

#### Password Input with Helper Text

```tsx
import { Input } from 'cib-style';

function PasswordField() {
  return (
    <Input
      label="Password"
      type="password"
      placeholder="Enter a strong password"
      helperText="Must be at least 8 characters with letters and numbers"
      required
    />
  );
}
```

#### Disabled Input

```tsx
import { Input } from 'cib-style';

function ProfileView() {
  return (
    <Input
      label="User ID"
      value="12345"
      disabled
    />
  );
}
```

#### Full Width Input

```tsx
import { Input } from 'cib-style';

function AddressForm() {
  return (
    <div style={{ maxWidth: '600px' }}>
      <Input
        label="Street Address"
        placeholder="Enter your street address"
        fullWidth
      />
    </div>
  );
}
```

### Complete Form Example

```tsx
import { Input } from 'cib-style';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Input
        label="Full Name"
        value={formData.name}
        onChange={(value) => setFormData({ ...formData, name: value })}
        error={errors.name}
        placeholder="John Doe"
        fullWidth
        required
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
        error={errors.email}
        placeholder="john@example.com"
        fullWidth
        required
      />

      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, password: value })}
        error={errors.password}
        helperText="At least 8 characters"
        fullWidth
        required
      />

      <Input
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
        error={errors.phone}
        placeholder="+1 (555) 123-4567"
        fullWidth
      />

      <button type="submit" style={{ marginTop: '1rem' }}>
        Register
      </button>
    </form>
  );
}
```

## Advanced Usage

### Custom Validation

```tsx
import { Input } from 'cib-style';
import { useState } from 'react';

function UsernameInput() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const validateUsername = (value: string) => {
    if (value.length < 3) {
      setError('Username must be at least 3 characters');
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setError('Username can only contain letters, numbers, and underscores');
    } else {
      setError('');
    }
  };

  const handleChange = (value: string) => {
    setUsername(value);
    validateUsername(value);
  };

  return (
    <Input
      label="Username"
      value={username}
      onChange={handleChange}
      onBlur={(value) => validateUsername(value)}
      error={error}
      placeholder="Enter username"
    />
  );
}
```

### Using Refs

```tsx
import { Input } from 'cib-style';
import { useRef } from 'react';

function AutoFocusForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <Input
        ref={inputRef}
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
      <button onClick={handleClick}>Focus Input</button>
    </>
  );
}
```
