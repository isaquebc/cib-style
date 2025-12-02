import type { Meta, StoryObj } from '@storybook/react';
import { DateInput } from './DateInput';
import { useState } from 'react';

const meta = {
  title: 'Atoms/DateInput',
  component: DateInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A date input component with calendar picker. Uses Brazilian format (DD/MM/YYYY) for pt-BR locale and stores dates in UTC.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the date input',
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
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input should take full width',
    },
    locale: {
      control: 'select',
      options: ['pt-BR', 'en-US'],
      description: 'Locale for date formatting',
    },
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Date',
  },
};

export const BrazilianFormat: Story = {
  args: {
    label: 'Data de Nascimento',
    locale: 'pt-BR',
    helperText: 'Formato: DD/MM/AAAA',
  },
};

export const USFormat: Story = {
  args: {
    label: 'Birth Date',
    locale: 'en-US',
    helperText: 'Format: MM/DD/YYYY',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Selected Date',
    value: new Date(Date.UTC(2024, 0, 15)),
    locale: 'pt-BR',
  },
};

export const WithError: Story = {
  args: {
    label: 'Date',
    error: 'Please enter a valid date',
    locale: 'pt-BR',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Event Date',
    helperText: 'Select the date of the event',
    locale: 'pt-BR',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Date',
    required: true,
    locale: 'pt-BR',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Date',
    value: new Date(Date.UTC(2024, 0, 15)),
    disabled: true,
    locale: 'pt-BR',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read Only Date',
    value: new Date(Date.UTC(2024, 0, 15)),
    readOnly: true,
    locale: 'pt-BR',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Date',
    fullWidth: true,
    locale: 'pt-BR',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithMinMaxDate: Story = {
  args: {
    label: 'Date Range',
    minDate: new Date(Date.UTC(2024, 0, 1)),
    maxDate: new Date(Date.UTC(2024, 11, 31)),
    helperText: 'Select a date in 2024',
    locale: 'pt-BR',
  },
};

// Interactive example with state
const InteractiveExample = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState('');

  const handleChange = (newDate: Date | null, formatted: string) => {
    setDate(newDate);

    if (!newDate && formatted.length === 10) {
      setError('Invalid date');
    } else if (newDate) {
      // Check if date is in the future
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      if (newDate > today) {
        setError('Date cannot be in the future');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DateInput
        label="Birth Date"
        locale="pt-BR"
        handleChange={handleChange}
        error={error}
        helperText={!error ? 'Enter your birth date (cannot be in the future)' : undefined}
      />

      {date && !error && (
        <div style={{ padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Selected Date (UTC):</strong>
          <div>ISO String: {date.toISOString()}</div>
          <div>UTC Date: {date.toUTCString()}</div>
          <div>Day: {date.getUTCDate()}</div>
          <div>Month: {date.getUTCMonth() + 1}</div>
          <div>Year: {date.getUTCFullYear()}</div>
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
        story: 'An interactive example showing date selection with validation. The date is stored in UTC.',
      },
    },
  },
};

const LocaleComparisonExample = () => {
  const [brDate, setBrDate] = useState<Date | null>(null);
  const [usDate, setUsDate] = useState<Date | null>(null);

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1', minWidth: '250px' }}>
        <DateInput
          label="Brazilian Format (pt-BR)"
          locale="pt-BR"
          handleChange={(date) => setBrDate(date)}
          helperText="DD/MM/AAAA"
        />
        {brDate && (
          <div style={{ marginTop: '8px', fontSize: '0.875rem' }}>
            UTC: {brDate.toISOString()}
          </div>
        )}
      </div>

      <div style={{ flex: '1', minWidth: '250px' }}>
        <DateInput
          label="US Format (en-US)"
          locale="en-US"
          handleChange={(date) => setUsDate(date)}
          helperText="MM/DD/YYYY"
        />
        {usDate && (
          <div style={{ marginTop: '8px', fontSize: '0.875rem' }}>
            UTC: {usDate.toISOString()}
          </div>
        )}
      </div>
    </div>
  );
};

export const LocaleComparison: Story = {
  args: {
    label: 'Locale Comparison',
  },
  render: () => <LocaleComparisonExample />,
  parameters: {
    docs: {
      description: {
        story: 'Comparison of Brazilian (DD/MM/YYYY) and US (MM/DD/YYYY) date formats. Both store dates in UTC.',
      },
    },
  },
};
