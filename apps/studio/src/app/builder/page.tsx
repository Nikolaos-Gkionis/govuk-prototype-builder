'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import ReactFlowJourneyEditor from '../components/journey-editor/ReactFlowJourneyEditor';

interface Project {
  id: string;
  name: string;
  description: string;
  startType: 'blank' | 'template';
  createdAt: string;
  pages: any[];
  connections: any[];
}

function BuilderContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      // Load project data from localStorage
      try {
        const existingProjects = JSON.parse(localStorage.getItem('govuk-prototypes') || '[]');
        const foundProject = existingProjects.find((p: Project) => p.id === projectId);
        
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError('Error loading project');
        console.error('Error loading project:', err);
      }
    } else {
      // No project ID provided - show project selection
      setError('No project selected');
    }
    setIsLoading(false);
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error === 'Project not found' ? 'Project Not Found' : 'No Project Selected'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error === 'Project not found' 
              ? 'The project you\'re looking for doesn\'t exist.'
              : 'Please select a project to edit or create a new one.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/projects" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              View Projects
            </a>
            <a 
              href="/projects/new" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors"
            >
              Create New Project
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <ReactFlowJourneyEditor 
        projectId={project.id}
        projectName={project.name}
        projectDescription={project.description}
        startType={project.startType}
      />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  );
}
