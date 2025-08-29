'use client';

import { useState, useCallback, useEffect } from 'react';
import { PagePalette } from './PagePalette';
import JourneyCanvas from './JourneyCanvas';

interface JourneyEditorProps {
  projectId: string;
  projectName: string;
  projectDescription: string;
  startType: 'blank' | 'template';
}

export default function JourneyEditor({ projectId, projectName, projectDescription, startType }: JourneyEditorProps) {
  const [showPagePalette, setShowPagePalette] = useState(true);
  
  // Zoom state
  const [zoom, setZoom] = useState(1);

  // Zoom functions
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.2, 0.3));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, []);



  // Keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '=':
          case '+':
            e.preventDefault();
            handleZoomIn();
            break;
          case '-':
            e.preventDefault();
            handleZoomOut();
            break;
          case '0':
            e.preventDefault();
            handleZoomReset();
            break;
        }
      }
    };

    // Wheel zoom support
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          handleZoomIn();
        } else {
          handleZoomOut();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [handleZoomIn, handleZoomOut, handleZoomReset]);

  return (
    <div className="flex h-full bg-gray-50">
      {/* Page Palette Sidebar */}
      {showPagePalette && <PagePalette />}
      
      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{projectName}</h1>
                {projectDescription && (
                  <p className="text-sm text-gray-600 mt-1">{projectDescription}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">Project ID: {projectId}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">Type: {startType === 'blank' ? 'Blank prototype' : 'Template-based'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Toggle Sidebar Button */}
              <button
                onClick={() => setShowPagePalette(!showPagePalette)}
                className="btn-secondary text-sm"
                title={showPagePalette ? 'Hide sidebar' : 'Show sidebar'}
              >
                {showPagePalette ? '◀' : '▶'} Sidebar
              </button>
              
              {/* Save Button */}
              <button className="btn-primary text-sm">
                💾 Save Journey
              </button>
              
              {/* Preview Button */}
              <button className="btn-secondary text-sm">
                👁️ Preview
              </button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <JourneyCanvas 
          projectId={projectId} 
          zoom={zoom}
          setZoom={setZoom}
        />
      </div>
    </div>
  );
}
