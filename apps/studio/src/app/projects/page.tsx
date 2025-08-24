export default function ProjectsPage() {
  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your prototypes</h1>
          <p className="text-lg text-gray-600">
            Manage all your government service prototypes in one place.
          </p>
        </div>
        <div className="flex-shrink-0">
          <a href="/projects/new" className="btn-primary" role="button">
            Create new prototype
          </a>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center mb-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No prototypes yet</h3>
        <p className="text-gray-600 mb-6">
          You haven&apos;t created any prototypes. Click &quot;Create new prototype&quot; to get started.
        </p>
        <a href="/projects/new" className="btn-primary">
          Create your first prototype
        </a>
      </div>
      
      {/* Info Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What you can do with prototypes</h2>
          <ul className="space-y-3">
            {[
              'Build user journeys with multiple pages',
              'Add forms, questions, and interactive elements',
              'Test different scenarios and user paths',
              'Share with stakeholders for feedback',
              'Export to GOV.UK Prototype Kit for development'
            ].map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important</h3>
              <p className="text-yellow-700">
                This is a prototype builder tool. Do not use real personal data in your prototypes.
                All data should be fictional and for testing purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
