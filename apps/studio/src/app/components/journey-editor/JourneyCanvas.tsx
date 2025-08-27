'use client';

import { useState, useRef, useCallback } from 'react';
import { PageNode } from './PageNode';
import { ConnectionLine } from './ConnectionLine';
import { PageType } from '../../../types/prototype';

interface Page {
  id: string;
  type: PageType;
  title: string;
  x: number;
  y: number;
  connections: string[]; // IDs of pages this connects to
}

interface JourneyCanvasProps {
  projectId: string;
}

export default function JourneyCanvas({ projectId }: JourneyCanvasProps) {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [draggedPage, setDraggedPage] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle page creation from drag and drop
  const handlePageDrop = useCallback((e: React.DragEvent, pageType: PageType) => {
    e.preventDefault();
    
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPage: Page = {
      id: `page-${Date.now()}`,
      type: pageType,
      title: `New ${pageType}`,
      x,
      y,
      connections: []
    };

    setPages(prev => [...prev, newPage]);
  }, []);

  // Handle page dragging
  const handlePageDragStart = useCallback((pageId: string, e: React.MouseEvent) => {
    setDraggedPage(pageId);
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setDragOffset({
        x: e.clientX - page.x,
        y: e.clientY - page.y
      });
    }
  }, [pages]);

  const handlePageDrag = useCallback((pageId: string, e: React.MouseEvent) => {
    if (draggedPage === pageId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;

      setPages(prev => prev.map(page => 
        page.id === pageId 
          ? { ...page, x: newX, y: newY }
          : page
      ));
    }
  }, [draggedPage, dragOffset]);

  const handlePageDragEnd = useCallback(() => {
    setDraggedPage(null);
  }, []);

  // Handle page selection
  const handlePageClick = useCallback((pageId: string) => {
    setSelectedPage(selectedPage === pageId ? null : pageId);
  }, [selectedPage]);

  // Handle page deletion
  const handlePageDelete = useCallback((pageId: string) => {
    setPages(prev => prev.filter(page => page.id !== pageId));
    setSelectedPage(null);
  }, []);

  // Handle page title editing
  const handlePageTitleChange = useCallback((pageId: string, newTitle: string) => {
    setPages(prev => prev.map(page => 
      page.id === pageId 
        ? { ...page, title: newTitle }
        : page
    ));
  }, []);

  return (
    <div className="flex-1 bg-gray-50 overflow-auto relative">
      {/* Canvas */}
      <div 
        ref={canvasRef}
        className="w-full h-full min-h-[800px] relative"
        onDrop={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Connection Lines */}
        {pages.map(page => 
          page.connections.map(connectionId => {
            const targetPage = pages.find(p => p.id === connectionId);
            if (!targetPage) return null;
            
            return (
              <ConnectionLine
                key={`${page.id}-${connectionId}`}
                startX={page.x + 150} // Assuming page width is 300px
                startY={page.y + 50}  // Assuming page height is 100px
                endX={targetPage.x}
                endY={targetPage.y + 50}
              />
            );
          })
        )}

        {/* Page Nodes */}
        {pages.map(page => (
          <PageNode
            key={page.id}
            page={page}
            isSelected={selectedPage === page.id}
            isDragging={draggedPage === page.id}
            onDragStart={(e: React.MouseEvent) => handlePageDragStart(page.id, e)}
            onDrag={(e: React.MouseEvent) => handlePageDrag(page.id, e)}
            onDragEnd={handlePageDragEnd}
            onClick={() => handlePageClick(page.id)}
            onDelete={() => handlePageDelete(page.id)}
            onTitleChange={(title: string) => handlePageTitleChange(page.id, title)}
          />
        ))}

        {/* Drop Zone Instructions */}
        {pages.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">Start building your prototype</h3>
              <p className="text-gray-400">
                Drag page types from the sidebar onto this canvas to begin
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
