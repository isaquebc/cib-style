import { forwardRef, useState, useRef, ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import {
  InputListContainer,
  StyledLabel,
  StyledInput,
  StyledDatalist,
  StyledOption,
  ErrorMessage,
  HelperText,
  OtherInputContainer,
  OtherInput,
  OtherInputButton,
} from './InputList.style';
import {
  handleChange as handleChangeUtil,
  handleBlur as handleBlurUtil,
  handleFocus as handleFocusUtil,
  handleKeyDown as handleKeyDownUtil,
  handleKeyUp as handleKeyUpUtil,
  handleKeyPress as handleKeyPressUtil,
  handleSelect as handleSelectUtil,
  InputListHandlers,
} from './InputList.handler';

export interface InputListOption {
  value: string;
  label?: string;
}

export interface InputListProps extends InputListHandlers {
  // Input props
  id?: string;
  name?: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'search';
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

  // List props
  options: InputListOption[] | string[];
  other?: string; // Label for the "Other" option (e.g., "Other", "Custom", etc.)

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}

/**
 * InputList component - An input field with a datalist for autocomplete suggestions
 *
 * @example
 * ```tsx
 * <InputList
 *   label="Country"
 *   placeholder="Select a country"
 *   options={['Brazil', 'United States', 'Canada', 'Mexico']}
 *   handleChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <InputList
 *   label="City"
 *   placeholder="Select a city"
 *   options={[
 *     { value: 'sp', label: 'São Paulo' },
 *     { value: 'rj', label: 'Rio de Janeiro' },
 *     { value: 'ny', label: 'New York' },
 *   ]}
 *   handleChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <InputList
 *   label="Programming Language"
 *   placeholder="Select or add a language"
 *   options={['JavaScript', 'TypeScript', 'Python', 'Java']}
 *   other="Other Language"
 *   handleChange={(value) => console.log(value)}
 * />
 * ```
 */
export const InputList = forwardRef<HTMLInputElement, InputListProps>(
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
      autoComplete = 'off',
      maxLength,
      minLength,
      pattern,
      fullWidth = false,
      className,
      options,
      other,
      handleChange: handleChangeProp,
      handleBlur: handleBlurProp,
      handleFocus: handleFocusProp,
      handleKeyDown: handleKeyDownProp,
      handleKeyUp: handleKeyUpProp,
      handleKeyPress: handleKeyPressProp,
      handleSelect: handleSelectProp,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherInputValue, setOtherInputValue] = useState('');
    const otherInputRef = useRef<HTMLInputElement>(null);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const inputId = id || `input-list-${name || Math.random().toString(36).substr(2, 9)}`;
    const listId = `${inputId}-list`;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;

    // Normalize options to always be objects with value and label
    const normalizedOptions = options.map((option) =>
      typeof option === 'string' ? { value: option, label: option } : option
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      // Check if the "Other" option was selected
      if (other && newValue === '__OTHER__') {
        setShowOtherInput(true);
        setTimeout(() => {
          otherInputRef.current?.focus();
        }, 0);
        return;
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }

      // Check if the value matches one of the options (user selected from list)
      const isSelection = normalizedOptions.some((opt) => opt.value === newValue);

      if (isSelection && handleSelectProp) {
        handleSelectUtil(event, handleSelectProp);
      }

      handleChangeUtil(event, handleChangeProp);
    };

    const handleOtherInputSubmit = () => {
      if (otherInputValue.trim()) {
        const trimmedValue = otherInputValue.trim();
        if (!isControlled) {
          setInternalValue(trimmedValue);
        }

        // Create a synthetic event to pass to handlers
        const syntheticEvent = {
          target: { value: trimmedValue },
          currentTarget: { value: trimmedValue },
        } as ChangeEvent<HTMLInputElement>;

        handleChangeUtil(syntheticEvent, handleChangeProp);
        if (handleSelectProp) {
          handleSelectUtil(syntheticEvent, handleSelectProp);
        }

        setOtherInputValue('');
        setShowOtherInput(false);
      }
    };

    const handleOtherInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleOtherInputSubmit();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        setShowOtherInput(false);
        setOtherInputValue('');
      }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      handleBlurUtil(event, handleBlurProp);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      handleFocusUtil(event, handleFocusProp);
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
      <InputListContainer fullWidth={fullWidth} className={className}>
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
          list={listId}
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

        <StyledDatalist id={listId}>
          {normalizedOptions.map((option, index) => (
            <StyledOption key={`${option.value}-${index}`} value={option.value}>
              {option.label || option.value}
            </StyledOption>
          ))}
          {other && (
            <StyledOption key="__OTHER__" value="__OTHER__">
              {other}
            </StyledOption>
          )}
        </StyledDatalist>

        {other && (
          <OtherInputContainer isVisible={showOtherInput}>
            <OtherInput
              ref={otherInputRef}
              type="text"
              value={otherInputValue}
              placeholder={`Enter custom ${label?.toLowerCase() || 'option'}...`}
              onChange={(e) => setOtherInputValue(e.target.value)}
              onKeyDown={handleOtherInputKeyDown}
              onBlur={() => {
                setTimeout(() => {
                  if (document.activeElement !== otherInputRef.current) {
                    setShowOtherInput(false);
                    setOtherInputValue('');
                  }
                }, 200);
              }}
            />
            <OtherInputButton
              type="button"
              variant="primary"
              onClick={handleOtherInputSubmit}
            >
              Add
            </OtherInputButton>
            <OtherInputButton
              type="button"
              variant="secondary"
              onClick={() => {
                setShowOtherInput(false);
                setOtherInputValue('');
              }}
            >
              Cancel
            </OtherInputButton>
          </OtherInputContainer>
        )}

        {error && (
          <ErrorMessage id={errorId} role="alert">
            {error}
          </ErrorMessage>
        )}
        {!error && helperText && <HelperText id={helperTextId}>{helperText}</HelperText>}
      </InputListContainer>
    );
  }
);

InputList.displayName = 'InputList';
