import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A checkbox input component with label, error states, and helper text. Follows the handler pattern.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Accept terms and conditions',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You can unsubscribe at any time',
  },
};

export const WithError: Story = {
  args: {
    label: 'I agree to the terms',
    error: 'You must accept the terms to continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Accept terms and conditions',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Accept terms and conditions',
    disabled: true,
    defaultChecked: true,
  },
};

export const Required: Story = {
  args: {
    label: 'I agree to the privacy policy',
    required: true,
    helperText: 'This field is required',
  },
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Accept terms',
  },
};

const ControlledExample = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox
        label="Accept terms and conditions"
        checked={checked}
        handleChange={(isChecked) => {
          setChecked(isChecked);
          console.log('Checked:', isChecked);
        }}
        helperText={checked ? 'Thank you for accepting!' : 'Please accept to continue'}
      />
      <div style={{ padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
        <strong>Status:</strong> {checked ? 'Accepted ✓' : 'Not accepted'}
      </div>
    </div>
  );
};

export const Controlled: Story = {
  args: {
    label: 'Controlled',
  },
  render: () => <ControlledExample />,
  parameters: {
    docs: {
      description: {
        story: 'A controlled checkbox with dynamic helper text based on state.',
      },
    },
  },
};

const MultiCheckboxExample = () => {
  const [preferences, setPreferences] = useState({
    newsletter: false,
    updates: true,
    promotions: false,
  });

  const handleCheckboxChange = (key: keyof typeof preferences) => (checked: boolean) => {
    setPreferences({ ...preferences, [key]: checked });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <h4 style={{ margin: '0 0 8px 0' }}>Email Preferences</h4>
      <Checkbox
        label="Newsletter"
        checked={preferences.newsletter}
        handleChange={handleCheckboxChange('newsletter')}
        helperText="Weekly newsletter with latest updates"
      />
      <Checkbox
        label="Product Updates"
        checked={preferences.updates}
        handleChange={handleCheckboxChange('updates')}
        helperText="Get notified about new features"
      />
      <Checkbox
        label="Promotions"
        checked={preferences.promotions}
        handleChange={handleCheckboxChange('promotions')}
        helperText="Special offers and discounts"
      />
      <div style={{ marginTop: '8px', padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
        <strong>Preferences:</strong>
        <pre style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
          {JSON.stringify(preferences, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export const MultipleCheckboxes: Story = {
  args: {
    label: 'Multiple',
  },
  render: () => <MultiCheckboxExample />,
  parameters: {
    docs: {
      description: {
        story: 'Multiple checkboxes working together for user preferences.',
      },
    },
  },
};

const FormValidationExample = () => {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!agreed) {
      setError('You must accept the terms and conditions');
    } else {
      setError('');
      alert('Form submitted successfully!');
    }
  };

  return (
    <div style={{ width: '300px' }}>
      <Checkbox
        label="I agree to the terms and conditions"
        checked={agreed}
        handleChange={(checked) => {
          setAgreed(checked);
          if (checked) setError('');
        }}
        error={error}
        required
      />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: '16px',
          padding: '10px 20px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Submit
      </button>
    </div>
  );
};

export const WithValidation: Story = {
  args: {
    label: 'Validation',
  },
  render: () => <FormValidationExample />,
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with form validation - must be checked to submit.',
      },
    },
  },
};

const CheckAllExample = () => {
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: true },
    { id: 3, label: 'Item 3', checked: false },
    { id: 4, label: 'Item 4', checked: false },
  ]);

  const allChecked = items.every((item) => item.checked);
  const someChecked = items.some((item) => item.checked) && !allChecked;

  const handleCheckAll = (checked: boolean) => {
    setItems(items.map((item) => ({ ...item, checked })));
  };

  const handleItemCheck = (id: number) => (checked: boolean) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked } : item)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '200px' }}>
      <Checkbox
        label="Select All"
        checked={allChecked}
        handleChange={handleCheckAll}
      />
      <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '8px' }}>
        {items.map((item) => (
          <Checkbox
            key={item.id}
            label={item.label}
            checked={item.checked}
            handleChange={handleItemCheck(item.id)}
          />
        ))}
      </div>
      <div style={{ marginTop: '8px', padding: '8px', background: '#f0f0f0', borderRadius: '4px', fontSize: '12px' }}>
        {allChecked ? 'All selected' : someChecked ? 'Some selected' : 'None selected'}
      </div>
    </div>
  );
};

export const CheckAll: Story = {
  args: {
    label: 'Check All',
  },
  render: () => <CheckAllExample />,
  parameters: {
    docs: {
      description: {
        story: 'Select all functionality with individual item checkboxes.',
      },
    },
  },
};

export const AllVariants: Story = {
  args: {
    label: 'All Variants',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Checkbox label="Default" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="With helper text" helperText="This is helper text" />
      <Checkbox label="With error" error="This is an error message" />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All common variants of the Checkbox component displayed together.',
      },
    },
  },
};
