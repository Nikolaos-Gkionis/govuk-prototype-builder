import sqlite3 from 'sqlite3';
import path from 'path';
import { Project, Page, Field, ProjectSettings } from '../types/prototype';
import { promisify } from 'util';

// Database connection singleton
let db: sqlite3.Database | null = null;

/**
 * Get database connection (singleton pattern)
 */
export function getDatabase(): sqlite3.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'database', 'prototypes.db');
    db = new sqlite3.Database(dbPath);
    
    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON');
    
    // Initialize schema if needed
    initializeSchema(db);
  }
  return db;
}

/**
 * Initialize database schema
 */
function initializeSchema(database: sqlite3.Database) {
  const fs = require('fs');
  const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');
  
  try {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    database.exec(schema);
  } catch (error) {
    console.error('Error initializing database schema:', error);
  }
}

/**
 * Helper function to promisify database operations
 */
function promisifyDb<T>(operation: (callback: (err: Error | null, result?: T) => void) => void): Promise<T> {
  return new Promise((resolve, reject) => {
    operation((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result as T);
      }
    });
  });
}

/**
 * Project operations
 */
export const projectService = {
  /**
   * Create a new project
   */
  async create(project: Omit<Project, 'pages'> & { pages?: Page[] }): Promise<Project> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.serialize(() => {
        database.run('BEGIN TRANSACTION');
        
        // Insert project
        database.run(
          'INSERT INTO projects (id, name, description, start_type, govuk_frontend_version) VALUES (?, ?, ?, ?, ?)',
          [
            project.id,
            project.name,
            project.description || '',
            project.startType || 'blank',
            project.govukFrontendVersion || '5.11.2'
          ],
          function(err) {
            if (err) {
              database.run('ROLLBACK');
              reject(err);
              return;
            }
          }
        );
        
        // Insert settings
        database.run(
          'INSERT INTO project_settings (project_id, service_name, phase, start_page, session_secret, show_phase_banner) VALUES (?, ?, ?, ?, ?, ?)',
          [
            project.id,
            project.settings?.serviceName || 'Sample Service',
            project.settings?.phase || 'beta',
            project.settings?.startPage || '',
            project.settings?.sessionSecret || '',
            project.settings?.showPhaseBanner !== false ? 1 : 0
          ],
          function(err) {
            if (err) {
              database.run('ROLLBACK');
              reject(err);
              return;
            }
            
            database.run('COMMIT', (err) => {
              if (err) {
                reject(err);
              } else {
                resolve({
                  ...project,
                  pages: project.pages || []
                });
              }
            });
          }
        );
      });
    });
  },

  /**
   * Get all projects
   */
  async getAll(): Promise<Project[]> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.all(`
        SELECT p.*, ps.service_name, ps.phase, ps.start_page, ps.session_secret, ps.show_phase_banner
        FROM projects p
        LEFT JOIN project_settings ps ON p.id = ps.project_id
        ORDER BY p.created_at DESC
      `, (err, rows: any[]) => {
        if (err) {
          reject(err);
          return;
        }
        
        const projects = rows.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          startType: p.start_type,
          govukFrontendVersion: p.govuk_frontend_version,
          pages: [], // Will be loaded separately
          settings: {
            serviceName: p.service_name,
            phase: p.phase,
            startPage: p.start_page,
            sessionSecret: p.session_secret,
            showPhaseBanner: p.show_phase_banner === 1
          }
        }));
        
        resolve(projects);
      });
    });
  },

  /**
   * Get project by ID
   */
  async getById(id: string): Promise<Project | null> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.get(`
        SELECT p.*, ps.service_name, ps.phase, ps.start_page, ps.session_secret, ps.show_phase_banner
        FROM projects p
        LEFT JOIN project_settings ps ON p.id = ps.project_id
        WHERE p.id = ?
      `, [id], async (err, project: any) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (!project) {
          resolve(null);
          return;
        }
        
        try {
          const pages = await pageService.getByProjectId(id);
          resolve({
            id: project.id,
            name: project.name,
            description: project.description,
            startType: project.start_type,
            govukFrontendVersion: project.govuk_frontend_version,
            pages,
            settings: {
              serviceName: project.service_name,
              phase: project.phase,
              startPage: project.start_page,
              sessionSecret: project.session_secret,
              showPhaseBanner: project.show_phase_banner === 1
            }
          });
        } catch (error) {
          reject(error);
        }
      });
    });
  },

  /**
   * Update project
   */
  async update(id: string, updates: Partial<Project>): Promise<boolean> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.serialize(() => {
        database.run('BEGIN TRANSACTION');
        
        // Update project
        database.run(
          'UPDATE projects SET name = ?, description = ?, start_type = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          [updates.name, updates.description, updates.startType, id],
          function(err) {
            if (err) {
              database.run('ROLLBACK');
              reject(err);
              return;
            }
          }
        );
        
        // Update settings if provided
        if (updates.settings) {
          database.run(
            'UPDATE project_settings SET service_name = ?, phase = ?, start_page = ?, session_secret = ?, show_phase_banner = ? WHERE project_id = ?',
            [
              updates.settings.serviceName,
              updates.settings.phase,
              updates.settings.startPage,
              updates.settings.sessionSecret,
              updates.settings.showPhaseBanner ? 1 : 0,
              id
            ],
            function(err) {
              if (err) {
                database.run('ROLLBACK');
                reject(err);
                return;
              }
            }
          );
        }
        
        database.run('COMMIT', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });
    });
  },

  /**
   * Delete project
   */
  async delete(id: string): Promise<boolean> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
};

/**
 * Page operations
 */
export const pageService = {
  /**
   * Get pages by project ID
   */
  async getByProjectId(projectId: string): Promise<Page[]> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.all(
        'SELECT * FROM pages WHERE project_id = ? ORDER BY created_at ASC',
        [projectId],
        async (err, pages: any[]) => {
          if (err) {
            reject(err);
            return;
          }
          
          try {
            const pagesWithFields = await Promise.all(
              pages.map(async (p: any) => {
                const fields = await fieldService.getByPageId(p.id);
                return {
                  id: p.id,
                  key: p.id,
                  type: p.page_type as any,
                  path: p.path,
                  title: p.title,
                  fields,
                  next: [], // Will be loaded from connections
                  conditions: [], // TODO: Implement conditions
                  cta: p.cta_config ? JSON.parse(p.cta_config) : undefined,
                  metadata: p.content ? JSON.parse(p.content) : {}
                };
              })
            );
            
            resolve(pagesWithFields);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  },

  /**
   * Create a new page
   */
  async create(projectId: string, page: Omit<Page, 'fields' | 'next' | 'conditions'>): Promise<Page> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.run(
        'INSERT INTO pages (id, project_id, page_type, title, path, position_x, position_y, content, cta_config) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          page.id,
          projectId,
          page.type,
          page.title,
          page.path,
          page.metadata?.position?.x || 0,
          page.metadata?.position?.y || 0,
          JSON.stringify(page.metadata),
          page.cta ? JSON.stringify(page.cta) : null
        ],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              ...page,
              fields: [],
              next: [],
              conditions: []
            });
          }
        }
      );
    });
  },

  /**
   * Update page
   */
  async update(id: string, updates: Partial<Page>): Promise<boolean> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.run(
        'UPDATE pages SET title = ?, path = ?, position_x = ?, position_y = ?, content = ?, cta_config = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [
          updates.title,
          updates.path,
          updates.metadata?.position?.x || 0,
          updates.metadata?.position?.y || 0,
          updates.metadata ? JSON.stringify(updates.metadata) : null,
          updates.cta ? JSON.stringify(updates.cta) : null,
          id
        ],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  },

  /**
   * Delete page
   */
  async delete(id: string): Promise<boolean> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.run('DELETE FROM pages WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
};

/**
 * Field operations
 */
export const fieldService = {
  /**
   * Get fields by page ID
   */
  async getByPageId(pageId: string): Promise<Field[]> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.all(
        'SELECT * FROM page_fields WHERE page_id = ? ORDER BY sort_order ASC',
        [pageId],
        (err, fields: any[]) => {
          if (err) {
            reject(err);
            return;
          }
          
          const mappedFields = fields.map((f: any) => ({
            id: f.id,
            name: f.field_name,
            type: f.field_type as any,
            label: f.label,
            hint: f.hint,
            options: f.field_options ? JSON.parse(f.field_options) : undefined,
            validation: f.validation_rules ? JSON.parse(f.validation_rules) : undefined
          }));
          
          resolve(mappedFields);
        }
      );
    });
  },

  /**
   * Create field
   */
  async create(pageId: string, field: Field): Promise<Field> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.run(
        'INSERT INTO page_fields (id, page_id, field_name, field_type, label, hint, required, validation_rules, field_options, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          field.id,
          pageId,
          field.name,
          field.type,
          field.label,
          field.hint || null,
          field.validation?.required ? 1 : 0,
          field.validation ? JSON.stringify(field.validation) : null,
          field.options ? JSON.stringify(field.options) : null,
          0 // TODO: Implement proper sort order
        ],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(field);
          }
        }
      );
    });
  },

  /**
   * Update field
   */
  async update(id: string, updates: Partial<Field>): Promise<boolean> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.run(
        'UPDATE page_fields SET field_name = ?, field_type = ?, label = ?, hint = ?, required = ?, validation_rules = ?, field_options = ? WHERE id = ?',
        [
          updates.name,
          updates.type,
          updates.label,
          updates.hint || null,
          updates.validation?.required ? 1 : 0,
          updates.validation ? JSON.stringify(updates.validation) : null,
          updates.options ? JSON.stringify(updates.options) : null,
          id
        ],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  },

  /**
   * Delete field
   */
  async delete(id: string): Promise<boolean> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.run('DELETE FROM page_fields WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
};

/**
 * Connection operations
 */
export const connectionService = {
  /**
   * Get connections by project ID
   */
  async getByProjectId(projectId: string): Promise<any[]> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.all(
        'SELECT * FROM page_connections WHERE project_id = ? ORDER BY created_at ASC',
        [projectId],
        (err, connections: any[]) => {
          if (err) {
            reject(err);
            return;
          }
          
          const mappedConnections = connections.map((c: any) => ({
            id: c.id,
            source: c.source_page_id,
            target: c.target_page_id,
            data: c.connection_data ? JSON.parse(c.connection_data) : {}
          }));
          
          resolve(mappedConnections);
        }
      );
    });
  },

  /**
   * Create connection
   */
  async create(projectId: string, sourcePageId: string, targetPageId: string, data?: any): Promise<any> {
    const database = getDatabase();
    
    const connectionId = `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return new Promise((resolve, reject) => {
      database.run(
        'INSERT INTO page_connections (id, project_id, source_page_id, target_page_id, connection_data) VALUES (?, ?, ?, ?, ?)',
        [connectionId, projectId, sourcePageId, targetPageId, data ? JSON.stringify(data) : null],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: connectionId,
              source: sourcePageId,
              target: targetPageId,
              data: data || {}
            });
          }
        }
      );
    });
  },

  /**
   * Delete connection
   */
  async delete(id: string): Promise<boolean> {
    const database = getDatabase();
    
    return new Promise((resolve, reject) => {
      database.run('DELETE FROM page_connections WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
};