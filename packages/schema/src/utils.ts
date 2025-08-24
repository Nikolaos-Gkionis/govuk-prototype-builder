/**
 * Utility functions and type guards for the schema package
 */

import { z } from 'zod';
import * as jsonLogic from 'json-logic-js';
import { 
  Project, 
  Page, 
  Field, 
  Condition, 
  DataModel,
  FieldType,
  PageType
} from './types';
import { 
  projectSchema,
  dataModelSchema 
} from './project';
import { pageSchema } from './page';
import { fieldSchema } from './field';
import { conditionSchema, JSONLogicExpression } from './condition';

/**
 * Type guards for runtime type checking
 */
export const typeGuards = {
  /**
   * Check if a value is a valid Project
   */
  isProject: (value: unknown): value is Project => {
    try {
      projectSchema.parse(value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if a value is a valid Page
   */
  isPage: (value: unknown): value is Page => {
    try {
      pageSchema.parse(value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if a value is a valid Field
   */
  isField: (value: unknown): value is Field => {
    try {
      fieldSchema.parse(value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if a value is a valid Condition
   */
  isCondition: (value: unknown): value is Condition => {
    try {
      conditionSchema.parse(value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if a value is a valid DataModel
   */
  isDataModel: (value: unknown): value is DataModel => {
    try {
      dataModelSchema.parse(value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if a field type requires options
   */
  isOptionField: (fieldType: FieldType): boolean => {
    return ['radios', 'checkboxes', 'select'].includes(fieldType);
  },

  /**
   * Check if a field type supports multiple values
   */
  isMultiValueField: (fieldType: FieldType): boolean => {
    return fieldType === 'checkboxes';
  },

  /**
   * Check if a page type can have fields
   */
  canHaveFields: (pageType: PageType): boolean => {
    return pageType === 'question';
  }
};

/**
 * Validation utilities
 */
export const validators = {
  /**
   * Validate a project and return detailed error information
   */
  validateProject: (project: unknown) => {
    try {
      return {
        success: true as const,
        data: projectSchema.parse(project),
        errors: null
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false as const,
          data: null,
          errors: error.errors
        };
      }
      return {
        success: false as const,
        data: null,
        errors: [{ message: 'Unknown validation error', path: [] }]
      };
    }
  },

  /**
   * Validate a JSONLogic expression
   */
  validateJSONLogicExpression: (expression: unknown) => {
    try {
      // First validate with Zod schema
      const validExpression = z.any().parse(expression);
      
      // Then test if JSONLogic can process it
      // Use empty data for validation - we just want to check syntax
      jsonLogic.apply(validExpression, {});
      
      return {
        success: true as const,
        expression: validExpression,
        errors: null
      };
    } catch (error) {
      return {
        success: false as const,
        expression: null,
        errors: [{ message: error instanceof Error ? error.message : 'Invalid JSONLogic expression' }]
      };
    }
  },

  /**
   * Evaluate a JSONLogic condition against data
   */
  evaluateCondition: (expression: JSONLogicExpression, data: Record<string, any>): boolean => {
    try {
      const result = jsonLogic.apply(expression, data);
      return Boolean(result);
    } catch (error) {
      console.warn('Error evaluating condition:', error);
      return false;
    }
  }
};

/**
 * Data generation utilities
 */
export const generators = {
  /**
   * Generate a unique ID
   */
  generateId: (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Generate a URL-friendly key from a title
   */
  generateKey: (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove duplicate hyphens
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  },

  /**
   * Generate a URL path from a key
   */
  generatePath: (key: string): string => {
    return `/${key}`;
  },

  /**
   * Create a new base entity with timestamps
   */
  createBaseEntity: (id?: string) => ({
    id: id || generators.generateId(),
    createdAt: new Date(),
    updatedAt: new Date()
  }),

  /**
   * Update the updatedAt timestamp on an entity
   */
  updateTimestamp: <T extends { updatedAt: Date }>(entity: T): T => ({
    ...entity,
    updatedAt: new Date()
  })
};

/**
 * Navigation utilities
 */
export const navigation = {
  /**
   * Find a page by ID in a project
   */
  findPageById: (project: Project, pageId: string): Page | undefined => {
    return project.pages.find(page => page.id === pageId);
  },

  /**
   * Find a page by key in a project
   */
  findPageByKey: (project: Project, key: string): Page | undefined => {
    return project.pages.find(page => page.key === key);
  },

  /**
   * Find a page by path in a project
   */
  findPageByPath: (project: Project, path: string): Page | undefined => {
    return project.pages.find(page => page.path === path);
  },

  /**
   * Get the next page for a given page and data
   */
  getNextPage: (project: Project, currentPage: Page, data: Record<string, any>): Page | undefined => {
    // First check if there are conditions
    if (currentPage.conditions && currentPage.conditions.length > 0) {
      for (const condition of currentPage.conditions) {
        if (validators.evaluateCondition(condition.expression, data)) {
          return navigation.findPageById(project, condition.toPageId);
        }
      }
    }

    // Fall back to nextPageId
    if (currentPage.nextPageId) {
      return navigation.findPageById(project, currentPage.nextPageId);
    }

    return undefined;
  },

  /**
   * Get all pages that reference a given page
   */
  getReferencingPages: (project: Project, targetPageId: string): Page[] => {
    return project.pages.filter(page => {
      // Check nextPageId
      if (page.nextPageId === targetPageId) {
        return true;
      }

      // Check conditions
      if (page.conditions) {
        return page.conditions.some(condition => condition.toPageId === targetPageId);
      }

      return false;
    });
  },

  /**
   * Check if a page is reachable from the start of the journey
   */
  isPageReachable: (project: Project, targetPageId: string): boolean => {
    const visited = new Set<string>();
    const queue: string[] = [];

    // Find start page
    const startPage = project.pages.find(page => page.type === 'start');
    if (!startPage) return false;

    queue.push(startPage.id);

    while (queue.length > 0) {
      const currentPageId = queue.shift()!;
      
      if (currentPageId === targetPageId) {
        return true;
      }

      if (visited.has(currentPageId)) {
        continue;
      }

      visited.add(currentPageId);
      const currentPage = navigation.findPageById(project, currentPageId);
      
      if (currentPage) {
        // Add next page
        if (currentPage.nextPageId && !visited.has(currentPage.nextPageId)) {
          queue.push(currentPage.nextPageId);
        }

        // Add conditional pages
        if (currentPage.conditions) {
          for (const condition of currentPage.conditions) {
            if (!visited.has(condition.toPageId)) {
              queue.push(condition.toPageId);
            }
          }
        }
      }
    }

    return false;
  }
};

/**
 * Schema version management
 */
export const schema = {
  /**
   * Current schema version
   */
  CURRENT_VERSION: '1.0.0',

  /**
   * Check if a schema version is supported
   */
  isVersionSupported: (version: string): boolean => {
    const supportedVersions = ['1.0.0'];
    return supportedVersions.includes(version);
  },

  /**
   * Migrate project data to the current schema version
   */
  migrateProject: (project: unknown) => {
    // For now, we only have one version, so just validate and return
    const result = validators.validateProject(project);
    if (!result.success) {
      throw new Error(`Invalid project data: ${result.errors?.map(e => e.message).join(', ')}`);
    }
    return result.data!;
  }
};
