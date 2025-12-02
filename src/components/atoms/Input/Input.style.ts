import styled from 'styled-components';

export interface StyledInputProps {
  hasError?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
`;

export const StyledLabel = styled.label<{ disabled?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const StyledInput = styled.input<StyledInputProps>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  line-height: 1.5;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.primary};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.background.paper : theme.colors.background.default};
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.status.error : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  transition: all 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  min-width: 0;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.status.error : theme.colors.primary.main};
    box-shadow: ${({ theme, hasError }) =>
      hasError
        ? `0 0 0 3px ${theme.colors.status.error}1a`
        : theme.shadows.focus};
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.status.error : theme.colors.border.focus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.foreground.disabled};
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.status.error};
  margin-top: -${({ theme }) => theme.spacing.xs};
`;

export const HelperText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.foreground.secondary};
  margin-top: -${({ theme }) => theme.spacing.xs};
`;
