'use client';

import { useState } from 'react';
import { PagePalette } from './PagePalette';
import JourneyCanvas from './JourneyCanvas';

interface JourneyEditorProps {
  projectId: string;
}

export default function JourneyEditor({ projectId }: JourneyEditorProps) {
  const [showPagePalette, setShowPagePalette] = useState(true);

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
              <h1 className="text-2xl font-bold text-gray-900">Journey Editor</h1>
              <span className="text-sm text-gray-500">Project: {projectId}</span>
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
        <JourneyCanvas projectId={projectId} />
      </div>
    </div>
  );
}
