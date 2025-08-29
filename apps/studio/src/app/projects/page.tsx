'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string;
  startType: 'blank' | 'template';
  createdAt: string;
  pages: any[];
  connections: any[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('govuk-prototypes') || '[]');
    setProjects(savedProjects);
    setIsLoading(false);
  }, []);

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this prototype? This action cannot be undone.')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      localStorage.setItem('govuk-prototypes', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your prototypes</h1>
          <p className="text-lg text-gray-600">
            Manage all your government service prototypes in one place.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link href="/projects/new" className="btn-primary" role="button">
            Create new prototype
          </Link>
        </div>
      </div>

      {projects.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center mb-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No prototypes yet</h3>
          <p className="text-gray-600 mb-6">
            You haven&apos;t created any prototypes. Click &quot;Create new prototype&quot; to get started.
          </p>
          <Link href="/projects/new" className="btn-primary">
            Create your first prototype
          </Link>
        </div>
      ) : (
        /* Projects List */
        <div className="space-y-6 mb-12">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.startType === 'blank' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {project.startType === 'blank' ? 'Blank' : 'Template'}
                    </span>
                  </div>
                  
                  {project.description && (
                    <p className="text-gray-600 mb-3">{project.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Created: {formatDate(project.createdAt)}</span>
                    <span>Pages: {project.pages.length}</span>
                    <span>Connections: {project.connections.length}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/builder?projectId=${project.id}`}
                    className="btn-primary text-sm"
                  >
                    Open
                  </Link>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="btn-tertiary text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                    title="Delete prototype"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Info Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What you can do with prototypes</h2>
          <ul className="space-y-3">
            {[
              'Build user journeys with multiple pages',
              'Add forms, questions, and interactive elements',
              'Test different scenarios and user paths',
              'Share with stakeholders for feedback',
              'Export to GOV.UK Prototype Kit for development'
            ].map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important</h3>
              <p className="text-yellow-700">
                This is a prototype builder tool. Do not use real personal data in your prototypes.
                All data should be fictional and for testing purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
