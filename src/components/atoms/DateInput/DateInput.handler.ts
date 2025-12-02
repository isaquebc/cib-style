import { FocusEvent } from 'react';

export interface DateInputHandlers {
  handleChange?: (date: Date | null, formattedValue: string) => void;
  handleBlur?: (date: Date | null, formattedValue: string, event: FocusEvent<HTMLInputElement>) => void;
  handleFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  handleCalendarOpen?: () => void;
  handleCalendarClose?: () => void;
}

/**
 * Handle change event for date input
 * @param date - The date value in UTC
 * @param formattedValue - The formatted date string
 * @param callback - Optional callback function to execute
 */
export const handleChange = (
  date: Date | null,
  formattedValue: string,
  callback?: (date: Date | null, formattedValue: string) => void
): void => {
  if (callback) {
    callback(date, formattedValue);
  }
};

/**
 * Handle blur event for date input
 * @param date - The date value in UTC
 * @param formattedValue - The formatted date string
 * @param event - The blur event
 * @param callback - Optional callback function to execute
 */
export const handleBlur = (
  date: Date | null,
  formattedValue: string,
  event: FocusEvent<HTMLInputElement>,
  callback?: (date: Date | null, formattedValue: string, event: FocusEvent<HTMLInputElement>) => void
): void => {
  if (callback) {
    callback(date, formattedValue, event);
  }
};

/**
 * Handle focus event for date input
 * @param event - The focus event
 * @param callback - Optional callback function to execute
 */
export const handleFocus = (
  event: FocusEvent<HTMLInputElement>,
  callback?: (event: FocusEvent<HTMLInputElement>) => void
): void => {
  if (callback) {
    callback(event);
  }
};

/**
 * Parse date string based on format
 * @param value - The date string to parse
 * @param format - The date format (dd/mm/yyyy or mm/dd/yyyy)
 * @returns Date object in UTC or null if invalid
 */
export const parseDate = (value: string, format: 'dd/mm/yyyy' | 'mm/dd/yyyy' = 'dd/mm/yyyy'): Date | null => {
  if (!value || value.length !== 10) return null;

  const parts = value.split('/');
  if (parts.length !== 3) return null;

  let day: number, month: number, year: number;

  if (format === 'dd/mm/yyyy') {
    day = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    year = parseInt(parts[2], 10);
  } else {
    month = parseInt(parts[0], 10) - 1;
    day = parseInt(parts[1], 10);
    year = parseInt(parts[2], 10);
  }

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (month < 0 || month > 11) return null;
  if (day < 1 || day > 31) return null;
  if (year < 1000 || year > 9999) return null;

  // Create date in UTC
  const date = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

  // Validate the date is valid
  if (date.getUTCDate() !== day || date.getUTCMonth() !== month || date.getUTCFullYear() !== year) {
    return null;
  }

  return date;
};

/**
 * Format date to string based on format
 * @param date - The date object (assumed to be in UTC)
 * @param format - The date format (dd/mm/yyyy or mm/dd/yyyy)
 * @returns Formatted date string
 */
export const formatDate = (date: Date | null, format: 'dd/mm/yyyy' | 'mm/dd/yyyy' = 'dd/mm/yyyy'): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear().toString();

  if (format === 'dd/mm/yyyy') {
    return `${day}/${month}/${year}`;
  } else {
    return `${month}/${day}/${year}`;
  }
};

/**
 * Detect if user is in Brazil based on locale
 * @returns true if Brazilian locale detected
 */
export const isBrazilianLocale = (): boolean => {
  const locale = navigator.language || 'en-US';
  return locale.toLowerCase().startsWith('pt-br') || locale.toLowerCase() === 'pt';
};

/**
 * Get date format based on locale
 * @param locale - Optional locale override
 * @returns Date format string
 */
export const getDateFormat = (locale?: string): 'dd/mm/yyyy' | 'mm/dd/yyyy' => {
  const currentLocale = locale || navigator.language || 'en-US';

  if (currentLocale.toLowerCase().startsWith('pt') ||
      currentLocale.toLowerCase().startsWith('es') ||
      currentLocale.toLowerCase().startsWith('fr') ||
      currentLocale.toLowerCase().startsWith('de') ||
      currentLocale.toLowerCase().startsWith('it')) {
    return 'dd/mm/yyyy';
  }

  return 'mm/dd/yyyy';
};
