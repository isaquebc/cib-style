import { forwardRef, useState, ChangeEvent, FocusEvent } from 'react';
import {
  CheckboxContainer,
  CheckboxWrapper,
  HiddenCheckbox,
  StyledCheckbox,
  LabelText,
  ErrorMessage,
  HelperText,
} from './Checkbox.style';
import {
  handleChange as handleChangeUtil,
  handleBlur as handleBlurUtil,
  handleFocus as handleFocusUtil,
  CheckboxHandlers,
} from './Checkbox.handler';

export interface CheckboxProps extends CheckboxHandlers {
  // Checkbox props
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  value?: string;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}

/**
 * Checkbox component - A styled checkbox input with label
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="I agree to the terms and conditions"
 *   handleChange={(checked) => console.log(checked)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="Subscribe to newsletter"
 *   defaultChecked
 *   helperText="You can unsubscribe at any time"
 *   handleChange={(checked) => console.log('Subscribed:', checked)}
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      name,
      checked: controlledChecked,
      defaultChecked,
      label,
      error,
      helperText,
      disabled = false,
      required = false,
      fullWidth = false,
      className,
      value,
      handleChange: handleChangeProp,
      handleBlur: handleBlurProp,
      handleFocus: handleFocusProp,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const checkboxId = id || `checkbox-${name || Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${checkboxId}-error`;
    const helperTextId = `${checkboxId}-helper`;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      handleChangeUtil(event, handleChangeProp);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      handleBlurUtil(event, handleBlurProp);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      handleFocusUtil(event, handleFocusProp);
    };

    return (
      <CheckboxContainer fullWidth={fullWidth} className={className}>
        <CheckboxWrapper disabled={disabled}>
          <HiddenCheckbox
            ref={ref}
            id={checkboxId}
            name={name}
            checked={checked}
            disabled={disabled}
            required={required}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            aria-label={ariaLabel || label}
            aria-invalid={!!error}
            aria-describedby={
              ariaDescribedBy ||
              [error && errorId, helperText && helperTextId].filter(Boolean).join(' ') ||
              undefined
            }
          />
          <StyledCheckbox checked={checked} disabled={disabled} hasError={!!error} />
          {label && <LabelText disabled={disabled}>{label}</LabelText>}
        </CheckboxWrapper>

        {error && (
          <ErrorMessage id={errorId} role="alert">
            {error}
          </ErrorMessage>
        )}
        {!error && helperText && <HelperText id={helperTextId}>{helperText}</HelperText>}
      </CheckboxContainer>
    );
  }
);

Checkbox.displayName = 'Checkbox';
