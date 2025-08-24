/**
 * Tests for page types and builders
 */

import { describe, test, expect } from '@jest/globals';
import { pageTypeRegistry, pageTypeUtils } from '../page-types';
import { pageBuilders, fieldBuilders, createPage } from '../page-builders';
import { pageExamples, exampleJourneys } from '../page-examples';
import { validators } from '../utils';

describe('Page Type Registry', () => {
  test('has all required page types', () => {
    const expectedTypes = ['start', 'content', 'question', 'task-list', 'check-answers', 'confirmation'];
    const actualTypes = Object.keys(pageTypeRegistry);
    
    expect(actualTypes).toEqual(expect.arrayContaining(expectedTypes));
    expect(actualTypes).toHaveLength(expectedTypes.length);
  });

  test('all page types have required configuration', () => {
    Object.entries(pageTypeRegistry).forEach(([type, config]) => {
      expect(config.id).toBe(type);
      expect(config.name).toBeTruthy();
      expect(config.description).toBeTruthy();
      expect(typeof config.canHaveFields).toBe('boolean');
      expect(typeof config.requiresContent).toBe('boolean');
      expect(typeof config.supportsConditions).toBe('boolean');
      expect(config.template).toBeDefined();
      expect(config.constraints).toBeDefined();
      expect(Array.isArray(config.examples)).toBe(true);
    });
  });

  test('field type restrictions are properly defined', () => {
    const questionConfig = pageTypeRegistry.question;
    expect(questionConfig.canHaveFields).toBe(true);
    expect(Array.isArray(questionConfig.allowedFieldTypes)).toBe(true);
    expect(questionConfig.allowedFieldTypes!.length).toBeGreaterThan(0);

    const startConfig = pageTypeRegistry.start;
    expect(startConfig.canHaveFields).toBe(false);
    expect(startConfig.allowedFieldTypes).toBeUndefined();
  });
});

describe('Page Type Utils', () => {
  test('correctly identifies pages that can have fields', () => {
    expect(pageTypeUtils.canHaveFields('question')).toBe(true);
    expect(pageTypeUtils.canHaveFields('start')).toBe(false);
    expect(pageTypeUtils.canHaveFields('content')).toBe(false);
    expect(pageTypeUtils.canHaveFields('confirmation')).toBe(false);
  });

  test('validates field types for page types', () => {
    expect(pageTypeUtils.isFieldTypeAllowed('question', 'text')).toBe(true);
    expect(pageTypeUtils.isFieldTypeAllowed('question', 'radios')).toBe(true);
    expect(pageTypeUtils.isFieldTypeAllowed('start', 'text')).toBe(false);
  });

  test('gets recommended page types by use case', () => {
    expect(pageTypeUtils.getRecommendedPageTypes('collect-info')).toContain('question');
    expect(pageTypeUtils.getRecommendedPageTypes('show-info')).toContain('start');
    expect(pageTypeUtils.getRecommendedPageTypes('show-info')).toContain('content');
    expect(pageTypeUtils.getRecommendedPageTypes('confirm')).toContain('confirmation');
  });
});

describe('Page Builders', () => {
  describe('Start page builder', () => {
    test('creates valid start page', () => {
      const page = pageBuilders.start({
        title: 'Test Service',
        content: 'This is a test service.'
      });

      expect(page.type).toBe('start');
      expect(page.title).toBe('Test Service');
      expect(page.content).toBe('This is a test service.');
      expect(page.key).toBe('test-service');
      expect(page.path).toBe('/test-service');
      expect(page.fields).toBeUndefined();
    });

    test('throws error when content is missing', () => {
      expect(() => {
        pageBuilders.start({
          title: 'Test Service',
          content: ''
        });
      }).toThrow('Start pages must have content');
    });
  });

  describe('Question page builder', () => {
    test('creates valid question page with fields', () => {
      const page = pageBuilders.question({
        title: 'Personal Details',
        fields: [
          fieldBuilders.textInput('firstName', 'First name', { required: true }),
          fieldBuilders.emailInput('email', 'Email address')
        ]
      });

      expect(page.type).toBe('question');
      expect(page.title).toBe('Personal Details');
      expect(page.fields).toHaveLength(2);
      expect(page.fields![0].name).toBe('firstName');
      expect(page.fields![0].type).toBe('text');
      expect(page.fields![1].name).toBe('email');
      expect(page.fields![1].type).toBe('email');
    });

    test('throws error when no fields provided', () => {
      expect(() => {
        pageBuilders.question({
          title: 'Empty Question',
          fields: []
        });
      }).toThrow('Question pages must have at least one field');
    });

    test('validates field type restrictions', () => {
      expect(() => {
        pageBuilders.question({
          title: 'Invalid Field Type',
          fields: [
            { name: 'test', type: 'hidden' as any, label: 'Test' }
          ]
        });
      }).toThrow('Field type \'hidden\' is not allowed on question pages');
    });
  });

  describe('Check answers page builder', () => {
    test('creates valid check answers page', () => {
      const page = pageBuilders.checkAnswers({
        title: 'Check your answers',
        nextPageId: 'confirmation'
      });

      expect(page.type).toBe('check-answers');
      expect(page.nextPageId).toBe('confirmation');
    });

    test('throws error when nextPageId is missing', () => {
      expect(() => {
        pageBuilders.checkAnswers({
          title: 'Check your answers'
        });
      }).toThrow('Check answers pages must have a next page ID');
    });
  });
});

describe('Field Builders', () => {
  test('creates text input field', () => {
    const field = fieldBuilders.textInput('firstName', 'First name', { 
      required: true,
      hint: 'Enter your first name'
    });

    expect(field.name).toBe('firstName');
    expect(field.type).toBe('text');
    expect(field.label).toBe('First name');
    expect(field.required).toBe(true);
    expect(field.hint).toBe('Enter your first name');
  });

  test('creates email input with default validation', () => {
    const field = fieldBuilders.emailInput('email', 'Email address');

    expect(field.type).toBe('email');
    expect(field.validation).toContainEqual({
      type: 'email',
      message: 'Enter a valid email address'
    });
  });

  test('creates radio input with options', () => {
    const field = fieldBuilders.radioInput('choice', 'Choose an option', [
      { value: 'yes', text: 'Yes' },
      { value: 'no', text: 'No' }
    ]);

    expect(field.type).toBe('radios');
    expect(field.options).toHaveLength(2);
    expect(field.options![0].value).toBe('yes');
    expect(field.options![1].text).toBe('No');
  });
});

describe('Page Examples', () => {
  test('all start page examples are valid', () => {
    Object.values(pageExamples.startPages).forEach((page, index) => {
      const result = validators.validateProject({
        id: 'test',
        name: 'Test',
        schemaVersion: '1.0.0',
        settings: {
          govukFrontendVersion: '5.11.2',
          serviceName: 'Test Service'
        },
        pages: [page],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      if (!result.success) {
        console.error(`Start page example ${index} validation errors:`, result.errors);
      }
      
      expect(result.success).toBe(true);
    });
  });

  test('all question page examples are valid', () => {
    Object.values(pageExamples.questionPages).forEach((page, index) => {
      const result = validators.validateProject({
        id: 'test',
        name: 'Test',
        schemaVersion: '1.0.0',
        settings: {
          govukFrontendVersion: '5.11.2',
          serviceName: 'Test Service'
        },
        pages: [page],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      if (!result.success) {
        console.error(`Question page example ${index} validation errors:`, result.errors);
      }
      
      expect(result.success).toBe(true);
    });
  });

  test('simple application journey is valid', () => {
    const journey = exampleJourneys.simpleApplication;
    const pages = Object.values(journey);
    
    const result = validators.validateProject({
      id: 'test',
      name: 'Test Journey',
      schemaVersion: '1.0.0',
      settings: {
        govukFrontendVersion: '5.11.2',
        serviceName: 'Test Service'
      },
      pages,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    if (!result.success) {
      console.error('Journey validation errors:', result.errors);
    }
    
    expect(result.success).toBe(true);
  });
});

describe('Generic Page Builder', () => {
  test('routes to correct builder based on page type', () => {
    const startPage = createPage('start', {
      title: 'Test Start',
      content: 'Test content'
    });
    
    expect(startPage.type).toBe('start');
    
    const questionPage = createPage('question', {
      title: 'Test Question',
      fields: [fieldBuilders.textInput('test', 'Test field')]
    });
    
    expect(questionPage.type).toBe('question');
  });

  test('throws error for unknown page type', () => {
    expect(() => {
      createPage('unknown' as any, {});
    }).toThrow('Unknown page type: unknown');
  });
});
