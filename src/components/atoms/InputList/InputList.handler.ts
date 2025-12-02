import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

/**
 * Handler interface for InputList component events
 * All handlers follow the "handle" prefix pattern instead of "on" prefix
 */
export interface InputListHandlers {
  /**
   * Called when input value changes
   * @param value - The current input value
   * @param event - The change event
   */
  handleChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Called when input loses focus
   * @param value - The current input value
   * @param event - The blur event
   */
  handleBlur?: (value: string, event: FocusEvent<HTMLInputElement>) => void;

  /**
   * Called when input receives focus
   * @param value - The current input value
   * @param event - The focus event
   */
  handleFocus?: (value: string, event: FocusEvent<HTMLInputElement>) => void;

  /**
   * Called when a key is pressed down
   * @param value - The current input value
   * @param event - The keyboard event
   */
  handleKeyDown?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Called when a key is released
   * @param value - The current input value
   * @param event - The keyboard event
   */
  handleKeyUp?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Called when a key is pressed (deprecated but still supported)
   * @param value - The current input value
   * @param event - The keyboard event
   */
  handleKeyPress?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Called when user selects an option from the datalist
   * @param value - The selected value
   * @param event - The change event
   */
  handleSelect?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Utility function to handle input change events
 */
export const handleChange = (
  event: ChangeEvent<HTMLInputElement>,
  handler?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    handler(event.target.value, event);
  }
};

/**
 * Utility function to handle input blur events
 */
export const handleBlur = (
  event: FocusEvent<HTMLInputElement>,
  handler?: (value: string, event: FocusEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    handler(event.target.value, event);
  }
};

/**
 * Utility function to handle input focus events
 */
export const handleFocus = (
  event: FocusEvent<HTMLInputElement>,
  handler?: (value: string, event: FocusEvent<HTMLInputElement>) => void
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

/**
 * Utility function to handle keyup events
 */
export const handleKeyUp = (
  event: KeyboardEvent<HTMLInputElement>,
  handler?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    const target = event.target as HTMLInputElement;
    handler(target.value, event);
  }
};

/**
 * Utility function to handle keypress events
 */
export const handleKeyPress = (
  event: KeyboardEvent<HTMLInputElement>,
  handler?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    const target = event.target as HTMLInputElement;
    handler(target.value, event);
  }
};

/**
 * Utility function to handle option selection
 */
export const handleSelect = (
  event: ChangeEvent<HTMLInputElement>,
  handler?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
): void => {
  if (handler) {
    handler(event.target.value, event);
  }
};
