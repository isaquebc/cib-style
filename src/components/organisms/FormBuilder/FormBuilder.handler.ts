import { FormFieldConfig } from './FormBuilder';

export interface FormBuilderHandlers {
  handleSubmit: (formData: Record<string, any>) => void;
  handleChange?: (formData: Record<string, any>) => void;
  handleReset?: (formData: Record<string, any>) => void;
}

/**
 * Handle form submission
 * @param formData - The complete form data
 * @param callback - Optional callback function to execute with the form data
 */
export const handleSubmit = (
  formData: Record<string, any>,
  callback?: (formData: Record<string, any>) => void
): void => {
  if (callback) {
    callback(formData);
  }
};

/**
 * Validate a single field based on its configuration
 * @param value - The field value to validate
 * @param field - The field configuration
 * @returns Error message if validation fails, undefined otherwise
 */
export const validateField = (
  value: any,
  field: FormFieldConfig
): string | undefined => {
  // Required field validation
  if (field.required) {
    if (field.type === 'checkbox') {
      if (!value) {
        return `${field.label || field.name} is required`;
      }
    } else if (field.type === 'multiselect') {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return `${field.label || field.name} is required`;
      }
    } else {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return `${field.label || field.name} is required`;
      }
    }
  }

  // Skip other validations if value is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return undefined;
  }

  // Min/max length validation for text inputs
  if (typeof value === 'string') {
    if (field.minLength && value.length < field.minLength) {
      return `${field.label || field.name} must be at least ${field.minLength} characters`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      return `${field.label || field.name} must be at most ${field.maxLength} characters`;
    }
  }

  // Pattern validation
  if (field.pattern && typeof value === 'string') {
    const regex = new RegExp(field.pattern);
    if (!regex.test(value)) {
      return `${field.label || field.name} format is invalid`;
    }
  }

  // Email validation
  if (field.type === 'email' && typeof value === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Invalid email address';
    }
  }

  // URL validation
  if (field.type === 'url' && typeof value === 'string') {
    try {
      new URL(value);
    } catch {
      return 'Invalid URL';
    }
  }

  // Date range validation
  if (field.type === 'date' && value instanceof Date) {
    if (field.minDate && value < field.minDate) {
      return `Date must be after ${field.minDate.toLocaleDateString()}`;
    }
    if (field.maxDate && value > field.maxDate) {
      return `Date must be before ${field.maxDate.toLocaleDateString()}`;
    }
  }

  // Custom validation function
  if (field.validate) {
    return field.validate(value);
  }

  return undefined;
};

/**
 * Validate entire form
 * @param formData - The complete form data
 * @param fields - Array of field configurations
 * @returns Object with field names as keys and error messages as values
 */
export const validateForm = (
  formData: Record<string, any>,
  fields: FormFieldConfig[]
): Record<string, string> => {
  const errors: Record<string, string> = {};

  fields.forEach(field => {
    const error = validateField(formData[field.name], field);
    if (error) {
      errors[field.name] = error;
    }
  });

  return errors;
};
