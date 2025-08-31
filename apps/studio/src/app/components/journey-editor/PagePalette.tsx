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

interface PagePaletteProps {
  onAddPage: (pageType: string, position: { x: number; y: number }) => void;
  onHide: () => void;
}

export function PagePalette({ onAddPage, onHide }: PagePaletteProps) {
  const handleAddPage = (pageType: PageType) => {
    // Calculate a position that's offset from the center
    const centerX = window.innerWidth / 2 - 100;
    const centerY = window.innerHeight / 2 - 100;
    const offset = Math.random() * 200 - 100; // Random offset between -100 and 100
    
    onAddPage(pageType, {
      x: centerX + offset,
      y: centerY + offset
    });
  };

  const handleDragStart = (e: React.DragEvent, pageType: PageType) => {
    e.dataTransfer.setData('application/reactflow', JSON.stringify({
      type: 'page',
      pageType: pageType
    }));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Page Types</h2>
        <p className="text-xs text-gray-600">
          Drag page types onto the canvas or click to add them
        </p>
      </div>

      {/* Page Types List */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-3">
          {pageTypes.map((pageType) => (
            <div
              key={pageType.type}
              draggable
              onDragStart={(e) => handleDragStart(e, pageType.type)}
              onClick={() => handleAddPage(pageType.type)}
              className="group cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
            >
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img 
                        src={pageType.icon} 
                        alt={`${pageType.name} icon`}
                        className="w-10 h-10"
                        onError={(e) => {
                          console.error(`Failed to load icon: ${pageType.icon}`);
                          // Show fallback icon when SVG fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                        onLoad={(e) => {
                          // Hide fallback when SVG loads successfully
                          const target = e.target as HTMLImageElement;
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'none';
                        }}
                      />
                      {/* Fallback icon */}
                      <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-sm font-bold hidden">
                        {pageType.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 group-hover:text-gray-700 text-sm">
                      {pageType.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {pageType.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide Button at Bottom */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onHide}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
        >
          Hide Palette
        </button>
      </div>
    </div>
  );
}
