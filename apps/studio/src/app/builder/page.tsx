'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import JourneyEditor from '../components/journey-editor/JourneyEditor';

interface Project {
  id: string;
  name: string;
  description: string;
  startType: 'blank' | 'template';
  createdAt: string;
  pages: any[];
  connections: any[];
}

export default function BuilderPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      // Load project data from localStorage
      const existingProjects = JSON.parse(localStorage.getItem('govuk-prototypes') || '[]');
      const foundProject = existingProjects.find((p: Project) => p.id === projectId);
      
      if (foundProject) {
        setProject(foundProject);
      } else {
        console.error('Project not found:', projectId);
        // Redirect back to projects page if project not found
        window.location.href = '/projects';
      }
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

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
          <a href="/projects" className="btn-primary">
            Back to Projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <JourneyEditor 
        projectId={project.id}
        projectName={project.name}
        projectDescription={project.description}
        startType={project.startType}
      />
    </div>
  );
}
