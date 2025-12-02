import styled from 'styled-components';
import { ButtonVariant, ButtonSize } from '../../atoms/Button/Button.style';

export interface InputButtonContainerProps {
  fullWidth?: boolean;
}

export const InputButtonContainer = styled.div<InputButtonContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
`;

export const InputButtonWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  gap: 8px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  align-items: flex-start;
`;

export const StyledLabel = styled.label<{ disabled?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.primary};
`;

export const ErrorMessage = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.status.error};
`;

export const HelperText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.foreground.secondary};
`;

export interface StyledInputProps {
  hasError?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 10px 12px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 1rem;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.primary};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.background.paper : theme.colors.background.default};
  
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.colors.foreground.hint};
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.status.error : theme.colors.border.light};
  }

  &:focus {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.status.error : theme.colors.primary.main};
    box-shadow: ${({ theme, hasError }) =>
      hasError ? `0 0 0 3px ${theme.colors.status.error}1a` : theme.shadows.focus};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export interface StyledButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  white-space: nowrap;
  text-decoration: none;
  user-select: none;
  flex-shrink: 0;

  /* Size styles */
  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return `
          padding: 6px 12px;
          font-size: 0.875rem;
          min-height: 32px;
        `;
      case 'medium':
        return `
          padding: 10px 20px;
          font-size: 1rem;
          min-height: 40px;
        `;
      case 'large':
        return `
          padding: 14px 28px;
          font-size: 1.125rem;
          min-height: 48px;
        `;
      default:
        return '';
    }
  }}

  /* Variant styles */
  ${({ theme, variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
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
        return `
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
        return `
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
        return `
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
        return `
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
  }}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
