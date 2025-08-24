// Utilities package for shared helper functions and constants
// This package will contain common utilities used across the prototype builder.

export * from './constants';
export * from './helpers';
export * from './validation';

// Re-export commonly used utilities for convenience
export { generateId, slugify, formatDate } from './helpers';
export { validateEmail, validatePostcode, validatePhoneNumber } from './validation';
