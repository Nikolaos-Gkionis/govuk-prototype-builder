'use client';

import { useState } from 'react';
import { PageCTA, PageType } from '../../../types/prototype';
import { getDefaultCTA } from '../../../lib/page-cta-config';

interface CTAEditorProps {
  pageType: PageType;
  cta?: PageCTA;
  onSave: (cta: PageCTA) => void;
  onCancel: () => void;
}

export function CTAEditor({ pageType, cta, onSave, onCancel }: CTAEditorProps) {
  const [ctaConfig, setCtaConfig] = useState<PageCTA>(
    cta || getDefaultCTA(pageType)
  );

  const handleSave = () => {
    onSave(ctaConfig);
  };

  const handleReset = () => {
    setCtaConfig(getDefaultCTA(pageType));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Edit Call-to-Action Button
      </h3>
      
      <div className="space-y-4">
        {/* Button Text */}
        <div>
          <label htmlFor="cta-text" className="block text-sm font-medium text-gray-700 mb-2">
            Button Text
          </label>
          <input
            id="cta-text"
            type="text"
            value={ctaConfig.text}
            onChange={(e) => setCtaConfig(prev => ({ ...prev, text: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter button text"
          />
        </div>

        {/* Button Type */}
        <div>
          <label htmlFor="cta-type" className="block text-sm font-medium text-gray-700 mb-2">
            Button Type
          </label>
          <select
            id="cta-type"
            value={ctaConfig.type}
            onChange={(e) => setCtaConfig(prev => ({ ...prev, type: e.target.value as PageCTA['type'] }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="start">Start (Green)</option>
            <option value="primary">Primary (Green)</option>
            <option value="secondary">Secondary (White with border)</option>
            <option value="warning">Warning (Red)</option>
          </select>
        </div>

        {/* Action Type */}
        <div>
          <label htmlFor="cta-action" className="block text-sm font-medium text-gray-700 mb-2">
            Action
          </label>
          <select
            id="cta-action"
            value={ctaConfig.action}
            onChange={(e) => setCtaConfig(prev => ({ ...prev, action: e.target.value as PageCTA['action'] }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="start">Start the service</option>
            <option value="continue">Continue to next page</option>
            <option value="submit">Submit form</option>
            <option value="back">Go back</option>
            <option value="custom">Custom action</option>
          </select>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <div className="p-4 bg-gray-50 rounded-md">
            <button
              style={{
                ...(ctaConfig.type === 'start' ? {
                  backgroundColor: '#00703c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0',
                  padding: '8px 10px 7px',
                  fontSize: '19px',
                  fontWeight: '400',
                  cursor: 'pointer',
                  boxShadow: '0 2px 0 #002d18',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                } : ctaConfig.type === 'primary' ? {
                  backgroundColor: '#00703c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0',
                  padding: '8px 10px 7px',
                  fontSize: '19px',
                  fontWeight: '400',
                  cursor: 'pointer',
                  boxShadow: '0 2px 0 #002d18',
                  textDecoration: 'none',
                  display: 'inline-block'
                } : ctaConfig.type === 'secondary' ? {
                  backgroundColor: '#f3f2f1',
                  color: '#0b0c0c',
                  border: '2px solid #0b0c0c',
                  borderRadius: '0',
                  padding: '6px 8px 5px',
                  fontSize: '19px',
                  fontWeight: '400',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block'
                } : {
                  backgroundColor: '#d4351c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0',
                  padding: '8px 10px 7px',
                  fontSize: '19px',
                  fontWeight: '400',
                  cursor: 'pointer',
                  boxShadow: '0 2px 0 #55150b',
                  textDecoration: 'none',
                  display: 'inline-block'
                })
              }}
              onMouseOver={(e) => {
                if (ctaConfig.type === 'start' || ctaConfig.type === 'primary') {
                  e.currentTarget.style.backgroundColor = '#005a30';
                } else if (ctaConfig.type === 'secondary') {
                  e.currentTarget.style.backgroundColor = '#0b0c0c';
                  e.currentTarget.style.color = '#f3f2f1';
                } else if (ctaConfig.type === 'warning') {
                  e.currentTarget.style.backgroundColor = '#aa2a16';
                }
              }}
              onMouseOut={(e) => {
                if (ctaConfig.type === 'start' || ctaConfig.type === 'primary') {
                  e.currentTarget.style.backgroundColor = '#00703c';
                } else if (ctaConfig.type === 'secondary') {
                  e.currentTarget.style.backgroundColor = '#f3f2f1';
                  e.currentTarget.style.color = '#0b0c0c';
                } else if (ctaConfig.type === 'warning') {
                  e.currentTarget.style.backgroundColor = '#d4351c';
                }
              }}
            >
              {ctaConfig.text}
              {ctaConfig.type === 'start' && (
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  style={{ marginLeft: '8px' }}
                >
                  <path d="M8.5 4.5L13.5 9.5L8.5 14.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset to Default
          </button>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save CTA
          </button>
        </div>
      </div>
    </div>
  );
}
