import type { Meta, StoryObj } from '@storybook/react';
import { InputIcon } from './InputIcon';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const meta = {
  title: 'Molecules/InputIcon',
  component: InputIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An input field with an icon inside. The icon can be positioned on the left or right and can be clickable.',
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
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon inside the input',
    },
    iconClickable: {
      control: 'boolean',
      description: 'Whether the icon is clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input should take full width',
    },
  },
} satisfies Meta<typeof InputIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    icon: <SearchIcon />,
  },
};

export const SearchLeft: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: <SearchIcon />,
    iconPosition: 'left',
  },
};

export const SearchRight: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: <SearchIcon />,
    iconPosition: 'right',
  },
};

export const Email: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    icon: <EmailIcon />,
    iconPosition: 'left',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    icon: <LockIcon />,
    iconPosition: 'left',
  },
};

export const Username: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    icon: <PersonIcon />,
    iconPosition: 'left',
  },
};

export const Phone: Story = {
  args: {
    label: 'Phone',
    type: 'tel',
    placeholder: 'Enter your phone',
    icon: <PhoneIcon />,
    iconPosition: 'left',
  },
};

export const Location: Story = {
  args: {
    label: 'Location',
    placeholder: 'Enter location',
    icon: <LocationOnIcon />,
    iconPosition: 'left',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    icon: <EmailIcon />,
    error: 'Please enter a valid email address',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    icon: <PersonIcon />,
    helperText: 'Username must be at least 3 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: <SearchIcon />,
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: <SearchIcon />,
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

export const ClickableIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: <SearchIcon />,
    iconPosition: 'right',
    iconClickable: true,
    handleIconClick: (value) => alert(`Searching for: ${value}`),
  },
};

const PasswordToggleExample = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputIcon
      label="Password"
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter your password"
      icon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      iconPosition="right"
      iconClickable
      handleIconClick={() => setShowPassword(!showPassword)}
      helperText="Click the icon to toggle password visibility"
    />
  );
};

export const PasswordToggle: Story = {
  args: {
    label: 'Password Toggle',
    icon: <VisibilityIcon />,
  },
  render: () => <PasswordToggleExample />,
  parameters: {
    docs: {
      description: {
        story: 'An example showing how to use a clickable icon to toggle password visibility.',
      },
    },
  },
};

const SearchExample = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      setResults([
        `Result 1 for "${value}"`,
        `Result 2 for "${value}"`,
        `Result 3 for "${value}"`,
      ]);
    } else {
      setResults([]);
    }
  };

  const handleIconClick = () => {
    if (searchTerm.trim()) {
      alert(`Searching for: ${searchTerm}`);
    }
  };

  return (
    <div style={{ width: '400px' }}>
      <InputIcon
        label="Search"
        placeholder="Type to search..."
        icon={<SearchIcon />}
        iconPosition="right"
        iconClickable
        value={searchTerm}
        handleChange={handleSearch}
        handleIconClick={handleIconClick}
        fullWidth
      />

      {results.length > 0 && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Results:</strong>
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

export const InteractiveSearch: Story = {
  args: {
    label: 'Interactive Search',
    icon: <SearchIcon />,
  },
  render: () => <SearchExample />,
  parameters: {
    docs: {
      description: {
        story: 'An interactive search example with clickable icon and live results.',
      },
    },
  },
};

export const AllVariants: Story = {
  args: {
    label: 'All Variants',
    icon: <SearchIcon />,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <InputIcon
        label="Search"
        placeholder="Search..."
        icon={<SearchIcon />}
        iconPosition="left"
      />
      <InputIcon
        label="Email"
        type="email"
        placeholder="Email address"
        icon={<EmailIcon />}
        iconPosition="left"
      />
      <InputIcon
        label="Password"
        type="password"
        placeholder="Password"
        icon={<LockIcon />}
        iconPosition="left"
      />
      <InputIcon
        label="Phone"
        type="tel"
        placeholder="Phone number"
        icon={<PhoneIcon />}
        iconPosition="left"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All common input variants with icons displayed together.',
      },
    },
  },
};
