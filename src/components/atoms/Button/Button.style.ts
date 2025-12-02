import styled, { css } from 'styled-components';
import { Theme } from '../../../theme/types';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface StyledButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const getVariantStyles = (theme: Theme, variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary.main};
        color: ${theme.colors.primary.contrastText};
        border: 1px solid ${theme.colors.primary.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary.dark};
          border-color: ${theme.colors.primary.dark};
        }

        &:focus {
          box-shadow: ${theme.shadows.focus};
        }
      `;

    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary.main};
        color: ${theme.colors.secondary.contrastText};
        border: 1px solid ${theme.colors.secondary.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondary.dark};
          border-color: ${theme.colors.secondary.dark};
        }

        &:focus {
          box-shadow: 0 0 0 3px ${theme.colors.secondary.main}33;
        }
      `;

    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary.main};
        border: 1px solid ${theme.colors.primary.main};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary.main}0d;
        }

        &:focus {
          box-shadow: ${theme.shadows.focus};
        }
      `;

    case 'ghost':
      return css`
        background-color: transparent;
        color: ${theme.colors.foreground.primary};
        border: 1px solid transparent;

        &:hover:not(:disabled) {
          background-color: ${theme.colors.background.elevated};
        }

        &:focus {
          box-shadow: ${theme.shadows.focus};
        }
      `;

    case 'danger':
      return css`
        background-color: ${theme.colors.status.error};
        color: white;
        border: 1px solid ${theme.colors.status.error};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.status.error}dd;
          border-color: ${theme.colors.status.error}dd;
        }

        &:focus {
          box-shadow: 0 0 0 3px ${theme.colors.status.error}33;
        }
      `;

    default:
      return '';
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 6px 12px;
        font-size: 0.875rem;
        min-height: 32px;
      `;

    case 'medium':
      return css`
        padding: 10px 20px;
        font-size: 1rem;
        min-height: 40px;
      `;

    case 'large':
      return css`
        padding: 14px 28px;
        font-size: 1.125rem;
        min-height: 48px;
      `;

    default:
      return '';
  }
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  white-space: nowrap;
  text-decoration: none;
  user-select: none;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
  box-sizing: border-box;

  ${({ theme, variant = 'primary' }) => getVariantStyles(theme, variant)}
  ${({ size = 'medium' }) => getSizeStyles(size)}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      cursor: wait;
      opacity: 0.7;
    `}
`;

export const ButtonContent = styled.span<{ isLoading?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
`;

export const LoadingSpinner = styled.span`
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
