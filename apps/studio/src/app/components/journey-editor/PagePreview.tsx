'use client';

import { Node } from '@xyflow/react';
import { useEffect, useState } from 'react';

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
    const govukStyles = {
      formGroup: {
        marginBottom: '20px'
      },
      label: {
        fontSize: '19px',
        fontWeight: '400',
        color: '#0b0c0c',
        marginBottom: '5px',
        display: 'block'
      },
      hint: {
        fontSize: '16px',
        color: '#626a6e',
        marginBottom: '15px',
        display: 'block'
      },
      input: {
        fontSize: '19px',
        fontFamily: 'inherit',
        border: '2px solid #0b0c0c',
        borderRadius: '0',
        padding: '5px 4px 4px',
        boxSizing: 'border-box' as const,
        width: '100%',
        maxWidth: '320px'
      },
      textarea: {
        fontSize: '19px',
        fontFamily: 'inherit',
        border: '2px solid #0b0c0c',
        borderRadius: '0',
        padding: '5px 4px 4px',
        boxSizing: 'border-box' as const,
        width: '100%',
        maxWidth: '100%',
        minHeight: '100px'
      },
      fieldset: {
        border: 'none',
        margin: 0,
        padding: 0
      },
      legend: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#0b0c0c',
        marginBottom: '15px',
        padding: 0
      },
      radioGroup: {
        marginTop: '15px'
      },
      radioItem: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '10px'
      },
      radioInput: {
        width: '40px',
        height: '40px',
        margin: '0 15px 0 0',
        cursor: 'pointer'
      },
      radioLabel: {
        fontSize: '19px',
        color: '#0b0c0c',
        cursor: 'pointer',
        paddingTop: '8px'
      },
      select: {
        fontSize: '19px',
        fontFamily: 'inherit',
        border: '2px solid #0b0c0c',
        borderRadius: '0',
        padding: '5px 4px 4px',
        boxSizing: 'border-box' as const,
        width: '100%',
        maxWidth: '320px',
        backgroundColor: 'white'
      }
    };
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
      case 'password':
        return (
          <div style={govukStyles.formGroup}>
            <label style={govukStyles.label} htmlFor={fieldId}>
              {field.label}
            </label>
            {field.hint && (
              <div style={govukStyles.hint} id={`${fieldId}-hint`}>
                {field.hint}
              </div>
            )}
            <input
              style={govukStyles.input}
              id={fieldId}
              name={fieldId}
              type={field.type}
              aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
              required={field.required}
            />
          </div>
        );

      case 'number':
        return (
          <div style={govukStyles.formGroup}>
            <label style={govukStyles.label} htmlFor={fieldId}>
              {field.label}
            </label>
            {field.hint && (
              <div style={govukStyles.hint} id={`${fieldId}-hint`}>
                {field.hint}
              </div>
            )}
            <input
              style={{...govukStyles.input, maxWidth: '100px'}}
              id={fieldId}
              name={fieldId}
              type="number"
              aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
              required={field.required}
            />
          </div>
        );

      case 'textarea':
        return (
          <div style={govukStyles.formGroup}>
            <label style={govukStyles.label} htmlFor={fieldId}>
              {field.label}
            </label>
            {field.hint && (
              <div style={govukStyles.hint} id={`${fieldId}-hint`}>
                {field.hint}
              </div>
            )}
            <textarea
              style={govukStyles.textarea}
              id={fieldId}
              name={fieldId}
              rows={5}
              aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
              required={field.required}
            />
          </div>
        );

      case 'radios':
        return (
          <div style={govukStyles.formGroup}>
            <fieldset style={govukStyles.fieldset}>
              <legend style={govukStyles.legend}>
                {field.label}
              </legend>
              {field.hint && (
                <div style={govukStyles.hint} id={`${fieldId}-hint`}>
                  {field.hint}
                </div>
              )}
              <div style={govukStyles.radioGroup}>
                {field.options?.map((option: any, optionIndex: number) => (
                  <div key={optionIndex} style={govukStyles.radioItem}>
                    <input
                      style={govukStyles.radioInput}
                      id={`${fieldId}-${optionIndex}`}
                      name={fieldId}
                      type="radio"
                      value={option.value}
                      aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
                      required={field.required}
                    />
                    <label style={govukStyles.radioLabel} htmlFor={`${fieldId}-${optionIndex}`}>
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
          <div style={govukStyles.formGroup}>
            <fieldset style={govukStyles.fieldset}>
              <legend style={govukStyles.legend}>
                {field.label}
              </legend>
              {field.hint && (
                <div style={govukStyles.hint} id={`${fieldId}-hint`}>
                  {field.hint}
                </div>
              )}
              <div style={govukStyles.radioGroup}>
                {field.options?.map((option: any, optionIndex: number) => (
                  <div key={optionIndex} style={govukStyles.radioItem}>
                    <input
                      style={govukStyles.radioInput}
                      id={`${fieldId}-${optionIndex}`}
                      name={`${fieldId}[]`}
                      type="checkbox"
                      value={option.value}
                      aria-describedby={field.hint ? `${fieldId}-hint` : undefined}
                      required={field.required}
                    />
                    <label style={govukStyles.radioLabel} htmlFor={`${fieldId}-${optionIndex}`}>
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
          <div style={govukStyles.formGroup}>
            <label style={govukStyles.label} htmlFor={fieldId}>
              {field.label}
            </label>
            {field.hint && (
              <div style={govukStyles.hint} id={`${fieldId}-hint`}>
                {field.hint}
              </div>
            )}
            <select
              style={govukStyles.select}
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
          <div style={govukStyles.formGroup}>
            <fieldset style={govukStyles.fieldset}>
              <legend style={govukStyles.legend}>
                {field.label}
              </legend>
              {field.hint && (
                <div style={govukStyles.hint} id={`${fieldId}-hint`}>
                  {field.hint}
                </div>
              )}
              <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
                <div>
                  <label style={{...govukStyles.label, fontSize: '16px'}} htmlFor={`${fieldId}-day`}>
                    Day
                  </label>
                  <input 
                    style={{...govukStyles.input, maxWidth: '60px'}} 
                    id={`${fieldId}-day`} 
                    name={`${fieldId}-day`} 
                    type="text" 
                    pattern="[0-9]*" 
                  />
                </div>
                <div>
                  <label style={{...govukStyles.label, fontSize: '16px'}} htmlFor={`${fieldId}-month`}>
                    Month
                  </label>
                  <input 
                    style={{...govukStyles.input, maxWidth: '60px'}} 
                    id={`${fieldId}-month`} 
                    name={`${fieldId}-month`} 
                    type="text" 
                    pattern="[0-9]*" 
                  />
                </div>
                <div>
                  <label style={{...govukStyles.label, fontSize: '16px'}} htmlFor={`${fieldId}-year`}>
                    Year
                  </label>
                  <input 
                    style={{...govukStyles.input, maxWidth: '80px'}} 
                    id={`${fieldId}-year`} 
                    name={`${fieldId}-year`} 
                    type="text" 
                    pattern="[0-9]*" 
                  />
                </div>
              </div>
            </fieldset>
          </div>
        );

      case 'file':
        return (
          <div style={govukStyles.formGroup}>
            <label style={govukStyles.label} htmlFor={fieldId}>
              {field.label}
            </label>
            {field.hint && (
              <div style={govukStyles.hint} id={`${fieldId}-hint`}>
                {field.hint}
              </div>
            )}
            <input
              style={govukStyles.input}
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

  // Get project data from localStorage (this would come from context in a real app)
  const getProjectData = () => {
    try {
      const projects = JSON.parse(localStorage.getItem('govuk-prototypes') || '[]');
      // Get the project ID from the URL or use a fallback
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get('projectId');
      
      let currentProject = null;
      if (projectId) {
        currentProject = projects.find((p: any) => p.id === projectId);
      }
      
      // Fallback to first project if specific one not found
      if (!currentProject && projects.length > 0) {
        currentProject = projects[0];
      }
      
      // Default fallback
      if (!currentProject) {
        currentProject = {
          name: 'GOV.UK Prototype',
          settings: {
            serviceName: 'Sample Service',
            phase: 'beta',
            showPhaseBanner: true
          }
        };
      }
      
      return currentProject;
    } catch {
      return {
        name: 'GOV.UK Prototype',
        settings: {
          serviceName: 'Sample Service',
          phase: 'beta',
          showPhaseBanner: true
        }
      };
    }
  };

  const project = getProjectData();
  const serviceName = project.settings?.serviceName || project.name;
  
  // Check if there's a service navigation configured for the project
  // Only show navigation bar on non-service-navigation pages
  const hasServiceNavigation = project.settings?.serviceNavigation && node.data.pageType !== 'service-navigation';
  const serviceNavData = hasServiceNavigation ? getServiceNavigationData(project.settings?.serviceNavigation) : null;
  
  // Helper function to extract service navigation data from config
  function getServiceNavigationData(config: any) {
    if (!config) return null;
    
    const navItems = [];
    for (let i = 0; i < config.itemCount; i++) {
      const item = config.items[i];
      if (item && item.trim()) {
        navItems.push({
          text: item.trim(),
          href: '#',
          current: i === 0 // Make first item current by default
        });
      }
    }
    
    return {
      serviceName: config.showServiceName ? config.serviceName : '',
      navigation: navItems
    };
  }

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      {/* Preview Controls - Fixed at top */}
      <div className="bg-gray-100 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Page Preview</h2>
            <p className="text-sm text-gray-600">This is how your page will look to users</p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            Close Preview
          </button>
        </div>
      </div>

      {/* Full GOV.UK Page Structure */}
      <div className="govuk-template" style={{ fontFamily: 'GDS Transport, arial, sans-serif', backgroundColor: 'white' }}>
        {/* Skip link */}
        <a href="#main-content" className="govuk-skip-link" style={{ position: 'absolute', left: '-9999px' }}>Skip to main content</a>
        
        {/* Header - Modern Blue GOV.UK Header */}
        <header className="govuk-header" role="banner" style={{ 
          backgroundColor: '#1d70b8',
          color: 'white'
        }}>
          <div className="govuk-header__container" style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '0 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '60px'
          }}>
            <div className="govuk-header__logo">
              <a href="#" className="govuk-header__link govuk-header__link--homepage" style={{
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center'
              }}>
                {/* GOV.UK Crest and Wordmark */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                  role="img"
                  viewBox="0 0 324 60"
                  height="30"
                  width="162"
                  fill="currentColor"
                  aria-label="GOV.UK"
                  className="govuk-header__logotype"
                >
                  <title>GOV.UK</title>
                  <g>
                    {/* Tudor Crown */}
                    <circle cx="20" cy="17.6" r="3.7"></circle>
                    <circle cx="10.2" cy="23.5" r="3.7"></circle>
                    <circle cx="3.7" cy="33.2" r="3.7"></circle>
                    <circle cx="31.7" cy="30.6" r="3.7"></circle>
                    <circle cx="43.3" cy="17.6" r="3.7"></circle>
                    <circle cx="53.2" cy="23.5" r="3.7"></circle>
                    <circle cx="59.7" cy="33.2" r="3.7"></circle>
                    <circle cx="31.7" cy="30.6" r="3.7"></circle>
                    <path d="M33.1,9.8c.2-.1.3-.3.5-.5l4.6,2.4v-6.8l-4.6,1.5c-.1-.2-.3-.3-.5-.5l1.9-5.9h-6.7l1.9,5.9c-.2.1-.3.3-.5.5l-4.6-1.5v6.8l4.6-2.4c.1.2.3.3.5.5l-2.6,8c-.9,2.8,1.2,5.7,4.1,5.7h0c3,0,5.1-2.9,4.1-5.7l-2.6-8ZM37,37.9s-3.4,3.8-4.1,6.1c2.2,0,4.2-.5,6.4-2.8l-.7,8.5c-2-2.8-4.4-4.1-5.7-3.8.1,3.1.5,6.7,5.8,7.2,3.7.3,6.7-1.5,7-3.8.4-2.6-2-4.3-3.7-1.6-1.4-4.5,2.4-6.1,4.9-3.2-1.9-4.5-1.8-7.7,2.4-10.9,3,4,2.6,7.3-1.2,11.1,2.4-1.3,6.2,0,4,4.6-1.2-2.8-3.7-2.2-4.2.2-.3,1.7.7,3.7,3,4.2,1.9.3,4.7-.9,7-5.9-1.3,0-2.4.7-3.9,1.7l2.4-8c.6,2.3,1.4,3.7,2.2,4.5.6-1.6.5-2.8,0-5.3l5,1.8c-2.6,3.6-5.2,8.7-7.3,17.5-7.4-1.1-15.7-1.7-24.5-1.7h0c-8.8,0-17.1.6-24.5,1.7-2.1-8.9-4.7-13.9-7.3-17.5l5-1.8c-.5,2.5-.6,3.7,0,5.3.8-.8,1.6-2.3,2.2-4.5l2.4,8c-1.5-1-2.6-1.7-3.9-1.7,2.3,5,5.2,6.2,7,5.9,2.3-.4,3.3-2.4,3-4.2-.5-2.4-3-3.1-4.2-.2-2.2-4.6,1.6-6,4-4.6-3.7-3.7-4.2-7.1-1.2-11.1,4.2,3.2,4.3,6.4,2.4,10.9,2.5-2.8,6.3-1.3,4.9,3.2-1.8-2.7-4.1-1-3.7,1.6.3,2.3,3.3,4.1,7,3.8,5.4-.5,5.7-4.2,5.8-7.2-1.3-.2-3.7,1-5.7,3.8l-.7-8.5c2.2,2.3,4.2,2.7,6.4,2.8-.7-2.3-4.1-6.1-4.1-6.1h10.6,0Z"></path>
                  </g>
                  {/* Crown dot */}
                  <circle className="govuk-logo-dot" cx="227" cy="36" r="7.3"></circle>
                  {/* GOV.UK Text */}
                  <path d="M94.7,36.1c0,1.9.2,3.6.7,5.4.5,1.7,1.2,3.2,2.1,4.5.9,1.3,2.2,2.4,3.6,3.2,1.5.8,3.2,1.2,5.3,1.2s3.6-.3,4.9-.9c1.3-.6,2.3-1.4,3.1-2.3.8-.9,1.3-2,1.6-3,.3-1.1.5-2.1.5-3v-.4h-11v-6.6h19.5v24h-7.7v-5.4c-.5.8-1.2,1.6-2,2.3-.8.7-1.7,1.3-2.7,1.8-1,.5-2.1.9-3.3,1.2-1.2.3-2.5.4-3.8.4-3.2,0-6-.6-8.4-1.7-2.5-1.1-4.5-2.7-6.2-4.7-1.7-2-3-4.4-3.8-7.1-.9-2.7-1.3-5.6-1.3-8.7s.5-6,1.5-8.7,2.4-5.1,4.2-7.1c1.8-2,4-3.6,6.5-4.7s5.4-1.7,8.6-1.7s4,.2,5.9.7c1.8.5,3.5,1.1,5.1,2,1.5.9,2.9,1.9,4,3.2,1.2,1.2,2.1,2.6,2.8,4.1l-7.7,4.3c-.5-.9-1-1.8-1.6-2.6-.6-.8-1.3-1.5-2.2-2.1-.8-.6-1.7-1-2.8-1.4-1-.3-2.2-.5-3.5-.5-2,0-3.8.4-5.3,1.2s-2.7,1.9-3.6,3.2c-.9,1.3-1.7,2.8-2.1,4.6s-.7,3.5-.7,5.3v.3h0ZM152.9,13.7c3.2,0,6.1.6,8.7,1.7,2.6,1.2,4.7,2.7,6.5,4.7,1.8,2,3.1,4.4,4.1,7.1s1.4,5.6,1.4,8.7-.5,6-1.4,8.7c-.9,2.7-2.3,5.1-4.1,7.1s-4,3.6-6.5,4.7c-2.6,1.1-5.5,1.7-8.7,1.7s-6.1-.6-8.7-1.7c-2.6-1.1-4.7-2.7-6.5-4.7-1.8-2-3.1-4.4-4.1-7.1-.9-2.7-1.4-5.6-1.4-8.7s.5-6,1.4-8.7,2.3-5.1,4.1-7.1c1.8-2,4-3.6,6.5-4.7s5.4-1.7,8.7-1.7h0ZM152.9,50.4c1.9,0,3.6-.4,5-1.1,1.4-.7,2.7-1.7,3.6-3,1-1.3,1.7-2.8,2.2-4.5.5-1.7.8-3.6.8-5.7v-.2c0-2-.3-3.9-.8-5.7-.5-1.7-1.3-3.3-2.2-4.5-1-1.3-2.2-2.3-3.6-3-1.4-.7-3.1-1.1-5-1.1s-3.6.4-5,1.1c-1.5.7-2.7,1.7-3.6,3s-1.7,2.8-2.2,4.5c-.5,1.7-.8,3.6-.8,5.7v.2c0,2.1.3,4,.8,5.7.5,1.7,1.2,3.2,2.2,4.5,1,1.3,2.2,2.3,3.6,3,1.5.7,3.1,1.1,5,1.1ZM189.1,58l-12.3-44h9.8l8.4,32.9h.3l8.2-32.9h9.7l-12.3,44M262.9,50.4c1.3,0,2.5-.2,3.6-.6,1.1-.4,2-.9,2.8-1.7.8-.8,1.4-1.7,1.9-2.9.5-1.2.7-2.5.7-4.1V14h8.6v28.5c0,2.4-.4,4.6-1.3,6.6-.9,2-2.1,3.6-3.7,5-1.6,1.4-3.4,2.4-5.6,3.2-2.2.7-4.5,1.1-7.1,1.1s-4.9-.4-7.1-1.1c-2.2-.7-4-1.8-5.6-3.2s-2.8-3-3.7-5c-.9-2-1.3-4.1-1.3-6.6V14h8.7v27.2c0,1.6.2,2.9.7,4.1.5,1.2,1.1,2.1,1.9,2.9.8.8,1.7,1.3,2.8,1.7s2.3.6,3.6.6h0ZM288.5,14h8.7v19.1l15.5-19.1h10.8l-15.1,17.6,16.1,26.4h-10.2l-11.5-19.7-5.6,6.3v13.5h-8.7"></path>
                </svg>
              </a>
            </div>
            
            {serviceName && serviceName !== 'Sample Service' && (
              <div className="govuk-header__service-name" style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {serviceName}
              </div>
            )}
          </div>
        </header>

        {/* Service Navigation */}
        {hasServiceNavigation && serviceNavData && serviceNavData.navigation.length > 0 && (
          <nav className="govuk-service-navigation" aria-label="Service navigation" style={{
            backgroundColor: '#f8f8f8',
            borderBottom: '1px solid #b1b4b6',
            padding: '10px 0'
          }}>
            <div style={{
              maxWidth: '960px',
              margin: '0 auto',
              padding: '0 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {/* Service Name */}
              {serviceNavData.serviceName && (
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#0b0c0c',
                  marginRight: '30px'
                }}>
                  {serviceNavData.serviceName}
                </div>
              )}
              
              {/* Navigation Items */}
              <ul style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                gap: '30px'
              }}>
                {serviceNavData.navigation.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href}
                      style={{
                        color: item.current ? '#1d70b8' : '#1d70b8',
                        textDecoration: item.current ? 'underline' : 'none',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        padding: '8px 0'
                      }}
                      {...(item.current && { 'aria-current': 'page' })}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        {/* Phase Banner */}
        {project.settings?.showPhaseBanner && project.settings?.phase && (
          <div style={{
            borderBottom: '1px solid #b1b4b6',
            padding: '10px 0'
          }}>
            <div style={{
              maxWidth: '960px',
              margin: '0 auto',
              padding: '0 15px'
            }}>
              <p style={{ margin: 0, fontSize: '16px' }}>
                <strong style={{
                  backgroundColor: project.settings.phase === 'alpha' ? '#d4351c' : '#1d70b8',
                  color: 'white',
                  padding: '2px 8px',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginRight: '10px'
                }}>
                  {project.settings.phase}
                </strong>
                This is a new service – your feedback will help us to improve it.
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div style={{
          backgroundColor: 'white',
          minHeight: 'calc(100vh - 200px)'
        }}>
          <div style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '30px 15px'
          }}>
          <main id="main-content" role="main">
            <div style={{ maxWidth: '640px' }}>
              {node.data.pageType === 'service-navigation' ? (
                // Service Navigation Page - Configuration View Only
                <div>
                  <h1 style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    lineHeight: '1.09375',
                    marginBottom: '30px',
                    color: '#0b0c0c'
                  }}>
                    Service Navigation Configuration
                  </h1>
                  
                  <div style={{
                    backgroundColor: '#f3f2f1',
                    border: '2px solid #1d70b8',
                    padding: '20px',
                    borderRadius: '4px',
                    marginBottom: '30px'
                  }}>
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      marginBottom: '15px',
                      color: '#0b0c0c'
                    }}>
                      Configuration Status
                    </h2>
                    <p style={{ fontSize: '16px', color: '#0b0c0c', marginBottom: '15px' }}>
                      Use the page editor to configure your service navigation. The navigation will appear on all other pages of your prototype.
                    </p>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '15px',
                      border: '1px solid #b1b4b6',
                      borderRadius: '2px'
                    }}>
                      <p style={{ color: '#626a6e', fontStyle: 'italic', margin: 0 }}>
                        Configure your navigation using the form in the page editor.
                      </p>
                    </div>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#d5e8f3',
                    padding: '20px',
                    borderRadius: '4px',
                    marginBottom: '30px'
                  }}>
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      marginBottom: '15px',
                      color: '#0b0c0c'
                    }}>
                      How to use
                    </h2>
                    <ol style={{ paddingLeft: '20px', marginBottom: '0' }}>
                      <li style={{ marginBottom: '10px' }}>
                        Configure your navigation items using the form in the page editor
                      </li>
                      <li style={{ marginBottom: '10px' }}>
                        Click "Save Changes" to apply the configuration
                      </li>
                      <li style={{ marginBottom: '10px' }}>
                        The navigation will appear on all other pages in your prototype
                      </li>
                      <li>
                        You can edit the navigation at any time by returning to this page
                      </li>
                    </ol>
                  </div>
                </div>
              ) : (
                // Regular page view
                <div>
                  <h1 style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    lineHeight: '1.09375',
                    marginBottom: '30px',
                    color: '#0b0c0c'
                  }}>
                    {pageTitle}
                  </h1>
              
                  {pageContent && (
                    <div style={{ marginBottom: '30px' }}>
                      <p style={{ fontSize: '19px', lineHeight: '1.31579', color: '#0b0c0c' }}>
                        {pageContent}
                      </p>
                    </div>
                  )}
              
                  {fields.length > 0 ? (
                    <form style={{ marginBottom: '30px' }}>
                      {fields.map((field: any, index: number) => (
                        <div key={index} style={{ marginBottom: '30px' }}>
                          {renderFormField(field, index)}
                        </div>
                      ))}
                      
                      <button
                        type="submit"
                        style={{
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
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#005a30';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = '#00703c';
                        }}
                      >
                        Continue
                      </button>
                    </form>
                  ) : (
                    <div style={{
                      padding: '20px',
                      backgroundColor: '#f8f8f8',
                      border: '2px dashed #b1b4b6',
                      textAlign: 'center' as const,
                      color: '#626a6e'
                    }}>
                      <p style={{ margin: 0, fontStyle: 'italic' }}>
                        No form fields added to this page yet. Add fields using the page editor.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          backgroundColor: '#f3f2f1',
          borderTop: '1px solid #b1b4b6',
          marginTop: '50px',
          padding: '25px 0'
        }}>
          <div style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '0 15px'
          }}>
            <div style={{ 
              borderTop: '1px solid #b1b4b6',
              paddingTop: '20px'
            }}>
              <ul style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexWrap: 'wrap' as const,
                gap: '30px',
                marginBottom: '30px'
              }}>
                <li>
                  <a href="#" style={{
                    color: '#1d70b8',
                    textDecoration: 'underline',
                    fontSize: '14px'
                  }}>
                    Help
                  </a>
                </li>
                <li>
                  <a href="#" style={{
                    color: '#1d70b8',
                    textDecoration: 'underline',
                    fontSize: '14px'
                  }}>
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" style={{
                    color: '#1d70b8',
                    textDecoration: 'underline',
                    fontSize: '14px'
                  }}>
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" style={{
                    color: '#1d70b8',
                    textDecoration: 'underline',
                    fontSize: '14px'
                  }}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" style={{
                    color: '#1d70b8',
                    textDecoration: 'underline',
                    fontSize: '14px'
                  }}>
                    Terms and conditions
                  </a>
                </li>
              </ul>
              
              {/* Crown Copyright with Tudor Crown Crest */}
              <div style={{
                borderTop: '1px solid #b1b4b6',
                paddingTop: '20px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                  role="img"
                  viewBox="0 0 63 60"
                  height="18"
                  width="19"
                  fill="#626a6e"
                  aria-label="Tudor Crown"
                  style={{ marginRight: '10px' }}
                >
                  <title>Tudor Crown</title>
                  <g>
                    <circle cx="20" cy="17.6" r="3.7"></circle>
                    <circle cx="10.2" cy="23.5" r="3.7"></circle>
                    <circle cx="3.7" cy="33.2" r="3.7"></circle>
                    <circle cx="31.7" cy="30.6" r="3.7"></circle>
                    <circle cx="43.3" cy="17.6" r="3.7"></circle>
                    <circle cx="53.2" cy="23.5" r="3.7"></circle>
                    <circle cx="59.7" cy="33.2" r="3.7"></circle>
                    <circle cx="31.7" cy="30.6" r="3.7"></circle>
                    <path d="M33.1,9.8c.2-.1.3-.3.5-.5l4.6,2.4v-6.8l-4.6,1.5c-.1-.2-.3-.3-.5-.5l1.9-5.9h-6.7l1.9,5.9c-.2.1-.3.3-.5.5l-4.6-1.5v6.8l4.6-2.4c.1.2.3.3.5.5l-2.6,8c-.9,2.8,1.2,5.7,4.1,5.7h0c3,0,5.1-2.9,4.1-5.7l-2.6-8ZM37,37.9s-3.4,3.8-4.1,6.1c2.2,0,4.2-.5,6.4-2.8l-.7,8.5c-2-2.8-4.4-4.1-5.7-3.8.1,3.1.5,6.7,5.8,7.2,3.7.3,6.7-1.5,7-3.8.4-2.6-2-4.3-3.7-1.6-1.4-4.5,2.4-6.1,4.9-3.2-1.9-4.5-1.8-7.7,2.4-10.9,3,4,2.6,7.3-1.2,11.1,2.4-1.3,6.2,0,4,4.6-1.2-2.8-3.7-2.2-4.2.2-.3,1.7.7,3.7,3,4.2,1.9.3,4.7-.9,7-5.9-1.3,0-2.4.7-3.9,1.7l2.4-8c.6,2.3,1.4,3.7,2.2,4.5.6-1.6.5-2.8,0-5.3l5,1.8c-2.6,3.6-5.2,8.7-7.3,17.5-7.4-1.1-15.7-1.7-24.5-1.7h0c-8.8,0-17.1.6-24.5,1.7-2.1-8.9-4.7-13.9-7.3-17.5l5-1.8c-.5,2.5-.6,3.7,0,5.3.8-.8,1.6-2.3,2.2-4.5l2.4,8c-1.5-1-2.6-1.7-3.9-1.7,2.3,5,5.2,6.2,7,5.9,2.3-.4,3.3-2.4,3-4.2-.5-2.4-3-3.1-4.2-.2-2.2-4.6,1.6-6,4-4.6-3.7-3.7-4.2-7.1-1.2-11.1,4.2,3.2,4.3,6.4,2.4,10.9,2.5-2.8,6.3-1.3,4.9,3.2-1.8-2.7-4.1-1-3.7,1.6.3,2.3,3.3,4.1,7,3.8,5.4-.5,5.7-4.2,5.8-7.2-1.3-.2-3.7,1-5.7,3.8l-.7-8.5c2.2,2.3,4.2,2.7,6.4,2.8-.7-2.3-4.1-6.1-4.1-6.1h10.6,0Z"></path>
                  </g>
                </svg>
                <span style={{
                  fontSize: '14px',
                  color: '#626a6e'
                }}>
                  © Crown copyright
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
