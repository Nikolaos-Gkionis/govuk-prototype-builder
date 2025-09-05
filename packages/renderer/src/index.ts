// Renderer package for server-side preview rendering using Nunjucks + GOV.UK macros
// This package will render pages using the Nunjucks templating engine 
// with GOV.UK Frontend components.

import * as nunjucks from 'nunjucks';
import * as path from 'path';
import * as fs from 'fs';

// import type { Page, Project } from '@govuk-prototype-builder/schema';

// Temporary type definitions until schema package types are available
interface Page {
  id: string;
  type: string;
  title: string;
  heading?: string;
  content?: string;
  fields?: any[];
  [key: string]: any;
}

interface Project {
  id: string;
  name: string;
  settings?: {
    serviceName?: string;
    phase?: string;
    showPhaseBanner?: boolean;
    feedbackUrl?: string;
    [key: string]: any;
  };
  pages: Page[];
  [key: string]: any;
}

export interface RenderOptions {
  baseUrl?: string;
  assetsPath?: string;
  includeScripts?: boolean;
  viewsPath?: string;
  govukFrontendPath?: string;
}

export interface RenderContext {
  page: Page;
  project: Project;
  answers?: Record<string, any>;
  errors?: Record<string, string[]>;
}

export class PageRenderer {
  private env: nunjucks.Environment | null = null;
  private viewsPath: string;
  private govukFrontendPath: string;

  constructor(private options: RenderOptions = {}) {
    // Default paths - can be overridden in options
    this.viewsPath = options.viewsPath || path.resolve(__dirname, '../../../views');
    this.govukFrontendPath = options.govukFrontendPath || 'node_modules/govuk-frontend';
  }

  /**
   * Render a complete page with header and footer
   */
  async renderPage(context: RenderContext): Promise<string> {
    const env = await this.setupNunjucksEnvironment();
    const templateData = this.buildTemplateData(context);
    
    // Create the full page template string
    const pageTemplate = this.createPageTemplate(context.page);
    
    try {
      return env.renderString(pageTemplate, templateData);
    } catch (error) {
      console.error('Error rendering page:', error);
      throw new Error(`Failed to render page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Render a preview of the page (same as full page for now)
   */
  async renderPreview(context: RenderContext): Promise<string> {
    return this.renderPage(context);
  }

  /**
   * Create the Nunjucks environment with proper template paths
   */
  private async setupNunjucksEnvironment(): Promise<nunjucks.Environment> {
    if (this.env) {
      return this.env;
    }

    // Setup template search paths
    const searchPaths = [
      this.viewsPath,
      path.join(this.viewsPath, 'partials'),
      path.join(this.viewsPath, 'layouts'),
    ];

    // Add govuk-frontend templates if available
    const govukTemplatePath = path.join(this.govukFrontendPath, 'govuk');
    if (fs.existsSync(govukTemplatePath)) {
      searchPaths.push(govukTemplatePath);
    }

    this.env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(searchPaths),
      {
        autoescape: true,
        throwOnUndefined: false
      }
    );

    // Register custom filters and globals
    this.registerCustomFiltersAndGlobals(this.env);
    
    return this.env;
  }

  /**
   * Register custom Nunjucks filters and global functions
   */
  private registerCustomFiltersAndGlobals(env: nunjucks.Environment) {
    // Add a simple slug filter for generating CSS-friendly names
    env.addFilter('slug', (str: string) => {
      return str.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    });

    // Add a safe HTML filter (already implemented by autoescape: false for specific content)
    env.addFilter('safe', (str: string) => {
      return new nunjucks.runtime.SafeString(str);
    });

    // Add date formatting filter
    env.addFilter('dateFormat', (date: Date | string, format = 'DD/MM/YYYY') => {
      const d = typeof date === 'string' ? new Date(date) : date;
      // Simple date formatting - in production you'd use a proper library
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    });
  }

  /**
   * Build the template data object with all necessary context
   */
  private buildTemplateData(context: RenderContext) {
    const { page, project, answers = {}, errors = {} } = context;
    const serviceName = project.settings?.serviceName || project.name;
    
    return {
      // Page data
      pageTitle: page.title,
      pageHeading: page.heading || page.title,
      pageContent: page.content,
      pageFields: page.fields || [],
      
      // Project data
      serviceName,
      projectName: project.name,
      phase: project.settings?.phase,
      showPhaseBanner: project.settings?.showPhaseBanner,
      feedbackUrl: project.settings?.feedbackUrl,
      
      // User data
      data: answers,
      errors,
      
      // Utility data
      assetPath: this.options.assetsPath || '/assets',
      baseUrl: this.options.baseUrl || '',
      includeScripts: this.options.includeScripts !== false
    };
  }

  /**
   * Create a complete page template string with header and footer
   */
  private createPageTemplate(page: Page): string {
    const pageTypeTemplate = this.getPageTypeTemplate(page.type);
    
    return `
<!DOCTYPE html>
<html lang="en" class="govuk-template">
<head>
  <meta charset="utf-8">
  <title>{{ pageTitle }}{% if serviceName %} - {{ serviceName }}{% endif %} - GOV.UK</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0b0c0c">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <link rel="shortcut icon" sizes="16x16 32x32 48x48" href="{{ assetPath }}/images/favicon.ico" type="image/x-icon">
  <link rel="mask-icon" href="{{ assetPath }}/images/govuk-mask-icon.svg" color="#0b0c0c">
  <link rel="apple-touch-icon" sizes="180x180" href="{{ assetPath }}/images/govuk-apple-touch-icon-180x180.png">
  <link rel="apple-touch-icon" sizes="167x167" href="{{ assetPath }}/images/govuk-apple-touch-icon-167x167.png">
  <link rel="apple-touch-icon" sizes="152x152" href="{{ assetPath }}/images/govuk-apple-touch-icon-152x152.png">
  <link rel="apple-touch-icon" href="{{ assetPath }}/images/govuk-apple-touch-icon.png">
  
  <link rel="stylesheet" href="https://unpkg.com/govuk-frontend@4.8.0/govuk/all.css">
</head>

<body class="govuk-template__body">
  <script>document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');</script>
  
  {% include "_prototype_header.njk" %}
  
  <div class="govuk-width-container">
    {% if showPhaseBanner and phase %}
      <div class="govuk-phase-banner">
        <p class="govuk-phase-banner__content">
          <strong class="govuk-tag govuk-phase-banner__content__tag">
            {{ phase | title }}
          </strong>
          <span class="govuk-phase-banner__text">
            This is a new service{% if feedbackUrl %} – your <a class="govuk-link" href="{{ feedbackUrl }}">feedback</a> will help us to improve it{% endif %}.
          </span>
        </p>
      </div>
    {% endif %}
    
    <main class="govuk-main-wrapper" id="main-content" role="main">
      ${pageTypeTemplate}
    </main>
  </div>
  
  {% include "_footer.njk" %}
  
  {% if includeScripts %}
    <script src="https://unpkg.com/govuk-frontend@4.8.0/govuk/all.js"></script>
    <script>
      window.GOVUKFrontend.initAll();
    </script>
  {% endif %}
</body>
</html>
    `.trim();
  }

  /**
   * Get the template for a specific page type
   */
  private getPageTypeTemplate(pageType: string): string {
    switch (pageType) {
      case 'start':
        return this.getStartPageTemplate();
      case 'question':
        return this.getQuestionPageTemplate();
      case 'content':
        return this.getContentPageTemplate();
      case 'check-answers':
        return this.getCheckAnswersPageTemplate();
      case 'confirmation':
        return this.getConfirmationPageTemplate();
      default:
        return this.getDefaultPageTemplate();
    }
  }

  /**
   * Template for start pages
   */
  private getStartPageTemplate(): string {
    return `
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">{{ pageHeading }}</h1>
          
          {% if pageContent %}
            <div class="govuk-body">
              {{ pageContent | safe }}
            </div>
          {% endif %}
          
          <a href="#" class="govuk-button govuk-button--start" data-module="govuk-button">
            Start now
            <svg class="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" role="presentation" focusable="false">
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"/>
            </svg>
          </a>
        </div>
      </div>
    `;
  }

  /**
   * Template for question pages
   */
  private getQuestionPageTemplate(): string {
    return `
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <form class="form" action="#" method="post">
            <h1 class="govuk-heading-xl">{{ pageHeading }}</h1>
            
            {% if pageContent %}
              <div class="govuk-body">
                {{ pageContent | safe }}
              </div>
            {% endif %}
            
            {% for field in pageFields %}
              {{ renderField(field, data, errors) | safe }}
            {% endfor %}
            
            {% if pageFields.length > 0 %}
              <button class="govuk-button" data-module="govuk-button">
                Continue
              </button>
            {% endif %}
          </form>
        </div>
      </div>
    `;
  }

  /**
   * Template for content pages
   */
  private getContentPageTemplate(): string {
    return `
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">{{ pageHeading }}</h1>
          
          {% if pageContent %}
            <div class="govuk-body">
              {{ pageContent | safe }}
            </div>
          {% endif %}
        </div>
      </div>
    `;
  }

  /**
   * Template for check answers pages
   */
  private getCheckAnswersPageTemplate(): string {
    return `
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">{{ pageHeading }}</h1>
          
          {% if pageContent %}
            <div class="govuk-body">
              {{ pageContent | safe }}
            </div>
          {% endif %}
          
          <!-- Summary list would go here in a real implementation -->
          <dl class="govuk-summary-list">
            {% for key, value in data %}
              <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">{{ key | title }}</dt>
                <dd class="govuk-summary-list__value">{{ value }}</dd>
                <dd class="govuk-summary-list__actions">
                  <a class="govuk-link" href="#">Change</a>
                </dd>
              </div>
            {% endfor %}
          </dl>
          
          <button class="govuk-button" data-module="govuk-button">
            Confirm and submit
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Template for confirmation pages
   */
  private getConfirmationPageTemplate(): string {
    return `
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          {% if pageContent %}
            {{ pageContent | safe }}
          {% else %}
            <div class="govuk-panel govuk-panel--confirmation">
              <h1 class="govuk-panel__title">{{ pageHeading }}</h1>
              <div class="govuk-panel__body">
                Your reference number<br><strong>HDJ2123F</strong>
              </div>
            </div>
          {% endif %}
          
          <p class="govuk-body">We have sent you a confirmation email.</p>
        </div>
      </div>
    `;
  }

  /**
   * Default template for unknown page types
   */
  private getDefaultPageTemplate(): string {
    return `
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl">{{ pageHeading }}</h1>
          
          {% if pageContent %}
            <div class="govuk-body">
              {{ pageContent | safe }}
            </div>
          {% endif %}
        </div>
      </div>
    `;
  }
}

export default PageRenderer;
