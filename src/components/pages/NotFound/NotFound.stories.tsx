import type { Meta, StoryObj } from '@storybook/react';
import { NotFound } from './NotFound';

const meta = {
  title: 'Pages/NotFound',
  component: NotFound,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A fun and friendly 404 Not Found page with animations and suggestions for the user.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
  },
};

export const CustomText: Story = {
  args: {
    title: 'Lost in Space!',
    description: 'Houston, we have a problem. The page you requested is floating somewhere in cyberspace.',
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
  },
};

export const WithoutSuggestions: Story = {
  args: {
    showSuggestions: false,
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
  },
};

export const WithoutIllustration: Story = {
  args: {
    showIllustration: false,
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
  },
};

export const Minimal: Story = {
  args: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    showSuggestions: false,
    showIllustration: false,
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
  },
};

export const FunVariant: Story = {
  args: {
    title: 'Oopsie Daisy!',
    description: "Looks like this page took a vacation without telling us. Maybe it's on a beach somewhere sipping a piña colada? 🏖️",
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
  },
};

export const TechyVariant: Story = {
  args: {
    title: 'Error 404: Not Found',
    description: 'The requested resource could not be found on this server. Please check the URL and try again.',
    handleGoHome: () => console.log('Going home...'),
    handleGoBack: () => console.log('Going back...'),
  },
};
