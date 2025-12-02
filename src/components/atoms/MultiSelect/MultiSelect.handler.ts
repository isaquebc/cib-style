import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

/**
 * Handler interface for MultiSelect component events
 * All handlers follow the "handle" prefix pattern instead of "on" prefix
 */
export interface MultiSelectHandlers {
  /**
   * Called when the selection changes (items added or removed)
   * @param values - Array of selected values
   */
  handleChange?: (values: string[]) => void;

  /**
   * Called when an item is selected/added
   * @param value - The value that was added
   * @param allValues - Array of all selected values after adding
   */
  handleSelect?: (value: string, allValues: string[]) => void;

  /**
   * Called when an item is removed
   * @param value - The value that was removed
   * @param allValues - Array of all selected values after removal
   */
  handleRemove?: (value: string, allValues: string[]) => void;

  /**
   * Called when input loses focus
   * @param values - Current selected values
   * @param event - The blur event
   */
  handleBlur?: (values: string[], event: FocusEvent<HTMLInputElement>) => void;

  /**
   * Called when input receives focus
   * @param values - Current selected values
   * @param event - The focus event
   */
  handleFocus?: (values: string[], event: FocusEvent<HTMLInputElement>) => void;

  /**
   * Called when input value changes (for filtering)
   * @param value - The current input value
   * @param event - The change event
   */
  handleInputChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Called when a key is pressed down
   * @param value - The current input value
   * @param event - The keyboard event
   */
  handleKeyDown?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Utility function to handle selection change
 */
export const handleChange = (
  values: string[],
  handler?: (values: string[]) => void
): void => {
  if (handler) {
    handler(values);
  }
};

/**
 * Utility function to handle item selection
 */
export const handleSelect = (
  value: string,
  allValues: string[],
  handler?: (value: string, allValues: string[]) => void
): void => {
  if (handler) {
    handler(value, allValues);
  }
};

/**
 * Utility function to handle item removal
 */
export const handleRemove = (
  value: string,
  allValues: string[],
  handler?: (value: string, allValues: string[]) => void
): void => {
  if (handler) {
    handler(value, allValues);
  }
};

/**
 * Utility function to handle blur events
 */
export const handleBlur = (
  values: string[],
  event: FocusEvent<HTMLInputElement>,
  handler?: (values: string[], event: FocusEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    handler(values, event);
  }
};

/**
 * Utility function to handle focus events
 */
export const handleFocus = (
  values: string[],
  event: FocusEvent<HTMLInputElement>,
  handler?: (values: string[], event: FocusEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    handler(values, event);
  }
};

/**
 * Utility function to handle input change (for filtering)
 */
export const handleInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  handler?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    handler(event.target.value, event);
  }
};

/**
 * Utility function to handle keydown events
 */
export const handleKeyDown = (
  event: KeyboardEvent<HTMLInputElement>,
  handler?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    const target = event.target as HTMLInputElement;
    handler(target.value, event);
  }
};
