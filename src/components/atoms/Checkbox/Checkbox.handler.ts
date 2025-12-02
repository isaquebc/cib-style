import { ChangeEvent, FocusEvent } from 'react';

/**
 * Handler interface for Checkbox component events
 * All handlers follow the "handle" prefix pattern instead of "on" prefix
 */
export interface CheckboxHandlers {
  /**
   * Called when checkbox state changes
   * @param checked - The new checked state
   * @param event - The change event
   */
  handleChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Called when checkbox loses focus
   * @param checked - The current checked state
   * @param event - The blur event
   */
  handleBlur?: (checked: boolean, event: FocusEvent<HTMLInputElement>) => void;

  /**
   * Called when checkbox receives focus
   * @param checked - The current checked state
   * @param event - The focus event
   */
  handleFocus?: (checked: boolean, event: FocusEvent<HTMLInputElement>) => void;
}

/**
 * Utility function to handle checkbox change events
 */
export const handleChange = (
  event: ChangeEvent<HTMLInputElement>,
  handler?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    handler(event.target.checked, event);
  }
};

/**
 * Utility function to handle checkbox blur events
 */
export const handleBlur = (
  event: FocusEvent<HTMLInputElement>,
  handler?: (checked: boolean, event: FocusEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    handler(event.target.checked, event);
  }
};

/**
 * Utility function to handle checkbox focus events
 */
export const handleFocus = (
  event: FocusEvent<HTMLInputElement>,
  handler?: (checked: boolean, event: FocusEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    handler(event.target.checked, event);
  }
};
