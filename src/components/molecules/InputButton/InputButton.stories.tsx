import type { Meta, StoryObj } from '@storybook/react';
import { InputButton } from './InputButton';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const meta = {
  title: 'Molecules/InputButton',
  component: InputButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An input field with an adjacent button. The button can display text or an icon from Material UI.',
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
    buttonVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'The button variant',
    },
    buttonSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input and button are disabled',
    },
    buttonDisabled: {
      control: 'boolean',
      description: 'Whether only the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the component should take full width',
    },
  },
} satisfies Meta<typeof InputButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    buttonText: 'Submit',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
  },
};

export const SearchBar: Story = {
  args: {
    placeholder: 'Search...',
    type: 'search',
    buttonIcon: <SearchIcon />,
    buttonVariant: 'primary',
  },
};

export const WithSendIcon: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type a message...',
    buttonIcon: <SendIcon />,
    buttonVariant: 'primary',
  },
};

export const WithAddIcon: Story = {
  args: {
    label: 'Add Item',
    placeholder: 'Enter item name...',
    buttonIcon: <AddIcon />,
    buttonVariant: 'secondary',
  },
};

export const WithArrowIcon: Story = {
  args: {
    placeholder: 'Go to page...',
    buttonIcon: <ArrowForwardIcon />,
    buttonVariant: 'outline',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    error: 'Please enter a valid email address',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    buttonText: 'Check',
    helperText: 'Username must be at least 3 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This is disabled',
    buttonText: 'Submit',
    disabled: true,
  },
};

export const ButtonOnlyDisabled: Story = {
  args: {
    label: 'Input Active',
    placeholder: 'Type here...',
    buttonText: 'Submit',
    buttonDisabled: true,
    helperText: 'Button is disabled',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search products...',
    buttonIcon: <SearchIcon />,
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

export const DifferentSizes: Story = {
  args: {
    label: 'Different Sizes',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <InputButton
        placeholder="Small size..."
        buttonText="Small"
        buttonSize="small"
      />
      <InputButton
        placeholder="Medium size..."
        buttonText="Medium"
        buttonSize="medium"
      />
      <InputButton
        placeholder="Large size..."
        buttonText="Large"
        buttonSize="large"
      />
    </div>
  ),
};

export const DifferentVariants: Story = {
  args: {
    label: 'Different Variants',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputButton
        placeholder="Primary variant..."
        buttonText="Primary"
        buttonVariant="primary"
      />
      <InputButton
        placeholder="Secondary variant..."
        buttonText="Secondary"
        buttonVariant="secondary"
      />
      <InputButton
        placeholder="Outline variant..."
        buttonText="Outline"
        buttonVariant="outline"
      />
      <InputButton
        placeholder="Ghost variant..."
        buttonText="Ghost"
        buttonVariant="ghost"
      />
      <InputButton
        placeholder="Danger variant..."
        buttonText="Delete"
        buttonVariant="danger"
      />
    </div>
  ),
};

const InteractiveExample = () => {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState('');

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleButtonClick = (currentValue: string) => {
    setSubmitted(currentValue);
    setValue('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputButton
        label="Enter your email"
        type="email"
        placeholder="example@email.com"
        value={value}
        buttonText="Subscribe"
        handleChange={handleChange}
        handleButtonClick={handleButtonClick}
        helperText="Press Enter or click Subscribe"
      />

      {submitted && (
        <div style={{ padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Submitted:</strong> {submitted}
        </div>
      )}
    </div>
  );
};

export const Interactive: Story = {
  args: {
    label: 'Interactive',
  },
  render: () => <InteractiveExample />,
  parameters: {
    docs: {
      description: {
        story: 'An interactive example showing how to use the component with state. Press Enter or click the button to submit.',
      },
    },
  },
};

const SearchExample = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    // Simulate search results
    const mockResults = [
      `Result 1 for "${value}"`,
      `Result 2 for "${value}"`,
      `Result 3 for "${value}"`,
    ];
    setResults(mockResults);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <InputButton
        label="Search"
        type="search"
        placeholder="Search..."
        value={searchTerm}
        buttonIcon={<SearchIcon />}
        handleChange={setSearchTerm}
        handleButtonClick={handleSearch}
        fullWidth
      />

      {results.length > 0 && (
        <div style={{ padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Search Results:</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const SearchExample_: Story = {
  args: {
    label: 'Search Example',
  },
  render: () => <SearchExample />,
  parameters: {
    docs: {
      description: {
        story: 'A practical search example with results display.',
      },
    },
  },
};
