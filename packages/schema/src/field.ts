/**
 * Zod schemas for Field-related data structures
 */

import { z } from 'zod';

/**
 * Base entity schema with common fields
 */
const baseEntitySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  createdAt: z.date(),
  updatedAt: z.date()
});

/**
 * Supported field types
 */
export const fieldTypeSchema = z.enum([
  'text',
  'textarea', 
  'email',
  'tel',
  'password',
  'number',
  'date',
  'radios',
  'checkboxes',
  'select',
  'file',
  'hidden'
]);

/**
 * Validation rule schema
 */
export const validationRuleSchema = z.object({
  type: z.enum(['required', 'minLength', 'maxLength', 'pattern', 'min', 'max', 'email', 'tel']),
  value: z.union([z.string(), z.number()]).optional(),
  message: z.string().min(1, 'Validation message is required')
}).refine((data) => {
  // Require value for certain validation types
  const typesRequiringValue = ['minLength', 'maxLength', 'pattern', 'min', 'max'];
  if (typesRequiringValue.includes(data.type) && data.value === undefined) {
    return false;
  }
  return true;
}, {
  message: 'Value is required for this validation type',
  path: ['value']
}).refine((data) => {
  // Validate number types have number values
  const numberTypes = ['minLength', 'maxLength', 'min', 'max'];
  if (numberTypes.includes(data.type) && typeof data.value !== 'number') {
    return false;
  }
  return true;
}, {
  message: 'Numeric validation types must have number values',
  path: ['value']
});

/**
 * Field option schema (for radios, checkboxes, select)
 */
export const fieldOptionSchema = z.object({
  value: z.string().min(1, 'Option value is required'),
  text: z.string().min(1, 'Option text is required'),
  hint: z.string().optional(),
  disabled: z.boolean().optional().default(false),
  selected: z.boolean().optional().default(false)
});

/**
 * Field schema
 */
export const fieldSchema = baseEntitySchema.extend({
  name: z.string().min(1, 'Field name is required').regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, 'Field name must start with a letter and contain only letters, numbers, underscores, and hyphens'),
  type: fieldTypeSchema,
  label: z.string().min(1, 'Field label is required'),
  hint: z.string().optional(),
  required: z.boolean().optional().default(false),
  validation: z.array(validationRuleSchema).optional(),
  options: z.array(fieldOptionSchema).optional(),
  defaultValue: z.union([z.string(), z.array(z.string())]).optional(),
  classes: z.string().optional(),
  attributes: z.record(z.string(), z.string()).optional()
}).refine((data) => {
  // Require options for radios, checkboxes, and select fields
  const optionFields = ['radios', 'checkboxes', 'select'];
  if (optionFields.includes(data.type) && (!data.options || data.options.length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Options are required for radios, checkboxes, and select fields',
  path: ['options']
}).refine((data) => {
  // Ensure option values are unique within a field
  if (data.options) {
    const values = data.options.map(option => option.value);
    const uniqueValues = new Set(values);
    return values.length === uniqueValues.size;
  }
  return true;
}, {
  message: 'Option values must be unique within a field',
  path: ['options']
}).refine((data) => {
  // Validate default value matches field type
  if (data.defaultValue !== undefined) {
    const multiValueFields = ['checkboxes'];
    if (multiValueFields.includes(data.type) && !Array.isArray(data.defaultValue)) {
      return false;
    }
    if (!multiValueFields.includes(data.type) && Array.isArray(data.defaultValue)) {
      return false;
    }
  }
  return true;
}, {
  message: 'Default value type must match field type',
  path: ['defaultValue']
});

// Type exports
export type FieldType = z.infer<typeof fieldTypeSchema>;
export type ValidationRule = z.infer<typeof validationRuleSchema>;
export type FieldOption = z.infer<typeof fieldOptionSchema>;
export type Field = z.infer<typeof fieldSchema>;
