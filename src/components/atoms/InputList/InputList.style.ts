import styled from 'styled-components';

export const InputListContainer = styled.div<{ fullWidth?: boolean }>`
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

export const StyledInput = styled.input<{
  hasError?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}>`
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

export const StyledDatalist = styled.datalist`
  /* Datalist styling is limited, but we can style option elements */
`;

export const StyledOption = styled.option`
  padding: 8px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.foreground.primary};
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

export const OtherInputContainer = styled.div<{ isVisible?: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing.xs};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const OtherInput = styled.input`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.foreground.primary};
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.foreground.disabled};
  }
`;

export const OtherInputButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary.main : theme.colors.background.elevated};
  color: ${({ theme, variant }) =>
    variant === 'primary' ? '#ffffff' : theme.colors.foreground.primary};
  border: 1px solid
    ${({ theme, variant }) =>
      variant === 'primary' ? theme.colors.primary.main : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === 'primary' ? theme.colors.primary.dark : theme.colors.background.paper};
  }

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;
