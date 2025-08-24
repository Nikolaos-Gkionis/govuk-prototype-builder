import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "GOV.UK Prototype Builder - Studio",
  description: "A point-and-click interface for building GOV.UK prototypes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-white antialiased" suppressHydrationWarning>
        <div className="min-h-full" suppressHydrationWarning>
          {/* Skip link for accessibility */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-white px-4 py-2 z-50 rounded">
            Skip to main content
          </a>
          
          {/* Clean header matching design-prototypes.com */}
          <header className="bg-white border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex justify-between items-center h-16">
                {/* Logo - clean and minimal */}
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Prototype Builder</span>
                </Link>
                
                {/* Navigation - horizontal like design-prototypes */}
                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/projects" className="nav-link">
                    Projects
                  </Link>
                  <Link href="/templates" className="nav-link">
                    Templates
                  </Link>
                  <Link href="/docs" className="nav-link">
                    Documentation
                  </Link>
                  <Link href="/help" className="nav-link">
                    Help
                  </Link>
                  <Link href="/contact" className="nav-link">
                    Contact
                  </Link>
                </nav>

                {/* Mobile menu button */}
                <button className="md:hidden p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Main content - no background color, clean white */}
          <main id="main-content" role="main">
            {children}
          </main>

          {/* Simple footer */}
          <footer className="bg-white border-t border-gray-100 mt-20">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <div className="text-center">
                <div className="mb-6">
                  <Link href="/" className="inline-flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">P</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">Prototype Builder</span>
                  </Link>
                </div>
                
                <div className="flex justify-center space-x-8 text-sm text-muted mb-6">
                  <Link href="/about" className="hover:text-gray-900">About</Link>
                  <Link href="/docs" className="hover:text-gray-900">Documentation</Link>
                  <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
                  <Link href="/terms" className="hover:text-gray-900">Terms</Link>
                </div>
                
                <p className="text-sm text-muted">
                  Made by <span className="font-medium">PROTO DSGN Limited</span> · All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
