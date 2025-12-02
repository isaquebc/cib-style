import { MouseEvent, FocusEvent } from 'react';

export interface ButtonHandlers {
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  handleFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
  handleBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
}

/**
 * Handle click event
 * @param event - The click event from the button
 * @param callback - Optional callback function to execute
 */
export const handleClick = (
  event: MouseEvent<HTMLButtonElement>,
  callback?: (event: MouseEvent<HTMLButtonElement>) => void
): void => {
  if (callback) {
    callback(event);
  }
};

/**
 * Handle focus event
 * @param event - The focus event from the button
 * @param callback - Optional callback function to execute
 */
export const handleFocus = (
  event: FocusEvent<HTMLButtonElement>,
  callback?: (event: FocusEvent<HTMLButtonElement>) => void
): void => {
  if (callback) {
    callback(event);
  }
};

/**
 * Handle blur event
 * @param event - The blur event from the button
 * @param callback - Optional callback function to execute
 */
export const handleBlur = (
  event: FocusEvent<HTMLButtonElement>,
  callback?: (event: FocusEvent<HTMLButtonElement>) => void
): void => {
  if (callback) {
    callback(event);
  }
};
