import { forwardRef, useState, useEffect, useRef, ChangeEvent, FocusEvent, ReactElement } from 'react';
import {
  DateInputContainer,
  InputWrapper,
  StyledDateInput,
  CalendarIcon,
  StyledLabel,
  ErrorMessage,
  HelperText,
  CalendarPopup,
  CalendarHeader,
  CalendarNavRow,
  CalendarSelectors,
  CalendarSelect,
  CalendarNavButton,
  CalendarGrid,
  CalendarDayLabel,
  CalendarDay,
} from './DateInput.style';
import {
  handleChange as handleChangeUtil,
  handleBlur as handleBlurUtil,
  handleFocus as handleFocusUtil,
  parseDate,
  formatDate,
  getDateFormat,
  DateInputHandlers,
} from './DateInput.handler';

export interface DateInputProps extends DateInputHandlers {
  id?: string;
  name?: string;
  value?: Date | null;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  className?: string;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

/**
 * DateInput component - A date input with calendar picker that uses Brazilian format and UTC storage
 *
 * @example
 * ```tsx
 * <DateInput
 *   label="Birth Date"
 *   handleChange={(date, formatted) => console.log(date, formatted)}
 * />
 * ```
 */
export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      id,
      name,
      value,
      label,
      error,
      helperText,
      disabled = false,
      required = false,
      readOnly = false,
      fullWidth = false,
      className,
      locale,
      minDate,
      maxDate,
      handleChange: handleChangeProp,
      handleBlur: handleBlurProp,
      handleFocus: handleFocusProp,
      handleCalendarOpen: handleCalendarOpenProp,
      handleCalendarClose: handleCalendarCloseProp,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    const dateFormat = getDateFormat(locale);
    const [inputValue, setInputValue] = useState(value ? formatDate(value, dateFormat) : '');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value || new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    const inputId = id || `date-input-${name || Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;

    // Update input value when value prop changes
    useEffect(() => {
      setInputValue(value ? formatDate(value, dateFormat) : '');
    }, [value, dateFormat]);

    // Close calendar when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsCalendarOpen(false);
          if (handleCalendarCloseProp) {
            handleCalendarCloseProp();
          }
        }
      };

      if (isCalendarOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isCalendarOpen, handleCalendarCloseProp]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;

      // Auto-format as user types
      newValue = newValue.replace(/[^\d]/g, '');

      if (newValue.length >= 2) {
        newValue = newValue.slice(0, 2) + '/' + newValue.slice(2);
      }
      if (newValue.length >= 5) {
        newValue = newValue.slice(0, 5) + '/' + newValue.slice(5);
      }
      if (newValue.length > 10) {
        newValue = newValue.slice(0, 10);
      }

      setInputValue(newValue);

      // Try to parse the date if complete
      if (newValue.length === 10) {
        const parsedDate = parseDate(newValue, dateFormat);
        handleChangeUtil(parsedDate, newValue, handleChangeProp);
      } else {
        handleChangeUtil(null, newValue, handleChangeProp);
      }
    };

    const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
      const parsedDate = parseDate(inputValue, dateFormat);
      handleBlurUtil(parsedDate, inputValue, event, handleBlurProp);
    };

    const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
      handleFocusUtil(event, handleFocusProp);
    };

    const toggleCalendar = () => {
      if (disabled || readOnly) return;

      const newState = !isCalendarOpen;
      setIsCalendarOpen(newState);

      if (newState && handleCalendarOpenProp) {
        handleCalendarOpenProp();
      } else if (!newState && handleCalendarCloseProp) {
        handleCalendarCloseProp();
      }
    };

    const handleDateSelect = (date: Date) => {
      const formattedValue = formatDate(date, dateFormat);
      setInputValue(formattedValue);
      setIsCalendarOpen(false);
      handleChangeUtil(date, formattedValue, handleChangeProp);
      if (handleCalendarCloseProp) {
        handleCalendarCloseProp();
      }
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
      setCurrentMonth(prev => {
        const newDate = new Date(prev);
        if (direction === 'prev') {
          newDate.setUTCMonth(newDate.getUTCMonth() - 1);
        } else {
          newDate.setUTCMonth(newDate.getUTCMonth() + 1);
        }
        return newDate;
      });
    };

    const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const newMonth = parseInt(event.target.value, 10);
      setCurrentMonth(prev => {
        const newDate = new Date(prev);
        newDate.setUTCMonth(newMonth);
        return newDate;
      });
    };

    const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const newYear = parseInt(event.target.value, 10);
      setCurrentMonth(prev => {
        const newDate = new Date(prev);
        newDate.setUTCFullYear(newYear);
        return newDate;
      });
    };

    const renderCalendar = () => {
      const year = currentMonth.getUTCFullYear();
      const month = currentMonth.getUTCMonth();

      const firstDay = new Date(Date.UTC(year, month, 1));
      const lastDay = new Date(Date.UTC(year, month + 1, 0));

      const firstDayOfWeek = firstDay.getUTCDay();
      const daysInMonth = lastDay.getUTCDate();

      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const days: ReactElement[] = [];

      // Add day labels
      const dayLabels = dateFormat === 'dd/mm/yyyy'
        ? ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      dayLabels.forEach(label => {
        days.push(<CalendarDayLabel key={`label-${label}`}>{label}</CalendarDayLabel>);
      });

      // Add empty cells for days before first day of month
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(<CalendarDay key={`empty-${i}`} disabled isOtherMonth />);
      }

      // Add days of month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
        const isToday = date.getTime() === today.getTime();
        const isSelected = !!(value && date.getTime() === new Date(value).setUTCHours(0, 0, 0, 0));
        const isDisabled =
          (minDate && date < minDate) ||
          (maxDate && date > maxDate);

        days.push(
          <CalendarDay
            key={day}
            isToday={isToday}
            isSelected={isSelected}
            disabled={isDisabled}
            onClick={() => !isDisabled && handleDateSelect(date)}
          >
            {day}
          </CalendarDay>
        );
      }

      return days;
    };

    const monthNames = dateFormat === 'dd/mm/yyyy'
      ? ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <DateInputContainer fullWidth={fullWidth} className={className} ref={containerRef}>
        {label && (
          <StyledLabel htmlFor={inputId} disabled={disabled}>
            {label}
            {required && <span aria-label="required"> *</span>}
          </StyledLabel>
        )}

        <InputWrapper>
          <StyledDateInput
            ref={ref}
            id={inputId}
            name={name}
            type="text"
            value={inputValue}
            placeholder={dateFormat === 'dd/mm/yyyy' ? 'DD/MM/AAAA' : 'MM/DD/YYYY'}
            disabled={disabled}
            readOnly={readOnly}
            hasError={!!error}
            fullWidth={fullWidth}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            aria-label={ariaLabel || label}
            aria-invalid={!!error}
            aria-describedby={
              ariaDescribedBy ||
              [error && errorId, helperText && helperTextId].filter(Boolean).join(' ') ||
              undefined
            }
          />

          <CalendarIcon
            type="button"
            onClick={toggleCalendar}
            disabled={disabled || readOnly}
            aria-label="Open calendar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </CalendarIcon>
        </InputWrapper>

        <CalendarPopup isOpen={isCalendarOpen}>
          <CalendarHeader>
            <CalendarNavRow>
              <CalendarNavButton type="button" onClick={() => navigateMonth('prev')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </CalendarNavButton>

              <CalendarSelectors>
                <CalendarSelect
                  value={currentMonth.getUTCMonth()}
                  onChange={handleMonthChange}
                  aria-label="Select month"
                >
                  {monthNames.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </CalendarSelect>

                <CalendarSelect
                  value={currentMonth.getUTCFullYear()}
                  onChange={handleYearChange}
                  aria-label="Select year"
                >
                  {Array.from({ length: 120 }, (_, i) => {
                    const year = new Date().getUTCFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </CalendarSelect>
              </CalendarSelectors>

              <CalendarNavButton type="button" onClick={() => navigateMonth('next')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </CalendarNavButton>
            </CalendarNavRow>
          </CalendarHeader>

          <CalendarGrid>{renderCalendar()}</CalendarGrid>
        </CalendarPopup>

        {error && <ErrorMessage id={errorId} role="alert">{error}</ErrorMessage>}
        {!error && helperText && <HelperText id={helperTextId}>{helperText}</HelperText>}
      </DateInputContainer>
    );
  }
);

DateInput.displayName = 'DateInput';
