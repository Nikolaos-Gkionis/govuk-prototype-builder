/**
 * Core TypeScript types for the GOV.UK Prototype Builder
 * 
 * This file defines the fundamental data structures used throughout
 * the application for projects, pages, fields, and conditions.
 */

/**
 * Base interface for all entities with unique identifiers
 */
export interface BaseEntity {
  /** Unique identifier for the entity */
  id: string;
  /** Timestamp when the entity was created */
  createdAt: Date;
  /** Timestamp when the entity was last updated */
  updatedAt: Date;
}

/**
 * Supported field types in the prototype builder
 */
export type FieldType = 
  | 'text'
  | 'textarea' 
  | 'email'
  | 'tel'
  | 'password'
  | 'number'
  | 'date'
  | 'radios'
  | 'checkboxes'
  | 'select'
  | 'file'
  | 'hidden';

/**
 * Supported page types in the prototype builder
 */
export type PageType = 
  | 'start'
  | 'content'
  | 'question'
  | 'task-list'
  | 'check-answers'
  | 'confirmation';

/**
 * Validation rules for form fields
 */
export interface ValidationRule {
  /** Type of validation rule */
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'email' | 'tel';
  /** Value for the validation rule (e.g., minimum length, regex pattern) */
  value?: string | number;
  /** Custom error message for this validation rule */
  message: string;
}

/**
 * Option for radio buttons, checkboxes, or select fields
 */
export interface FieldOption {
  /** Unique value for this option */
  value: string;
  /** Display text for this option */
  text: string;
  /** Optional hint text */
  hint?: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Whether this option is selected by default */
  selected?: boolean;
}

/**
 * Field definition for forms
 */
export interface Field extends BaseEntity {
  /** Internal name used for form submission and data storage */
  name: string;
  /** Type of field (text, radios, etc.) */
  type: FieldType;
  /** Label text displayed to users */
  label: string;
  /** Optional hint text */
  hint?: string;
  /** Whether this field is required */
  required?: boolean;
  /** Validation rules for this field */
  validation?: ValidationRule[];
  /** Options for radio/checkbox/select fields */
  options?: FieldOption[];
  /** Default value for the field */
  defaultValue?: string | string[];
  /** Additional classes for styling */
  classes?: string;
  /** Attributes to add to the field element */
  attributes?: Record<string, string>;
}

/**
 * Condition for page routing using JSONLogic
 */
export interface Condition extends BaseEntity {
  /** JSONLogic expression for the condition */
  expression: any; // JSONLogic expression object
  /** Page ID to route to if condition is true */
  toPageId: string;
  /** Human-readable description of the condition */
  description?: string;
}

/**
 * Page definition
 */
export interface Page extends BaseEntity {
  /** Unique key for the page (used in URLs) */
  key: string;
  /** Type of page */
  type: PageType;
  /** URL path for this page */
  path: string;
  /** Page title */
  title: string;
  /** Page heading (defaults to title if not provided) */
  heading?: string;
  /** Optional page description or content */
  content?: string;
  /** Fields on this page (for question pages) */
  fields?: Field[];
  /** Default next page (for linear flow) */
  nextPageId?: string;
  /** Conditional routing rules */
  conditions?: Condition[];
  /** Additional metadata for the page */
  metadata?: {
    /** Whether this page requires authentication */
    requiresAuth?: boolean;
    /** SEO meta description */
    metaDescription?: string;
    /** Custom CSS classes */
    classes?: string;
  };
}

/**
 * Project settings
 */
export interface ProjectSettings {
  /** GOV.UK Frontend version to use */
  govukFrontendVersion: string;
  /** Service name */
  serviceName: string;
  /** Service URL */
  serviceUrl?: string;
  /** Phase (alpha, beta, live) */
  phase?: 'alpha' | 'beta' | 'live';
  /** Whether to show phase banner */
  showPhaseBanner?: boolean;
  /** Feedback URL for phase banner */
  feedbackUrl?: string;
  /** Custom header navigation items */
  navigation?: Array<{
    text: string;
    href: string;
    active?: boolean;
  }>;
  /** Custom footer links */
  footerLinks?: Array<{
    text: string;
    href: string;
  }>;
}

/**
 * Main project definition
 */
export interface Project extends BaseEntity {
  /** Project name */
  name: string;
  /** Project description */
  description?: string;
  /** Project settings */
  settings: ProjectSettings;
  /** Pages in the project */
  pages: Page[];
  /** Version of the schema used */
  schemaVersion: string;
}

/**
 * Data model for storing user answers
 */
export interface DataModel {
  /** Session ID */
  sessionId: string;
  /** User answers keyed by field name */
  answers: Record<string, any>;
  /** Timestamp of last update */
  lastUpdated: Date;
  /** Current page the user is on */
  currentPageId?: string;
  /** Pages the user has completed */
  completedPages: string[];
}
