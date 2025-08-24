export default function Home() {
  return (
    <>
      {/* Hero Section - matching design-prototypes.com */}
      <section className="hero-section">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-hero text-gray-900 mb-6">
            <span className="text-accent">GOV.UK</span> Prototype Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Build government service prototypes quickly and easily using our point-and-click interface. 
            No coding required - just drag, drop, and configure your pages using the GOV.UK Design System. 
            Perfect for service designers, user researchers, and product teams who need to create accessible, 
            high-fidelity prototypes for user testing.
          </p>
          
          {/* CTA Buttons - matching the exact style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/projects/new" className="btn-primary">
              Create Prototype
            </a>
            <a href="/projects" className="btn-secondary">
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* GDS Learning Platform section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prototype Builder Studio</h2>
            <p className="text-lg text-gray-600 italic">
              Philosophy: Rapid prototyping with real GOV.UK components leads to better user testing and faster delivery.
            </p>
          </div>

          {/* Course Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="feature-card">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Drag & Drop Interface
              </h3>
              <p className="text-gray-600">
                Build prototypes visually with our intuitive drag-and-drop page builder. No coding skills required.
              </p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                GOV.UK Components
              </h3>
              <p className="text-gray-600">
                Use real GOV.UK Design System components. All elements are automatically accessible and compliant.
              </p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Smart Data Handling
              </h3>
              <p className="text-gray-600">
                Connect to APIs or use synthetic data. Test different user journeys with realistic data flows.
              </p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                User Testing Ready
              </h3>
              <p className="text-gray-600">
                Generate shareable prototypes instantly. Perfect for usability testing and stakeholder demos.
              </p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Export to Code
              </h3>
              <p className="text-gray-600">
                Export your prototypes to GOV.UK Prototype Kit for development. Bridge the gap between design and build.
              </p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Collaboration Features
              </h3>
              <p className="text-gray-600">
                Share prototypes with your team. Comment, iterate, and gather feedback all in one place.
              </p>
            </div>
          </div>

          {/* How to Start section */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              How to Build Your First Prototype
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Create a Project</h3>
                <p className="text-gray-600">
                  Start by creating a new project. Choose from templates or begin with a blank canvas 
                  tailored to your service needs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Design Your Pages</h3>
                <p className="text-gray-600">
                  Drag and drop GOV.UK components to build your user journey. Add forms, content, 
                  and interactive elements with zero coding.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Test & Share</h3>
                <p className="text-gray-600">
                  Preview your prototype, share it with users for testing, or export it to 
                  GOV.UK Prototype Kit for development.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <a href="/projects/new" className="btn-primary">
                Start Building
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
