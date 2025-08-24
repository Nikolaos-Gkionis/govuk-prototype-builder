/**
 * GOV.UK Prototype Builder Schema
 * 
 * This package defines the core data structures and validation schemas
 * for the prototype builder application.
 */

// Export TypeScript types
export * from './types';

// Export utilities and helpers
export * from './utils';

// Export examples for testing and documentation
export * from './examples';

// Export page type registry and builders
export * from './page-types';
export * from './page-builders';
export * from './page-examples';

// Re-export commonly used schemas for convenience
export {
  projectSchema,
  projectSettingsSchema,
  dataModelSchema,
  baseEntitySchema
} from './project';

export {
  pageSchema,
  pageTypeSchema,
  pageMetadataSchema
} from './page';

export {
  fieldSchema,
  fieldTypeSchema,
  validationRuleSchema,
  fieldOptionSchema
} from './field';

export {
  conditionSchema,
  jsonLogicExpressionSchema,
  conditionHelpers
} from './condition';

export {
  // Utilities
  typeGuards,
  validators,
  generators,
  navigation,
  schema
} from './utils';
