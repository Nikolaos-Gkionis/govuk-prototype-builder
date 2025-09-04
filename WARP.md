# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

GOV.UK Prototype Builder is a monorepo containing a point-and-click interface for building GOV.UK prototypes, with AI assistance for content generation and automatic export to the GOV.UK Prototype Kit format.

## Key Development Commands

### Primary Development Workflow

```bash
# Start the main studio interface (most common command)
npm run studio:dev
# Studio available at http://localhost:3000

# Build the entire project
npm run build

# Run all tests
npm test

# Run comprehensive linting
npm run lint
```

### Workspace-Level Commands

```bash
# Install dependencies for all workspaces
npm install

# Build all packages
npm run workspace:build

# Test all packages
npm run workspace:test

# Clean all build outputs
npm run workspace:clean
```

### Package-Specific Commands

```bash
# Build specific package
npm run build --workspace=packages/schema
npm run build --workspace=packages/renderer
npm run build --workspace=packages/ai
npm run build --workspace=packages/exporter-prototype-kit
npm run build --workspace=packages/utils

# Test specific package
npm run test --workspace=packages/schema

# Run in watch mode for development
npm run dev --workspace=packages/schema
```

### Linting Commands

```bash
# Run individual lint checks
npm run lint:editorconfig    # Check editor config compliance
npm run lint:prettier       # Check code formatting
npm run lint:js             # ESLint for JavaScript/TypeScript
npm run lint:types          # TypeScript type checking
npm run lint:scss           # Stylelint for SCSS/CSS
npm run lint:html           # HTML validation (requires build first)
```

## Architecture Overview

### Monorepo Structure

This is an npm workspaces monorepo with the following structure:

```
├── apps/
│   └── studio/              # Next.js app - Main UI for building prototypes
├── packages/
│   ├── schema/              # TypeScript types + Zod validation schemas (foundational)
│   ├── renderer/            # Nunjucks server-side renderer for preview (depends on schema)
│   ├── exporter-prototype-kit/  # Export to GOV.UK Prototype Kit
│   ├── ai/                  # AI content assistant & prompt templates
│   └── utils/               # Shared utility functions
├── src/                     # GOV.UK Design System documentation site
├── tasks/                   # Build scripts and task runners
└── docs/                    # Additional documentation
```

### Package Dependencies

- `schema` → foundational package, no internal dependencies
- `renderer` → depends on `schema`
- `ai` → depends on `schema`
- `exporter-prototype-kit` → depends on `schema` and `renderer`
- `utils` → shared utilities
- `studio` → depends on all packages

**Build Order**: Always build `schema` first, then other packages can be built in parallel.

### Technology Stack

- **Framework**: Next.js 15.5.0 with React 19.1.0
- **Flow Editor**: React Flow (@xyflow/react) for journey mapping
- **Styling**: Tailwind CSS with GOV.UK Design System integration
- **Template Engine**: Nunjucks for server-side rendering
- **Validation**: Zod schemas for runtime validation
- **Build Tools**: TypeScript, Rollup for packages, Next.js for apps
- **Testing**: Jest with Puppeteer for E2E tests
- **Node Version**: 22.11.0+ (see .nvmrc)

## Development Patterns

### Working with Packages

1. **Schema First**: Always update `packages/schema` first when adding new types
2. **Type Safety**: All packages use TypeScript with strict settings
3. **Validation**: Use Zod schemas from `schema` package for runtime validation
4. **Testing**: Each package has its own test suite

### Studio App Development

- Main development happens in `apps/studio`
- Uses React Flow for visual journey editing
- Integrates all packages for full functionality
- Hot reload available with `npm run studio:dev`

### Design System Integration

- Built on GOV.UK Frontend 5.11.2
- Uses actual GDS components, not replicas
- Color scheme follows GDS semantic colors
- SVG icons loaded from project assets

## Task Management

This project uses Task Master for structured development tracking:

```bash
# View current development tasks
task-master next --file tasks.json

# Mark tasks as complete
task-master complete --file tasks.json --id <task-id>
```

Current development is in **Phase 4: Advanced Features** (see PROGRESS.md for detailed status).

## Testing Strategy

### Test Types

- **Unit Tests**: Individual package functionality (`npm run test --workspace=<package>`)
- **Integration Tests**: Cross-package interactions
- **E2E Tests**: Full workflow with Puppeteer (`npm test`)
- **Accessibility Tests**: Automated a11y validation with jest-axe

### Running Tests

```bash
# All tests
npm test

# Specific package tests
npm run test --workspace=packages/schema

# Watch mode (for development)
npm run dev --workspace=packages/schema
```

## Build System Notes

### MetalSmith Build Pipeline

The root build system uses MetalSmith for the GOV.UK Design System documentation:

- Processes Markdown to HTML
- Handles Sass compilation
- Manages static assets
- Builds to `/build` directory

### Package Builds

- TypeScript compilation to `/dist` directories
- Each package builds independently
- Studio app uses Next.js build system

### Common Issues

- Clear build cache if you encounter module resolution errors: `rm -rf .next node_modules/.cache`
- Packages must be built in dependency order
- TypeScript strict mode is enabled across all packages

## Key Configuration Files

- `package.json` - Root workspace configuration with all scripts
- `tsconfig.base.json` - Base TypeScript configuration
- `.eslintrc.js` - Comprehensive ESLint setup with TypeScript support
- `jest.config.mjs` - Jest configuration with Puppeteer
- `stylelint.config.js` - SCSS/CSS linting rules
- `rollup.config.js` - Package bundling configuration
- `tasks.json` - Task Master development tracking
- `.nvmrc` - Node.js version specification (22.11.0)

## Environment Requirements

- **Node.js**: 22.11.0+ (use `nvm use` to set correct version)
- **npm**: 10.5.0+
- **Browser**: Modern browser for React Flow features

## Git Hooks

Project uses Husky for git hooks:

- Pre-commit: Runs lint-staged for code quality
- Linting and formatting enforced on commit

## Documentation

- `README.md` - Comprehensive project overview and setup
- `PROGRESS.md` - Detailed development progress tracking
- Individual package READMEs for API documentation
- `/docs` directory for additional documentation
