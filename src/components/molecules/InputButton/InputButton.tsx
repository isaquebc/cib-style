import { forwardRef, useState, ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import {
  InputButtonContainer,
  InputButtonWrapper,
  StyledLabel,
  StyledInput,
  StyledButton,
  ErrorMessage,
  HelperText,
} from './InputButton.style';
import {
  handleChange as handleChangeUtil,
  handleBlur as handleBlurUtil,
  handleFocus as handleFocusUtil,
  handleKeyDown as handleKeyDownUtil,
  handleKeyUp as handleKeyUpUtil,
  handleKeyPress as handleKeyPressUtil,
  handleButtonClick as handleButtonClickUtil,
  InputButtonHandlers,
} from './InputButton.handler';
import { ButtonVariant, ButtonSize } from '../../atoms/Button/Button.style';

export interface InputButtonProps extends InputButtonHandlers {
  // Input props
  id?: string;
  name?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  fullWidth?: boolean;
  className?: string;

  // Button props
  buttonText?: string;
  buttonIcon?: ReactElement;
  buttonVariant?: ButtonVariant;
  buttonSize?: ButtonSize;
  buttonDisabled?: boolean;
  buttonType?: 'button' | 'submit';

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  'button-aria-label'?: string;
}

/**
 * InputButton component - An input field with an adjacent button
 *
 * @example
 * ```tsx
 * <InputButton
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   buttonText="Subscribe"
 *   handleChange={(value) => console.log(value)}
 *   handleButtonClick={(value) => console.log('Clicked with:', value)}
 * />
 * ```
 */
export const InputButton = forwardRef<HTMLInputElement, InputButtonProps>(
  (
    {
      id,
      name,
      type = 'text',
      value: controlledValue,
      defaultValue,
      placeholder,
      label,
      error,
      helperText,
      disabled = false,
      required = false,
      readOnly = false,
      autoFocus = false,
      autoComplete,
      maxLength,
      minLength,
      pattern,
      fullWidth = false,
      className,
      buttonText,
      buttonIcon,
      buttonVariant = 'primary',
      buttonSize = 'medium',
      buttonDisabled = false,
      buttonType = 'button',
      handleChange: handleChangeProp,
      handleBlur: handleBlurProp,
      handleFocus: handleFocusProp,
      handleKeyDown: handleKeyDownProp,
      handleKeyUp: handleKeyUpProp,
      handleKeyPress: handleKeyPressProp,
      handleButtonClick: handleButtonClickProp,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'button-aria-label': buttonAriaLabel,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const inputId = id || `input-button-${name || Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      handleChangeUtil(event, handleChangeProp);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      handleBlurUtil(event, handleBlurProp);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      handleFocusUtil(event, handleFocusProp);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      handleKeyDownUtil(event, handleKeyDownProp);

      // Trigger button click on Enter key
      if (event.key === 'Enter' && handleButtonClickProp && !buttonDisabled && !disabled) {
        event.preventDefault();
        const mockEvent = {
          currentTarget: event.currentTarget,
        } as unknown as MouseEvent<HTMLButtonElement>;
        handleButtonClickUtil(value, mockEvent, handleButtonClickProp);
      }
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
      handleKeyUpUtil(event, handleKeyUpProp);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
      handleKeyPressUtil(event, handleKeyPressProp);
    };

    const handleButtonClickInternal = (event: MouseEvent<HTMLButtonElement>) => {
      handleButtonClickUtil(value, event, handleButtonClickProp);
    };

    return (
      <InputButtonContainer fullWidth={fullWidth} className={className}>
        {label && (
          <StyledLabel htmlFor={inputId} disabled={disabled}>
            {label}
            {required && <span aria-label="required"> *</span>}
          </StyledLabel>
        )}

        <InputButtonWrapper fullWidth={fullWidth}>
            <StyledInput
              ref={ref}
              id={inputId}
              name={name}
              type={type}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              readOnly={readOnly}
              autoFocus={autoFocus}
              autoComplete={autoComplete}
              maxLength={maxLength}
              minLength={minLength}
              pattern={pattern}
              hasError={!!error}
              fullWidth={fullWidth}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onKeyPress={handleKeyPress}
              aria-label={ariaLabel || label}
              aria-invalid={!!error}
              aria-describedby={
                ariaDescribedBy ||
                [error && errorId, helperText && helperTextId].filter(Boolean).join(' ') ||
                undefined
              }
            />

          <StyledButton
            type={buttonType}
            variant={buttonVariant}
            size={buttonSize}
            disabled={buttonDisabled || disabled}
            onClick={handleButtonClickInternal}
            aria-label={buttonAriaLabel || buttonText || 'Submit'}
          >
            {buttonIcon || buttonText}
          </StyledButton>
        </InputButtonWrapper>

        {error && <ErrorMessage id={errorId} role="alert">{error}</ErrorMessage>}
        {!error && helperText && <HelperText id={helperTextId}>{helperText}</HelperText>}
      </InputButtonContainer>
    );
  }
);

InputButton.displayName = 'InputButton';
