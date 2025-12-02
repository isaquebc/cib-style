import type { Meta, StoryObj } from '@storybook/react';
import { FormBuilder } from './FormBuilder';
import { ThemeProvider } from '../../../theme';

const meta = {
  title: 'Organisms/FormBuilder',
  component: FormBuilder,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultMode="light">
        <div style={{ width: '600px', padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof FormBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginForm: Story = {
  args: {
    fields: [
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
        placeholder: 'Enter your password',
        required: true,
        minLength: 8,
      },
      {
        name: 'remember',
        type: 'checkbox',
        label: 'Remember me',
      },
    ],
    submitButtonText: 'Login',
    handleSubmit: (data) => {
      console.log('Form submitted:', data);
      alert(`Form submitted:\n${JSON.stringify(data, null, 2)}`);
    },
  },
};

export const RegistrationForm: Story = {
  args: {
    fields: [
      {
        name: 'fullName',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
        minLength: 3,
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true,
      },
      {
        name: 'phone',
        type: 'tel',
        label: 'Phone Number',
        placeholder: '+1 (555) 000-0000',
        helperText: 'Optional: We may contact you for verification',
      },
      {
        name: 'birthDate',
        type: 'date',
        label: 'Date of Birth',
        required: true,
        locale: 'en-US',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Create a password',
        required: true,
        minLength: 8,
        validate: (value) => {
          if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
          if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
          return undefined;
        },
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Re-enter your password',
        required: true,
      },
      {
        name: 'terms',
        type: 'checkbox',
        label: 'I agree to the terms and conditions',
        required: true,
      },
    ],
    submitButtonText: 'Register',
    showResetButton: true,
    resetButtonText: 'Clear',
    handleSubmit: (data) => {
      console.log('Registration form submitted:', data);
      alert(`Registration form submitted:\n${JSON.stringify(data, null, 2)}`);
    },
  },
};

export const JobApplicationForm: Story = {
  args: {
    fields: [
      {
        name: 'applicantName',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'your.email@example.com',
        required: true,
      },
      {
        name: 'position',
        type: 'select',
        label: 'Position',
        placeholder: 'Select a position',
        required: true,
        options: [
          'Frontend Developer',
          'Backend Developer',
          'Full Stack Developer',
          'DevOps Engineer',
          'UI/UX Designer',
          'Product Manager',
        ],
      },
      {
        name: 'skills',
        type: 'multiselect',
        label: 'Skills',
        placeholder: 'Select your skills',
        required: true,
        options: [
          'JavaScript',
          'TypeScript',
          'React',
          'Node.js',
          'Python',
          'Java',
          'Docker',
          'Kubernetes',
          'AWS',
          'GraphQL',
        ],
        maxSelections: 5,
      },
      {
        name: 'experience',
        type: 'number',
        label: 'Years of Experience',
        placeholder: 'Enter years of experience',
        required: true,
      },
      {
        name: 'linkedin',
        type: 'url',
        label: 'LinkedIn Profile',
        placeholder: 'https://linkedin.com/in/yourprofile',
        helperText: 'Optional: Your LinkedIn profile URL',
      },
      {
        name: 'availableDate',
        type: 'date',
        label: 'Available Start Date',
        required: true,
        locale: 'en-US',
      },
      {
        name: 'remoteWork',
        type: 'checkbox',
        label: 'Interested in remote work opportunities',
      },
    ],
    submitButtonText: 'Submit Application',
    showResetButton: true,
    handleSubmit: (data) => {
      console.log('Job application submitted:', data);
      alert(`Job application submitted:\n${JSON.stringify(data, null, 2)}`);
    },
  },
};

export const ContactForm: Story = {
  args: {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'Your name',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'your.email@example.com',
        required: true,
      },
      {
        name: 'subject',
        type: 'select',
        label: 'Subject',
        placeholder: 'Select a subject',
        required: true,
        options: [
          'General Inquiry',
          'Technical Support',
          'Billing',
          'Feature Request',
          'Bug Report',
        ],
      },
    ],
    submitButtonText: 'Send Message',
    handleSubmit: (data) => {
      console.log('Contact form submitted:', data);
      alert(`Message sent:\n${JSON.stringify(data, null, 2)}`);
    },
  },
};

export const WithDefaultValues: Story = {
  args: {
    fields: [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
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
        options: ['United States', 'Canada', 'Brazil', 'United Kingdom', 'Germany'],
      },
      {
        name: 'newsletter',
        type: 'checkbox',
        label: 'Subscribe to newsletter',
      },
    ],
    defaultValues: {
      username: 'johndoe',
      email: 'john.doe@example.com',
      country: 'United States',
      newsletter: true,
    },
    submitButtonText: 'Update Profile',
    showResetButton: true,
    handleSubmit: (data) => {
      console.log('Profile updated:', data);
      alert(`Profile updated:\n${JSON.stringify(data, null, 2)}`);
    },
  },
};

export const WithValidation: Story = {
  args: {
    fields: [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        placeholder: 'Choose a username',
        required: true,
        minLength: 3,
        maxLength: 20,
        pattern: '^[a-zA-Z0-9_]+$',
        helperText: 'Only letters, numbers, and underscores allowed',
      },
      {
        name: 'age',
        type: 'number',
        label: 'Age',
        placeholder: 'Enter your age',
        required: true,
        validate: (value) => {
          const age = parseInt(value);
          if (isNaN(age)) return 'Age must be a number';
          if (age < 18) return 'You must be at least 18 years old';
          if (age > 120) return 'Please enter a valid age';
          return undefined;
        },
      },
      {
        name: 'website',
        type: 'url',
        label: 'Website',
        placeholder: 'https://example.com',
        helperText: 'Must be a valid URL',
      },
    ],
    submitButtonText: 'Validate & Submit',
    handleSubmit: (data) => {
      console.log('Validated data:', data);
      alert(`All validations passed!\n${JSON.stringify(data, null, 2)}`);
    },
  },
};

export const FullWidth: Story = {
  args: {
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter a title',
        required: true,
      },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        placeholder: 'Enter a description',
      },
    ],
    fullWidth: true,
    submitButtonText: 'Submit',
    showResetButton: true,
    handleSubmit: (data) => {
      console.log('Form submitted:', data);
    },
  },
};

export const WithOtherOption: Story = {
  args: {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your name',
        required: true,
      },
      {
        name: 'favoriteLanguages',
        type: 'multiselect',
        label: 'Favorite Programming Languages',
        placeholder: 'Select your favorites...',
        required: true,
        options: [
          'JavaScript',
          'TypeScript',
          'Python',
          'Java',
          'C++',
          'Go',
          'Rust',
          'Ruby',
        ],
        other: 'Other Language',
        helperText: 'Select from the list or add your own custom language',
      },
      {
        name: 'hobbies',
        type: 'multiselect',
        label: 'Hobbies',
        placeholder: 'Select your hobbies...',
        options: [
          'Reading',
          'Gaming',
          'Sports',
          'Cooking',
          'Traveling',
          'Photography',
        ],
        other: 'Add Custom Hobby',
        maxSelections: 5,
        helperText: 'Select up to 5 hobbies or add your own',
      },
    ],
    submitButtonText: 'Submit',
    showResetButton: true,
    handleSubmit: (data) => {
      console.log('Form with custom options submitted:', data);
      alert(`Form submitted:\n${JSON.stringify(data, null, 2)}`);
    },
  },
};

export const Disabled: Story = {
  args: {
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'Your name',
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'your.email@example.com',
      },
    ],
    disabled: true,
    submitButtonText: 'Submit',
    handleSubmit: (data) => {
      console.log('Form submitted:', data);
    },
  },
};
