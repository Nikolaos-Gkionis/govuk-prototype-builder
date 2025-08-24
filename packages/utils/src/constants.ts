// Shared constants used across the prototype builder

export const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  TEXTAREA: 'textarea',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
  DATE: 'date',
  FILE: 'file',
  PHONE: 'phone',
  NUMBER: 'number',
  PASSWORD: 'password'
} as const;

export const PAGE_TYPES = {
  START: 'start',
  CONTENT: 'content',
  QUESTION: 'question',
  TASK_LIST: 'task-list',
  CHECK_ANSWERS: 'check-answers',
  CONFIRMATION: 'confirmation'
} as const;

export const VALIDATION_RULES = {
  REQUIRED: 'required',
  MIN_LENGTH: 'minLength',
  MAX_LENGTH: 'maxLength',
  PATTERN: 'pattern',
  MIN: 'min',
  MAX: 'max',
  EMAIL: 'email',
  DATE: 'date',
  POSTCODE: 'postcode',
  PHONE: 'phone'
} as const;

export const DEFAULT_CONFIG = {
  PROJECT_NAME_MAX_LENGTH: 100,
  FIELD_LABEL_MAX_LENGTH: 200,
  PAGE_TITLE_MAX_LENGTH: 150,
  DESCRIPTION_MAX_LENGTH: 500
} as const;
