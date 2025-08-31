import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

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
    <html lang="en">
      <body className="bg-white" suppressHydrationWarning>
        {/* Simple header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Prototype Builder</span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/projects" className="text-gray-700 hover:text-gray-900 font-medium">
                  Projects
                </Link>
                <Link href="/builder" className="text-gray-700 hover:text-gray-900 font-medium">
                  Builder
                </Link>
                <Link href="/components" className="text-gray-700 hover:text-gray-900 font-medium">
                  Components
                </Link>
                <Link href="/templates" className="text-gray-700 hover:text-gray-900 font-medium">
                  Templates
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
