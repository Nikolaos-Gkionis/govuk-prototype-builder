'use client';

import { PageType } from '../../../types/prototype';

interface PageTypeItem {
  type: PageType;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const pageTypes: PageTypeItem[] = [
  {
    type: 'start',
    name: 'Start Page',
    description: 'The first page users see',
    icon: '/icons/start-page.svg',
    color: 'bg-green-500'
  },
  {
    type: 'content',
    name: 'Content Page',
    description: 'Display information to users',
    icon: '/icons/question-page.svg',
    color: 'bg-blue-500'
  },
  {
    type: 'question',
    name: 'Question Page',
    description: 'Collect input from users',
    icon: '/icons/question-check.svg',
    color: 'bg-purple-500'
  },
  {
    type: 'check-answers',
    name: 'Check Answers',
    description: 'Review all answers before submission',
    icon: '/icons/cya-page.svg',
    color: 'bg-yellow-500'
  },
  {
    type: 'confirmation',
    name: 'Confirmation',
    description: 'Final success page',
    icon: '/icons/confirmation-page.svg',
    color: 'bg-green-600'
  }
];

export function PagePalette() {
  const handleDragStart = (e: React.DragEvent, pageType: PageType) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type: pageType }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Page Types</h2>
        <p className="text-sm text-gray-600">
          Drag page types onto the canvas to build your prototype
        </p>
      </div>

      <div className="space-y-3">
        {pageTypes.map((pageType) => (
          <div
            key={pageType.type}
            draggable
            onDragStart={(e) => handleDragStart(e, pageType.type)}
            className="group cursor-grab active:cursor-grabbing"
          >
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 hover:shadow-md">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center flex-shrink-0">
                  <img 
                    src={pageType.icon} 
                    alt={`${pageType.name} icon`}
                    className="w-12 h-12"
                    onError={(e) => {
                      console.error(`Failed to load icon: ${pageType.icon}`);
                      console.error('Image error:', e);
                    }}
                    onLoad={() => {
                      console.log(`Successfully loaded icon: ${pageType.icon}`);
                    }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    {pageType.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {pageType.description}
                  </p>
                </div>
                
                <div className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Drag →
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">💡 Tips</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Start with a Start page</li>
          <li>• Use Question pages to collect information</li>
          <li>• Add a Check Answers page before Confirmation</li>
          <li>• Click and drag pages to reposition them</li>
        </ul>
      </div>
    </div>
  );
}
