export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Templates & Components</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Browse and use pre-built page templates and GOV.UK Design System components 
          to accelerate your prototype development.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Page Templates</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Start with pre-built templates for common government services like applications, forms, and check-your-answers pages.
          </p>
          <a href="/templates/pages" className="btn-secondary">
            Browse Page Templates
          </a>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">GOV.UK Components</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Access all official GOV.UK Design System components including forms, navigation, and content elements.
          </p>
          <a href="/templates/components" className="btn-secondary">
            Browse Components
          </a>
        </div>
      </div>

      {/* Popular Templates */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Templates</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Template Card 1 */}
          <div className="template-card">
            <div className="template-preview">
              <div className="template-mockup">
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-primary/20 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Start Page</h3>
              <p className="text-sm text-gray-600 mb-3">
                A template for service start pages with clear call-to-action.
              </p>
              <button className="btn-primary text-sm">Use Template</button>
            </div>
          </div>

          {/* Template Card 2 */}
          <div className="template-card">
            <div className="template-preview">
              <div className="template-mockup">
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-primary/30 rounded w-24"></div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Question Page</h3>
              <p className="text-sm text-gray-600 mb-3">
                Standard layout for asking users questions with form inputs.
              </p>
              <button className="btn-primary text-sm">Use Template</button>
            </div>
          </div>

          {/* Template Card 3 */}
          <div className="template-card">
            <div className="template-preview">
              <div className="template-mockup">
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="flex justify-between">
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/5"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Check Answers</h3>
              <p className="text-sm text-gray-600 mb-3">
                Template for reviewing and confirming user inputs.
              </p>
              <button className="btn-primary text-sm">Use Template</button>
            </div>
          </div>
        </div>
      </section>

      {/* Component Categories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Component Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/templates/components/form" className="component-category-card">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Form Elements</h3>
            <p className="text-sm text-gray-600">Inputs, buttons, checkboxes, radios</p>
          </a>

          <a href="/templates/components/navigation" className="component-category-card">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Navigation</h3>
            <p className="text-sm text-gray-600">Headers, breadcrumbs, pagination</p>
          </a>

          <a href="/templates/components/content" className="component-category-card">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Content</h3>
            <p className="text-sm text-gray-600">Panels, tables, tags, warnings</p>
          </a>

          <a href="/templates/components/feedback" className="component-category-card">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Feedback</h3>
            <p className="text-sm text-gray-600">Error messages, notifications</p>
          </a>
        </div>
      </section>

      {/* Integration Notice */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Connected to GOV.UK Design System</h3>
            <p className="text-gray-700 text-sm">
              All components and templates use the official GOV.UK Design System code. 
              Your prototypes will be compliant and ready for development teams to implement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
