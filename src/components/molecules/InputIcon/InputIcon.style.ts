import styled from 'styled-components';

export type IconPosition = 'left' | 'right';

export interface InputIconContainerProps {
  fullWidth?: boolean;
}

export const InputIconContainer = styled.div<InputIconContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
`;

export const StyledLabel = styled.label<{ disabled?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.primary};
`;

export const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
`;

export interface StyledInputProps {
  hasError?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  iconPosition?: IconPosition;
}

export const StyledInput = styled.input<StyledInputProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '250px')};
  padding: ${({ iconPosition }) =>
    iconPosition === 'left' ? '10px 12px 10px 40px' : '10px 40px 10px 12px'};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 1rem;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.primary};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.background.paper : theme.colors.background.default};
  border: 1px solid ${({ theme, hasError }) =>
    hasError ? theme.colors.status.error : theme.colors.border.main};
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

export const IconWrapper = styled.div<{
  iconPosition: IconPosition;
  clickable?: boolean;
  disabled?: boolean;
}>`
  position: absolute;
  ${({ iconPosition }) => (iconPosition === 'left' ? 'left: 12px' : 'right: 12px')};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.secondary};
  cursor: ${({ clickable, disabled }) =>
    disabled ? 'not-allowed' : clickable ? 'pointer' : 'default'};
  transition: color 0.2s ease-in-out;
  pointer-events: ${({ clickable }) => (clickable ? 'auto' : 'none')};

  &:hover {
    color: ${({ theme, clickable, disabled }) =>
      clickable && !disabled ? theme.colors.primary.main : undefined};
  }

  svg {
    width: 20px;
    height: 20px;
  }
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
