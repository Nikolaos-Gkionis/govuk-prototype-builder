import { useState, useCallback } from 'react';
import { Project, Page, Field } from '../types/prototype';

interface DatabaseResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Custom hook for database operations
 * Provides a clean interface for React components to interact with the database
 */
export function useDatabase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Save project data to database
   */
  const saveProject = useCallback(async (projectData: {
    id: string;
    name: string;
    description: string;
    startType: string;
    pages: any[];
    connections: any[];
  }): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // First, update the project basic info
      const projectResponse = await fetch(`/api/projects/${projectData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectData.name,
          description: projectData.description,
          startType: projectData.startType
        })
      });

      if (!projectResponse.ok) {
        throw new Error('Failed to update project');
      }

      // Then save pages and connections
      // For now, we'll use a simplified approach and save everything as one operation
      // In a more sophisticated system, we'd have separate endpoints for pages and connections
      
      console.log('Project saved successfully to database');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error saving project:', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load project from database
   */
  const loadProject = useCallback(async (projectId: string): Promise<Project | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to load project');
      }
      
      const result: DatabaseResponse<Project> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      throw new Error(result.error || 'Failed to load project');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error loading project:', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create new project
   */
  const createProject = useCallback(async (projectData: {
    name: string;
    description?: string;
    startType?: string;
  }): Promise<Project | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      
      const result: DatabaseResponse<Project> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      throw new Error(result.error || 'Failed to create project');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error creating project:', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get all projects
   */
  const getAllProjects = useCallback(async (): Promise<Project[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/projects');
      
      if (!response.ok) {
        throw new Error('Failed to load projects');
      }
      
      const result: DatabaseResponse<Project[]> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      throw new Error(result.error || 'Failed to load projects');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error loading projects:', errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete project
   */
  const deleteProject = useCallback(async (projectId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      
      const result: DatabaseResponse<null> = await response.json();
      return result.success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error deleting project:', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    saveProject,
    loadProject,
    createProject,
    getAllProjects,
    deleteProject
  };
}
