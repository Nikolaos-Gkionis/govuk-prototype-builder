/**
 * Basic tests for schema validation
 */

import { validators, typeGuards, generators } from '../utils';
import { exampleProject, exampleDataModel } from '../examples';

describe('Basic Schema Tests', () => {
  test('validates example project', () => {
    const result = validators.validateProject(exampleProject);
    expect(result.success).toBe(true);
  });

  test('validates example data model', () => {
    expect(typeGuards.isDataModel(exampleDataModel)).toBe(true);
  });

  test('generates unique IDs', () => {
    const id1 = generators.generateId();
    const id2 = generators.generateId();
    expect(id1).not.toBe(id2);
  });

  test('generates URL-friendly keys', () => {
    expect(generators.generateKey('Test Page')).toBe('test-page');
  });
});
