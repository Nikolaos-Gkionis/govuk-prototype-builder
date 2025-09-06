/**
 * Migration utility to move data from localStorage to SQLite database
 * This helps transition existing projects to the new database system
 */

import { projectService, pageService, fieldService, connectionService } from './database';

interface LocalStorageProject {
  id: string;
  name: string;
  description: string;
  startType: string;
  pages: any[];
  connections: any[];
  settings?: any;
}

/**
 * Migrate all projects from localStorage to database
 */
export async function migrateFromLocalStorage(): Promise<{ migrated: number; errors: string[] }> {
  const errors: string[] = [];
  let migrated = 0;
  
  try {
    // Get projects from localStorage
    const localStorageData = localStorage.getItem('govuk-prototypes');
    if (!localStorageData) {
      console.log('No localStorage data found to migrate');
      return { migrated: 0, errors: [] };
    }
    
    const projects: LocalStorageProject[] = JSON.parse(localStorageData);
    
    for (const project of projects) {
      try {
        await migrateProject(project);
        migrated++;
      } catch (error) {
        const errorMsg = `Failed to migrate project ${project.name}: ${error}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }
    
    console.log(`Migration complete: ${migrated} projects migrated, ${errors.length} errors`);
  } catch (error) {
    console.error('Migration failed:', error);
    errors.push(`Migration failed: ${error}`);
  }
  
  return { migrated, errors };
}

/**
 * Migrate a single project from localStorage format to database
 */
async function migrateProject(project: LocalStorageProject): Promise<void> {
  // Create the project
  const dbProject = projectService.create({
    id: project.id,
    name: project.name,
    description: project.description || '',
    startType: (project.startType as 'blank' | 'template') || 'blank',
    govukFrontendVersion: '5.11.2',
    pages: [],
    settings: {
      serviceName: project.settings?.serviceName || 'Sample Service',
      phase: project.settings?.phase || 'beta',
      startPage: project.settings?.startPage || '',
      sessionSecret: project.settings?.sessionSecret || '',
      showPhaseBanner: project.settings?.showPhaseBanner !== false
    }
  });
  
  // Migrate pages
  for (const page of project.pages || []) {
    try {
      const dbPage = pageService.create(project.id, {
        id: page.id,
        key: page.id,
        type: page.type || 'content',
        path: page.path || `/${page.id}`,
        title: page.title || page.data?.label || 'Untitled Page',
        metadata: {
          position: page.position || { x: 0, y: 0 },
          ...page.data
        }
      });
      
      // Migrate page fields if they exist
      if (page.data?.fields) {
        for (const field of page.data.fields) {
          try {
            fieldService.create(page.id, {
              id: field.id || `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              name: field.name || field.id,
              type: field.type || 'text',
              label: field.label || '',
              hint: field.hint,
              options: field.options,
              validation: field.validation
            });
          } catch (fieldError) {
            console.warn(`Failed to migrate field ${field.id}:`, fieldError);
          }
        }
      }
    } catch (pageError) {
      console.warn(`Failed to migrate page ${page.id}:`, pageError);
    }
  }
  
  // Migrate connections
  for (const connection of project.connections || []) {
    try {
      connectionService.create(
        project.id,
        connection.source,
        connection.target,
        connection.data
      );
    } catch (connectionError) {
      console.warn(`Failed to migrate connection ${connection.id}:`, connectionError);
    }
  }
}

/**
 * Check if migration is needed (localStorage has data but database is empty)
 */
export function isMigrationNeeded(): boolean {
  try {
    const localStorageData = localStorage.getItem('govuk-prototypes');
    if (!localStorageData) return false;
    
    const projects = JSON.parse(localStorageData);
    return projects.length > 0;
  } catch {
    return false;
  }
}

/**
 * Clear localStorage after successful migration
 */
export function clearLocalStorageAfterMigration(): void {
  try {
    localStorage.removeItem('govuk-prototypes');
    console.log('localStorage cleared after successful migration');
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}
