'use client';

interface FloatingToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onToggleConnections: () => void;
  onToggleContent: () => void;
  onToggleProperties: () => void;
  onToggleGridSnap: () => void;
  onTogglePanMode: () => void;
  currentZoom: number;
  isConnectionsMode: boolean;
  isGridSnapEnabled: boolean;
  isPanMode: boolean;
}

export function FloatingToolbar({
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onToggleConnections,
  onToggleContent,
  onToggleProperties,
  onToggleGridSnap,
  onTogglePanMode,
  currentZoom,
  isConnectionsMode,
  isGridSnapEnabled,
  isPanMode
}: FloatingToolbarProps) {
  return (
    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50">
      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 border-r border-gray-200 pr-3">
            <button
              onClick={onZoomOut}
              className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              title="Zoom Out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            
            <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-center">
              {Math.round(currentZoom * 100)}%
            </span>
            
            <button
              onClick={onZoomIn}
              className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              title="Zoom In"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM12 7v6m3-3H9" />
              </svg>
            </button>
            
            <button
              onClick={onZoomReset}
              className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              title="Reset Zoom"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Connection Tool */}
          <button
            onClick={onToggleConnections}
            className={`
              w-8 h-8 rounded-md flex items-center justify-center transition-colors
              ${isConnectionsMode 
                ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }
            `}
            title="Toggle Connection Mode"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>

          {/* Content Editor */}
          <button
            onClick={onToggleContent}
            className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
            title="Edit Page Content"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Properties Panel */}
          <button
            onClick={onToggleProperties}
            className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
            title="Toggle Properties Panel"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Grid Snap Toggle */}
          <button
            onClick={onToggleGridSnap}
            className={`
              w-8 h-8 rounded-md flex items-center justify-center transition-colors
              ${isGridSnapEnabled 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }
            `}
            title="Toggle Grid Snap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>

          {/* Pan Mode Toggle */}
          <button
            onClick={onTogglePanMode}
            className={`
              w-8 h-8 rounded-md flex items-center justify-center transition-colors
              ${isPanMode 
                ? 'bg-purple-100 text-purple-700 border border-purple-300' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }
            `}
            title="Toggle Pan Mode"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 019-9 9.75 9.75 0 016.743 2.737c.067.11.107.232.12.353.013.121.007.243-.02.364-.023.12-.063.24-.12.35L12 21l-3.263-3.263c-.11-.057-.23-.097-.35-.12-.12-.023-.24-.029-.36-.02-.121.007-.243.001-.364.02-.12.013-.242.053-.353.12A9.75 9.75 0 013 12z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
