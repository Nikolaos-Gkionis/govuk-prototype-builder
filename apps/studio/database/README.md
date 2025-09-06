This directory contains the SQLite database setup for the GOV.UK Prototype Builder.

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up the database:**

   ```bash
   npm run setup-db
   ```

3. **Test the database:**
   ```bash
   npm run test-db
   ```

## Database Schema

The database uses a minimal SQLite schema with the following tables:

- **projects** - Main project information
- **project_settings** - Project configuration and settings
- **pages** - Individual pages in the journey
- **page_fields** - Form fields for question pages
- **page_connections** - Connections between pages

## Migration from localStorage

The application includes automatic migration from localStorage to the database:

1. When the app detects localStorage data, it shows a migration banner
2. Users can click "Migrate Now" to transfer their projects
3. After successful migration, localStorage is cleared
4. All future saves go directly to the database

## API Endpoints

- `GET /api/projects` - List all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/[id]` - Get project by ID
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- `GET /api/test-database` - Test database functionality

## File Locations

- **Database file**: `database/prototypes.db`
- **Schema file**: `database/schema.sql`
- **Setup script**: `scripts/setup-database.js`

## Development

The database is automatically initialized when the application starts. The schema is applied on first run, and the database file is created if it doesn't exist.

For development, you can reset the database by deleting `database/prototypes.db` and restarting the application.
