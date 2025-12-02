import { forwardRef, useState, useRef, useEffect, ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import {
  MultiSelectContainer,
  StyledLabel,
  SelectWrapper,
  SelectedItemsContainer,
  SelectedChip,
  RemoveButton,
  StyledInput,
  DropdownContainer,
  DropdownOption,
  NoResults,
  ErrorMessage,
  HelperText,
  OtherInputContainer,
  OtherInput,
  OtherInputButton,
} from './MultiSelect.style';
import {
  handleChange as handleChangeUtil,
  handleSelect as handleSelectUtil,
  handleRemove as handleRemoveUtil,
  handleBlur as handleBlurUtil,
  handleFocus as handleFocusUtil,
  handleInputChange as handleInputChangeUtil,
  handleKeyDown as handleKeyDownUtil,
  MultiSelectHandlers,
} from './MultiSelect.handler';

export interface MultiSelectOption {
  value: string;
  label?: string;
}

export interface MultiSelectProps extends MultiSelectHandlers {
  // Input props
  id?: string;
  name?: string;
  value?: string[];
  defaultValue?: string[];
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;

  // Select props
  options: MultiSelectOption[] | string[];
  maxSelections?: number;
  searchable?: boolean;
  other?: string; // Label for the "Other" option (e.g., "Other", "Custom", etc.)

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}

/**
 * MultiSelect component - A multi-selection dropdown with chips
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   label="Languages"
 *   placeholder="Select languages"
 *   options={['JavaScript', 'TypeScript', 'Python', 'Java']}
 *   handleChange={(values) => console.log(values)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   label="Skills"
 *   placeholder="Select your skills"
 *   options={[
 *     { value: 'js', label: 'JavaScript' },
 *     { value: 'ts', label: 'TypeScript' },
 *     { value: 'py', label: 'Python' },
 *   ]}
 *   maxSelections={3}
 *   handleChange={(values) => console.log(values)}
 * />
 * ```
 */
export const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(
  (
    {
      id,
      name,
      value: controlledValue,
      defaultValue,
      placeholder = 'Select options...',
      label,
      error,
      helperText,
      disabled = false,
      required = false,
      fullWidth = false,
      className,
      options,
      maxSelections,
      searchable = true,
      other,
      handleChange: handleChangeProp,
      handleSelect: handleSelectProp,
      handleRemove: handleRemoveProp,
      handleBlur: handleBlurProp,
      handleFocus: handleFocusProp,
      handleInputChange: handleInputChangeProp,
      handleKeyDown: handleKeyDownProp,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    _ref
  ) => {
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue || []);
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherInputValue, setOtherInputValue] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const otherInputRef = useRef<HTMLInputElement>(null);

    const isControlled = controlledValue !== undefined;
    const selectedValues = isControlled ? controlledValue : internalValue;

    const inputId = id || `multi-select-${name || Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;

    // Normalize options to always be objects with value and label
    const normalizedOptions = options.map((option) =>
      typeof option === 'string' ? { value: option, label: option } : option
    );

    // Filter options based on input and exclude already selected
    const filteredOptions = normalizedOptions.filter((option) => {
      const isNotSelected = !selectedValues.includes(option.value);
      const matchesSearch = searchable
        ? option.label?.toLowerCase().includes(inputValue.toLowerCase()) ||
          option.value.toLowerCase().includes(inputValue.toLowerCase())
        : true;
      return isNotSelected && matchesSearch;
    });

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: Event) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const addValue = (value: string) => {
      if (maxSelections && selectedValues.length >= maxSelections) {
        return;
      }

      const newValues = [...selectedValues, value];
      if (!isControlled) {
        setInternalValue(newValues);
      }

      handleSelectUtil(value, newValues, handleSelectProp);
      handleChangeUtil(newValues, handleChangeProp);
      setInputValue('');
      setHighlightedIndex(0);

      // Keep focus on input after selection
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const removeValue = (value: string) => {
      const newValues = selectedValues.filter((v) => v !== value);
      if (!isControlled) {
        setInternalValue(newValues);
      }

      handleRemoveUtil(value, newValues, handleRemoveProp);
      handleChangeUtil(newValues, handleChangeProp);
    };

    const handleOptionClick = (value: string) => {
      if (!disabled) {
        if (value === '__OTHER__' && other) {
          setShowOtherInput(true);
          setIsOpen(false);
          setTimeout(() => {
            otherInputRef.current?.focus();
          }, 0);
        } else {
          addValue(value);
        }
      }
    };

    const handleOtherInputSubmit = () => {
      if (otherInputValue.trim()) {
        addValue(otherInputValue.trim());
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
        inputRef.current?.focus();
      }
    };

    const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>, value: string) => {
      event.stopPropagation();
      if (!disabled) {
        removeValue(value);
      }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);
      setIsOpen(true);
      setHighlightedIndex(0);
      handleInputChangeUtil(event, handleInputChangeProp);
    };

    const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      setIsOpen(true);
      handleFocusUtil(selectedValues, event, handleFocusProp);
    };

    const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
      // Delay to allow click events to fire
      setTimeout(() => {
        setIsFocused(false);
        if (!containerRef.current?.contains(document.activeElement)) {
          setIsOpen(false);
        }
      }, 200);
      handleBlurUtil(selectedValues, event, handleBlurProp);
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      handleKeyDownUtil(event, handleKeyDownProp);

      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          if (isOpen && filteredOptions.length > 0 && highlightedIndex >= 0) {
            addValue(filteredOptions[highlightedIndex].value);
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          setIsOpen(true);
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          break;
        case 'Backspace':
          if (inputValue === '' && selectedValues.length > 0) {
            removeValue(selectedValues[selectedValues.length - 1]);
          }
          break;
      }
    };

    const getOptionLabel = (value: string): string => {
      const option = normalizedOptions.find((opt) => opt.value === value);
      return option?.label || value;
    };

    const isMaxReached = maxSelections ? selectedValues.length >= maxSelections : false;

    return (
      <MultiSelectContainer ref={containerRef} fullWidth={fullWidth} className={className}>
        {label && (
          <StyledLabel htmlFor={inputId} disabled={disabled}>
            {label}
            {required && <span aria-label="required"> *</span>}
          </StyledLabel>
        )}

        <SelectWrapper
          hasError={!!error}
          disabled={disabled}
          isFocused={isFocused}
          fullWidth={fullWidth}
          onClick={() => {
            if (!disabled && inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          {selectedValues.length > 0 && (
            <SelectedItemsContainer>
              {selectedValues.map((value) => (
                <SelectedChip key={value} disabled={disabled}>
                  {getOptionLabel(value)}
                  <RemoveButton
                    type="button"
                    disabled={disabled}
                    onClick={(e) => handleRemoveClick(e, value)}
                    aria-label={`Remove ${getOptionLabel(value)}`}
                  >
                    ×
                  </RemoveButton>
                </SelectedChip>
              ))}
            </SelectedItemsContainer>
          )}

          {!isMaxReached && (
            <StyledInput
              ref={inputRef}
              id={inputId}
              name={name}
              type="text"
              value={inputValue}
              placeholder={selectedValues.length === 0 ? placeholder : ''}
              disabled={disabled}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              aria-label={ariaLabel || label}
              aria-invalid={!!error}
              aria-describedby={
                ariaDescribedBy ||
                [error && errorId, helperText && helperTextId].filter(Boolean).join(' ') ||
                undefined
              }
              autoComplete="off"
            />
          )}
        </SelectWrapper>

        <DropdownContainer isOpen={isOpen && !disabled}>
          {filteredOptions.length > 0 || other ? (
            <>
              {filteredOptions.map((option, index) => (
                <DropdownOption
                  key={option.value}
                  isSelected={selectedValues.includes(option.value)}
                  isHighlighted={index === highlightedIndex}
                  onClick={() => handleOptionClick(option.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {option.label || option.value}
                </DropdownOption>
              ))}
              {other && (
                <DropdownOption
                  key="__OTHER__"
                  isSelected={false}
                  isHighlighted={highlightedIndex === filteredOptions.length}
                  onClick={() => handleOptionClick('__OTHER__')}
                  onMouseEnter={() => setHighlightedIndex(filteredOptions.length)}
                >
                  {other}
                </DropdownOption>
              )}
            </>
          ) : (
            <NoResults>
              {inputValue ? 'No results found' : 'All options selected'}
            </NoResults>
          )}
        </DropdownContainer>

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
                inputRef.current?.focus();
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
      </MultiSelectContainer>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
