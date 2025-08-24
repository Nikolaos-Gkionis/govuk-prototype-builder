/**
 * Comprehensive examples for each page type
 */

import { Page } from './types';
import { pageBuilders, fieldBuilders, pageTemplates } from './page-builders';

/**
 * Examples of each page type demonstrating best practices
 */
export const pageExamples = {
  /**
   * Start page examples
   */
  startPages: {
    simpleService: pageBuilders.start({
      title: 'Apply for a fishing licence',
      content: `
        <p>Use this service to apply for a fishing licence in England and Wales.</p>
        <p>It takes around 5 minutes to complete.</p>
        <h2>Before you start</h2>
        <p>You will need:</p>
        <ul>
          <li>your National Insurance number</li>
          <li>a debit or credit card</li>
        </ul>
      `
    }),

    complexService: pageTemplates.serviceStart(
      'Apply for Universal Credit',
      'Universal Credit is a payment to help with your living costs. It\'s paid monthly - or twice a month for some people in Scotland.'
    ),

    withMetadata: pageBuilders.start({
      title: 'Register to vote',
      content: `
        <p>You must register to vote before you can vote in UK elections and referendums.</p>
        <p>It usually takes about 5 minutes.</p>
      `,
      metadata: {
        metaDescription: 'Register to vote in UK elections and referendums',
        requiresAuth: false
      }
    })
  },

  /**
   * Content page examples
   */
  contentPages: {
    helpPage: pageBuilders.content({
      title: 'Getting help with your application',
      content: `
        <h2>If you need help</h2>
        <p>You can get help with your application by:</p>
        <ul>
          <li>calling our helpline on 0800 123 4567</li>
          <li>visiting your local council office</li>
          <li>asking a friend or family member</li>
        </ul>
        <h2>Opening times</h2>
        <p>Our helpline is open:</p>
        <ul>
          <li>Monday to Friday, 9am to 5pm</li>
          <li>Saturday, 9am to 1pm</li>
        </ul>
      `
    }),

    ineligiblePage: pageBuilders.content({
      title: 'You cannot use this service',
      content: `
        <p>Based on your answers, you cannot use this online service.</p>
        <h2>What you can do next</h2>
        <p>You can:</p>
        <ul>
          <li><a href="/start">start your application again</a> if you think you made a mistake</li>
          <li>call us on 0800 123 4567 for help</li>
          <li>visit your local council office</li>
        </ul>
      `
    }),

    privacyPolicy: pageBuilders.content({
      title: 'Privacy policy',
      content: `
        <h2>How we use your information</h2>
        <p>We collect and store your personal information to process your application.</p>
        <h2>Legal basis for processing</h2>
        <p>We process your data under the legal basis of public task.</p>
        <h2>How long we keep your information</h2>
        <p>We keep your information for 7 years after your application is processed.</p>
      `
    })
  },

  /**
   * Question page examples
   */
  questionPages: {
    personalDetails: pageTemplates.personalDetails(),

    address: pageTemplates.address(),

    eligibility: pageTemplates.eligibility('Are you eligible for this service?'),

    contactPreferences: pageBuilders.question({
      title: 'How would you like to be contacted?',
      content: 'We may need to contact you about your application.',
      fields: [
        fieldBuilders.checkboxInput('contactMethods', 'Contact methods', [
          { value: 'email', text: 'Email' },
          { value: 'phone', text: 'Phone' },
          { value: 'post', text: 'Post' }
        ], {
          hint: 'Select all that apply',
          required: true,
          validation: [{ type: 'required', message: 'Select at least one contact method' }]
        })
      ]
    }),

    dateOfBirth: pageBuilders.question({
      title: 'What is your date of birth?',
      fields: [
        fieldBuilders.dateInput('dateOfBirth', 'Date of birth', {
          hint: 'For example, 27 3 1980',
          required: true,
          validation: [{ type: 'required', message: 'Enter your date of birth' }]
        })
      ]
    }),

    documentUpload: pageBuilders.question({
      title: 'Upload your documents',
      content: 'You need to upload proof of your identity and address.',
      fields: [
        fieldBuilders.fileInput('identityDocument', 'Proof of identity', {
          hint: 'This could be a passport, driving licence, or national identity card',
          required: true,
          validation: [{ type: 'required', message: 'Upload proof of identity' }]
        }),
        fieldBuilders.fileInput('addressDocument', 'Proof of address', {
          hint: 'This could be a utility bill, bank statement, or council tax bill from the last 3 months',
          required: true,
          validation: [{ type: 'required', message: 'Upload proof of address' }]
        })
      ]
    }),

    complexForm: pageBuilders.question({
      title: 'About your circumstances',
      fields: [
        fieldBuilders.radioInput('employmentStatus', 'What is your employment status?', [
          { value: 'employed', text: 'Employed' },
          { value: 'self-employed', text: 'Self-employed' },
          { value: 'unemployed', text: 'Unemployed' },
          { value: 'retired', text: 'Retired' },
          { value: 'student', text: 'Student' },
          { value: 'other', text: 'Other' }
        ], { required: true }),
        fieldBuilders.selectInput('country', 'Country of birth', [
          { value: 'uk', text: 'United Kingdom' },
          { value: 'ie', text: 'Ireland' },
          { value: 'other-eu', text: 'Other EU country' },
          { value: 'other', text: 'Other country' }
        ], { required: true }),
        fieldBuilders.textareaInput('additionalInfo', 'Additional information', {
          hint: 'Tell us anything else that might be relevant to your application (optional)',
          attributes: { rows: '5' }
        })
      ]
    })
  },

  /**
   * Task list page examples
   */
  taskListPages: {
    simple: pageBuilders.taskList({
      title: 'Your application',
      content: 'Complete all sections to submit your application.'
    }),

    withGuidance: pageBuilders.taskList({
      title: 'Apply for a licence',
      content: `
        <p>You have completed 2 of 4 sections.</p>
        <p>You can save your application and come back to it later.</p>
      `
    })
  },

  /**
   * Check answers page examples
   */
  checkAnswersPages: {
    standard: pageTemplates.standardCheckAnswers(),

    withContent: pageBuilders.checkAnswers({
      title: 'Check your answers before sending your application',
      content: `
        <p>By submitting this application you are confirming that, to the best of your knowledge, 
        the details you are providing are correct.</p>
      `,
      nextPageId: 'confirmation'
    })
  },

  /**
   * Confirmation page examples
   */
  confirmationPages: {
    application: pageTemplates.applicationConfirmation('HDJ2123F'),

    simpleConfirmation: pageBuilders.confirmation({
      title: 'Registration complete',
      content: `
        <div class="govuk-panel govuk-panel--confirmation">
          <h1 class="govuk-panel__title">Registration complete</h1>
        </div>
        <p>We have sent you a confirmation email.</p>
      `
    }),

    paymentConfirmation: pageBuilders.confirmation({
      title: 'Payment successful',
      content: `
        <div class="govuk-panel govuk-panel--confirmation">
          <h1 class="govuk-panel__title">Payment successful</h1>
          <div class="govuk-panel__body">
            Payment reference<br><strong>PAY123456789</strong>
          </div>
        </div>
        <p>We have sent you a receipt by email.</p>
        <h2>What happens next</h2>
        <p>Your licence will be posted to you within 5 working days.</p>
      `
    })
  }
};

/**
 * Complete example journeys using multiple page types
 */
export const exampleJourneys = {
  /**
   * Simple linear journey: Start → Question → Check → Confirm
   */
  get simpleApplication() {
    // Create pages first to get their IDs
    const pages = {
      start: pageBuilders.start({
        key: 'start',
        title: 'Apply for a blue badge',
        content: `
          <p>A blue badge lets you park closer to your destination if you have a disability or health condition.</p>
          <p>It takes around 10 minutes to apply.</p>
        `
      }),

      personalDetails: pageBuilders.question({
        key: 'personal-details',
        title: 'Your personal details',
        fields: [
          fieldBuilders.textInput('firstName', 'First name', { required: true }),
          fieldBuilders.textInput('lastName', 'Last name', { required: true }),
          fieldBuilders.dateInput('dateOfBirth', 'Date of birth', { required: true })
        ]
      }),

      checkAnswers: (() => {
        const page = pageBuilders.checkAnswers({
          key: 'check-answers',
          title: 'Check your answers',
          nextPageId: 'temp' // Temporary, will be updated
        });
        return page;
      })(),

      confirmation: pageBuilders.confirmation({
        key: 'confirmation',
        title: 'Application submitted',
        content: `
          <div class="govuk-panel govuk-panel--confirmation">
            <h1 class="govuk-panel__title">Application submitted</h1>
          </div>
          <p>We will contact you within 5 working days.</p>
        `
      })
    };

    // Set up the navigation chain using actual IDs
    pages.start.nextPageId = pages.personalDetails.id;
    pages.personalDetails.nextPageId = pages.checkAnswers.id;
    pages.checkAnswers.nextPageId = pages.confirmation.id;

    return pages;
  },

  /**
   * Complex journey with branching and multiple question pages
   */
  complexApplication: {
    start: pageBuilders.start({
      key: 'start',
      title: 'Apply for Universal Credit',
      content: `
        <p>Universal Credit is a payment to help with your living costs.</p>
        <p>It usually takes around 40 minutes to complete your application.</p>
      `,
      nextPageId: 'eligibility'
    }),

    eligibility: pageBuilders.question({
      key: 'eligibility',
      title: 'Check if you can apply',
      fields: [
        fieldBuilders.radioInput('eligible', 'Are you between 18 and State Pension age?', [
          { value: 'yes', text: 'Yes' },
          { value: 'no', text: 'No' }
        ], { required: true })
      ]
      // Note: In a real application, this would have conditions for routing
    }),

    personalDetails: pageTemplates.personalDetails(),

    address: pageTemplates.address(),

    taskList: pageBuilders.taskList({
      key: 'task-list',
      title: 'Your Universal Credit application',
      content: 'Complete all sections to submit your application.'
    }),

    checkAnswers: pageTemplates.standardCheckAnswers(),

    confirmation: pageTemplates.applicationConfirmation('UC123456789')
  }
};

/**
 * Invalid examples for testing validation
 */
export const invalidPageExamples = {
  startWithoutContent: {
    description: 'Start page missing required content',
    data: {
      title: 'Start page',
      type: 'start',
      // Missing content
    }
  },

  questionWithoutFields: {
    description: 'Question page with no fields',
    data: {
      title: 'Question page',
      type: 'question',
      fields: []
    }
  },

  questionWithInvalidFieldType: {
    description: 'Question page with field type not allowed on questions',
    data: {
      title: 'Question page',
      type: 'question',
      fields: [
        {
          name: 'test',
          type: 'hidden', // Hidden fields might not be allowed on question pages
          label: 'Test field'
        }
      ]
    }
  },

  checkAnswersWithoutNextPage: {
    description: 'Check answers page without required next page',
    data: {
      title: 'Check answers',
      type: 'check-answers'
      // Missing nextPageId which is required
    }
  }
};
