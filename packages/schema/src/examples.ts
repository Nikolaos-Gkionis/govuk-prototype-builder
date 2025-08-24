/**
 * Example data for testing and documentation purposes
 */

import { Project, Page, Field, Condition, DataModel } from './types';
import { generators } from './utils';
import { conditionHelpers } from './condition';

/**
 * Example fields for different types
 */
export const exampleFields: Record<string, Field> = {
  firstName: {
    ...generators.createBaseEntity('field-first-name'),
    name: 'firstName',
    type: 'text',
    label: 'First name',
    required: true,
    validation: [
      {
        type: 'required',
        message: 'Enter your first name'
      },
      {
        type: 'maxLength',
        value: 50,
        message: 'First name must be 50 characters or fewer'
      }
    ]
  },

  email: {
    ...generators.createBaseEntity('field-email'),
    name: 'email',
    type: 'email',
    label: 'Email address',
    hint: 'We\'ll use this to send you updates',
    required: true,
    validation: [
      {
        type: 'required',
        message: 'Enter your email address'
      },
      {
        type: 'email',
        message: 'Enter a valid email address'
      }
    ]
  },

  eligibility: {
    ...generators.createBaseEntity('field-eligibility'),
    name: 'eligibility',
    type: 'radios',
    label: 'Are you eligible for this service?',
    hint: 'You must be a UK resident',
    required: true,
    options: [
      {
        value: 'yes',
        text: 'Yes, I am eligible'
      },
      {
        value: 'no',
        text: 'No, I am not eligible'
      },
      {
        value: 'unsure',
        text: 'I\'m not sure',
        hint: 'We can help you check'
      }
    ],
    validation: [
      {
        type: 'required',
        message: 'Select whether you are eligible'
      }
    ]
  },

  interests: {
    ...generators.createBaseEntity('field-interests'),
    name: 'interests',
    type: 'checkboxes',
    label: 'What are you interested in?',
    hint: 'Select all that apply',
    options: [
      {
        value: 'healthcare',
        text: 'Healthcare services'
      },
      {
        value: 'education',
        text: 'Education and training'
      },
      {
        value: 'employment',
        text: 'Employment support'
      },
      {
        value: 'housing',
        text: 'Housing assistance'
      }
    ]
  },

  description: {
    ...generators.createBaseEntity('field-description'),
    name: 'description',
    type: 'textarea',
    label: 'Tell us more about your situation',
    hint: 'You can write up to 500 characters',
    validation: [
      {
        type: 'maxLength',
        value: 500,
        message: 'Description must be 500 characters or fewer'
      }
    ],
    attributes: {
      rows: '5'
    }
  }
};

/**
 * Example conditions
 */
export const exampleConditions: Record<string, Condition> = {
  eligibleUser: {
    ...generators.createBaseEntity('condition-eligible'),
    expression: conditionHelpers.equals('eligibility', 'yes'),
    toPageId: 'page-personal-details',
    description: 'User is eligible - proceed to personal details'
  },

  ineligibleUser: {
    ...generators.createBaseEntity('condition-ineligible'),
    expression: conditionHelpers.equals('eligibility', 'no'),
    toPageId: 'page-ineligible',
    description: 'User is not eligible - show ineligible page'
  },

  unsureUser: {
    ...generators.createBaseEntity('condition-unsure'),
    expression: conditionHelpers.equals('eligibility', 'unsure'),
    toPageId: 'page-eligibility-check',
    description: 'User is unsure - help them check eligibility'
  },

  hasHealthcareInterest: {
    ...generators.createBaseEntity('condition-healthcare'),
    expression: conditionHelpers.isOneOf('interests', ['healthcare']),
    toPageId: 'page-healthcare-info',
    description: 'User interested in healthcare - show healthcare info'
  }
};

/**
 * Example pages
 */
export const examplePages: Record<string, Page> = {
  start: {
    ...generators.createBaseEntity('page-start'),
    key: 'start',
    type: 'start',
    path: '/start',
    title: 'Apply for government service',
    heading: 'Apply for government service',
    content: `
      <p>Use this service to apply for government support.</p>
      <p>It takes around 10 minutes to complete.</p>
      <h2>Before you start</h2>
      <p>You will need:</p>
      <ul>
        <li>your National Insurance number</li>
        <li>proof of your identity</li>
        <li>bank account details</li>
      </ul>
    `,
    nextPageId: 'page-eligibility'
  },

  eligibility: {
    ...generators.createBaseEntity('page-eligibility'),
    key: 'eligibility',
    type: 'question',
    path: '/eligibility',
    title: 'Eligibility check',
    fields: [exampleFields.eligibility],
    conditions: [
      exampleConditions.eligibleUser,
      exampleConditions.ineligibleUser,
      exampleConditions.unsureUser
    ]
  },

  personalDetails: {
    ...generators.createBaseEntity('page-personal-details'),
    key: 'personal-details',
    type: 'question',
    path: '/personal-details',
    title: 'Your personal details',
    fields: [
      exampleFields.firstName,
      exampleFields.email
    ],
    nextPageId: 'page-interests'
  },

  interests: {
    ...generators.createBaseEntity('page-interests'),
    key: 'interests',
    type: 'question',
    path: '/interests',
    title: 'Your interests',
    fields: [exampleFields.interests],
    nextPageId: 'page-description'
  },

  description: {
    ...generators.createBaseEntity('page-description'),
    key: 'description',
    type: 'question',
    path: '/description',
    title: 'Additional information',
    fields: [exampleFields.description],
    nextPageId: 'page-check-answers'
  },

  checkAnswers: {
    ...generators.createBaseEntity('page-check-answers'),
    key: 'check-answers',
    type: 'check-answers',
    path: '/check-answers',
    title: 'Check your answers',
    content: 'Check your answers before submitting your application.',
    nextPageId: 'page-confirmation'
  },

  confirmation: {
    ...generators.createBaseEntity('page-confirmation'),
    key: 'confirmation',
    type: 'confirmation',
    path: '/confirmation',
    title: 'Application submitted',
    heading: 'Application submitted',
    content: `
      <div class="govuk-panel govuk-panel--confirmation">
        <h1 class="govuk-panel__title">Application complete</h1>
        <div class="govuk-panel__body">
          Your reference number<br><strong>HDJ2123F</strong>
        </div>
      </div>
      <p>We have sent you a confirmation email.</p>
    `
  },

  ineligible: {
    ...generators.createBaseEntity('page-ineligible'),
    key: 'ineligible',
    type: 'content',
    path: '/ineligible',
    title: 'You cannot use this service',
    content: `
      <p>Based on your answers, you cannot use this service.</p>
      <h2>What you can do next</h2>
      <p>You can:</p>
      <ul>
        <li><a href="/start">start again</a> if you think you made a mistake</li>
        <li>contact us for help</li>
      </ul>
    `
  }
};

/**
 * Example complete project
 */
export const exampleProject: Project = {
  ...generators.createBaseEntity('project-example'),
  name: 'Government Service Application',
  description: 'A simple application form for a government service',
  schemaVersion: '1.0.0',
  settings: {
    govukFrontendVersion: '5.11.2',
    serviceName: 'Apply for government service',
    serviceUrl: 'https://apply-for-service.service.gov.uk',
    phase: 'beta',
    showPhaseBanner: true,
    feedbackUrl: 'mailto:feedback@service.gov.uk',
    navigation: [
      {
        text: 'Home',
        href: '/',
        active: true
      },
      {
        text: 'Help',
        href: '/help'
      }
    ],
    footerLinks: [
      {
        text: 'Privacy policy',
        href: '/privacy'
      },
      {
        text: 'Cookies',
        href: '/cookies'
      }
    ]
  },
  pages: Object.values(examplePages)
};

/**
 * Example data model (user session)
 */
export const exampleDataModel: DataModel = {
  sessionId: 'session-123',
  answers: {
    eligibility: 'yes',
    firstName: 'John',
    email: 'john@example.com',
    interests: ['healthcare', 'education'],
    description: 'I need help with accessing healthcare services in my area.'
  },
  lastUpdated: new Date(),
  currentPageId: 'page-check-answers',
  completedPages: [
    'page-start',
    'page-eligibility', 
    'page-personal-details',
    'page-interests',
    'page-description'
  ]
};

/**
 * Invalid examples for testing validation
 */
export const invalidExamples = {
  projectMissingName: {
    ...exampleProject,
    name: '' // Invalid: empty name
  },

  projectDuplicatePageIds: {
    ...exampleProject,
    pages: [
      examplePages.start,
      { ...examplePages.eligibility, id: examplePages.start.id } // Invalid: duplicate ID
    ]
  },

  projectInvalidPageReference: {
    ...exampleProject,
    pages: [
      { ...examplePages.start, nextPageId: 'nonexistent-page' } // Invalid: references non-existent page
    ]
  },

  fieldInvalidName: {
    ...exampleFields.firstName,
    name: '123invalid' // Invalid: starts with number
  },

  fieldMissingOptions: {
    ...exampleFields.eligibility,
    options: [] // Invalid: radios field with no options
  },

  pageInvalidKey: {
    ...examplePages.start,
    key: 'Invalid Key!' // Invalid: contains spaces and special characters
  },

  questionPageWithoutFields: {
    ...examplePages.eligibility,
    fields: [] // Invalid: question page with no fields
  }
};
