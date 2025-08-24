/**
 * Zod schemas for Condition-related data structures and JSONLogic integration
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
 * JSONLogic expression schema
 * 
 * JSONLogic uses nested objects to represent logical operations.
 * Examples:
 * - {"==": [{"var": "field1"}, "value"]} 
 * - {"and": [{"==": [{"var": "field1"}, "value"]}, {"!=": [{"var": "field2"}, "other"]}]}
 * - {"in": [{"var": "field3"}, ["option1", "option2"]]}
 */
export const jsonLogicExpressionSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    // Basic value types
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(z.any()),
    
    // JSONLogic operations
    z.object({
      // Comparison operators
      '==': z.array(z.any()).length(2).optional(),
      '!=': z.array(z.any()).length(2).optional(),
      '>': z.array(z.any()).length(2).optional(),
      '>=': z.array(z.any()).length(2).optional(),
      '<': z.array(z.any()).length(2).optional(),
      '<=': z.array(z.any()).length(2).optional(),
      
      // Logical operators
      'and': z.array(jsonLogicExpressionSchema).optional(),
      'or': z.array(jsonLogicExpressionSchema).optional(),
      '!': jsonLogicExpressionSchema.optional(),
      
      // Data access
      'var': z.union([z.string(), z.array(z.union([z.string(), z.any()]))]).optional(),
      
      // Array operations
      'in': z.array(z.any()).length(2).optional(),
      'map': z.array(z.any()).optional(),
      'filter': z.array(z.any()).optional(),
      'some': z.array(z.any()).optional(),
      'all': z.array(z.any()).optional(),
      
      // String operations
      'cat': z.array(z.any()).optional(),
      'substr': z.array(z.any()).optional(),
      
      // Arithmetic operations
      '+': z.array(z.any()).optional(),
      '-': z.array(z.any()).optional(),
      '*': z.array(z.any()).optional(),
      '/': z.array(z.any()).optional(),
      '%': z.array(z.any()).optional(),
      
      // Conditional
      'if': z.array(z.any()).optional(),
      
      // Missing/empty checks
      'missing': z.array(z.string()).optional(),
      'missing_some': z.array(z.any()).optional(),
      
      // Type conversion
      'to_number': z.any().optional(),
      'to_string': z.any().optional(),
    }).refine((obj) => {
      // Ensure exactly one operation is specified
      const operations = Object.keys(obj);
      return operations.length === 1;
    }, {
      message: 'JSONLogic expression must have exactly one operation'
    })
  ])
);

/**
 * Condition schema
 */
export const conditionSchema = baseEntitySchema.extend({
  expression: jsonLogicExpressionSchema,
  toPageId: z.string().min(1, 'Target page ID is required'),
  description: z.string().max(200, 'Description must be less than 200 characters').optional()
});

/**
 * Helper schemas for common JSONLogic patterns
 */

/**
 * Simple equality condition: field equals value
 */
export const equalityConditionSchema = z.object({
  '==': z.tuple([
    z.object({ var: z.string() }),
    z.any()
  ])
});

/**
 * Multiple choice condition: field is one of several values
 */
export const inConditionSchema = z.object({
  'in': z.tuple([
    z.object({ var: z.string() }),
    z.array(z.any())
  ])
});

/**
 * And condition: multiple conditions must all be true
 */
export const andConditionSchema = z.object({
  'and': z.array(jsonLogicExpressionSchema).min(2)
});

/**
 * Or condition: at least one condition must be true
 */
export const orConditionSchema = z.object({
  'or': z.array(jsonLogicExpressionSchema).min(2)
});

/**
 * Helper function to create common condition patterns
 */
export const conditionHelpers = {
  /**
   * Create a simple equality condition
   */
  equals: (fieldName: string, value: any) => ({
    '==': [{ var: fieldName }, value]
  }),
  
  /**
   * Create a condition checking if field is one of multiple values
   */
  isOneOf: (fieldName: string, values: any[]) => ({
    'in': [{ var: fieldName }, values]
  }),
  
  /**
   * Create an AND condition
   */
  and: (...conditions: any[]) => ({
    'and': conditions
  }),
  
  /**
   * Create an OR condition
   */
  or: (...conditions: any[]) => ({
    'or': conditions
  }),
  
  /**
   * Create a NOT condition
   */
  not: (condition: any) => ({
    '!': condition
  }),
  
  /**
   * Check if field is missing/empty
   */
  isMissing: (fieldName: string) => ({
    'missing': [fieldName]
  }),
  
  /**
   * Check if field has any value
   */
  hasValue: (fieldName: string) => ({
    '!': { 'missing': [fieldName] }
  })
};

// Type exports  
export type JSONLogicExpression = z.infer<typeof jsonLogicExpressionSchema>;
export type Condition = z.infer<typeof conditionSchema>;
export type EqualityCondition = z.infer<typeof equalityConditionSchema>;
export type InCondition = z.infer<typeof inConditionSchema>;
export type AndCondition = z.infer<typeof andConditionSchema>;
export type OrCondition = z.infer<typeof orConditionSchema>;
