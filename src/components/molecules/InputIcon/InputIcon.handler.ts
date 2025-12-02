import { ChangeEvent, FocusEvent, MouseEvent, KeyboardEvent } from 'react';

export interface InputIconHandlers {
  handleChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (value: string, event: FocusEvent<HTMLInputElement>) => void;
  handleFocus?: (value: string, event: FocusEvent<HTMLInputElement>) => void;
  handleIconClick?: (value: string, event: MouseEvent<HTMLDivElement>) => void;
  handleKeyDown?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
  handleKeyUp?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
  handleKeyPress?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Handle input change event
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
 * Handle icon click event
 * @param value - The current input value
 * @param event - The click event from the icon
 * @param callback - Optional callback function to execute
 */
export const handleIconClick = (
  value: string,
  event: MouseEvent<HTMLDivElement>,
  callback?: (value: string, event: MouseEvent<HTMLDivElement>) => void
): void => {
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
