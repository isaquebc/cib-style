import { ChangeEvent, FocusEvent, MouseEvent, KeyboardEvent, forwardRef } from 'react';
import {
  InputContainer,
  StyledInput,
  StyledLabel,
  ErrorMessage,
  HelperText,
} from './Input.style';
import {
  handleChange as handleChangeUtil,
  handleBlur as handleBlurUtil,
  handleFocus as handleFocusUtil,
  handleClick as handleClickUtil,
  handleKeyDown as handleKeyDownUtil,
  handleKeyUp as handleKeyUpUtil,
  handleKeyPress as handleKeyPressUtil,
  InputHandlers,
} from './Input.handler';

export interface InputProps extends InputHandlers {
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
  'aria-label'?: string;
  'aria-describedby'?: string;
}

/**
 * Input component - A reusable text input field with support for labels, errors, and helper text
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   handleChange={(value) => console.log(value)}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type = 'text',
      value,
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
      handleChange: handleChangeProp,
      handleBlur: handleBlurProp,
      handleFocus: handleFocusProp,
      handleClick: handleClickProp,
      handleKeyDown: handleKeyDownProp,
      handleKeyUp: handleKeyUpProp,
      handleKeyPress: handleKeyPressProp,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      handleChangeUtil(event, handleChangeProp);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      handleBlurUtil(event, handleBlurProp);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      handleFocusUtil(event, handleFocusProp);
    };

    const handleClick = (event: MouseEvent<HTMLInputElement>) => {
      handleClickUtil(event, handleClickProp);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      handleKeyDownUtil(event, handleKeyDownProp);
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
      handleKeyUpUtil(event, handleKeyUpProp);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
      handleKeyPressUtil(event, handleKeyPressProp);
    };

    return (
      <InputContainer fullWidth={fullWidth} className={className}>
        {label && (
          <StyledLabel htmlFor={inputId} disabled={disabled}>
            {label}
            {required && <span aria-label="required"> *</span>}
          </StyledLabel>
        )}

        <StyledInput
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
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
          onClick={handleClick}
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

        {error && <ErrorMessage id={errorId} role="alert">{error}</ErrorMessage>}
        {!error && helperText && <HelperText id={helperTextId}>{helperText}</HelperText>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';
