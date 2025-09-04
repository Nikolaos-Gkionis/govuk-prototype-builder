'use client';

interface PageTemplate {
  id: string;
  name: string;
  description: string;
  pageType: string;
  fields: any[];
  content: string;
  icon: string;
}

const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: 'personal-details',
    name: 'Personal Details',
    description: 'Collect basic personal information',
    pageType: 'question',
    content: 'Please provide your personal details so we can process your application.',
    icon: '👤',
    fields: [
      {
        id: 'field-1',
        type: 'text',
        label: 'Full name',
        hint: 'Enter your full name as it appears on official documents',
        required: true,
        validation: {
          required: true,
          minLength: 2,
          maxLength: 100,
          pattern: '^[A-Za-z\\s]+$',
          customMessage: 'Name must contain only letters and spaces'
        }
      },
      {
        id: 'field-2',
        type: 'email',
        label: 'Email address',
        hint: 'We\'ll use this to contact you about your application',
        required: true,
        validation: {
          required: true,
          maxLength: 254
        }
      },
      {
        id: 'field-3',
        type: 'tel',
        label: 'Phone number',
        hint: 'Enter your UK phone number',
        required: true,
        validation: {
          required: true,
          pattern: '^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$',
          customMessage: 'Enter a valid UK phone number'
        }
      },
      {
        id: 'field-4',
        type: 'date',
        label: 'Date of birth',
        hint: 'Enter your date of birth',
        required: true,
        validation: {
          required: true
        }
      }
    ]
  },
  {
    id: 'address-details',
    name: 'Address Details',
    description: 'Collect address information',
    pageType: 'question',
    content: 'Please provide your address details.',
    icon: '🏠',
    fields: [
      {
        id: 'field-1',
        type: 'textarea',
        label: 'Address line 1',
        hint: 'Enter your house number and street name',
        required: true,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 100
        }
      },
      {
        id: 'field-2',
        type: 'text',
        label: 'Address line 2',
        hint: 'Enter your town or city',
        required: false,
        validation: {
          maxLength: 100
        }
      },
      {
        id: 'field-3',
        type: 'text',
        label: 'Postcode',
        hint: 'Enter your UK postcode',
        required: true,
        validation: {
          required: true,
          pattern: '^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$',
          customMessage: 'Enter a valid UK postcode'
        }
      }
    ]
  },
  {
    id: 'contact-preferences',
    name: 'Contact Preferences',
    description: 'How would you like to be contacted?',
    pageType: 'question',
    content: 'How would you like us to contact you about your application?',
    icon: '📞',
    fields: [
      {
        id: 'field-1',
        type: 'radios',
        label: 'Preferred contact method',
        hint: 'Choose how you\'d like us to contact you',
        required: true,
        validation: {
          required: true
        },
        options: [
          { value: 'email', text: 'Email' },
          { value: 'phone', text: 'Phone call' },
          { value: 'post', text: 'Post' },
          { value: 'sms', text: 'Text message' }
        ]
      },
      {
        id: 'field-2',
        type: 'checkboxes',
        label: 'Contact times',
        hint: 'When is it convenient for us to contact you?',
        required: false,
        options: [
          { value: 'morning', text: 'Morning (9am - 12pm)' },
          { value: 'afternoon', text: 'Afternoon (12pm - 5pm)' },
          { value: 'evening', text: 'Evening (5pm - 8pm)' },
          { value: 'weekend', text: 'Weekend' }
        ]
      }
    ]
  },
  {
    id: 'file-upload',
    name: 'Document Upload',
    description: 'Upload required documents',
    pageType: 'question',
    content: 'Please upload the required documents to support your application.',
    icon: '📄',
    fields: [
      {
        id: 'field-1',
        type: 'file',
        label: 'Identity document',
        hint: 'Upload a copy of your passport, driving licence, or other identity document',
        required: true,
        validation: {
          required: true
        }
      },
      {
        id: 'field-2',
        type: 'file',
        label: 'Proof of address',
        hint: 'Upload a recent utility bill, bank statement, or council tax bill',
        required: true,
        validation: {
          required: true
        }
      },
      {
        id: 'field-3',
        type: 'file',
        label: 'Additional documents',
        hint: 'Upload any other supporting documents (optional)',
        required: false
      }
    ]
  },
  {
    id: 'confirmation',
    name: 'Application Confirmation',
    description: 'Confirm your application details',
    pageType: 'check-answers',
    content: 'Please review your application details before submitting.',
    icon: '✅',
    fields: []
  },
  {
    id: 'success',
    name: 'Application Submitted',
    description: 'Your application has been submitted successfully',
    pageType: 'confirmation',
    content: 'Thank you for your application. We have received your submission and will process it within 5 working days.',
    icon: '🎉',
    fields: []
  },
  {
    id: 'eligibility-check',
    name: 'Eligibility Check',
    description: 'Check if you\'re eligible for this service',
    pageType: 'question',
    content: 'Before we proceed, please answer a few questions to check your eligibility.',
    icon: '🔍',
    fields: [
      {
        id: 'field-1',
        type: 'radios',
        label: 'Are you over 18?',
        hint: 'You must be over 18 to use this service',
        required: true,
        validation: {
          required: true
        },
        options: [
          { value: 'yes', text: 'Yes' },
          { value: 'no', text: 'No' }
        ]
      },
      {
        id: 'field-2',
        type: 'radios',
        label: 'Do you live in the UK?',
        hint: 'This service is only available to UK residents',
        required: true,
        validation: {
          required: true
        },
        options: [
          { value: 'yes', text: 'Yes' },
          { value: 'no', text: 'No' }
        ]
      },
      {
        id: 'field-3',
        type: 'checkboxes',
        label: 'I confirm that:',
        hint: 'Please confirm the following statements',
        required: true,
        validation: {
          required: true
        },
        options: [
          { value: 'truthful', text: 'The information I provide is truthful and accurate' },
          { value: 'understand', text: 'I understand the terms and conditions' },
          { value: 'consent', text: 'I consent to my data being processed' }
        ]
      }
    ]
  }
];

interface PageTemplatesProps {
  onApplyTemplate: (template: PageTemplate) => void;
  onClose: () => void;
}

export function PageTemplates({ onApplyTemplate, onClose }: PageTemplatesProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Page Templates</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAGE_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => onApplyTemplate(template)}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{template.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <div className="text-xs text-gray-500">
                      {template.fields.length} field{template.fields.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button
                    className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onApplyTemplate(template);
                    }}
                  >
                    Apply Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            Templates include pre-configured fields with validation rules. You can modify them after applying.
          </p>
        </div>
      </div>
    </div>
  );
}
