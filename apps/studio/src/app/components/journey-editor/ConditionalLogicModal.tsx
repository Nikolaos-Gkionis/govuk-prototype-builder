'use client';

import React, { useState, useEffect } from 'react';
import { Condition, Page, Field } from '@/types/prototype';

interface ConditionalLogicModalProps {
  isOpen: boolean;
  onClose: () => void;
  pages: Page[];
  selectedPageId?: string;
  onSaveCondition: (condition: Condition) => void;
  existingConditions?: Condition[];
  onLoadPageFields?: (pageId: string) => void;
}

export function ConditionalLogicModal({
  isOpen,
  onClose,
  pages,
  selectedPageId,
  onSaveCondition,
  existingConditions = [],
  onLoadPageFields
}: ConditionalLogicModalProps) {
  const [selectedSourcePage, setSelectedSourcePage] = useState<string>('');
  const [selectedField, setSelectedField] = useState<string>('');
  const [conditionType, setConditionType] = useState<'equals' | 'not_equals' | 'contains' | 'not_contains'>('equals');
  const [conditionValue, setConditionValue] = useState<string>('');
  const [selectedTargetPage, setSelectedTargetPage] = useState<string>('');
  const [conditionLabel, setConditionLabel] = useState<string>('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSourcePage(selectedPageId || '');
      setSelectedField('');
      setConditionType('equals');
      setConditionValue('');
      setSelectedTargetPage('');
      setConditionLabel('');
    }
  }, [isOpen, selectedPageId]);

  // Get fields for the selected source page
  const sourcePage = pages.find(p => p.id === selectedSourcePage);
  const availableFields = sourcePage?.fields || [];
  
  // Load fields when source page changes
  useEffect(() => {
    if (selectedSourcePage && onLoadPageFields) {
      onLoadPageFields(selectedSourcePage);
    }
  }, [selectedSourcePage, onLoadPageFields]);
  
  // Debug logging
  console.log('Source page:', sourcePage);
  console.log('Available fields:', availableFields);

  // Get available target pages (excluding source page)
  const availableTargetPages = pages.filter(p => p.id !== selectedSourcePage);

  const handleSave = () => {
    if (!selectedSourcePage || !selectedField || !conditionValue || !selectedTargetPage) {
      alert('Please fill in all required fields');
      return;
    }

    // Create JSONLogic expression based on condition type
    let expression: any;
    switch (conditionType) {
      case 'equals':
        expression = { '==': [{ var: selectedField }, conditionValue] };
        break;
      case 'not_equals':
        expression = { '!=': [{ var: selectedField }, conditionValue] };
        break;
      case 'contains':
        expression = { 'in': [conditionValue, { var: selectedField }] };
        break;
      case 'not_contains':
        expression = { '!': { 'in': [conditionValue, { var: selectedField }] } };
        break;
    }

    const condition: Condition = {
      id: `condition_${Date.now()}`,
      expression,
      toPageId: selectedTargetPage
    };

    // Add additional data for the API
    const conditionWithMetadata = {
      ...condition,
      sourcePageId: selectedSourcePage,
      fieldName: selectedField,
      conditionType,
      conditionValue,
      conditionLabel
    };

    onSaveCondition(conditionWithMetadata);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Add Conditional Logic
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Source Page Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              When user is on this page:
            </label>
            <select
              value={selectedSourcePage}
              onChange={(e) => {
                setSelectedSourcePage(e.target.value);
                setSelectedField(''); // Reset field selection
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a page...</option>
              {pages.map(page => (
                <option key={page.id} value={page.id}>
                  {page.title}
                </option>
              ))}
            </select>
          </div>

          {/* Field Selection */}
          {selectedSourcePage && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                And this field has a value:
              </label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a field...</option>
                {availableFields.map(field => (
                  <option key={field.id} value={field.name}>
                    {field.label} ({field.type})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Condition Type */}
          {selectedField && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition type:
              </label>
              <select
                value={conditionType}
                onChange={(e) => setConditionType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="equals">equals</option>
                <option value="not_equals">does not equal</option>
                <option value="contains">contains</option>
                <option value="not_contains">does not contain</option>
              </select>
            </div>
          )}

          {/* Condition Value */}
          {selectedField && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value to check against:
              </label>
              <input
                type="text"
                value={conditionValue}
                onChange={(e) => setConditionValue(e.target.value)}
                placeholder="Enter the value to check..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Target Page Selection */}
          {conditionValue && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Then go to this page:
              </label>
              <select
                value={selectedTargetPage}
                onChange={(e) => setSelectedTargetPage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select target page...</option>
                {availableTargetPages.map(page => (
                  <option key={page.id} value={page.id}>
                    {page.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Condition Label (Optional) */}
          {selectedTargetPage && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Label for this condition (optional):
              </label>
              <input
                type="text"
                value={conditionLabel}
                onChange={(e) => setConditionLabel(e.target.value)}
                placeholder="e.g., 'If user selects Yes'"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Preview */}
          {selectedSourcePage && selectedField && conditionValue && selectedTargetPage && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
              <p className="text-sm text-gray-600">
                <strong>If</strong> user is on <strong>{sourcePage?.title}</strong> and{' '}
                <strong>{availableFields.find(f => f.name === selectedField)?.label}</strong>{' '}
                <strong>{conditionType.replace('_', ' ')}</strong> <strong>"{conditionValue}"</strong>,{' '}
                <strong>then</strong> go to <strong>{pages.find(p => p.id === selectedTargetPage)?.title}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedSourcePage || !selectedField || !conditionValue || !selectedTargetPage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Save Condition
          </button>
        </div>
      </div>
    </div>
  );
}
