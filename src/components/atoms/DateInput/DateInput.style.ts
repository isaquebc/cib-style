import styled from 'styled-components';

export interface StyledDateInputProps {
  hasError?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const DateInputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 100%;
  position: relative;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledDateInput = styled.input<StyledDateInputProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  min-width: 0;
  padding: 10px 40px 10px 12px;
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
  box-sizing: border-box;

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

export const CalendarIcon = styled.button<{ disabled?: boolean }>`
  position: absolute;
  right: 8px;
  background: transparent;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.secondary};
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease-in-out;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const StyledLabel = styled.label<{ disabled?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.foreground.disabled : theme.colors.foreground.primary};
  margin-bottom: 2px;
`;

export const ErrorMessage = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.status.error};
  margin-top: 2px;
`;

export const HelperText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.foreground.secondary};
  margin-top: 2px;
`;

export const CalendarPopup = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.background.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 16px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  min-width: 280px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

export const CalendarNavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const CalendarSelectors = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
  justify-content: center;
`;

export const CalendarSelect = styled.select`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground.primary};
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 6px 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.light};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

export const CalendarNavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.foreground.secondary};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.paper};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

export const CalendarDayLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground.secondary};
  text-align: center;
  padding: 8px 4px;
`;

export const CalendarDay = styled.button<{
  isToday?: boolean;
  isSelected?: boolean;
  isOtherMonth?: boolean;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 0.875rem;
  color: ${({ theme, isOtherMonth, isSelected }) =>
    isSelected
      ? theme.colors.primary.contrastText
      : isOtherMonth
      ? theme.colors.foreground.disabled
      : theme.colors.foreground.primary};
  background-color: ${({ theme, isSelected, isToday }) =>
    isSelected
      ? theme.colors.primary.main
      : isToday
      ? `${theme.colors.primary.main}1a`
      : 'transparent'};
  border: ${({ theme, isToday, isSelected }) =>
    isToday && !isSelected ? `1px solid ${theme.colors.primary.main}` : '1px solid transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary.dark : `${theme.colors.primary.main}1a`};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;
