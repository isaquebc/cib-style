import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';
import { useState } from 'react';

const meta = {
  title: 'Atoms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A multi-selection dropdown component with chips. Users can select multiple options from a searchable list.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the select should take full width',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the dropdown is searchable',
    },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple string array options
const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Ruby',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'PHP',
  'Dart',
  'Scala',
  'Elixir',
  'Haskell',
];

const countries = [
  'Afghanistan',
  'Argentina',
  'Australia',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Denmark',
  'Egypt',
  'Finland',
  'France',
  'Germany',
  'India',
  'Italy',
  'Japan',
  'Mexico',
  'Netherlands',
  'Norway',
  'Portugal',
  'Russia',
  'Spain',
  'Sweden',
  'Switzerland',
  'United Kingdom',
  'United States',
];

// Object array options
const skills = [
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'fullstack', label: 'Full Stack Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'devops', label: 'DevOps' },
  { value: 'ui', label: 'UI Design' },
  { value: 'ux', label: 'UX Design' },
  { value: 'data', label: 'Data Science' },
  { value: 'ml', label: 'Machine Learning' },
  { value: 'security', label: 'Security' },
];

const colors = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'brown', label: 'Brown' },
];

export const Default: Story = {
  args: {
    label: 'Programming Languages',
    placeholder: 'Select languages...',
    options: languages,
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Programming Languages',
    placeholder: 'Select languages...',
    options: languages,
    defaultValue: ['JavaScript', 'TypeScript', 'Python'],
  },
};

export const ObjectOptions: Story = {
  args: {
    label: 'Skills',
    placeholder: 'Select your skills...',
    options: skills,
    helperText: 'Select all that apply',
  },
};

export const MaxSelections: Story = {
  args: {
    label: 'Top 3 Colors',
    placeholder: 'Select up to 3 colors...',
    options: colors,
    maxSelections: 3,
    helperText: 'You can select up to 3 colors',
  },
};

export const WithError: Story = {
  args: {
    label: 'Programming Languages',
    placeholder: 'Select languages...',
    options: languages,
    error: 'Please select at least one language',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Countries',
    placeholder: 'Select countries...',
    options: countries,
    helperText: 'Select the countries where you have experience',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Programming Languages',
    placeholder: 'Select languages...',
    options: languages,
    disabled: true,
    defaultValue: ['JavaScript', 'TypeScript'],
  },
};

export const Required: Story = {
  args: {
    label: 'Programming Languages',
    placeholder: 'Select languages...',
    options: languages,
    required: true,
    helperText: 'This field is required',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Programming Languages',
    placeholder: 'Select languages...',
    options: languages,
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const NotSearchable: Story = {
  args: {
    label: 'Colors',
    placeholder: 'Select colors...',
    options: colors,
    searchable: false,
    helperText: 'Dropdown is not searchable',
  },
};

const ControlledExample = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['JavaScript']);

  return (
    <div style={{ width: '400px' }}>
      <MultiSelect
        label="Programming Languages"
        placeholder="Select languages..."
        options={languages}
        value={selectedLanguages}
        handleChange={(values) => {
          setSelectedLanguages(values);
          console.log('Selected:', values);
        }}
        handleSelect={(value, allValues) => {
          console.log('Added:', value, 'All:', allValues);
        }}
        handleRemove={(value, allValues) => {
          console.log('Removed:', value, 'All:', allValues);
        }}
        helperText={`${selectedLanguages.length} language(s) selected`}
      />
      {selectedLanguages.length > 0 && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Selected Languages:</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            {selectedLanguages.map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const Controlled: Story = {
  args: {
    label: 'Controlled',
    options: languages,
  },
  render: () => <ControlledExample />,
  parameters: {
    docs: {
      description: {
        story: 'A controlled multi-select with separate handlers for select and remove events.',
      },
    },
  },
};

const MultiFieldExample = () => {
  const [formData, setFormData] = useState({
    languages: [] as string[],
    skills: [] as string[],
    countries: [] as string[],
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <MultiSelect
        label="Programming Languages"
        placeholder="Select languages..."
        options={languages}
        value={formData.languages}
        handleChange={(values) => setFormData({ ...formData, languages: values })}
        fullWidth
      />
      <MultiSelect
        label="Skills"
        placeholder="Select skills..."
        options={skills}
        value={formData.skills}
        handleChange={(values) => setFormData({ ...formData, skills: values })}
        maxSelections={5}
        helperText="Select up to 5 skills"
        fullWidth
      />
      <MultiSelect
        label="Countries"
        placeholder="Select countries..."
        options={countries.slice(0, 10)}
        value={formData.countries}
        handleChange={(values) => setFormData({ ...formData, countries: values })}
        fullWidth
      />
      {(formData.languages.length > 0 || formData.skills.length > 0 || formData.countries.length > 0) && (
        <div style={{ marginTop: '8px', padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Form Data:</strong>
          <pre style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export const MultipleFields: Story = {
  args: {
    label: 'Multiple Fields',
    options: languages,
  },
  render: () => <MultiFieldExample />,
  parameters: {
    docs: {
      description: {
        story: 'Multiple MultiSelect fields working together in a form.',
      },
    },
  },
};

const ValidationExample = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (selectedLanguages.length === 0) {
      setError('Please select at least one language');
    } else if (selectedLanguages.length < 2) {
      setError('Please select at least 2 languages');
    } else {
      setError('');
      alert(`Selected: ${selectedLanguages.join(', ')}`);
    }
  };

  return (
    <div style={{ width: '400px' }}>
      <MultiSelect
        label="Programming Languages"
        placeholder="Select languages..."
        options={languages}
        value={selectedLanguages}
        handleChange={(values) => {
          setSelectedLanguages(values);
          setError('');
        }}
        error={error}
        required
        helperText={!error ? 'Select at least 2 languages' : undefined}
        fullWidth
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
    options: languages,
  },
  render: () => <ValidationExample />,
  parameters: {
    docs: {
      description: {
        story: 'MultiSelect with validation - requires at least 2 selections.',
      },
    },
  },
};

export const WithOtherOption: Story = {
  args: {
    label: 'Programming Languages',
    placeholder: 'Select languages...',
    options: languages,
    other: 'Other',
    helperText: 'You can add custom options by selecting "Other"',
  },
};

const OtherOptionExample = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['JavaScript']);

  return (
    <div style={{ width: '400px' }}>
      <MultiSelect
        label="Programming Languages"
        placeholder="Select languages..."
        options={languages}
        value={selectedLanguages}
        handleChange={(values) => {
          setSelectedLanguages(values);
          console.log('Selected:', values);
        }}
        other="Other Language"
        helperText="Select from the list or add your own custom language"
      />
      {selectedLanguages.length > 0 && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Selected Languages:</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            {selectedLanguages.map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const WithOtherControlled: Story = {
  args: {
    label: 'Other Option Controlled',
    options: languages,
  },
  render: () => <OtherOptionExample />,
  parameters: {
    docs: {
      description: {
        story: 'A controlled multi-select with the "Other" option enabled. Users can add custom values not in the predefined list.',
      },
    },
  },
};

export const AllVariants: Story = {
  args: {
    label: 'All Variants',
    options: languages,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <MultiSelect
        label="Default"
        placeholder="Select..."
        options={languages.slice(0, 5)}
      />
      <MultiSelect
        label="With Value"
        placeholder="Select..."
        options={languages.slice(0, 5)}
        defaultValue={['JavaScript', 'TypeScript']}
      />
      <MultiSelect
        label="With Other Option"
        placeholder="Select..."
        options={languages.slice(0, 5)}
        other="Custom Option"
      />
      <MultiSelect
        label="With Error"
        placeholder="Select..."
        options={languages.slice(0, 5)}
        error="This field is required"
      />
      <MultiSelect
        label="Disabled"
        placeholder="Select..."
        options={languages.slice(0, 5)}
        disabled
        defaultValue={['JavaScript']}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All common variants of the MultiSelect component displayed together.',
      },
    },
  },
};
