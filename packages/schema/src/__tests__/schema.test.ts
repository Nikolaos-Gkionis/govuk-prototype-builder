/**
 * Basic tests for schema validation
 */

import { describe, test, expect } from '@jest/globals';
import { 
  validators, 
  typeGuards, 
  navigation, 
  generators
} from '../utils';
import { conditionHelpers } from '../condition';
import { 
  exampleProject, 
  exampleDataModel, 
  exampleFields, 
  examplePages,
  invalidExamples 
} from '../examples';

describe('Schema Validation', () => {
  describe('Project validation', () => {
    test('validates correct project', () => {
      const result = validators.validateProject(exampleProject);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.errors).toBeNull();
    });

    test('rejects project with missing name', () => {
      const result = validators.validateProject(invalidExamples.projectMissingName);
      expect(result.success).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining('required')
        })
      );
    });

    test('rejects project with duplicate page IDs', () => {
      const result = validators.validateProject(invalidExamples.projectDuplicatePageIds);
      expect(result.success).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          message: 'All page IDs must be unique'
        })
      );
    });

    test('rejects project with invalid page references', () => {
      const result = validators.validateProject(invalidExamples.projectInvalidPageReference);
      expect(result.success).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          message: 'All referenced page IDs must exist in the project'
        })
      );
    });
  });

  describe('Type guards', () => {
    test('correctly identifies valid project', () => {
      expect(typeGuards.isProject(exampleProject)).toBe(true);
      expect(typeGuards.isProject({})).toBe(false);
      expect(typeGuards.isProject(null)).toBe(false);
    });

    test('correctly identifies field types', () => {
      expect(typeGuards.isOptionField('radios')).toBe(true);
      expect(typeGuards.isOptionField('checkboxes')).toBe(true);
      expect(typeGuards.isOptionField('select')).toBe(true);
      expect(typeGuards.isOptionField('text')).toBe(false);

      expect(typeGuards.isMultiValueField('checkboxes')).toBe(true);
      expect(typeGuards.isMultiValueField('radios')).toBe(false);

      expect(typeGuards.canHaveFields('question')).toBe(true);
      expect(typeGuards.canHaveFields('start')).toBe(false);
    });
  });

  describe('Generators', () => {
    test('generates unique IDs', () => {
      const id1 = generators.generateId();
      const id2 = generators.generateId();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
    });

    test('generates URL-friendly keys', () => {
      expect(generators.generateKey('First Name')).toBe('first-name');
      expect(generators.generateKey('Email Address!')).toBe('email-address');
      expect(generators.generateKey('  Multiple   Spaces  ')).toBe('multiple-spaces');
      expect(generators.generateKey('123 Numbers')).toBe('123-numbers');
    });

    test('generates correct paths', () => {
      expect(generators.generatePath('first-name')).toBe('/first-name');
      expect(generators.generatePath('check-answers')).toBe('/check-answers');
    });

    test('creates base entities with required fields', () => {
      const entity = generators.createBaseEntity();
      expect(entity.id).toBeDefined();
      expect(entity.createdAt).toBeInstanceOf(Date);
      expect(entity.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('JSONLogic conditions', () => {
    test('creates simple equality conditions', () => {
      const condition = conditionHelpers.equals('field1', 'value1');
      expect(condition).toEqual({
        '==': [{ var: 'field1' }, 'value1']
      });
    });

    test('evaluates conditions correctly', () => {
      const data = { eligibility: 'yes', age: 25 };
      
      expect(validators.evaluateCondition(
        conditionHelpers.equals('eligibility', 'yes'), 
        data
      )).toBe(true);
      
      expect(validators.evaluateCondition(
        conditionHelpers.equals('eligibility', 'no'), 
        data
      )).toBe(false);

      expect(validators.evaluateCondition(
        conditionHelpers.isOneOf('eligibility', ['yes', 'maybe']), 
        data
      )).toBe(true);
    });

    test('handles complex AND/OR conditions', () => {
      const data = { eligibility: 'yes', age: 25 };
      
      const andCondition = conditionHelpers.and(
        conditionHelpers.equals('eligibility', 'yes'),
        conditionHelpers.equals('age', 25)
      );
      
      expect(validators.evaluateCondition(andCondition, data)).toBe(true);
      
      const orCondition = conditionHelpers.or(
        conditionHelpers.equals('eligibility', 'no'),
        conditionHelpers.equals('age', 25)
      );
      
      expect(validators.evaluateCondition(orCondition, data)).toBe(true);
    });
  });

  describe('Navigation utilities', () => {
    test('finds pages by different identifiers', () => {
      const startPage = navigation.findPageById(exampleProject, examplePages.start.id);
      expect(startPage).toBeDefined();
      expect(startPage?.type).toBe('start');

      const eligibilityPage = navigation.findPageByKey(exampleProject, 'eligibility');
      expect(eligibilityPage).toBeDefined();
      expect(eligibilityPage?.type).toBe('question');

      const pathPage = navigation.findPageByPath(exampleProject, '/start');
      expect(pathPage).toBeDefined();
      expect(pathPage?.key).toBe('start');
    });

    test('determines next page based on conditions', () => {
      const eligibilityPage = examplePages.eligibility;
      
      // Test eligible user
      const nextForEligible = navigation.getNextPage(
        exampleProject, 
        eligibilityPage, 
        { eligibility: 'yes' }
      );
      expect(nextForEligible?.key).toBe('personal-details');

      // Test ineligible user  
      const nextForIneligible = navigation.getNextPage(
        exampleProject, 
        eligibilityPage, 
        { eligibility: 'no' }
      );
      expect(nextForIneligible?.key).toBe('ineligible');
    });

    test('checks page reachability', () => {
      expect(navigation.isPageReachable(exampleProject, examplePages.start.id)).toBe(true);
      expect(navigation.isPageReachable(exampleProject, examplePages.confirmation.id)).toBe(true);
    });
  });

  describe('Data model validation', () => {
    test('validates correct data model', () => {
      expect(typeGuards.isDataModel(exampleDataModel)).toBe(true);
    });

    test('rejects invalid data model', () => {
      const invalid = { ...exampleDataModel, sessionId: '' };
      expect(typeGuards.isDataModel(invalid)).toBe(false);
    });
  });
});
