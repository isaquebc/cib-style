import styled from 'styled-components';

export const CheckboxContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
`;

export const CheckboxWrapper = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

export const StyledCheckbox = styled.div<{
  checked?: boolean;
  disabled?: boolean;
  hasError?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: 2px solid
    ${({ theme, hasError, checked }) => {
      if (hasError) return theme.colors.status.error;
      if (checked) return theme.colors.primary.main;
      return theme.colors.border.main;
    }};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme, checked, disabled }) => {
    if (disabled) return theme.colors.background.paper;
    if (checked) return theme.colors.primary.main;
    return theme.colors.background.default;
  }};
  transition: all 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${HiddenCheckbox}:focus + & {
    box-shadow: ${({ theme, hasError }) =>
      hasError
        ? `0 0 0 3px ${theme.colors.status.error}1a`
        : theme.shadows.focus};
  }

  ${HiddenCheckbox}:not(:disabled) + &:hover {
    border-color: ${({ theme, hasError, checked }) => {
      if (hasError) return theme.colors.status.error;
      if (checked) return theme.colors.primary.main;
      return theme.colors.border.focus;
    }};
  }

  /* Checkmark */
  &::after {
    content: '';
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-bottom: 2px;
  }
`;

export const LabelText = styled.span<{ disabled?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.primary};
  line-height: 1.5;
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
