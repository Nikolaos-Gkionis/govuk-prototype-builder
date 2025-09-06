// Page types supported by the prototype builder
export type PageType = 
  | 'start'
  | 'content' 
  | 'question'
  | 'check-answers'
  | 'confirmation'
  | 'service-navigation';

// Field types for question pages
export type FieldType = 
  | 'text'
  | 'textarea'
  | 'radios'
  | 'checkboxes'
  | 'date'
  | 'file';

// Field validation rules
export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
}

// Field options for radio/checkbox fields
export interface FieldOption {
  value: string;
  text: string;
  hint?: string;
  conditional?: {
    show: boolean;
    content: string;
  };
}

// Field definition
export interface Field {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  hint?: string;
  options?: FieldOption[];
  validation?: FieldValidation;
}

// CTA (Call-to-Action) button configuration
export interface PageCTA {
  text: string;
  type: 'primary' | 'secondary' | 'warning' | 'start';
  action: 'continue' | 'start' | 'submit' | 'back' | 'custom';
  nextPageId?: string; // For continue/submit actions
}

// Page definition
export interface Page {
  id: string;
  key: string;
  type: PageType;
  path: string;
  title: string;
  fields: Field[];
  next: string[]; // IDs of next pages
  conditions: Condition[];
  cta?: PageCTA; // Call-to-action button configuration
  metadata: Record<string, any>;
}

// Condition for branching logic
export interface Condition {
  id: string;
  expression: JSONLogicExpression;
  toPageId: string;
}

// JSONLogic expression for conditions
export interface JSONLogicExpression {
  [key: string]: any;
}

// Project definition
export interface Project {
  id: string;
  name: string;
  description?: string;
  startType?: 'blank' | 'template';
  govukFrontendVersion: string;
  pages: Page[];
  settings: ProjectSettings;
}

// Project settings
export interface ProjectSettings {
  serviceName: string;
  phase: 'alpha' | 'beta' | 'live';
  startPage: string;
  sessionSecret: string;
  showPhaseBanner?: boolean;
}

// Data model for user answers
export interface DataModel {
  [fieldName: string]: any;
}
