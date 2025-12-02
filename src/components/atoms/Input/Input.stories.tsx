import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable text input component with support for labels, validation, and various input types.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'The type of the input field',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input should take full width',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'user@example.com',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters long',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'user@example.com',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Address',
    placeholder: 'Enter your address',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Use a strong password with letters, numbers, and symbols',
  },
};

export const Email: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'name@example.com',
  },
};

export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
  },
};

export const Search: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search...',
  },
};

export const WithMaxLength: Story = {
  args: {
    label: 'Username',
    placeholder: 'Max 20 characters',
    maxLength: 20,
    helperText: 'Maximum 20 characters allowed',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read Only Field',
    value: 'This value cannot be changed',
    readOnly: true,
  },
};

// Interactive example with state
const InteractiveExample = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (newValue.length < 3 && newValue.length > 0) {
      setError('Must be at least 3 characters');
    } else {
      setError('');
    }
  };

  return (
    <Input
      label="Interactive Input"
      placeholder="Type something..."
      value={value}
      handleChange={handleChange}
      error={error}
      helperText={!error ? 'Type at least 3 characters' : undefined}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveExample />,
  parameters: {
    docs: {
      description: {
        story: 'An interactive example showing validation on input change.',
      },
    },
  },
};
