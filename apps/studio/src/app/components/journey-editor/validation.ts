// Validation utilities for form fields

export interface ValidationError {
  field: string;
  message: string;
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'email' | 'url' | 'custom';
}

export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  customMessage?: string;
}

export interface FormField {
  id: string;
  type: string;
  label: string;
  hint?: string;
  required?: boolean;
  validation?: FieldValidation;
  options?: Array<{ value: string; text: string }>;
}

// Validation functions
export const validateField = (field: FormField, value: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Required field validation
  if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    errors.push({
      field: field.id,
      message: field.validation?.customMessage || `${field.label} is required`,
      type: 'required'
    });
  }

  // Skip other validations if field is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return errors;
  }

  const stringValue = String(value);

  // Length validations
  if (field.validation?.minLength && stringValue.length < field.validation.minLength) {
    errors.push({
      field: field.id,
      message: `${field.label} must be at least ${field.validation.minLength} characters long`,
      type: 'minLength'
    });
  }

  if (field.validation?.maxLength && stringValue.length > field.validation.maxLength) {
    errors.push({
      field: field.id,
      message: `${field.label} must be no more than ${field.validation.maxLength} characters long`,
      type: 'maxLength'
    });
  }

  // Pattern validation
  if (field.validation?.pattern) {
    try {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(stringValue)) {
        errors.push({
          field: field.id,
          message: field.validation?.customMessage || `${field.label} format is invalid`,
          type: 'pattern'
        });
      }
    } catch (e) {
      // Invalid regex pattern
      errors.push({
        field: field.id,
        message: 'Invalid validation pattern',
        type: 'pattern'
      });
    }
  }

  // Numeric validations
  if (field.type === 'number') {
    const numValue = parseFloat(stringValue);
    if (isNaN(numValue)) {
      errors.push({
        field: field.id,
        message: `${field.label} must be a valid number`,
        type: 'custom'
      });
    } else {
      if (field.validation?.min !== undefined && numValue < field.validation.min) {
        errors.push({
          field: field.id,
          message: `${field.label} must be at least ${field.validation.min}`,
          type: 'min'
        });
      }

      if (field.validation?.max !== undefined && numValue > field.validation.max) {
        errors.push({
          field: field.id,
          message: `${field.label} must be no more than ${field.validation.max}`,
          type: 'max'
        });
      }
    }
  }

  // Email validation
  if (field.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(stringValue)) {
      errors.push({
        field: field.id,
        message: `${field.label} must be a valid email address`,
        type: 'email'
      });
    }
  }

  // URL validation
  if (field.type === 'url') {
    try {
      new URL(stringValue);
    } catch (e) {
      errors.push({
        field: field.id,
        message: `${field.label} must be a valid URL`,
        type: 'url'
      });
    }
  }

  return errors;
};

// Validate all fields in a form
export const validateForm = (fields: FormField[], formData: Record<string, any>): ValidationError[] => {
  const errors: ValidationError[] = [];

  fields.forEach(field => {
    const fieldErrors = validateField(field, formData[field.id]);
    errors.push(...fieldErrors);
  });

  return errors;
};

// Get validation message for a specific field
export const getFieldValidationMessage = (field: FormField): string | null => {
  if (!field.validation) return null;

  const messages: string[] = [];

  if (field.required) {
    messages.push('This field is required');
  }

  if (field.validation.minLength) {
    messages.push(`Minimum ${field.validation.minLength} characters`);
  }

  if (field.validation.maxLength) {
    messages.push(`Maximum ${field.validation.maxLength} characters`);
  }

  if (field.validation.pattern) {
    messages.push('Must match the specified pattern');
  }

  if (field.type === 'number') {
    if (field.validation.min !== undefined) {
      messages.push(`Minimum value: ${field.validation.min}`);
    }
    if (field.validation.max !== undefined) {
      messages.push(`Maximum value: ${field.validation.max}`);
    }
  }

  if (field.type === 'email') {
    messages.push('Must be a valid email address');
  }

  if (field.type === 'url') {
    messages.push('Must be a valid URL');
  }

  return messages.length > 0 ? messages.join(', ') : null;
};

// Common validation patterns
export const VALIDATION_PATTERNS = {
  UK_PHONE: '^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$',
  UK_POSTCODE: '^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$',
  NATIONAL_INSURANCE: '^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D]{1}$',
  UTR: '^[0-9]{10}$',
  VAT_NUMBER: '^[0-9]{9}$|^[0-9]{12}$',
  ONLY_LETTERS: '^[A-Za-z\\s]+$',
  ONLY_NUMBERS: '^[0-9]+$',
  ALPHANUMERIC: '^[A-Za-z0-9]+$'
};

// Predefined validation rules for common field types
export const COMMON_VALIDATIONS = {
  NAME: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: VALIDATION_PATTERNS.ONLY_LETTERS,
    customMessage: 'Name must contain only letters and spaces'
  },
  EMAIL: {
    required: true,
    maxLength: 254
  },
  PHONE: {
    required: true,
    pattern: VALIDATION_PATTERNS.UK_PHONE,
    customMessage: 'Enter a valid UK phone number'
  },
  POSTCODE: {
    required: true,
    pattern: VALIDATION_PATTERNS.UK_POSTCODE,
    customMessage: 'Enter a valid UK postcode'
  },
  NATIONAL_INSURANCE: {
    required: true,
    pattern: VALIDATION_PATTERNS.NATIONAL_INSURANCE,
    customMessage: 'Enter a valid National Insurance number'
  }
};
