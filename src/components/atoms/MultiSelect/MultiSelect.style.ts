import styled from 'styled-components';

export const MultiSelectContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
  position: relative;
`;

export const StyledLabel = styled.label<{ disabled?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const SelectWrapper = styled.div<{
  hasError?: boolean;
  disabled?: boolean;
  isFocused?: boolean;
  fullWidth?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.background.paper : theme.colors.background.default};
  border: 1px solid
    ${({ theme, hasError, isFocused }) => {
      if (hasError) return theme.colors.status.error;
      if (isFocused) return theme.colors.primary.main;
      return theme.colors.border.main;
    }};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  transition: all 0.2s ease-in-out;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  min-width: 0;
  min-height: 42px;
  box-sizing: border-box;

  ${({ theme, hasError, isFocused }) =>
    isFocused &&
    `
    box-shadow: ${
      hasError
        ? `0 0 0 3px ${theme.colors.status.error}1a`
        : theme.shadows.focus
    };
  `}

  &:hover:not([disabled]) {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.status.error : theme.colors.border.focus};
  }
`;

export const SelectedItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SelectedChip = styled.div<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 6px 10px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: #ffffff;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const RemoveButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  padding: 0;
  width: 18px;
  height: 18px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: #ffffff;
  font-size: 16px;
  line-height: 1;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }
`;

export const StyledInput = styled.input<{ disabled?: boolean }>`
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  flex: 1;
  min-width: 120px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.foreground.disabled};
  }
`;

export const DropdownContainer = styled.div<{ isOpen?: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

export const DropdownOption = styled.div<{ isSelected?: boolean; isHighlighted?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  cursor: pointer;
  background-color: ${({ theme, isSelected, isHighlighted }) => {
    if (isSelected) return theme.colors.primary.light;
    if (isHighlighted) return theme.colors.background.elevated;
    return 'transparent';
  }};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary.main : theme.colors.foreground.primary};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary.light : theme.colors.background.elevated};
  }

  &:first-child {
    border-radius: ${({ theme }) => `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`};
  }

  &:last-child {
    border-radius: ${({ theme }) => `0 0 ${theme.borderRadius.md} ${theme.borderRadius.md}`};
  }
`;

export const NoResults = styled.div`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  text-align: center;
  color: ${({ theme }) => theme.colors.foreground.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
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
