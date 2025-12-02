import { forwardRef, useState, ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import {
  InputIconContainer,
  StyledLabel,
  InputWrapper,
  StyledInput,
  IconWrapper,
  ErrorMessage,
  HelperText,
  IconPosition,
} from './InputIcon.style';
import {
  handleChange as handleChangeUtil,
  handleBlur as handleBlurUtil,
  handleFocus as handleFocusUtil,
  handleIconClick as handleIconClickUtil,
  handleKeyDown as handleKeyDownUtil,
  handleKeyUp as handleKeyUpUtil,
  handleKeyPress as handleKeyPressUtil,
  InputIconHandlers,
} from './InputIcon.handler';

export interface InputIconProps extends InputIconHandlers {
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

  // Icon props
  icon: ReactElement;
  iconPosition?: IconPosition;
  iconClickable?: boolean;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}

/**
 * InputIcon component - An input field with an icon inside
 *
 * @example
 * ```tsx
 * <InputIcon
 *   label="Search"
 *   placeholder="Search..."
 *   icon={<SearchIcon />}
 *   iconPosition="left"
 *   handleChange={(value) => console.log(value)}
 * />
 * ```
 */
export const InputIcon = forwardRef<HTMLInputElement, InputIconProps>(
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
      icon,
      iconPosition = 'left',
      iconClickable = false,
      handleChange: handleChangeProp,
      handleBlur: handleBlurProp,
      handleFocus: handleFocusProp,
      handleIconClick: handleIconClickProp,
      handleKeyDown: handleKeyDownProp,
      handleKeyUp: handleKeyUpProp,
      handleKeyPress: handleKeyPressProp,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const inputId = id || `input-icon-${name || Math.random().toString(36).substr(2, 9)}`;
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

    const handleIconClick = (event: MouseEvent<HTMLDivElement>) => {
      if (iconClickable && !disabled) {
        handleIconClickUtil(value, event, handleIconClickProp);
      }
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
      <InputIconContainer fullWidth={fullWidth} className={className}>
        {label && (
          <StyledLabel htmlFor={inputId} disabled={disabled}>
            {label}
            {required && <span aria-label="required"> *</span>}
          </StyledLabel>
        )}

        <InputWrapper fullWidth={fullWidth}>
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
            iconPosition={iconPosition}
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

          <IconWrapper
            iconPosition={iconPosition}
            clickable={iconClickable}
            disabled={disabled}
            onClick={handleIconClick}
            aria-label={iconClickable ? 'Icon button' : undefined}
            role={iconClickable ? 'button' : undefined}
          >
            {icon}
          </IconWrapper>
        </InputWrapper>

        {error && <ErrorMessage id={errorId} role="alert">{error}</ErrorMessage>}
        {!error && helperText && <HelperText id={helperTextId}>{helperText}</HelperText>}
      </InputIconContainer>
    );
  }
);

InputIcon.displayName = 'InputIcon';
