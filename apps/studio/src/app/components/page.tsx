export default function ComponentsIndexPage() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">GOV.UK Design System Components</h2>
        <p className="text-lg text-gray-600 mb-6">
          Components are reusable parts of the user interface that have been made to support a variety of applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">What are components?</h3>
          <p className="text-gray-600 mb-4">
            GOV.UK components are pre-built, tested interface elements that follow government design standards. 
            They ensure consistency across government services and help you build accessible, user-friendly forms and pages.
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• <strong>Tested:</strong> All components work with assistive technologies</li>
            <li>• <strong>Consistent:</strong> Follow GOV.UK design patterns</li>
            <li>• <strong>Accessible:</strong> Meet WCAG 2.1 AA standards</li>
            <li>• <strong>Responsive:</strong> Work on all device sizes</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">How to use components</h3>
          <p className="text-gray-600 mb-4">
            Each component page shows you live examples, HTML code, and Nunjucks templates. 
            You can copy the code directly into your prototypes.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Browse components</p>
                <p className="text-xs text-gray-600">Click on any component in the sidebar</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <p className="text-sm font-medium text-gray-900">See examples</p>
                <p className="text-xs text-gray-600">View live previews and variants</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <p className="text-sm font-medium text-gray-900">Copy code</p>
                <p className="text-xs text-gray-600">Get HTML or Nunjucks code snippets</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">👈 Get started</h3>
        <p className="text-blue-800">
          Choose a component from the sidebar to see live examples, code snippets, and implementation guidance. 
          Start with common components like <strong>Button</strong>, <strong>Text input</strong>, or <strong>Checkboxes</strong>.
        </p>
      </div>
    </>
  );
}
