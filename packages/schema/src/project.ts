/**
 * Zod schemas for Project-related data structures
 */

import { z } from 'zod';
import { pageSchema } from './page';

/**
 * Schema for project settings
 */
export const projectSettingsSchema = z.object({
  govukFrontendVersion: z.string().min(1, 'GOV.UK Frontend version is required'),
  serviceName: z.string().min(1, 'Service name is required'),
  serviceUrl: z.string().url().optional(),
  phase: z.enum(['alpha', 'beta', 'live']).optional(),
  showPhaseBanner: z.boolean().optional().default(false),
  feedbackUrl: z.string().url().optional(),
  navigation: z.array(z.object({
    text: z.string().min(1),
    href: z.string().min(1),
    active: z.boolean().optional().default(false)
  })).optional(),
  footerLinks: z.array(z.object({
    text: z.string().min(1),
    href: z.string().min(1)
  })).optional()
});

/**
 * Base entity schema with common fields
 */
export const baseEntitySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  createdAt: z.date(),
  updatedAt: z.date()
});

/**
 * Schema for the main project definition
 */
export const projectSchema = baseEntitySchema.extend({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  settings: projectSettingsSchema,
  pages: z.array(pageSchema).min(1, 'Project must have at least one page'),
  schemaVersion: z.string().min(1, 'Schema version is required')
}).refine((data) => {
  // Ensure all page IDs are unique
  const pageIds = data.pages.map(page => page.id);
  const uniquePageIds = new Set(pageIds);
  return pageIds.length === uniquePageIds.size;
}, {
  message: 'All page IDs must be unique',
  path: ['pages']
}).refine((data) => {
  // Ensure all page keys are unique  
  const pageKeys = data.pages.map(page => page.key);
  const uniquePageKeys = new Set(pageKeys);
  return pageKeys.length === uniquePageKeys.size;
}, {
  message: 'All page keys must be unique',
  path: ['pages']
}).refine((data) => {
  // Ensure referenced nextPageIds and condition toPageIds exist
  const pageIds = new Set(data.pages.map(page => page.id));
  
  for (const page of data.pages) {
    // Check nextPageId exists
    if (page.nextPageId && !pageIds.has(page.nextPageId)) {
      return false;
    }
    
    // Check condition toPageIds exist
    if (page.conditions) {
      for (const condition of page.conditions) {
        if (!pageIds.has(condition.toPageId)) {
          return false;
        }
      }
    }
  }
  
  return true;
}, {
  message: 'All referenced page IDs must exist in the project',
  path: ['pages']
});

/**
 * Schema for data model (user session data)
 */
export const dataModelSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  answers: z.record(z.string(), z.any()),
  lastUpdated: z.date(),
  currentPageId: z.string().optional(),
  completedPages: z.array(z.string())
});

// Type exports
export type ProjectSettings = z.infer<typeof projectSettingsSchema>;
export type BaseEntity = z.infer<typeof baseEntitySchema>;
export type Project = z.infer<typeof projectSchema>;
export type DataModel = z.infer<typeof dataModelSchema>;
