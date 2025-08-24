/**
 * Page Builder Functions
 * 
 * Factory functions for creating pages of specific types with proper validation
 * and default configurations based on the page type registry.
 */

import { Page, Field, PageType, FieldType } from './types';
import { generators } from './utils';
import { pageTypeRegistry, pageTypeUtils } from './page-types';

/**
 * Base page builder options
 */
interface BasePageOptions {
  key?: string;
  title: string;
  heading?: string;
  content?: string;
  nextPageId?: string;
  metadata?: Page['metadata'];
}

/**
 * Question page specific options
 */
interface QuestionPageOptions extends BasePageOptions {
  fields: Omit<Field, 'id' | 'createdAt' | 'updatedAt'>[];
}

/**
 * Page builders for each page type
 */
export const pageBuilders = {
  /**
   * Create a start page
   */
  start: (options: BasePageOptions): Page => {
    const { title, content, ...rest } = options;
    
    if (!content || content.trim().length === 0) {
      throw new Error('Start pages must have content');
    }

    const key = options.key || generators.generateKey(title);
    
    return {
      ...generators.createBaseEntity(),
      key,
      type: 'start',
      path: generators.generatePath(key),
      title,
      content,
      ...rest
    };
  },

  /**
   * Create a content page
   */
  content: (options: BasePageOptions): Page => {
    const { title, content, ...rest } = options;
    
    if (!content || content.trim().length === 0) {
      throw new Error('Content pages must have content');
    }

    const key = options.key || generators.generateKey(title);
    
    return {
      ...generators.createBaseEntity(),
      key,
      type: 'content',
      path: generators.generatePath(key),
      title,
      content,
      ...rest
    };
  },

  /**
   * Create a question page with fields
   */
  question: (options: QuestionPageOptions): Page => {
    const { title, fields, ...rest } = options;
    
    if (!fields || fields.length === 0) {
      throw new Error('Question pages must have at least one field');
    }

    const config = pageTypeRegistry.question;
    
    // Validate field count
    if (config.constraints.minFields && fields.length < config.constraints.minFields) {
      throw new Error(`Question pages must have at least ${config.constraints.minFields} field(s)`);
    }
    
    if (config.constraints.maxFields && fields.length > config.constraints.maxFields) {
      throw new Error(`Question pages cannot have more than ${config.constraints.maxFields} field(s)`);
    }

    // Validate field types
    fields.forEach((field, index) => {
      if (!pageTypeUtils.isFieldTypeAllowed('question', field.type)) {
        throw new Error(`Field type '${field.type}' is not allowed on question pages (field ${index + 1})`);
      }
    });

    const key = options.key || generators.generateKey(title);
    
    // Create fully formed fields with IDs and timestamps
    const fullFields: Field[] = fields.map(field => ({
      ...generators.createBaseEntity(),
      ...field
    }));

    return {
      ...generators.createBaseEntity(),
      key,
      type: 'question',
      path: generators.generatePath(key),
      title,
      fields: fullFields,
      ...rest
    };
  },

  /**
   * Create a task list page
   */
  taskList: (options: BasePageOptions): Page => {
    const { title, ...rest } = options;
    const key = options.key || generators.generateKey(title);
    
    return {
      ...generators.createBaseEntity(),
      key,
      type: 'task-list',
      path: generators.generatePath(key),
      title,
      ...rest
    };
  },

  /**
   * Create a check answers page
   */
  checkAnswers: (options: BasePageOptions): Page => {
    const { title, ...rest } = options;
    
    if (!options.nextPageId) {
      throw new Error('Check answers pages must have a next page ID');
    }

    const key = options.key || generators.generateKey(title);
    
    return {
      ...generators.createBaseEntity(),
      key,
      type: 'check-answers',
      path: generators.generatePath(key),
      title,
      ...rest
    };
  },

  /**
   * Create a confirmation page
   */
  confirmation: (options: BasePageOptions): Page => {
    const { title, content, ...rest } = options;
    
    if (!content || content.trim().length === 0) {
      throw new Error('Confirmation pages must have content');
    }

    const key = options.key || generators.generateKey(title);
    
    return {
      ...generators.createBaseEntity(),
      key,
      type: 'confirmation',
      path: generators.generatePath(key),
      title,
      content,
      ...rest
    };
  }
};

/**
 * Generic page builder that routes to the appropriate specific builder
 */
export const createPage = (pageType: PageType, options: any): Page => {
  switch (pageType) {
    case 'start':
      return pageBuilders.start(options);
    case 'content':
      return pageBuilders.content(options);
    case 'question':
      return pageBuilders.question(options);
    case 'task-list':
      return pageBuilders.taskList(options);
    case 'check-answers':
      return pageBuilders.checkAnswers(options);
    case 'confirmation':
      return pageBuilders.confirmation(options);
    default:
      throw new Error(`Unknown page type: ${pageType}`);
  }
};

/**
 * Field builder utilities for common field patterns
 */
export const fieldBuilders = {
  /**
   * Create a text input field
   */
  textInput: (name: string, label: string, options: Partial<Omit<Field, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'label' | 'type'>> = {}): Omit<Field, 'id' | 'createdAt' | 'updatedAt'> => ({
    name,
    type: 'text',
    label,
    ...options
  }),

  /**
   * Create an email input field
   */
  emailInput: (name: string, label: string, options: Partial<Omit<Field, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'label' | 'type'>> = {}): Omit<Field, 'id' | 'createdAt' | 'updatedAt'> => ({
    name,
    type: 'email',
    label,
    validation: [
      { type: 'email', message: 'Enter a valid email address' },
      ...(options.validation || [])
    ],
    ...options
  }),

  /**
   * Create a textarea field
   */
  textareaInput: (name: string, label: string, options: Partial<Omit<Field, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'label' | 'type'>> = {}): Omit<Field, 'id' | 'createdAt' | 'updatedAt'> => ({
    name,
    type: 'textarea',
    label,
    attributes: {
      rows: '5',
      ...(options.attributes || {})
    },
    ...options
  }),

  /**
   * Create a radio button field
   */
  radioInput: (name: string, label: string, options: { value: string; text: string; hint?: string }[], fieldOptions: Partial<Omit<Field, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'label' | 'type' | 'options'>> = {}): Omit<Field, 'id' | 'createdAt' | 'updatedAt'> => ({
    name,
    type: 'radios',
    label,
    options,
    ...fieldOptions
  }),

  /**
   * Create a checkbox field
   */
  checkboxInput: (name: string, label: string, options: { value: string; text: string; hint?: string }[], fieldOptions: Partial<Omit<Field, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'label' | 'type' | 'options'>> = {}): Omit<Field, 'id' | 'createdAt' | 'updatedAt'> => ({
    name,
    type: 'checkboxes',
    label,
    options,
    ...fieldOptions
  }),

  /**
   * Create a select dropdown field
   */
  selectInput: (name: string, label: string, options: { value: string; text: string }[], fieldOptions: Partial<Omit<Field, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'label' | 'type' | 'options'>> = {}): Omit<Field, 'id' | 'createdAt' | 'updatedAt'> => ({
    name,
    type: 'select',
    label,
    options,
    ...fieldOptions
  }),

  /**
   * Create a date input field
   */
  dateInput: (name: string, label: string, options: Partial<Omit<Field, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'label' | 'type'>> = {}): Omit<Field, 'id' | 'createdAt' | 'updatedAt'> => ({
    name,
    type: 'date',
    label,
    ...options
  }),

  /**
   * Create a file upload field
   */
  fileInput: (name: string, label: string, options: Partial<Omit<Field, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'label' | 'type'>> = {}): Omit<Field, 'id' | 'createdAt' | 'updatedAt'> => ({
    name,
    type: 'file',
    label,
    ...options
  })
};

/**
 * Common page patterns and templates
 */
export const pageTemplates = {
  /**
   * Service start page template
   */
  serviceStart: (serviceName: string, description: string): Page => 
    pageBuilders.start({
      title: serviceName,
      content: `
        <p>${description}</p>
        <p>It takes around 10 minutes to complete.</p>
        <h2>Before you start</h2>
        <p>You will need:</p>
        <ul>
          <li>your National Insurance number</li>
          <li>proof of your identity</li>
          <li>bank account details</li>
        </ul>
      `
    }),

  /**
   * Personal details question page template
   */
  personalDetails: (): Page => 
    pageBuilders.question({
      title: 'Your personal details',
      fields: [
        fieldBuilders.textInput('firstName', 'First name', { 
          required: true,
          validation: [{ type: 'required', message: 'Enter your first name' }]
        }),
        fieldBuilders.textInput('lastName', 'Last name', { 
          required: true,
          validation: [{ type: 'required', message: 'Enter your last name' }]
        }),
        fieldBuilders.emailInput('email', 'Email address', { 
          required: true,
          hint: 'We\'ll use this to send you updates',
          validation: [{ type: 'required', message: 'Enter your email address' }]
        })
      ]
    }),

  /**
   * Address question page template
   */
  address: (): Page => 
    pageBuilders.question({
      title: 'Your address',
      fields: [
        fieldBuilders.textInput('addressLine1', 'Address line 1', { 
          required: true,
          validation: [{ type: 'required', message: 'Enter your address' }]
        }),
        fieldBuilders.textInput('addressLine2', 'Address line 2 (optional)'),
        fieldBuilders.textInput('town', 'Town or city', { 
          required: true,
          validation: [{ type: 'required', message: 'Enter your town or city' }]
        }),
        fieldBuilders.textInput('postcode', 'Postcode', { 
          required: true,
          validation: [{ type: 'required', message: 'Enter your postcode' }]
        })
      ]
    }),

  /**
   * Eligibility question template
   */
  eligibility: (question: string, yesText = 'Yes', noText = 'No'): Page => 
    pageBuilders.question({
      title: 'Eligibility check',
      fields: [
        fieldBuilders.radioInput('eligibility', question, [
          { value: 'yes', text: yesText },
          { value: 'no', text: noText }
        ], { 
          required: true,
          validation: [{ type: 'required', message: 'Select an option' }]
        })
      ]
    }),

  /**
   * Standard check answers page
   */
  standardCheckAnswers: (): Page => 
    pageBuilders.checkAnswers({
      title: 'Check your answers',
      content: 'Check your answers before submitting your application.',
      nextPageId: 'confirmation'
    }),

  /**
   * Application confirmation page
   */
  applicationConfirmation: (referenceNumber?: string): Page => 
    pageBuilders.confirmation({
      title: 'Application submitted',
      heading: 'Application submitted',
      content: `
        <div class="govuk-panel govuk-panel--confirmation">
          <h1 class="govuk-panel__title">Application complete</h1>
          ${referenceNumber ? `
            <div class="govuk-panel__body">
              Your reference number<br><strong>${referenceNumber}</strong>
            </div>
          ` : ''}
        </div>
        <p>We have sent you a confirmation email.</p>
        <h2>What happens next</h2>
        <p>We will review your application and contact you within 5 working days.</p>
      `
    })
};
