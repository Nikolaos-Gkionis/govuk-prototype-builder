'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

// All GOV.UK Components (Alphabetical - MVP)
const GOVUK_COMPONENTS = [
  { id: 'back-link', name: 'Back link', path: '/components/back-link' },
  { id: 'breadcrumbs', name: 'Breadcrumbs', path: '/components/breadcrumbs' },
  { id: 'button', name: 'Button', path: '/components/button' },
  { id: 'checkboxes', name: 'Checkboxes', path: '/components/checkboxes' },
  { id: 'cookie-banner', name: 'Cookie banner', path: '/components/cookie-banner' },
  { id: 'date-input', name: 'Date input', path: '/components/date-input' },
  { id: 'details', name: 'Details', path: '/components/details' },
  { id: 'error-message', name: 'Error message', path: '/components/error-message' },
  { id: 'error-summary', name: 'Error summary', path: '/components/error-summary' },
  { id: 'exit-this-page', name: 'Exit this page', path: '/components/exit-this-page' },
  { id: 'fieldset', name: 'Fieldset', path: '/components/fieldset' },
  { id: 'file-upload', name: 'File upload', path: '/components/file-upload' },
  { id: 'footer', name: 'GOV.UK footer', path: '/components/footer' },
  { id: 'header', name: 'GOV.UK header', path: '/components/header' },
  { id: 'inset-text', name: 'Inset text', path: '/components/inset-text' },
  { id: 'notification-banner', name: 'Notification banner', path: '/components/notification-banner' },
  { id: 'pagination', name: 'Pagination', path: '/components/pagination' },
  { id: 'panel', name: 'Panel', path: '/components/panel' },
  { id: 'password-input', name: 'Password input', path: '/components/password-input' },
  { id: 'phase-banner', name: 'Phase banner', path: '/components/phase-banner' },
  { id: 'radios', name: 'Radios', path: '/components/radios' },
  { id: 'select', name: 'Select', path: '/components/select' },
  { id: 'service-navigation', name: 'Service navigation', path: '/components/service-navigation' },
  { id: 'skip-link', name: 'Skip link', path: '/components/skip-link' },
  { id: 'summary-list', name: 'Summary list', path: '/components/summary-list' },
  { id: 'table', name: 'Table', path: '/components/table' },
  { id: 'tabs', name: 'Tabs', path: '/components/tabs' },
  { id: 'tag', name: 'Tag', path: '/components/tag' },
  { id: 'task-list', name: 'Task list', path: '/components/task-list' },
  { id: 'text-input', name: 'Text input', path: '/components/text-input' },
  { id: 'textarea', name: 'Textarea', path: '/components/textarea' },
  { id: 'warning-text', name: 'Warning text', path: '/components/warning-text' }
];

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">GOV.UK Components</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Browse the complete library of GOV.UK Design System components. Each component includes
            live previews, HTML and Nunjucks code examples.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Component Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Components</h2>
              <nav className="space-y-1">
                {GOVUK_COMPONENTS.map((component) => (
                  <Link
                    key={component.id}
                    href={component.path}
                    className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded-md ${
                      pathname === component.path
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {component.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
