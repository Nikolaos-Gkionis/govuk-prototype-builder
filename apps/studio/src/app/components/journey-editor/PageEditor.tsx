'use client';

import { useState, useEffect } from 'react';
import { Node } from '@xyflow/react';
import { PagePreview } from './PagePreview';
import { PageTemplates } from './PageTemplates';
import { CTAEditor } from './CTAEditor';
import { validateForm, ValidationError, getFieldValidationMessage, COMMON_VALIDATIONS } from './validation';
import { PageType } from '@/types/prototype';

interface PageEditorProps {
  node: Node | null;
  onSave: (pageData: any) => void;
  editingPageId?: string | null;
}

export function PageEditor({ node, onSave, editingPageId }: PageEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    fields: [] as any[],
    cta: undefined as any
  });
  const [loadedFields, setLoadedFields] = useState<any[]>([]);

  // Load fields from database
  const loadFieldsFromDatabase = async (pageId: string) => {
    try {
      console.log('Loading fields for page:', pageId);
      const response = await fetch(`/api/page-fields?pageId=${pageId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Loaded fields from database:', data.fields);
        setLoadedFields(data.fields || []);
        return data.fields || [];
      }
    } catch (error) {
      console.error('Error loading fields from database:', error);
    }
    return [];
  };

  const [serviceNavConfig, setServiceNavConfig] = useState({
    itemCount: 3,
    showServiceName: false,
    serviceName: '',
    items: ['', '', '', '', '', ''] // Max 6 items
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [showValidation, setShowValidation] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showCTAEditor, setShowCTAEditor] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initialize form data when node changes
  useEffect(() => {
    if (node) {
      const isServiceNavigation = node.data.pageType === 'service-navigation';
      
      if (isServiceNavigation) {
        // Initialize service navigation config from project settings or existing data
        const projectConfig = getProjectServiceNavigationConfig();
        const existingConfig = projectConfig || node.data.serviceNavConfig || {};
        setServiceNavConfig({
          itemCount: (existingConfig as any).itemCount || 3,
          showServiceName: (existingConfig as any).showServiceName || false,
          serviceName: (existingConfig as any).serviceName || '',
          items: (existingConfig as any).items || ['', '', '', '', '', '']
        });
        
        setFormData({
          title: (node.data.label as string) || 'Service Navigation',
          description: 'Configure your service navigation',
          content: 'Service navigation appears under the header on every page of your prototype.',
          fields: [], // No regular form fields for service navigation
          cta: node.data.cta || undefined
        });
      } else {
        // Regular page handling
        setFormData({
          title: (node.data.label as string) || '',
          description: (node.data.description as string) || '',
          content: (node.data.content as string) || '',
          fields: (node.data.fields as any[]) || [],
          cta: node.data.cta || undefined
        });
        
        // Load fields from database
        if (editingPageId) {
          loadFieldsFromDatabase(editingPageId);
        }
      }
      
      // Reset validation and success states when switching pages
      setValidationErrors([]);
      setShowValidation(false);
      setSaveSuccess(false);
    }
  }, [node, editingPageId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceNavChange = (field: string, value: any) => {
    setServiceNavConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemCountChange = (count: number) => {
    const newItems = [...serviceNavConfig.items];
    // Ensure we have the right number of items
    while (newItems.length < count) {
      newItems.push('');
    }
    // Trim excess items if reducing count
    if (newItems.length > count) {
      newItems.splice(count);
    }
    
    setServiceNavConfig(prev => ({
      ...prev,
      itemCount: count,
      items: newItems
    }));
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...serviceNavConfig.items];
    newItems[index] = value;
    setServiceNavConfig(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const handleCTASave = (cta: any) => {
    setFormData(prev => ({
      ...prev,
      cta: cta
    }));
    setShowCTAEditor(false);
  };

  const handleCTACancel = () => {
    setShowCTAEditor(false);
  };

  const getProjectServiceNavigationConfig = () => {
    try {
      const projects = JSON.parse(localStorage.getItem('govuk-prototypes') || '[]');
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get('projectId');
      
      let currentProject = null;
      if (projectId) {
        currentProject = projects.find((p: any) => p.id === projectId);
      }
      
      if (!currentProject && projects.length > 0) {
        currentProject = projects[0];
      }
      
      return currentProject?.settings?.serviceNavigation || null;
    } catch (error) {
      console.error('Error getting service navigation config:', error);
      return null;
    }
  };

  const saveServiceNavigationToProject = (config: any) => {
    try {
      const projects = JSON.parse(localStorage.getItem('govuk-prototypes') || '[]');
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get('projectId');
      
      let currentProject = null;
      if (projectId) {
        currentProject = projects.find((p: any) => p.id === projectId);
      }
      
      if (!currentProject && projects.length > 0) {
        currentProject = projects[0];
      }
      
      if (currentProject) {
        if (!currentProject.settings) {
          currentProject.settings = {};
        }
        currentProject.settings.serviceNavigation = config;
        
        // Update the project in the array
        const projectIndex = projects.findIndex((p: any) => p.id === currentProject.id);
        if (projectIndex !== -1) {
          projects[projectIndex] = currentProject;
          localStorage.setItem('govuk-prototypes', JSON.stringify(projects));
        }
      }
    } catch (error) {
      console.error('Error saving service navigation to project:', error);
    }
  };

  const addField = () => {
    const newField = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: '',
      hint: '',
      required: false,
      validation: {
        minLength: undefined,
        maxLength: undefined,
        pattern: undefined,
        min: undefined,
        max: undefined
      },
      options: [] // For radio buttons, checkboxes, and select fields
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

  const addFieldOption = (fieldIndex: number) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map((f, i) => 
        i === fieldIndex 
          ? { ...f, options: [...(f.options || []), { value: '', text: '' }] }
          : f
      )
    }));
  };

  const updateFieldOption = (fieldIndex: number, optionIndex: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map((f, i) => 
        i === fieldIndex 
          ? { 
              ...f, 
              options: f.options?.map((opt: any, optIdx: number) => 
                optIdx === optionIndex ? { ...opt, [field]: value } : opt
              ) || []
            }
          : f
      )
    }));
  };

  const removeFieldOption = (fieldIndex: number, optionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map((f, i) => 
        i === fieldIndex 
          ? { ...f, options: f.options?.filter((_: any, optIdx: number) => optIdx !== optionIndex) || [] }
          : f
      )
    }));
  };

  const validateCurrentForm = () => {
    // Only validate fields that have labels (to avoid validating empty template fields)
    const fieldsToValidate = formData.fields.filter(field => field.label && field.label.trim() !== '');
    const errors = validateForm(fieldsToValidate, {});
    setValidationErrors(errors);
    setShowValidation(true);
    return errors.length === 0;
  };

  const applyValidationPreset = (fieldIndex: number, preset: string) => {
    const presets: { [key: string]: any } = {
      name: COMMON_VALIDATIONS.NAME,
      email: COMMON_VALIDATIONS.EMAIL,
      phone: COMMON_VALIDATIONS.PHONE,
      postcode: COMMON_VALIDATIONS.POSTCODE,
      nationalInsurance: COMMON_VALIDATIONS.NATIONAL_INSURANCE
    };

    if (presets[preset]) {
      updateField(fieldIndex, 'validation', presets[preset]);
    }
  };

  const applyTemplate = (template: any) => {
    setFormData(prev => ({
      ...prev,
      title: template.name,
      description: template.description,
      content: template.content,
      fields: template.fields.map((field: any, index: number) => ({
        ...field,
        id: `field-${Date.now()}-${index}` // Generate new unique IDs
      }))
    }));
    setShowTemplates(false);
    setShowValidation(false); // Clear any existing validation errors
  };

  const handleSave = async () => {
    const isServiceNavigation = node?.data.pageType === 'service-navigation';
    
    if (isServiceNavigation) {
      // Validate service navigation
      const hasItems = serviceNavConfig.items.slice(0, serviceNavConfig.itemCount).some(item => item.trim() !== '');
      if (!hasItems) {
        setValidationErrors([{
          field: 'items',
          message: 'At least one navigation item is required',
          type: 'required'
        }]);
        setShowValidation(true);
        return;
      }
    } else {
      // Basic validation for regular pages - only check if title is provided
      if (!formData.title || formData.title.trim() === '') {
        setValidationErrors([{
          field: 'title',
          message: 'Page title is required',
          type: 'required'
        }]);
        setShowValidation(true);
        return;
      }
    }

    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      // Simulate save delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isServiceNavigation) {
        // Save service navigation configuration to project settings
        saveServiceNavigationToProject(serviceNavConfig);
        
        onSave({
          ...node?.data,
          label: formData.title,
          description: formData.description,
          content: formData.content,
          serviceNavConfig: serviceNavConfig
        });
      } else {
        onSave({
          ...node?.data,
          label: formData.title,
          description: formData.description,
          content: formData.content,
          fields: formData.fields
        });
      }
      
      setSaveSuccess(true);
      setShowValidation(false); // Clear validation errors on successful save
      setTimeout(() => setSaveSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (error) {
      console.error('Error saving page:', error);
    } finally {
      setIsSaving(false);
    }
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

  // Show preview mode if enabled
  if (isPreviewMode) {
    return (
      <PagePreview 
        node={{
          ...node,
          data: {
            ...node.data,
            label: formData.title,
            description: formData.description,
            content: formData.content,
            fields: loadedFields.length > 0 ? loadedFields : formData.fields
          }
        }}
        onClose={() => setIsPreviewMode(false)}
      />
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Page Header - Only for non-service-navigation pages */}
        {node.data.pageType !== 'service-navigation' && (
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
        )}

        {/* Service Navigation Configuration or Form Fields Section */}
        {node.data.pageType === 'service-navigation' ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Service Navigation Configuration</h2>
            
            {/* How many items */}
            <div className="mb-6">
              <label htmlFor="itemCount" className="block text-sm font-medium text-gray-700 mb-2">
                How many items
              </label>
              <input
                type="number"
                id="itemCount"
                min="1"
                max="6"
                value={serviceNavConfig.itemCount}
                onChange={(e) => handleItemCountChange(parseInt(e.target.value) || 1)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Navigation Items */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-4">Navigation Items</h3>
              <div className="space-y-4">
                {Array.from({ length: serviceNavConfig.itemCount }, (_, index) => (
                  <div key={index}>
                    <label htmlFor={`item-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Item {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`item-${index}`}
                      value={serviceNavConfig.items[index] || ''}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter navigation item ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Service Name Toggle */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Do you want the navigation to show the service name:
              </p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="showServiceName"
                    checked={serviceNavConfig.showServiceName === true}
                    onChange={() => handleServiceNavChange('showServiceName', true)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="showServiceName"
                    checked={serviceNavConfig.showServiceName === false}
                    onChange={() => handleServiceNavChange('showServiceName', false)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Service Name Input (conditional) */}
            {serviceNavConfig.showServiceName && (
              <div className="mb-6">
                <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  id="serviceName"
                  value={serviceNavConfig.serviceName}
                  onChange={(e) => handleServiceNavChange('serviceName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your service name"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Form Fields</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTemplates(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Use Template
                </button>
                <button
                  onClick={addField}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Field
                </button>
              </div>
            </div>

          {formData.fields.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No form fields added yet.</p>
              <p className="text-sm">Click "Add Field" to start building your form.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {formData.fields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-6">
                  {/* Basic Field Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                        <option value="email">Email Input</option>
                        <option value="number">Number Input</option>
                        <option value="tel">Telephone Input</option>
                        <option value="url">URL Input</option>
                        <option value="password">Password Input</option>
                        <option value="radios">Radio Buttons</option>
                        <option value="checkboxes">Checkboxes</option>
                        <option value="select">Select Dropdown</option>
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

                  {/* Field Options - Only show for radio, checkbox, and select fields */}
                  {(field.type === 'radios' || field.type === 'checkboxes' || field.type === 'select') && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Field Options
                        </label>
                        <button
                          onClick={() => addFieldOption(index)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                        >
                          Add Option
                        </button>
                      </div>
                      
                      {field.options && field.options.length > 0 ? (
                        <div className="space-y-2">
                          {field.options.map((option: any, optionIndex: number) => (
                            <div key={optionIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={option.value}
                                  onChange={(e) => updateFieldOption(index, optionIndex, 'value', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Option value"
                                />
                              </div>
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={option.text}
                                  onChange={(e) => updateFieldOption(index, optionIndex, 'text', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Option text"
                                />
                              </div>
                              <button
                                onClick={() => removeFieldOption(index, optionIndex)}
                                className="px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500 text-sm">
                          No options added yet. Click "Add Option" to create choices.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Validation Rules */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Validation Rules
                      </label>
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            applyValidationPreset(index, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Apply preset...</option>
                        <option value="name">Name validation</option>
                        <option value="email">Email validation</option>
                        <option value="phone">UK Phone validation</option>
                        <option value="postcode">UK Postcode validation</option>
                        <option value="nationalInsurance">National Insurance validation</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(field.type === 'text' || field.type === 'textarea' || field.type === 'email' || field.type === 'tel' || field.type === 'url' || field.type === 'password') && (
                        <>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Minimum Length</label>
                            <input
                              type="number"
                              value={field.validation?.minLength || ''}
                              onChange={(e) => updateField(index, 'validation', { ...field.validation, minLength: e.target.value ? parseInt(e.target.value) : undefined })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Min length"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Maximum Length</label>
                            <input
                              type="number"
                              value={field.validation?.maxLength || ''}
                              onChange={(e) => updateField(index, 'validation', { ...field.validation, maxLength: e.target.value ? parseInt(e.target.value) : undefined })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Max length"
                            />
                          </div>
                        </>
                      )}
                      {field.type === 'number' && (
                        <>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Minimum Value</label>
                            <input
                              type="number"
                              value={field.validation?.min || ''}
                              onChange={(e) => updateField(index, 'validation', { ...field.validation, min: e.target.value ? parseFloat(e.target.value) : undefined })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Min value"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Maximum Value</label>
                            <input
                              type="number"
                              value={field.validation?.max || ''}
                              onChange={(e) => updateField(index, 'validation', { ...field.validation, max: e.target.value ? parseFloat(e.target.value) : undefined })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Max value"
                            />
                          </div>
                        </>
                      )}
                      {(field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'url') && (
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-600 mb-1">Pattern (Regex)</label>
                          <input
                            type="text"
                            value={field.validation?.pattern || ''}
                            onChange={(e) => updateField(index, 'validation', { ...field.validation, pattern: e.target.value || undefined })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., ^[0-9]{10}$ for 10 digits"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Validation Hint */}
                  {field.validation && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start">
                        <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-blue-800">
                          <div className="font-medium mb-1">Validation Rules:</div>
                          <div className="space-y-1">
                            {field.required && <div>• Required field</div>}
                            {field.validation.minLength && <div>• Minimum {field.validation.minLength} characters</div>}
                            {field.validation.maxLength && <div>• Maximum {field.validation.maxLength} characters</div>}
                            {field.validation.pattern && <div>• Must match pattern: {field.validation.pattern}</div>}
                            {field.validation.min !== undefined && <div>• Minimum value: {field.validation.min}</div>}
                            {field.validation.max !== undefined && <div>• Maximum value: {field.validation.max}</div>}
                            {field.validation.customMessage && <div>• Custom message: {field.validation.customMessage}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Field Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
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
                      Remove Field
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>
        )}

        {/* Validation Summary */}
        {showValidation && validationErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-sm font-medium text-red-800">Validation Errors</h3>
            </div>
            <ul className="text-sm text-red-700 space-y-1">
              {validationErrors.map((error, errorIndex) => (
                <li key={errorIndex} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{error.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Validation Success */}
        {showValidation && validationErrors.length === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-green-800">All validation rules are valid</span>
            </div>
          </div>
        )}

        {/* Save Success */}
        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-green-800">Page saved successfully!</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => setIsPreviewMode(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Preview Page
            </button>
            
            <button
              onClick={validateCurrentForm}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              Validate Form
            </button>
            
            <button
              onClick={() => setShowCTAEditor(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Edit CTA Button
            </button>
          </div>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 ${
              isSaving 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>

      {/* Page Templates Modal */}
      {showTemplates && (
        <PageTemplates
          onApplyTemplate={applyTemplate}
          onClose={() => setShowTemplates(false)}
        />
      )}

      {/* CTA Editor Modal */}
      {showCTAEditor && node && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <CTAEditor
              pageType={node.data.pageType as PageType}
              cta={formData.cta}
              onSave={handleCTASave}
              onCancel={handleCTACancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
