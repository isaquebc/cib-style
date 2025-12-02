import type { StorybookConfig } from '@storybook/react-webpack5';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@components': resolve(__dirname, '../src/components'),
        '@atoms': resolve(__dirname, '../src/components/atoms'),
        '@molecules': resolve(__dirname, '../src/components/molecules'),
        '@organisms': resolve(__dirname, '../src/components/organisms'),
        '@templates': resolve(__dirname, '../src/components/templates'),
        '@pages': resolve(__dirname, '../src/components/pages'),
      };
    }
    return config;
  },
};
export default config;