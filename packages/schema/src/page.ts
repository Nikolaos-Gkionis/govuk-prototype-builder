/**
 * Zod schemas for Page-related data structures
 */

import { z } from 'zod';
import { fieldSchema } from './field';
import { conditionSchema } from './condition';

/**
 * Base entity schema with common fields
 */
const baseEntitySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  createdAt: z.date(),
  updatedAt: z.date()
});

/**
 * Supported page types
 */
export const pageTypeSchema = z.enum([
  'start',
  'content', 
  'question',
  'task-list',
  'check-answers',
  'confirmation'
]);

/**
 * Page metadata schema
 */
export const pageMetadataSchema = z.object({
  requiresAuth: z.boolean().optional().default(false),
  metaDescription: z.string().max(160, 'Meta description should be under 160 characters').optional(),
  classes: z.string().optional()
});

/**
 * Page schema
 */
export const pageSchema = baseEntitySchema.extend({
  key: z.string()
    .min(1, 'Page key is required')
    .regex(/^[a-z0-9-]+$/, 'Page key must contain only lowercase letters, numbers, and hyphens')
    .max(50, 'Page key must be less than 50 characters'),
  type: pageTypeSchema,
  path: z.string()
    .min(1, 'Page path is required')
    .regex(/^\/[a-z0-9\/-]*[a-z0-9]$/, 'Page path must start with / and contain only lowercase letters, numbers, hyphens, and forward slashes')
    .max(100, 'Page path must be less than 100 characters'),
  title: z.string().min(1, 'Page title is required').max(100, 'Page title must be less than 100 characters'),
  heading: z.string().max(100, 'Page heading must be less than 100 characters').optional(),
  content: z.string().max(2000, 'Page content must be less than 2000 characters').optional(),
  fields: z.array(fieldSchema).optional(),
  nextPageId: z.string().optional(),
  conditions: z.array(conditionSchema).optional(),
  metadata: pageMetadataSchema.optional()
}).refine((data) => {
  // Question pages should have fields
  if (data.type === 'question' && (!data.fields || data.fields.length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Question pages must have at least one field',
  path: ['fields']
}).refine((data) => {
  // Start pages should not have fields
  if (data.type === 'start' && data.fields && data.fields.length > 0) {
    return false;
  }
  return true;
}, {
  message: 'Start pages should not have fields',
  path: ['fields']
}).refine((data) => {
  // Confirmation pages should not have fields
  if (data.type === 'confirmation' && data.fields && data.fields.length > 0) {
    return false;
  }
  return true;
}, {
  message: 'Confirmation pages should not have fields',
  path: ['fields']
}).refine((data) => {
  // Ensure field names are unique within a page
  if (data.fields) {
    const fieldNames = data.fields.map(field => field.name);
    const uniqueFieldNames = new Set(fieldNames);
    return fieldNames.length === uniqueFieldNames.size;
  }
  return true;
}, {
  message: 'Field names must be unique within a page',
  path: ['fields']
}).refine((data) => {
  // Content pages should have content
  if (data.type === 'content' && (!data.content || data.content.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Content pages must have content',
  path: ['content']
});

// Type exports
export type PageType = z.infer<typeof pageTypeSchema>;
export type PageMetadata = z.infer<typeof pageMetadataSchema>;
export type Page = z.infer<typeof pageSchema>;
