import type { Meta, StoryObj } from '@storybook/react';
import { InputList } from './InputList';
import { useState } from 'react';

const meta = {
  title: 'Atoms/InputList',
  component: InputList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An input field with a datalist for autocomplete suggestions. Users can either select from the list or type freely.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'tel', 'url', 'search'],
      description: 'The type of the input field',
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
} satisfies Meta<typeof InputList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple string array options
const countries = [
  'Afghanistan',
  'Argentina',
  'Australia',
  'Austria',
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
  'Greece',
  'India',
  'Indonesia',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Kenya',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Peru',
  'Poland',
  'Portugal',
  'Russia',
  'Saudi Arabia',
  'Singapore',
  'South Africa',
  'South Korea',
  'Spain',
  'Sweden',
  'Switzerland',
  'Thailand',
  'Turkey',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Vietnam',
];

// Object array options
const brazilianCities = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'bsb', label: 'Brasília' },
  { value: 'sal', label: 'Salvador' },
  { value: 'for', label: 'Fortaleza' },
  { value: 'bh', label: 'Belo Horizonte' },
  { value: 'man', label: 'Manaus' },
  { value: 'cur', label: 'Curitiba' },
  { value: 'rec', label: 'Recife' },
  { value: 'poa', label: 'Porto Alegre' },
];

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
];

const emailDomains = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'protonmail.com',
  'aol.com',
  'zoho.com',
];

export const Default: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select or type a country',
    options: countries,
  },
};

export const SimpleStrings: Story = {
  args: {
    label: 'Programming Language',
    placeholder: 'Select or type a language',
    options: languages,
    helperText: 'Choose your favorite programming language',
  },
};

export const ObjectOptions: Story = {
  args: {
    label: 'City',
    placeholder: 'Select or type a city',
    options: brazilianCities,
    helperText: 'Select a Brazilian city (value differs from label)',
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
    error: 'Please select a valid country',
    value: 'InvalidCountry',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Language',
    placeholder: 'Choose a language',
    options: languages,
    helperText: 'Start typing to see suggestions',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
    disabled: true,
    value: 'Brazil',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
    readOnly: true,
    value: 'Brazil',
  },
};

export const Required: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
    required: true,
    helperText: 'This field is required',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
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

export const EmailAutocomplete: Story = {
  args: {
    label: 'Email Domain',
    type: 'email',
    placeholder: 'username@',
    options: emailDomains,
    helperText: 'Type your username and select a domain',
  },
};

const ControlledExample = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div style={{ width: '300px' }}>
      <InputList
        label="Country"
        placeholder="Select or type a country"
        options={countries}
        value={selectedCountry}
        handleChange={(value) => {
          setSelectedCountry(value);
          setMessage(`Typing: ${value}`);
        }}
        handleSelect={(value) => {
          setMessage(`Selected: ${value}`);
        }}
        helperText={message || 'Start typing or select from the list'}
      />
      {selectedCountry && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Current value:</strong> {selectedCountry}
        </div>
      )}
    </div>
  );
};

export const Controlled: Story = {
  args: {
    label: 'Controlled',
    options: countries,
  },
  render: () => <ControlledExample />,
  parameters: {
    docs: {
      description: {
        story: 'A controlled input with separate handlers for typing (handleChange) and selection (handleSelect).',
      },
    },
  },
};

const MultiFieldExample = () => {
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    language: '',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <InputList
        label="Country"
        placeholder="Select country"
        options={countries}
        value={formData.country}
        handleChange={(value) => setFormData({ ...formData, country: value })}
        fullWidth
      />
      <InputList
        label="City"
        placeholder="Select city"
        options={brazilianCities}
        value={formData.city}
        handleChange={(value) => setFormData({ ...formData, city: value })}
        fullWidth
      />
      <InputList
        label="Programming Language"
        placeholder="Select language"
        options={languages}
        value={formData.language}
        handleChange={(value) => setFormData({ ...formData, language: value })}
        fullWidth
      />
      {(formData.country || formData.city || formData.language) && (
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
    options: countries,
  },
  render: () => <MultiFieldExample />,
  parameters: {
    docs: {
      description: {
        story: 'Multiple InputList fields working together in a form.',
      },
    },
  },
};

const SearchExample = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(countries);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(countries);
    }
  };

  return (
    <div style={{ width: '300px' }}>
      <InputList
        label="Search Country"
        type="search"
        placeholder="Type to search..."
        options={filteredOptions}
        value={searchTerm}
        handleChange={handleSearch}
        helperText={`Showing ${filteredOptions.length} of ${countries.length} countries`}
        fullWidth
      />
    </div>
  );
};

export const DynamicFiltering: Story = {
  args: {
    label: 'Dynamic Filtering',
    options: countries,
  },
  render: () => <SearchExample />,
  parameters: {
    docs: {
      description: {
        story: 'InputList with dynamic filtering - the options list updates as you type.',
      },
    },
  },
};

export const WithOtherOption: Story = {
  args: {
    label: 'Programming Language',
    placeholder: 'Select or type a language',
    options: languages,
    other: 'Other',
    helperText: 'You can add custom options by selecting "Other"',
  },
};

const OtherOptionExample = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  return (
    <div style={{ width: '300px' }}>
      <InputList
        label="Programming Language"
        placeholder="Select or type a language"
        options={languages}
        value={selectedLanguage}
        handleChange={(value) => {
          setSelectedLanguage(value);
          console.log('Selected:', value);
        }}
        other="Other Language"
        helperText="Select from the list or add your own custom language"
      />
      {selectedLanguage && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Current value:</strong> {selectedLanguage}
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
        story: 'A controlled input with the "Other" option enabled. Users can add custom values not in the predefined list.',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <InputList label="Default" placeholder="Select..." options={languages} />
      <InputList
        label="With Value"
        placeholder="Select..."
        options={languages}
        value="TypeScript"
      />
      <InputList
        label="With Other Option"
        placeholder="Select..."
        options={languages}
        other="Custom Option"
      />
      <InputList
        label="With Error"
        placeholder="Select..."
        options={languages}
        error="This field is required"
      />
      <InputList
        label="Disabled"
        placeholder="Select..."
        options={languages}
        disabled
        value="JavaScript"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All common variants of the InputList component displayed together.',
      },
    },
  },
};
