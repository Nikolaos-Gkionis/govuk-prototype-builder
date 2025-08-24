# GOV.UK Prototype Builder

AI Wrapper for GOV.UK Design System → Point-and-Click Prototyper with Prototype Kit Export

This is a monorepo containing a point-and-click interface for building GOV.UK prototypes, with AI assistance for content generation and automatic export to the GOV.UK Prototype Kit format.

## 🏗️ Project Structure

This project is organized as a monorepo with npm workspaces:

```
govuk-prototype-builder/
├── apps/
│   └── studio/               # Next.js app - Main UI for building prototypes
├── packages/
│   ├── schema/              # TypeScript types + Zod validation schemas
│   ├── renderer/            # Nunjucks server-side renderer for preview
│   ├── exporter-prototype-kit/  # Export to GOV.UK Prototype Kit
│   ├── ai/                  # AI content assistant & prompt templates
│   └── utils/               # Shared utility functions
└── tasks.json              # Task Master project plan
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 22.11.0 or later (see [.nvmrc](./.nvmrc))
- **npm**: Version 10.5.0 or later

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nikolaos-gkionis/govuk-prototype-builder.git
   cd govuk-prototype-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run studio:dev
   ```

   The studio interface will be available at http://localhost:3000

## 📦 Workspace Commands

### Development

```bash
# Start the studio development server
npm run studio:dev

# Build all packages
npm run workspace:build

# Run tests across all packages
npm run workspace:test

# Clean all build outputs
npm run workspace:clean
```

### Studio App Specific

```bash
# Start studio in development mode
npm run studio:dev

# Build studio for production
npm run studio:build
```

### Package Development

```bash
# Build a specific package
npm run build --workspace=packages/schema

# Test a specific package
npm run test --workspace=packages/renderer

# Watch mode for development
npm run dev --workspace=packages/schema
```

### Linting & Quality

```bash
# Run all linting checks
npm run lint

# Individual lint commands
npm run lint:editorconfig
npm run lint:prettier
npm run lint:js
npm run lint:types
npm run lint:scss
```

## 🎯 Core Features

### 🎨 Studio Interface

- **Visual Journey Editor**: Drag-and-drop interface using React Flow
- **Page Editor**: Configure fields, content, and validation rules
- **Condition Builder**: Create branching logic without code
- **Live Preview**: Real-time preview using GOV.UK Frontend components
- **Project Management**: Save and load projects with versioning

### 🤖 AI Assistant

- **Content Generation**: Generate page copy, labels, and hints
- **Field Suggestions**: AI-powered field type and validation recommendations
- **Accessibility Review**: Automated accessibility suggestions
- **Journey Optimization**: Smart suggestions for user flow improvements

### 📤 Export Options

- **GOV.UK Prototype Kit**: Generate a complete, runnable Express.js application
- **Views Generation**: Nunjucks templates with GOV.UK macros
- **Routes Generation**: Express routes with session handling and branching logic
- **Validation Mapping**: Server-side validation with proper error handling

## 📚 Package Details

### `@govuk-prototype-builder/schema`

Core data structures and validation schemas using Zod.

**Key exports:**

- `Project`, `Page`, `Field`, `Condition` types
- Zod validation schemas
- JSONLogic condition expressions

### `@govuk-prototype-builder/renderer`

Server-side Nunjucks renderer for preview functionality.

**Features:**

- GOV.UK Frontend macro integration
- Page rendering with dynamic data
- Error state handling

### `@govuk-prototype-builder/exporter-prototype-kit`

Generates GOV.UK Prototype Kit projects from studio projects.

**Outputs:**

- Complete Express.js application
- Nunjucks templates
- Route handlers with branching logic
- Package.json with dependencies

### `@govuk-prototype-builder/ai`

AI content assistant with prompt templates and safety guards.

**Capabilities:**

- Structured content generation
- Accessibility improvements
- Field type suggestions
- Safety validation

### `@govuk-prototype-builder/utils`

Shared utility functions across the monorepo.

## 🔧 Development Workflow

### 1. Task Management

This project uses [Task Master](https://www.npmjs.com/package/task-master-ai) for structured development:

```bash
# View current tasks
task-master next --file tasks.json

# Mark tasks complete
task-master complete --file tasks.json --id 1
```

### 2. Building Packages

Packages must be built in dependency order. The workspace build command handles this automatically:

```bash
npm run workspace:build
```

For individual development:

```bash
# Build schema first (no dependencies)
npm run build --workspace=packages/schema

# Then renderer (depends on schema)
npm run build --workspace=packages/renderer

# Continue with other packages...
```

### 3. Testing Strategy

- **Unit tests**: Individual package functionality
- **Integration tests**: Cross-package interactions
- **E2E tests**: Full workflow from studio to export
- **Accessibility tests**: Automated a11y validation

```bash
# Run all tests
npm test

# Test specific packages
npm run test --workspace=packages/schema
```

## 🌟 Contributing

### Development Setup

1. Fork and clone the repository
2. Install dependencies with `npm install`
3. Create a feature branch
4. Make your changes
5. Run tests and linting
6. Submit a pull request

### Code Standards

- **TypeScript**: All new code should be TypeScript
- **ESLint**: Follow the configured linting rules
- **Prettier**: Code formatting is automated
- **EditorConfig**: Consistent editor settings

### Commit Messages

Follow conventional commit format:

```
feat(studio): add drag-and-drop page ordering
fix(renderer): handle missing field validation
docs(readme): update installation instructions
```

## 🚀 Deployment

### CI/CD Pipeline

GitHub Actions automatically:

- Runs all tests and linting
- Builds all packages
- Checks for broken links
- Validates workspace configuration

### Production Deployment

- Studio app can be deployed to Vercel, Netlify, or similar
- Packages are published to npm (when public)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Issues**: Report bugs via [GitHub Issues](https://github.com/nikolaos-gkionis/govuk-prototype-builder/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/nikolaos-gkionis/govuk-prototype-builder/discussions)
- **Documentation**: See individual package READMEs for detailed API docs

## 🎯 Roadmap

See [tasks.json](tasks.json) for the complete development roadmap, including:

- ✅ Monorepo setup and workspace configuration
- 🔄 Core schema and rendering engine
- 📋 Studio interface development
- 🤖 AI integration and content generation
- 📤 Prototype Kit export functionality
- 🧪 Comprehensive testing and documentation

---

**Built with ❤️ for the GOV.UK community**
