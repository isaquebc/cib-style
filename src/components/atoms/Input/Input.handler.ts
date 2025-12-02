import { ChangeEvent, FocusEvent, MouseEvent, KeyboardEvent } from 'react';

export interface InputHandlers {
  handleChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (value: string, event: FocusEvent<HTMLInputElement>) => void;
  handleFocus?: (value: string, event: FocusEvent<HTMLInputElement>) => void;
  handleClick?: (value: string, event: MouseEvent<HTMLInputElement>) => void;
  handleKeyDown?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
  handleKeyUp?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
  handleKeyPress?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Handle change event
 * @param event - The change event from the input
 * @param callback - Optional callback function to execute with the new value
 */
export const handleChange = (
  event: ChangeEvent<HTMLInputElement>,
  callback?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
): void => {
  const value = event.target.value;
  if (callback) {
    callback(value, event);
  }
};

/**
 * Handle blur event
 * @param event - The blur event from the input
 * @param callback - Optional callback function to execute with the current value
 */
export const handleBlur = (
  event: FocusEvent<HTMLInputElement>,
  callback?: (value: string, event: FocusEvent<HTMLInputElement>) => void
): void => {
  const value = event.target.value;
  if (callback) {
    callback(value, event);
  }
};

/**
 * Handle focus event
 * @param event - The focus event from the input
 * @param callback - Optional callback function to execute with the current value
 */
export const handleFocus = (
  event: FocusEvent<HTMLInputElement>,
  callback?: (value: string, event: FocusEvent<HTMLInputElement>) => void
): void => {
  const value = event.target.value;
  if (callback) {
    callback(value, event);
  }
};

/**
 * Handle click event
 * @param event - The click event from the input
 * @param callback - Optional callback function to execute with the current value
 */
export const handleClick = (
  event: MouseEvent<HTMLInputElement>,
  callback?: (value: string, event: MouseEvent<HTMLInputElement>) => void
): void => {
  const value = event.currentTarget.value;
  if (callback) {
    callback(value, event);
  }
};

/**
 * Handle keydown event
 * @param event - The keydown event from the input
 * @param callback - Optional callback function to execute with the current value
 */
export const handleKeyDown = (
  event: KeyboardEvent<HTMLInputElement>,
  callback?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void
): void => {
  const value = event.currentTarget.value;
  if (callback) {
    callback(value, event);
  }
};

/**
 * Handle keyup event
 * @param event - The keyup event from the input
 * @param callback - Optional callback function to execute with the current value
 */
export const handleKeyUp = (
  event: KeyboardEvent<HTMLInputElement>,
  callback?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void
): void => {
  const value = event.currentTarget.value;
  if (callback) {
    callback(value, event);
  }
};

/**
 * Handle keypress event
 * @param event - The keypress event from the input
 * @param callback - Optional callback function to execute with the current value
 */
export const handleKeyPress = (
  event: KeyboardEvent<HTMLInputElement>,
  callback?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void
): void => {
  const value = event.currentTarget.value;
  if (callback) {
    callback(value, event);
  }
};

/**
 * Validate input value based on pattern
 * @param value - The input value to validate
 * @param pattern - RegExp pattern to test against
 * @returns boolean indicating if the value is valid
 */
export const validate = (value: string, pattern?: RegExp): boolean => {
  if (!pattern) return true;
  return pattern.test(value);
};

/**
 * Format input value
 * @param value - The input value to format
 * @param formatter - Function to format the value
 * @returns Formatted value
 */
export const format = (
  value: string,
  formatter?: (value: string) => string
): string => {
  if (!formatter) return value;
  return formatter(value);
};
