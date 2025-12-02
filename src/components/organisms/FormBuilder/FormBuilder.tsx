import { useState, useEffect, FormEvent } from 'react';
import { Input } from '@atoms/Input';
import { Button } from '@atoms/Button';
import { Checkbox } from '@atoms/Checkbox';
import { DateInput } from '@atoms/DateInput';
import { InputList } from '@atoms/InputList';
import { MultiSelect } from '@atoms/MultiSelect';
import {
  FormContainer,
  FormFieldsContainer,
  FormField,
  FormButtonsContainer,
} from './FormBuilder.style';
import {
  handleSubmit as handleSubmitUtil,
  validateField,
  FormBuilderHandlers,
} from './FormBuilder.handler';

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'checkbox' | 'select' | 'multiselect';

export interface FormFieldConfig {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;

  // For date fields
  locale?: string;
  minDate?: Date;
  maxDate?: Date;

  // For select/multiselect fields
  options?: Array<string | { value: string; label?: string }>;
  maxSelections?: number;
  other?: string; // For multiselect: enables "Other" option with custom label

  // Validation
  validate?: (value: any) => string | undefined; // Returns error message or undefined

  // Input constraints
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export interface FormBuilderProps extends FormBuilderHandlers {
  fields: FormFieldConfig[];
  defaultValues?: Record<string, any>;
  submitButtonText?: string;
  submitButtonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  resetButtonText?: string;
  showResetButton?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * FormBuilder component - Dynamically renders a complete form based on configuration
 *
 * @example
 * ```tsx
 * <FormBuilder
 *   fields={[
 *     { name: 'email', type: 'email', label: 'Email', required: true, validate: (val) => !val.includes('@') ? 'Invalid email' : undefined },
 *     { name: 'password', type: 'password', label: 'Password', required: true },
 *     { name: 'terms', type: 'checkbox', label: 'I agree to terms' },
 *   ]}
 *   defaultValues={{ email: 'user@example.com' }}
 *   handleSubmit={(data) => console.log('Form submitted:', data)}
 * />
 * ```
 */
export const FormBuilder = ({
  fields,
  defaultValues = {},
  submitButtonText = 'Submit',
  submitButtonVariant = 'primary',
  resetButtonText = 'Reset',
  showResetButton = false,
  fullWidth = false,
  disabled = false,
  className,
  handleSubmit: handleSubmitProp,
  handleChange: handleChangeProp,
  handleReset: handleResetProp,
}: FormBuilderProps) => {
  // Initialize form state with default values
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    fields.forEach(field => {
      if (defaultValues[field.name] !== undefined) {
        initial[field.name] = defaultValues[field.name];
      } else {
        // Set default values based on field type
        if (field.type === 'checkbox') {
          initial[field.name] = false;
        } else if (field.type === 'multiselect') {
          initial[field.name] = [];
        } else {
          initial[field.name] = '';
        }
      }
    });
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Update form data when defaultValues change
  useEffect(() => {
    setFormData(prev => ({ ...prev, ...defaultValues }));
  }, [defaultValues]);

  const handleFieldChange = (fieldName: string, value: any) => {
    const newFormData = { ...formData, [fieldName]: value };
    setFormData(newFormData);

    // Clear error when user changes the field
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }

    // Call onChange handler if provided
    if (handleChangeProp) {
      handleChangeProp(newFormData);
    }
  };

  const handleFieldBlur = (field: FormFieldConfig) => {
    setTouched(prev => ({ ...prev, [field.name]: true }));

    // Run validation on blur
    const error = validateField(formData[field.name], field);
    if (error) {
      setErrors(prev => ({ ...prev, [field.name]: error }));
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      const error = validateField(formData[field.name], field);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    fields.forEach(field => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit the form
    handleSubmitUtil(formData, handleSubmitProp);
  };

  const handleFormReset = () => {
    // Reset to default values
    const resetData: Record<string, any> = {};
    fields.forEach(field => {
      if (defaultValues[field.name] !== undefined) {
        resetData[field.name] = defaultValues[field.name];
      } else {
        if (field.type === 'checkbox') {
          resetData[field.name] = false;
        } else if (field.type === 'multiselect') {
          resetData[field.name] = [];
        } else {
          resetData[field.name] = '';
        }
      }
    });

    setFormData(resetData);
    setErrors({});
    setTouched({});

    if (handleResetProp) {
      handleResetProp(resetData);
    }
  };

  const renderField = (field: FormFieldConfig) => {
    const commonProps = {
      key: field.name,
      name: field.name,
      label: field.label,
      disabled: disabled || field.disabled,
      required: field.required,
      fullWidth: field.fullWidth ?? true,
      error: touched[field.name] ? errors[field.name] : undefined,
      helperText: !errors[field.name] ? field.helperText : undefined,
    };

    switch (field.type) {
      case 'checkbox':
        return (
          <FormField key={field.name}>
            <Checkbox
              {...commonProps}
              checked={formData[field.name] || false}
              handleChange={(checked) => handleFieldChange(field.name, checked)}
              handleBlur={() => handleFieldBlur(field)}
            />
          </FormField>
        );

      case 'date':
        return (
          <FormField key={field.name}>
            <DateInput
              {...commonProps}
              value={formData[field.name] || null}
              locale={field.locale}
              minDate={field.minDate}
              maxDate={field.maxDate}
              handleChange={(date) => handleFieldChange(field.name, date)}
              handleBlur={() => handleFieldBlur(field)}
            />
          </FormField>
        );

      case 'select':
        return (
          <FormField key={field.name}>
            <InputList
              {...commonProps}
              value={formData[field.name] || ''}
              placeholder={field.placeholder}
              options={(field.options || []) as any}
              handleChange={(value) => handleFieldChange(field.name, value)}
              handleBlur={() => handleFieldBlur(field)}
            />
          </FormField>
        );

      case 'multiselect':
        return (
          <FormField key={field.name}>
            <MultiSelect
              {...commonProps}
              value={formData[field.name] || []}
              placeholder={field.placeholder}
              options={(field.options || []) as any}
              maxSelections={field.maxSelections}
              other={field.other}
              handleChange={(values) => handleFieldChange(field.name, values)}
              handleBlur={() => handleFieldBlur(field)}
            />
          </FormField>
        );

      default:
        // text, email, password, number, tel, url, search
        return (
          <FormField key={field.name}>
            <Input
              {...commonProps}
              type={field.type as any}
              value={formData[field.name] || ''}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              minLength={field.minLength}
              pattern={field.pattern}
              handleChange={(value) => handleFieldChange(field.name, value)}
              handleBlur={() => handleFieldBlur(field)}
            />
          </FormField>
        );
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  const isSubmitDisabled = disabled || hasErrors;

  return (
    <FormContainer fullWidth={fullWidth} className={className} onSubmit={handleFormSubmit}>
      <FormFieldsContainer>
        {fields.map(field => renderField(field))}
      </FormFieldsContainer>

      <FormButtonsContainer>
        <Button
          type="submit"
          variant={submitButtonVariant}
          disabled={isSubmitDisabled}
          fullWidth={fullWidth}
        >
          {submitButtonText}
        </Button>

        {showResetButton && (
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            fullWidth={fullWidth}
            handleClick={handleFormReset}
          >
            {resetButtonText}
          </Button>
        )}
      </FormButtonsContainer>
    </FormContainer>
  );
};

FormBuilder.displayName = 'FormBuilder';
