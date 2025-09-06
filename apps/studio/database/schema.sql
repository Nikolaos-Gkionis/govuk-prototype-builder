-- GOV.UK Prototype Builder Database Schema
-- Minimal SQLite schema for MVP

-- Projects table - main project information
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    start_type TEXT NOT NULL DEFAULT 'blank',
    govuk_frontend_version TEXT DEFAULT '5.11.2',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Project settings table - flexible settings storage
CREATE TABLE IF NOT EXISTS project_settings (
    project_id TEXT PRIMARY KEY,
    service_name TEXT,
    phase TEXT DEFAULT 'beta',
    start_page TEXT,
    session_secret TEXT,
    service_navigation TEXT, -- JSON string for service navigation config
    show_phase_banner BOOLEAN DEFAULT 1,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Pages table - individual pages in the journey
CREATE TABLE IF NOT EXISTS pages (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    page_type TEXT NOT NULL,
    title TEXT NOT NULL,
    path TEXT NOT NULL,
    position_x REAL DEFAULT 0,
    position_y REAL DEFAULT 0,
    content TEXT, -- JSON string for page content
    cta_config TEXT, -- JSON string for CTA button configuration
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Page fields table - form fields for question pages
CREATE TABLE IF NOT EXISTS page_fields (
    id TEXT PRIMARY KEY,
    page_id TEXT NOT NULL,
    field_name TEXT NOT NULL,
    field_type TEXT NOT NULL,
    label TEXT NOT NULL,
    hint TEXT,
    required BOOLEAN DEFAULT 0,
    validation_rules TEXT, -- JSON string for validation rules
    field_options TEXT, -- JSON string for radio/checkbox options
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
);

-- Page connections table - connections between pages
CREATE TABLE IF NOT EXISTS page_connections (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    source_page_id TEXT NOT NULL,
    target_page_id TEXT NOT NULL,
    connection_data TEXT, -- JSON string for additional connection data
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (source_page_id) REFERENCES pages(id) ON DELETE CASCADE,
    FOREIGN KEY (target_page_id) REFERENCES pages(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pages_project_id ON pages(project_id);
CREATE INDEX IF NOT EXISTS idx_page_fields_page_id ON page_fields(page_id);
CREATE INDEX IF NOT EXISTS idx_page_connections_project_id ON page_connections(project_id);
CREATE INDEX IF NOT EXISTS idx_page_connections_source ON page_connections(source_page_id);
CREATE INDEX IF NOT EXISTS idx_page_connections_target ON page_connections(target_page_id);
