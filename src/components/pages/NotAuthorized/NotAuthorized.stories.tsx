import type { Meta, StoryObj } from '@storybook/react';
import { NotAuthorized } from './NotAuthorized';

const meta = {
  title: 'Pages/NotAuthorized',
  component: NotAuthorized,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A security-themed 403 Forbidden error page with animations, warning messages, and helpful suggestions for the user.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotAuthorized>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
    handleLogin: () => console.log('Logging in...'),
  },
};

export const CustomText: Story = {
  args: {
    title: 'Access Restricted',
    description: 'This content is protected and requires elevated permissions. Please contact your system administrator if you believe you should have access.',
    warningMessage: 'Unauthorized access attempts are monitored and recorded.',
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
    handleLogin: () => console.log('Logging in...'),
  },
};

export const WithoutWarning: Story = {
  args: {
    showWarning: false,
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
    handleLogin: () => console.log('Logging in...'),
  },
};

export const WithoutSuggestions: Story = {
  args: {
    showSuggestions: false,
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
    handleLogin: () => console.log('Logging in...'),
  },
};

export const WithoutLoginButton: Story = {
  args: {
    showLoginButton: false,
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
  },
};

export const Minimal: Story = {
  args: {
    title: 'Access Denied',
    description: 'You do not have permission to access this resource.',
    showWarning: false,
    showSuggestions: false,
    showLoginButton: false,
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
  },
};

export const SecurityBreach: Story = {
  args: {
    title: 'Halt! Who Goes There?',
    description: 'This digital fortress is protected by ancient security spells. Your current credentials are insufficient to pass through these enchanted gates. 🧙‍♂️✨',
    warningMessage: 'The security guards have been notified of your presence.',
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
    handleLogin: () => console.log('Logging in...'),
  },
};

export const Corporate: Story = {
  args: {
    title: 'HTTP 403: Forbidden',
    description: 'The server understood the request but refuses to authorize it. Your current authentication credentials do not grant sufficient privileges to access the requested resource.',
    warningMessage: 'Access attempt logged. Incident ID: #2024-403-XYZ',
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
    handleLogin: () => console.log('Logging in...'),
  },
};

export const OnlyLogin: Story = {
  args: {
    title: 'Login Required',
    description: 'Please log in with an authorized account to access this content.',
    showWarning: false,
    showSuggestions: false,
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
    handleLogin: () => console.log('Logging in...'),
  },
};
