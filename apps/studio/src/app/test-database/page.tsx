'use client';

import { useState, useEffect } from 'react';
import { useDatabase } from '@/hooks/useDatabase';

export default function TestDatabasePage() {
  const { getAllProjects, createProject, loading, error } = useDatabase();
  const [projects, setProjects] = useState<any[]>([]);
  const [newProjectName, setNewProjectName] = useState('');

  const loadProjects = async () => {
    const projectsList = await getAllProjects();
    setProjects(projectsList);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    
    const project = await createProject({
      name: newProjectName,
      description: 'Test project created from database test page',
      startType: 'blank'
    });
    
    if (project) {
      setNewProjectName('');
      loadProjects(); // Reload the list
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Database Test Page
        </h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateProject}
              disabled={loading || !newProjectName.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Projects ({projects.length})</h2>
          
          {loading && projects.length === 0 ? (
            <p className="text-gray-500">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-500">No projects found. Create one above!</p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-md p-4">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2">
                      {project.startType || 'blank'}
                    </span>
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2">
                      {project.settings?.phase || 'beta'}
                    </span>
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                      {project.pages?.length || 0} pages
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <a
            href="/builder?projectId=proj-1757085738693-tchyzxxm2"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Test Journey Editor with Database
          </a>
        </div>
      </div>
    </div>
  );
}
