'use client';

import { Node } from '@xyflow/react';
import { useEffect } from 'react';

interface PagePreviewProps {
  node: Node | null;
  onClose: () => void;
}

export function PagePreview({ node, onClose }: PagePreviewProps) {
  // Initialize GOV.UK Frontend JavaScript for interactive components
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="govuk/all.js"]');
    if (existingScript) {
      // Script already loaded, just re-initialize
      if (typeof window !== 'undefined' && (window as any).GOVUKFrontend) {
        (window as any).GOVUKFrontend.initAll();
      }
      return;
    }

    // Load GOV.UK Frontend JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/govuk-frontend@4.8.0/govuk/all.js';
    script.onload = () => {
      if (typeof window !== 'undefined' && (window as any).GOVUKFrontend) {
        (window as any).GOVUKFrontend.initAll();
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup: only remove if we added it
      if (!existingScript) {
        const scriptToRemove = document.querySelector('script[src*="govuk/all.js"]');
        if (scriptToRemove) {
          document.head.removeChild(scriptToRemove);
        }
      }
    };
  }, []);

  if (!node) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>No page selected for preview</p>
        </div>
      </div>
    );
  }

  const pageTitle = String(node.data.label || 'Page Title');
  const pageContent = node.data.content ? String(node.data.content) : null;
  const fields = Array.isArray(node.data.fields) ? node.data.fields : [];

  const renderFormField = (field: any, index: number) => {
    const fieldId = `field-${index}`;
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
      case 'password':
        return (
          <div key={field.id} className="govuk-form-group">
            <label className="govuk-label" htmlFor={fieldId}>
              {field.label}
              {field.required && <span className="govuk-required">*</span>}
            </label>
            {field.hint && (
              <div className="govuk-hint" id={`${fieldId}-hint`}>
                {field.hint}
              </div>
            )}
            <input
              className="govuk-input"
              id={fieldId}
              name={fieldId}
              type={field.type}
              aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
              required={field.required}
              minLength={field.validation?.minLength}
              maxLength={field.validation?.maxLength}
              pattern={field.validation?.pattern}
            />
          </div>
        );

      case 'number':
        return (
          <div key={field.id} className="govuk-form-group">
            <label className="govuk-label" htmlFor={fieldId}>
              {field.label}
              {field.required && <span className="govuk-required">*</span>}
            </label>
            {field.hint && (
              <div className="govuk-hint" id={`${fieldId}-hint`}>
                {field.hint}
              </div>
            )}
            <input
              className="govuk-input govuk-input--width-10"
              id={fieldId}
              name={fieldId}
              type="number"
              aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
              required={field.required}
              min={field.validation?.min}
              max={field.validation?.max}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="govuk-form-group">
            <label className="govuk-label" htmlFor={fieldId}>
              {field.label}
              {field.required && <span className="govuk-required">*</span>}
            </label>
            {field.hint && (
              <div className="govuk-hint" id={`${fieldId}-hint`}>
                {field.hint}
              </div>
            )}
            <textarea
              className="govuk-textarea"
              id={fieldId}
              name={fieldId}
              rows={5}
              aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
              required={field.required}
              minLength={field.validation?.minLength}
              maxLength={field.validation?.maxLength}
            />
          </div>
        );

      case 'radios':
        return (
          <div key={field.id} className="govuk-form-group">
            <fieldset className="govuk-fieldset">
              <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                <h1 className="govuk-fieldset__heading">
                  {field.label}
                  {field.required && <span className="govuk-required">*</span>}
                </h1>
              </legend>
              {field.hint && (
                <div className="govuk-hint" id={`${fieldId}-hint`}>
                  {field.hint}
                </div>
              )}
              <div className="govuk-radios" data-module="govuk-radios">
                {field.options?.map((option: any, optionIndex: number) => (
                  <div key={optionIndex} className="govuk-radios__item">
                    <input
                      className="govuk-radios__input"
                      id={`${fieldId}-${optionIndex}`}
                      name={fieldId}
                      type="radio"
                      value={option.value}
                      aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
                      required={field.required}
                    />
                    <label className="govuk-label govuk-radios__label" htmlFor={`${fieldId}-${optionIndex}`}>
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        );

      case 'checkboxes':
        return (
          <div key={field.id} className="govuk-form-group">
            <fieldset className="govuk-fieldset">
              <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                <h1 className="govuk-fieldset__heading">
                  {field.label}
                  {field.required && <span className="govuk-required">*</span>}
                </h1>
              </legend>
              {field.hint && (
                <div className="govuk-hint" id={`${fieldId}-hint`}>
                  {field.hint}
                </div>
              )}
              <div className="govuk-checkboxes" data-module="govuk-checkboxes">
                {field.options?.map((option: any, optionIndex: number) => (
                  <div key={optionIndex} className="govuk-checkboxes__item">
                    <input
                      className="govuk-checkboxes__input"
                      id={`${fieldId}-${optionIndex}`}
                      name={`${fieldId}[]`}
                      type="checkbox"
                      value={option.value}
                      aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
                      required={field.required}
                    />
                    <label className="govuk-label govuk-checkboxes__label" htmlFor={`${fieldId}-${optionIndex}`}>
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="govuk-form-group">
            <label className="govuk-label" htmlFor={fieldId}>
              {field.label}
              {field.required && <span className="govuk-required">*</span>}
            </label>
            {field.hint && (
              <div className="govuk-hint" id={`${fieldId}-hint`}>
                {field.hint}
              </div>
            )}
            <select
              className="govuk-select"
              id={fieldId}
              name={fieldId}
              aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
              required={field.required}
            >
              <option value="">Please select</option>
              {field.options?.map((option: any, optionIndex: number) => (
                <option key={optionIndex} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className="govuk-form-group">
            <fieldset className="govuk-fieldset" role="group" aria-describedby={field.hint ? `${fieldId}-hint` : undefined}>
              <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                <h1 className="govuk-fieldset__heading">
                  {field.label}
                  {field.required && <span className="govuk-required">*</span>}
                </h1>
              </legend>
              {field.hint && (
                <div className="govuk-hint" id={`${fieldId}-hint`}>
                  {field.hint}
                </div>
              )}
              <div className="govuk-date-input" id={fieldId}>
                <div className="govuk-date-input__item">
                  <div className="govuk-form-group">
                    <label className="govuk-label govuk-date-input__label" htmlFor={`${fieldId}-day`}>
                      Day
                    </label>
                    <input className="govuk-input govuk-date-input__input govuk-input--width-2" id={`${fieldId}-day`} name={`${fieldId}-day`} type="text" pattern="[0-9]*" inputMode="numeric" />
                  </div>
                </div>
                <div className="govuk-date-input__item">
                  <div className="govuk-form-group">
                    <label className="govuk-label govuk-date-input__label" htmlFor={`${fieldId}-month`}>
                      Month
                    </label>
                    <input className="govuk-input govuk-date-input__input govuk-input--width-2" id={`${fieldId}-month`} name={`${fieldId}-month`} type="text" pattern="[0-9]*" inputMode="numeric" />
                  </div>
                </div>
                <div className="govuk-date-input__item">
                  <div className="govuk-form-group">
                    <label className="govuk-label govuk-date-input__label" htmlFor={`${fieldId}-year`}>
                      Year
                    </label>
                    <input className="govuk-input govuk-date-input__input govuk-input--width-4" id={`${fieldId}-year`} name={`${fieldId}-year`} type="text" pattern="[0-9]*" inputMode="numeric" />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        );

      case 'file':
        return (
          <div key={field.id} className="govuk-form-group">
            <label className="govuk-label" htmlFor={fieldId}>
              {field.label}
              {field.required && <span className="govuk-required">*</span>}
            </label>
            {field.hint && (
              <div className="govuk-hint" id={`${fieldId}-hint`}>
                {field.hint}
              </div>
            )}
            <input
              className="govuk-file-upload"
              id={fieldId}
              name={fieldId}
              type="file"
              aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
              required={field.required}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Preview Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Page Preview</h1>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close Preview
            </button>
          </div>
          <p className="text-gray-600">
            This is how your page will look to users. The styling follows the GOV.UK Design System.
          </p>
        </div>

        {/* Preview Content - Use GOVUK preview container */}
        <div className="govuk-preview-container">
          {/* Page Title */}
          <h1 className="govuk-heading-xl">
            {pageTitle}
          </h1>

          {/* Page Content */}
          {pageContent ? (
            <div className="govuk-body">
              <p>{pageContent}</p>
            </div>
          ) : null}

          {/* Form Fields */}
          {fields.length > 0 ? (
            <form className="govuk-form">
              {fields.map((field: any, index: number) => renderFormField(field, index))}
              
              {/* Submit Button */}
              <button className="govuk-button" data-module="govuk-button">
                Continue
              </button>
            </form>
          ) : (
            <div className="govuk-body">
              <p className="text-gray-500 italic">No form fields added to this page yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
