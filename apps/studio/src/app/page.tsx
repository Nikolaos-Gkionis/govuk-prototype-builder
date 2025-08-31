export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">GOV.UK</span> Prototype Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Build government service prototypes quickly and easily using our point-and-click interface. 
            No coding required - just drag, drop, and configure your pages using the GOV.UK Design System.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/projects/new" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold transition-colors">
              Create Prototype
            </a>
            <a href="/projects" className="bg-white text-gray-700 px-8 py-4 rounded-lg border border-gray-300 hover:bg-gray-50 font-semibold transition-colors">
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prototype Builder Studio</h2>
            <p className="text-lg text-gray-600">
              Rapid prototyping with real GOV.UK components leads to better user testing and faster delivery.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Drag & Drop Interface</h3>
              <p className="text-gray-600">
                Build prototypes visually with our intuitive drag-and-drop page builder. No coding skills required.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">GOV.UK Components</h3>
              <p className="text-gray-600">
                Use real GOV.UK Design System components. All elements are automatically accessible and compliant.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8 1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Smart Data Handling</h3>
              <p className="text-gray-600">
                Connect to APIs or use synthetic data. Test different user journeys with realistic data flows.
              </p>
            </div>
          </div>

          {/* How to Start section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              How to Build Your First Prototype
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Create a Project</h3>
                <p className="text-gray-600">
                  Start by creating a new project. Choose from templates or begin with a blank canvas.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Design Your Pages</h3>
                <p className="text-gray-600">
                  Drag and drop GOV.UK components to build your user journey. Add forms, content, and interactive elements.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Test & Share</h3>
                <p className="text-gray-600">
                  Preview your prototype, share it with users for testing, or export it to GOV.UK Prototype Kit.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <a href="/projects/new" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold transition-colors">
                Start Building
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
