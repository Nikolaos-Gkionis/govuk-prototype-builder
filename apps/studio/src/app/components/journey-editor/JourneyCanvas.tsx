'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { PageNode } from './PageNode';
import { ConnectionLine } from './ConnectionLine';
import { FloatingToolbar } from './FloatingToolbar';
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
  zoom: number;
  setZoom: (zoom: number) => void;
}

export default function JourneyCanvas({ 
  projectId, 
  zoom, 
  setZoom
}: JourneyCanvasProps) {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [draggedPage, setDraggedPage] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Local state for toolbar features
  const [isConnectionsMode, setIsConnectionsMode] = useState(false);
  const [isGridSnapEnabled, setIsGridSnapEnabled] = useState(false); // Disabled by default for pixel-perfect movement
  const [isPanMode, setIsPanMode] = useState(false);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  
  // Connection state
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [connectionPreview, setConnectionPreview] = useState({ x: 0, y: 0 });
  const [isDrawingConnection, setIsDrawingConnection] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // Toolbar functions
  const handleToggleConnections = useCallback(() => {
    setIsConnectionsMode(prev => !prev);
  }, []);

  const handleToggleContent = useCallback(() => {
    // TODO: Implement content modal
    console.log('Content editor toggled');
  }, []);

  const handleToggleProperties = useCallback(() => {
    // TODO: Implement properties panel
    console.log('Properties panel toggled');
  }, []);

  const handleToggleGridSnap = useCallback(() => {
    // Grid snap is always disabled for pixel-perfect movement
    console.log('Grid snap is always disabled for pixel-perfect movement');
  }, []);

  const handleTogglePanMode = useCallback(() => {
    setIsPanMode(prev => !prev);
  }, []);

  // Pan mode functions
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (isPanMode || e.button === 1) { // Middle mouse button or pan mode
      e.preventDefault();
      setIsPanning(true);
      setPanStart({
        x: e.clientX - canvasOffset.x,
        y: e.clientY - canvasOffset.y
      });
    }
  }, [isPanMode, canvasOffset]);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const newOffset = {
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      };
      setCanvasOffset(newOffset);
    }
    
    // Update connection preview
    if (isDrawingConnection && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - canvasOffset.x) / zoom;
      const y = (e.clientY - rect.top - canvasOffset.y) / zoom;
      setConnectionPreview({ x, y });
    }
  }, [isPanning, panStart, isDrawingConnection, canvasOffset, zoom]);

  const handleCanvasMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Keyboard event handling for spacebar pan
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        setIsPanMode(true);
        document.body.style.cursor = 'grab';
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPanMode(false);
        document.body.style.cursor = 'default';
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.body.style.cursor = 'default';
    };
  }, []);

  // Zoom functions
  const handleZoomIn = useCallback(() => {
    setZoom(Math.min(zoom * 1.2, 3));
  }, [zoom, setZoom]);

  const handleZoomOut = useCallback(() => {
    setZoom(Math.max(zoom / 1.2, 0.3));
  }, [zoom, setZoom]);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, [setZoom]);





  // Save pages to localStorage whenever they change
  useEffect(() => {
    if (projectId && pages.length > 0) {
      const existingProjects = JSON.parse(localStorage.getItem('govuk-prototypes') || '[]');
      const updatedProjects = existingProjects.map((p: any) => {
        if (p.id === projectId) {
          return { ...p, pages, connections: pages.flatMap(page => page.connections) };
        }
        return p;
      });
      localStorage.setItem('govuk-prototypes', JSON.stringify(updatedProjects));
    }
  }, [pages, projectId]);

  // Load pages from localStorage on component mount
  useEffect(() => {
    if (projectId) {
      const existingProjects = JSON.parse(localStorage.getItem('govuk-prototypes') || '[]');
      const foundProject = existingProjects.find((p: any) => p.id === projectId);
      if (foundProject && foundProject.pages) {
        setPages(foundProject.pages);
      }
    }
  }, [projectId]);

  // Handle page creation from drag and drop
  const handlePageDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!canvasRef.current) return;
  
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
  
    try {
      const { type: pageType } = JSON.parse(data);
      const rect = canvasRef.current.getBoundingClientRect();
      
      // NO GRID SNAPPING - pixel perfect placement
      const x = (e.clientX - rect.left - canvasOffset.x) / zoom;
      const y = (e.clientY - rect.top - canvasOffset.y) / zoom;
  
      const newPage: Page = {
        id: `page-${Date.now()}`,
        type: pageType,
        title: `New ${pageType}`,
        x: x,
        y: y,
        connections: []
      };
  
      setPages(prev => [...prev, newPage]);
    } catch (error) {
      console.error('Error processing drop:', error);
    }
  }, [zoom, canvasOffset]);

  // Handle page dragging
  const handlePageDragStart = useCallback((pageId: string, e: React.MouseEvent) => {
    setDraggedPage(pageId);
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setDragOffset({
        x: (e.clientX - canvasOffset.x) / zoom - page.x,
        y: (e.clientY - canvasOffset.y) / zoom - page.y
      });
    }
  }, [pages, zoom, canvasOffset]);

  const handlePageDrag = useCallback((pageId: string, e: React.MouseEvent) => {
    if (draggedPage === pageId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      
      // NO GRID SNAPPING - pixel perfect movement
      const newX = (e.clientX - rect.left - canvasOffset.x) / zoom - dragOffset.x;
      const newY = (e.clientY - rect.top - canvasOffset.y) / zoom - dragOffset.y;
  
      setPages(prev => prev.map(page => 
        page.id === pageId 
          ? { ...page, x: newX, y: newY }
          : page
      ));
    }
  }, [draggedPage, dragOffset, zoom, canvasOffset]);

  const handlePageDragEnd = useCallback(() => {
    setDraggedPage(null);
  }, []);

// Handle page selection and connection mode
const handlePageClick = useCallback((pageId: string) => {
  if (isConnectionsMode && connectionStart === null) {
    // Start connection from this page
    setConnectionStart(pageId);
    setIsDrawingConnection(true);
    console.log('Starting connection from page:', pageId);
  } else if (isConnectionsMode && connectionStart !== null && connectionStart !== pageId) {
    // Complete connection to this page
    const startPage = pages.find(p => p.id === connectionStart);
    const endPage = pages.find(p => p.id === pageId);
    
    if (startPage && endPage) {
      // Add connection
      setPages(prev => prev.map(page => {
        if (page.id === connectionStart) {
          return { ...page, connections: [...page.connections, pageId] };
        }
        return page;
      }));
      
      console.log('Connection created from', startPage.title, 'to', endPage.title);
    }
    
    // Reset connection state
    setConnectionStart(null);
    setIsDrawingConnection(false);
  } else {
    // Normal page selection
    setSelectedPage(selectedPage === pageId ? null : pageId);
  }
}, [selectedPage, isConnectionsMode, connectionStart, pages]);

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
        onDrop={(e) => handlePageDrop(e)}
        onDragOver={(e) => e.preventDefault()}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        style={{
          backgroundImage: `
            radial-gradient(circle, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: '0 0',
          transform: `scale(${zoom}) translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
          transformOrigin: '0 0'
        }}
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

        {/* Connection Preview Line */}
        {isDrawingConnection && connectionStart && (
          (() => {
            const startPage = pages.find(p => p.id === connectionStart);
            if (!startPage) return null;
            
            return (
              <ConnectionLine
                key="connection-preview"
                startX={startPage.x + 150}
                startY={startPage.y + 50}
                endX={connectionPreview.x}
                endY={connectionPreview.y}
                isPreview={true}
              />
            );
          })()
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
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <div className="text-6xl mb-4">📋</div>
            <div className="text-xl font-medium mb-2">Start building your prototype</div>
            <div className="text-sm text-center max-w-md">
              Drag page types from the sidebar onto this canvas to begin creating your journey
            </div>
          </div>
        )}
      </div>

      {/* Floating Toolbar */}
      <FloatingToolbar
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        onToggleConnections={handleToggleConnections}
        onToggleContent={handleToggleContent}
        onToggleProperties={handleToggleProperties}
        onToggleGridSnap={handleToggleGridSnap}
        onTogglePanMode={handleTogglePanMode}
        currentZoom={zoom}
        isConnectionsMode={isConnectionsMode}
        isGridSnapEnabled={isGridSnapEnabled}
        isPanMode={isPanMode}
      />
    </div>
  );
}
