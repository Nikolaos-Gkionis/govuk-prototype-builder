'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProjectData {
  name: string;
  description: string;
  startType: 'blank' | 'template';
}

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectData>({
    name: '',
    description: '',
    startType: 'blank'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      startType: e.target.value as 'blank' | 'template'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a prototype name');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a unique project ID
      const projectId = `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Save project data to localStorage (in a real app, this would go to a database)
      const project = {
        id: projectId,
        name: formData.name.trim(),
        description: formData.description.trim(),
        startType: formData.startType,
        createdAt: new Date().toISOString(),
        settings: {
          serviceName: formData.name.trim(),
          phase: 'beta',
          showPhaseBanner: true,
          feedbackUrl: 'mailto:feedback@example.gov.uk'
        },
        pages: [],
        connections: []
      };

      // Save to localStorage
      const existingProjects = JSON.parse(localStorage.getItem('govuk-prototypes') || '[]');
      existingProjects.push(project);
      localStorage.setItem('govuk-prototypes', JSON.stringify(existingProjects));

      // Redirect to builder with project data
      router.push(`/builder?projectId=${projectId}`);
      
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create a new prototype</h1>
        <p className="text-lg text-gray-600">
          Start building a government service prototype using our visual editor.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form - 2/3 width */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div className="form-group">
              <label htmlFor="prototype-name" className="block text-sm font-medium text-gray-900 mb-2">
                What is the name of your prototype?
              </label>
              <p className="text-sm text-gray-600 mb-3">
                For example, &quot;Apply for a fishing licence&quot; or &quot;Register to vote&quot;
              </p>
              <input 
                className="form-input w-full"
                id="prototype-name" 
                name="name" 
                type="text"
                placeholder="Enter prototype name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="prototype-description" className="block text-sm font-medium text-gray-900 mb-2">
                Description (optional)
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Briefly describe what this service will help users do
              </p>
              <textarea 
                className="form-input w-full"
                id="prototype-description" 
                name="description" 
                rows={3}
                placeholder="Enter description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Start Type */}
            <fieldset className="form-group">
              <legend className="block text-sm font-medium text-gray-900 mb-4">
                How do you want to start?
              </legend>
              <div className="space-y-4">
                <div className="radio-card">
                  <input 
                    className="radio-input" 
                    id="start-blank" 
                    name="startType" 
                    type="radio" 
                    value="blank"
                    checked={formData.startType === 'blank'}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="start-blank" className="radio-label">
                    <div className="radio-header">
                      <div className="radio-title">Start with a blank prototype</div>
                    </div>
                    <p className="radio-description">
                      Build your service from scratch using our page templates
                    </p>
                  </label>
                </div>
                
                <div className="radio-card">
                  <input 
                    className="radio-input" 
                    id="start-template" 
                    name="startType" 
                    type="radio" 
                    value="template"
                    checked={formData.startType === 'template'}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="start-template" className="radio-label">
                    <div className="radio-header">
                      <div className="radio-title">Start with a template</div>
                      <span className="badge-coming-soon">Coming Soon</span>
                    </div>
                    <p className="radio-description">
                      Choose from pre-built service templates
                    </p>
                  </label>
                </div>
              </div>
            </fieldset>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create prototype'}
              </button>
              <a href="/projects" className="btn-tertiary">
                Cancel
              </a>
            </div>
          </form>
        </div>
        
        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          <div className="info-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for naming your prototype</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Use the name of the actual service
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Keep it simple and descriptive
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Avoid technical jargon
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Think about what users would call it
              </li>
            </ul>
          </div>
          
          <div className="info-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
            <p className="text-sm text-gray-600">
              After creating your prototype, you&apos;ll be taken to the visual editor 
              where you can start adding pages and building user journeys.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
