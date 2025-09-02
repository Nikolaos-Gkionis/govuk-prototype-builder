'use client';

import { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';

interface PageEditorProps {
  node: Node | null;
  onSave: (pageData: any) => void;
}

export function PageEditor({ node, onSave }: PageEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    fields: [] as any[]
  });

  // Initialize form data when node changes
  useEffect(() => {
    if (node) {
      setFormData({
        title: (node.data.label as string) || '',
        description: (node.data.description as string) || '',
        content: (node.data.content as string) || '',
        fields: (node.data.fields as any[]) || []
      });
    }
  }, [node]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addField = () => {
    const newField = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: '',
      hint: '',
      required: false
    };
    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const updateField = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map((f, i) => 
        i === index ? { ...f, [field]: value } : f
      )
    }));
  };

  const removeField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave({
      ...node?.data,
      label: formData.title,
      description: formData.description,
      content: formData.content,
      fields: formData.fields
    });
  };

  if (!node) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>Select a page to edit</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Edit Page: {node.data.pageType as string}</h1>
          
          {/* Basic Page Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Page Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter page title"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Page Description
              </label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of this page"
              />
            </div>
          </div>

          {/* Page Content */}
          <div className="mt-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Page Content
            </label>
            <textarea
              id="content"
              rows={4}
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the main content for this page..."
            />
          </div>
        </div>

        {/* Form Fields Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Form Fields</h2>
            <button
              onClick={addField}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Field
            </button>
          </div>

          {formData.fields.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No form fields added yet.</p>
              <p className="text-sm">Click "Add Field" to start building your form.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.fields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field Type
                      </label>
                      <select
                        value={field.type}
                        onChange={(e) => updateField(index, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="text">Text Input</option>
                        <option value="textarea">Text Area</option>
                        <option value="radios">Radio Buttons</option>
                        <option value="checkboxes">Checkboxes</option>
                        <option value="date">Date Input</option>
                        <option value="file">File Upload</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field Label *
                      </label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(index, 'label', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter field label"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hint Text
                      </label>
                      <input
                        type="text"
                        value={field.hint}
                        onChange={(e) => updateField(index, 'hint', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Optional hint text"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(index, 'required', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Required field</span>
                    </label>
                    
                    <button
                      onClick={() => removeField(index)}
                      className="px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
