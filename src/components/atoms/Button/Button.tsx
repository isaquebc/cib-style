import { forwardRef, MouseEvent, FocusEvent, ReactNode } from 'react';
import {
  StyledButton,
  ButtonContent,
  LoadingSpinner,
  ButtonVariant,
  ButtonSize,
} from './Button.style';
import {
  handleClick as handleClickUtil,
  handleFocus as handleFocusUtil,
  handleBlur as handleBlurUtil,
  ButtonHandlers,
} from './Button.handler';

export interface ButtonProps extends ButtonHandlers {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

/**
 * Button component - A versatile button with multiple variants and sizes
 *
 * @example
 * ```tsx
 * <Button
 *   variant="primary"
 *   size="medium"
 *   handleClick={() => console.log('Clicked!')}
 * >
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      type = 'button',
      variant = 'primary',
      size = 'medium',
      disabled = false,
      isLoading = false,
      fullWidth = false,
      className,
      handleClick: handleClickProp,
      handleFocus: handleFocusProp,
      handleBlur: handleBlurProp,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !isLoading) {
        handleClickUtil(event, handleClickProp);
      }
    };

    const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
      handleFocusUtil(event, handleFocusProp);
    };

    const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
      handleBlurUtil(event, handleBlurProp);
    };

    return (
      <StyledButton
        ref={ref}
        type={type}
        variant={variant}
        size={size}
        disabled={disabled || isLoading}
        isLoading={isLoading}
        fullWidth={fullWidth}
        className={className}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={isLoading}
      >
        {isLoading && <LoadingSpinner />}
        <ButtonContent isLoading={isLoading}>{children}</ButtonContent>
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
