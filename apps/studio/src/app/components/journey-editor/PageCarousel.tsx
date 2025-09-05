'use client';

import { Node } from '@xyflow/react';

interface PageCarouselProps {
  nodes: Node[];
  editingPageId: string | null;
  onPageSelect: (pageId: string) => void;
  onBackToJourney: () => void;
}

export function PageCarousel({ nodes, editingPageId, onPageSelect, onBackToJourney }: PageCarouselProps) {
  // Sort nodes by their position to maintain flow order
  const sortedNodes = [...nodes].sort((a, b) => {
    // Sort by Y position first (top to bottom), then by X position (left to right)
    if (Math.abs(a.position.y - b.position.y) < 50) {
      return a.position.x - b.position.x;
    }
    return a.position.y - b.position.y;
  });

  const getPageIcon = (pageType: string) => {
    switch (pageType) {
      case 'start': return '/icons/start-page.svg';
      case 'content': return '/icons/question-page.svg';
      case 'question': return '/icons/question-check.svg';
      case 'check-answers': return '/icons/cya-page.svg';
      case 'confirmation': return '/icons/confirmation-page.svg';
      case 'service-navigation': return '/icons/service-navigation.svg';
      default: return '/icons/question-page.svg';
    }
  };

  const getPageColor = (pageType: string) => {
    switch (pageType) {
      case 'start': return 'border-green-500 bg-green-50';
      case 'content': return 'border-blue-500 bg-blue-50';
      case 'question': return 'border-yellow-500 bg-yellow-50';
      case 'check-answers': return 'border-purple-500 bg-purple-50';
      case 'confirmation': return 'border-green-600 bg-green-50';
      case 'service-navigation': return 'border-indigo-500 bg-indigo-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 flex-shrink-0">
      {/* Header with back button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Page Editor</h2>
        <button
          onClick={onBackToJourney}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Journey
        </button>
      </div>

      {/* Horizontal page carousel */}
      <div className="p-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {sortedNodes.map((node) => {
            const isActive = node.id === editingPageId;
            const isSelected = node.id === editingPageId;
            
            return (
              <button
                key={node.id}
                onClick={() => onPageSelect(node.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-200 min-w-fit ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <img 
                    src={getPageIcon(node.data.pageType as string)} 
                    alt={`${node.data.pageType as string} icon`}
                    className="w-6 h-6"
                  />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {node.data.label as string}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {(node.data.pageType as string).replace('-', ' ')}
                  </div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
