'use client';

import { useState, useEffect } from 'react';

interface ComponentVariant {
  name: string;
  preview: string;
  code: {
    html: string;
    nunjucks: string;
  };
}

interface ComponentData {
  name: string;
  description: string;
  preview?: string;
  code?: {
    html: string;
    nunjucks: string;
  };
  variants?: ComponentVariant[];
}

interface ComponentDisplayProps {
  component: ComponentData;
}

interface CodeModalProps {
  component: any;
  isOpen: boolean;
  onClose: () => void;
}

// Code Modal Component
function CodeModal({ component, isOpen, onClose }: CodeModalProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'nunjucks'>('html');

  // Load Prism.js for syntax highlighting
  useEffect(() => {
    if (isOpen) {
      // Load Prism CSS
      const prismCSS = document.createElement('link');
      prismCSS.rel = 'stylesheet';
      prismCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
      document.head.appendChild(prismCSS);

      // Load Prism JS
      const prismJS = document.createElement('script');
      prismJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js';
      prismJS.onload = () => {
        // Load HTML syntax highlighter
        const prismHTML = document.createElement('script');
        prismHTML.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markup.min.js';
        prismHTML.onload = () => {
          // Trigger highlighting
          if ((window as any).Prism) {
            (window as any).Prism.highlightAll();
          }
        };
        document.head.appendChild(prismHTML);
      };
      document.head.appendChild(prismJS);

      return () => {
        // Cleanup Prism elements when modal closes
        const prismElements = document.querySelectorAll('link[href*="prism"], script[src*="prism"]');
        prismElements.forEach(el => el.remove());
      };
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">{component.name} - Code</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('html')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'html'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveTab('nunjucks')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'nunjucks'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Nunjucks
              </button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg overflow-auto max-h-[60vh]">
            <pre className="language-markup">
              <code className="language-markup">{component.code[activeTab]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComponentDisplay({ component }: ComponentDisplayProps) {
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [showCodeModal, setShowCodeModal] = useState(false);

  // Initialize GOV.UK Frontend JavaScript
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

  // Re-initialize components when variant changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).GOVUKFrontend) {
        (window as any).GOVUKFrontend.initAll();
      }
      
      // Always setup manual password input toggle (regardless of GOV.UK Frontend)
      const passwordInputs = document.querySelectorAll('[data-module="govuk-password-input"]');
      
      passwordInputs.forEach((element) => {
        const toggleButton = element.querySelector('.govuk-password-input__toggle') as HTMLButtonElement;
        const passwordInput = element.querySelector('.govuk-password-input__input') as HTMLInputElement;
        
        if (toggleButton && passwordInput) {
          // Remove any existing event listeners to prevent duplicates
          const newButton = toggleButton.cloneNode(true) as HTMLButtonElement;
          toggleButton.parentNode?.replaceChild(newButton, toggleButton);
          
          // Add event listener to the new button
          newButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (passwordInput.type === 'password') {
              passwordInput.type = 'text';
              newButton.textContent = 'Hide';
              newButton.setAttribute('aria-label', 'Hide password');
            } else {
              passwordInput.type = 'password';
              newButton.textContent = 'Show';
              newButton.setAttribute('aria-label', 'Show password');
            }
          });
        }
      });

      // Always setup manual radio conditional content toggle (regardless of GOV.UK Frontend)
      const radioGroups = document.querySelectorAll('[data-module="govuk-radios"]');
      
      radioGroups.forEach((element) => {
        const radioInputs = element.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
        const conditionalDivs = element.querySelectorAll('.govuk-radios__conditional') as NodeListOf<HTMLElement>;
        
        // Hide all conditional divs by default
        conditionalDivs.forEach(div => {
          div.classList.add('govuk-radios__conditional--hidden');
        });
        
        radioInputs.forEach((radioInput) => {
          // Remove any existing event listeners to prevent duplicates
          const newRadio = radioInput.cloneNode(true) as HTMLInputElement;
          radioInput.parentNode?.replaceChild(newRadio, radioInput);
          
          // Add event listener to the new radio
          newRadio.addEventListener('change', () => {
            // Hide all conditional divs first
            conditionalDivs.forEach(div => {
              div.classList.add('govuk-radios__conditional--hidden');
            });
            
            // Show the conditional div for the selected radio (toggle behavior)
            if (newRadio.checked) {
              const conditionalId = newRadio.getAttribute('data-aria-controls');
              if (conditionalId) {
                const conditionalDiv = document.getElementById(conditionalId);
                if (conditionalDiv) {
                  conditionalDiv.classList.remove('govuk-radios__conditional--hidden');
                }
              }
            }
          });
        });
      });
    }, 200);
    
    return () => clearTimeout(timer);
  }, [selectedVariant, component]);

  const currentPreview = component.variants 
    ? component.variants[selectedVariant]?.preview || component.preview
    : component.preview;

  const currentCode = component.variants 
    ? component.variants[selectedVariant]?.code || component.code
    : component.code;

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{component.name}</h2>
        <p className="text-lg text-gray-600">{component.description}</p>
      </div>

      {/* Variants (if available) */}
      {component.variants && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Examples</h3>
          <div className="flex flex-wrap gap-2">
            {component.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(index)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  selectedVariant === index
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Component Preview */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Component Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {component.variants 
                  ? component.variants[selectedVariant]?.name || component.name
                  : component.name
                }
              </h3>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setShowCodeModal(true);
                }}
                className="btn-secondary text-sm"
              >
                View Code
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="p-8 bg-gray-50">
          <div 
            className="bg-white p-6 rounded border govuk-preview-container"
            dangerouslySetInnerHTML={{ __html: currentPreview || '' }}
            style={{
              fontFamily: '"GDS Transport", Arial, sans-serif',
              fontSize: '19px',
              lineHeight: '1.25'
            }}
          />
        </div>
      </div>

      {/* Code Modal */}
      <CodeModal
        component={{
          ...component,
          code: currentCode
        }}
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
      />
    </>
  );
}
