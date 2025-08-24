/**
 * Page Type Registry and Definitions
 * 
 * This module defines the supported page types in v1 of the prototype builder,
 * including their templates, field mappings, and validation rules.
 */

import { z } from 'zod';
import { FieldType, PageType } from './types';

/**
 * Page type configuration defining capabilities and constraints
 */
export interface PageTypeConfig {
  /** Unique identifier for the page type */
  id: PageType;
  
  /** Display name for the page type */
  name: string;
  
  /** Description of when to use this page type */
  description: string;
  
  /** Whether this page type can have form fields */
  canHaveFields: boolean;
  
  /** Allowed field types for this page type */
  allowedFieldTypes?: FieldType[];
  
  /** Whether content/markdown is required */
  requiresContent: boolean;
  
  /** Whether this page type supports conditional routing */
  supportsConditions: boolean;
  
  /** Template requirements */
  template: {
    /** Required props for the template */
    requiredProps: string[];
    
    /** Optional props for the template */
    optionalProps: string[];
    
    /** GOV.UK Design System components used */
    govukComponents: string[];
  };
  
  /** Validation constraints specific to this page type */
  constraints: {
    /** Minimum number of fields (if applicable) */
    minFields?: number;
    
    /** Maximum number of fields (if applicable) */
    maxFields?: number;
    
    /** Maximum content length */
    maxContentLength?: number;
    
    /** Whether next page ID is required */
    requiresNextPage?: boolean;
  };
  
  /** Examples of when to use this page type */
  examples: string[];
}

/**
 * Registry of all supported page types
 */
export const pageTypeRegistry: Record<PageType, PageTypeConfig> = {
  'start': {
    id: 'start',
    name: 'Start Page',
    description: 'The entry point for a service, explaining what the service does and what users need',
    canHaveFields: false,
    requiresContent: true,
    supportsConditions: false,
    template: {
      requiredProps: ['title', 'content'],
      optionalProps: ['heading', 'metadata'],
      govukComponents: ['govuk-button']
    },
    constraints: {
      maxContentLength: 2000,
      requiresNextPage: true
    },
    examples: [
      'Service landing page with eligibility information',
      'Application start page with required documents list',
      'Information about the service before users begin'
    ]
  },

  'content': {
    id: 'content',
    name: 'Content Page',
    description: 'Static information pages providing guidance, help, or explanatory content',
    canHaveFields: false,
    requiresContent: true,
    supportsConditions: true,
    template: {
      requiredProps: ['title', 'content'],
      optionalProps: ['heading', 'metadata'],
      govukComponents: ['govuk-button', 'govuk-inset-text', 'govuk-warning-text']
    },
    constraints: {
      maxContentLength: 5000
    },
    examples: [
      'Help and guidance pages',
      'Eligibility information',
      'Privacy policy or terms',
      'Error pages (e.g., "You cannot use this service")'
    ]
  },

  'question': {
    id: 'question',
    name: 'Question Page',
    description: 'Form pages that collect information from users through various input types',
    canHaveFields: true,
    allowedFieldTypes: [
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
      'file'
    ],
    requiresContent: false,
    supportsConditions: true,
    template: {
      requiredProps: ['title', 'fields'],
      optionalProps: ['content', 'heading', 'metadata'],
      govukComponents: [
        'govuk-input',
        'govuk-textarea',
        'govuk-radios',
        'govuk-checkboxes',
        'govuk-select',
        'govuk-date-input',
        'govuk-file-upload',
        'govuk-fieldset',
        'govuk-button',
        'govuk-error-summary',
        'govuk-error-message'
      ]
    },
    constraints: {
      minFields: 1,
      maxFields: 10,
      maxContentLength: 1000
    },
    examples: [
      'Personal details collection',
      'Address information',
      'Multiple choice questions',
      'File upload pages',
      'Date selection'
    ]
  },

  'task-list': {
    id: 'task-list',
    name: 'Task List Page',
    description: 'Shows users their progress through multiple sections or tasks',
    canHaveFields: false,
    requiresContent: false,
    supportsConditions: true,
    template: {
      requiredProps: ['title'],
      optionalProps: ['content', 'heading', 'metadata'],
      govukComponents: ['govuk-task-list']
    },
    constraints: {
      maxContentLength: 1000
    },
    examples: [
      'Application progress overview',
      'Multi-section form navigation',
      'Step-by-step process tracker'
    ]
  },

  'check-answers': {
    id: 'check-answers',
    name: 'Check Your Answers',
    description: 'Summary page showing all user inputs before final submission',
    canHaveFields: false,
    requiresContent: false,
    supportsConditions: true,
    template: {
      requiredProps: ['title'],
      optionalProps: ['content', 'heading', 'metadata'],
      govukComponents: ['govuk-summary-list', 'govuk-button']
    },
    constraints: {
      maxContentLength: 500,
      requiresNextPage: true
    },
    examples: [
      'Final review before submission',
      'Application summary with change links',
      'Order confirmation details'
    ]
  },

  'confirmation': {
    id: 'confirmation',
    name: 'Confirmation Page',
    description: 'Success page shown after form submission or task completion',
    canHaveFields: false,
    requiresContent: true,
    supportsConditions: false,
    template: {
      requiredProps: ['title', 'content'],
      optionalProps: ['heading', 'metadata'],
      govukComponents: ['govuk-panel', 'govuk-button']
    },
    constraints: {
      maxContentLength: 2000
    },
    examples: [
      'Application submitted successfully',
      'Payment confirmation',
      'Account created confirmation',
      'Service request completed'
    ]
  }
};

/**
 * Field type groupings for easier categorization
 */
export const fieldTypeGroups = {
  text: {
    name: 'Text Inputs',
    description: 'Single-line text input fields',
    types: ['text', 'email', 'tel', 'password', 'number'] as FieldType[]
  },
  
  textarea: {
    name: 'Text Areas',
    description: 'Multi-line text input fields',
    types: ['textarea'] as FieldType[]
  },
  
  date: {
    name: 'Date Inputs',
    description: 'Date selection fields',
    types: ['date'] as FieldType[]
  },
  
  choice: {
    name: 'Choice Fields',
    description: 'Single or multiple choice selection',
    types: ['radios', 'checkboxes', 'select'] as FieldType[]
  },
  
  file: {
    name: 'File Upload',
    description: 'File upload and document fields',
    types: ['file'] as FieldType[]
  },
  
  hidden: {
    name: 'Hidden Fields',
    description: 'Hidden fields for data storage',
    types: ['hidden'] as FieldType[]
  }
};

/**
 * Validation schema for page type configurations
 */
export const pageTypeConfigSchema = z.object({
  id: z.enum(['start', 'content', 'question', 'task-list', 'check-answers', 'confirmation']),
  name: z.string().min(1),
  description: z.string().min(1),
  canHaveFields: z.boolean(),
  allowedFieldTypes: z.array(z.enum([
    'text', 'textarea', 'email', 'tel', 'password', 'number', 'date',
    'radios', 'checkboxes', 'select', 'file', 'hidden'
  ])).optional(),
  requiresContent: z.boolean(),
  supportsConditions: z.boolean(),
  template: z.object({
    requiredProps: z.array(z.string()),
    optionalProps: z.array(z.string()),
    govukComponents: z.array(z.string())
  }),
  constraints: z.object({
    minFields: z.number().optional(),
    maxFields: z.number().optional(),
    maxContentLength: z.number().optional(),
    requiresNextPage: z.boolean().optional()
  }),
  examples: z.array(z.string())
});

/**
 * Utility functions for working with page types
 */
export const pageTypeUtils = {
  /**
   * Get configuration for a specific page type
   */
  getConfig: (pageType: PageType): PageTypeConfig => {
    return pageTypeRegistry[pageType];
  },

  /**
   * Check if a page type can have fields
   */
  canHaveFields: (pageType: PageType): boolean => {
    return pageTypeRegistry[pageType].canHaveFields;
  },

  /**
   * Get allowed field types for a page type
   */
  getAllowedFieldTypes: (pageType: PageType): FieldType[] => {
    const config = pageTypeRegistry[pageType];
    return config.allowedFieldTypes || [];
  },

  /**
   * Check if a field type is allowed on a page type
   */
  isFieldTypeAllowed: (pageType: PageType, fieldType: FieldType): boolean => {
    const allowedTypes = pageTypeUtils.getAllowedFieldTypes(pageType);
    return allowedTypes.includes(fieldType);
  },

  /**
   * Get all page types that support a specific feature
   */
  getPageTypesByFeature: (feature: keyof PageTypeConfig): PageType[] => {
    return Object.values(pageTypeRegistry)
      .filter(config => {
        const value = config[feature];
        return typeof value === 'boolean' ? value : false;
      })
      .map(config => config.id);
  },

  /**
   * Validate page type configuration
   */
  validateConfig: (config: unknown) => {
    try {
      return {
        success: true as const,
        data: pageTypeConfigSchema.parse(config),
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
   * Get page types suitable for a specific use case
   */
  getRecommendedPageTypes: (useCase: 'collect-info' | 'show-info' | 'navigate' | 'confirm'): PageType[] => {
    switch (useCase) {
      case 'collect-info':
        return ['question'];
      case 'show-info':
        return ['start', 'content'];
      case 'navigate':
        return ['task-list'];
      case 'confirm':
        return ['check-answers', 'confirmation'];
      default:
        return Object.keys(pageTypeRegistry) as PageType[];
    }
  },

  /**
   * Get field type groups that are allowed for a page type
   */
  getAllowedFieldGroups: (pageType: PageType): Array<keyof typeof fieldTypeGroups> => {
    const allowedTypes = pageTypeUtils.getAllowedFieldTypes(pageType);
    
    return Object.entries(fieldTypeGroups)
      .filter(([_, group]) => 
        group.types.some(type => allowedTypes.includes(type))
      )
      .map(([key]) => key as keyof typeof fieldTypeGroups);
  }
};
