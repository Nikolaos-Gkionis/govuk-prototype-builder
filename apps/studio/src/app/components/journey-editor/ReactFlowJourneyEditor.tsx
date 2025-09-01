'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
  ConnectionLineType,
  Panel,
  ReactFlowProvider,
  XYPosition,
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom styles for thicker crosshair and connection lines
const customStyles = `
  .react-flow__pane.cursor-crosshair {
    cursor: crosshair !important;
  }
  
  .react-flow__connection-line {
    stroke-width: 3px !important;
    stroke: #3b82f6 !important;
  }
  
  .react-flow__edge-path {
    stroke-width: 3px !important;
    stroke: #3b82f6 !important;
  }
`;

// Import existing components for now
import { PagePalette } from './PagePalette';

// Types for our journey editor
interface JourneyPage {
  id: string;
  type: 'start' | 'content' | 'question' | 'checkAnswers' | 'confirmation';
  title: string;
  position: XYPosition;
  data: {
    label: string;
    pageType: string;
    description?: string;
  };
}

interface JourneyConnection {
  id: string;
  source: string;
  target: string;
  type: 'default';
  data?: {
    condition?: string;
    label?: string;
  };
}

interface ReactFlowJourneyEditorProps {
  projectId: string;
  projectName: string;
  projectDescription: string;
  startType: 'blank' | 'template';
}

// Custom node types for different page types
const CustomNode = ({ data, id, selected }: { data: any; id: string; selected?: boolean }) => {
  const getNodeBorderColor = (pageType: string) => {
    switch (pageType) {
      case 'start': return 'border-green-500';
      case 'content': return 'border-blue-500';
      case 'question': return 'border-yellow-500';
      case 'check-answers': return 'border-purple-500';
      case 'confirmation': return 'border-green-600';
      default: return 'border-gray-500';
    }
  };

  const getNodeIcon = (pageType: string) => {
    switch (pageType) {
      case 'start': return '/icons/start-page.svg';
      case 'content': return '/icons/question-page.svg';
      case 'question': return '/icons/question-check.svg';
      case 'check-answers': return '/icons/cya-page.svg';
      case 'confirmation': return '/icons/confirmation-page.svg';
      default: return '/icons/question-page.svg';
    }
  };

  return (
    <div className={`px-4 py-3 shadow-lg rounded-lg border-2 bg-white min-w-[180px] relative ${getNodeBorderColor(data.pageType)} ${selected ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}>
      {/* React Flow connection handles - Natural flow direction */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-5 h-5" 
        style={{ backgroundColor: '#10b981', border: '1px solid white' }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-5 h-5" 
        style={{ backgroundColor: '#10b981', border: '1px solid white' }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-5 h-5" 
        style={{ backgroundColor: '#3b82f6', border: '1px solid white' }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-5 h-5" 
        style={{ backgroundColor: '#3b82f6', border: '1px solid white' }}
      />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 flex items-center justify-center">
          <img 
            src={getNodeIcon(data.pageType)} 
            alt={`${data.pageType} icon`}
            className="w-8 h-8"
            onError={(e) => {
              // Show fallback icon when SVG fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback icon */}
          <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs font-bold hidden">
            {data.pageType.charAt(0).toUpperCase()}
          </div>
        </div>
        <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          {data.pageType}
        </span>
      </div>
      <div className="text-gray-900 font-semibold text-sm">
        {data.label}
      </div>
      {data.description && (
        <div className="text-gray-600 text-xs mt-1">
          {data.description}
        </div>
      )}
    </div>
  );
};

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

export default function ReactFlowJourneyEditor({
  projectId,
  projectName,
  projectDescription,
  startType
}: ReactFlowJourneyEditorProps) {
  const [showPagePalette, setShowPagePalette] = useState(true);
  // @ts-ignore - React Flow type inference issue
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  // @ts-ignore - React Flow type inference issue
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Initialize with a start page if no pages exist
  useMemo(() => {
    if (nodes.length === 0) {
      const startNode = {
        id: 'start-1',
        type: 'custom',
        position: { x: 100, y: 100 },
        data: {
          label: 'Start',
          pageType: 'start',
          description: 'Welcome to your service'
        }
      };
      // @ts-ignore - React Flow type inference issue
      setNodes([startNode]);
    }
  }, [nodes.length, setNodes]);

  // Add drag and drop event listeners to ReactFlow pane
  useEffect(() => {
    const reactFlowPane = document.querySelector('.react-flow__pane');
    if (!reactFlowPane) return;

    const handleDragOver = (event: Event) => {
      event.preventDefault();
      const dragEvent = event as DragEvent;
      if (dragEvent.dataTransfer) {
        dragEvent.dataTransfer.dropEffect = 'move';
      }
    };

    const handleDrop = (event: Event) => {
      event.preventDefault();
      const dragEvent = event as DragEvent;
      if (!dragEvent.dataTransfer) return;

      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const data = dragEvent.dataTransfer.getData('application/reactflow');
      if (!data) return;

      try {
        const { type, pageType } = JSON.parse(data);
        if (type === 'page' && pageType) {
          const position = {
            x: dragEvent.clientX - reactFlowBounds.left,
            y: dragEvent.clientY - reactFlowBounds.top,
          };

          const newNode = {
            id: `${pageType}-${Date.now()}`,
            type: 'custom',
            position,
            data: {
              label: `New ${pageType}`,
              pageType,
              description: `Add your ${pageType} content here`
            }
          };

          // @ts-ignore - React Flow type inference issue
          setNodes((nds: any) => [...nds, newNode]);
        }
      } catch (error) {
        console.error('Error parsing drop data:', error);
      }
    };

    reactFlowPane.addEventListener('dragover', handleDragOver);
    reactFlowPane.addEventListener('drop', handleDrop);

    return () => {
      reactFlowPane.removeEventListener('dragover', handleDragOver);
      reactFlowPane.removeEventListener('drop', handleDrop);
    };
  }, [setNodes]);



  // Handle new connections
  const onConnect = useCallback(
    (params: Connection) => {
      // @ts-ignore - React Flow type inference issue
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node.id);
  }, []);

  // Handle canvas click to deselect
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);







  // Add new page from palette (click functionality)
  const handleAddPage = useCallback((pageType: string, position: XYPosition) => {
    const newNode = {
      id: `${pageType}-${Date.now()}`,
      type: 'custom',
      position,
      data: {
        label: `New ${pageType}`,
        pageType,
        description: `Add your ${pageType} content here`
      }
    };
    // @ts-ignore - React Flow type inference issue
    setNodes((nds: any) => [...nds, newNode]);
  }, [setNodes]);

  // Delete selected node
  const deleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      // @ts-ignore - React Flow type inference issue
      setNodes((nds: any) => nds.filter((node: any) => node.id !== selectedNode));
      // @ts-ignore - React Flow type inference issue
      setEdges((eds: any) => eds.filter((edge: any) => edge.source !== selectedNode && edge.target !== selectedNode));
      setSelectedNode(null);
    }
  }, [selectedNode, setNodes, setEdges]);

  // Save project data
  const handleSave = useCallback(() => {
    const projectData = {
      id: projectId,
      name: projectName,
      description: projectDescription,
      startType,
      pages: nodes.map((node: any) => ({
        id: node.id,
        type: node.data.pageType,
        title: node.data.label,
        position: node.position,
        data: node.data
      })),
      connections: edges.map((edge: any) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        data: edge.data
      }))
    };

    // Save to localStorage
    const existingProjects = JSON.parse(localStorage.getItem('govuk-prototypes') || '[]');
    const projectIndex = existingProjects.findIndex((p: any) => p.id === projectId);
    
    if (projectIndex >= 0) {
      existingProjects[projectIndex] = projectData;
    } else {
      existingProjects.push(projectData);
    }
    
    localStorage.setItem('govuk-prototypes', JSON.stringify(existingProjects));
    console.log('Project saved successfully');
  }, [projectId, projectName, projectDescription, startType, nodes, edges]);

  return (
    <div className="flex h-full bg-gray-50">
      {/* Inject custom styles for thicker crosshair and connection lines */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      {/* Left Sidebar - Page Palette */}
      {showPagePalette && (
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <PagePalette onAddPage={handleAddPage} onHide={() => setShowPagePalette(false)} />
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="flex-1 relative">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
            attributionPosition="bottom-left"
            className={`bg-gray-50 ${selectedNode ? 'cursor-crosshair' : ''}`}
            connectionLineStyle={{ strokeWidth: 3, stroke: '#3b82f6' }}
          >
                      {/* Canvas Controls - Hide when a page is selected to allow connections */}
          {!selectedNode && <Controls />}
            <Background color="#aaa" gap={16} />
            <MiniMap 
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              nodeColor={(node: any) => {
                const colors: { [key: string]: string } = {
                  start: '#10b981',
                  content: '#3b82f6',
                  question: '#f59e0b',
                  'check-answers': '#8b5cf6',
                  confirmation: '#059669'
                };
                return colors[node.data?.pageType] || '#6b7280';
              }}
            />

            {/* Project Info Panel */}
            <Panel position="top-right" className="bg-white rounded-lg shadow-lg p-3 m-4 max-w-xs">
              <h2 className="font-semibold text-gray-900 mb-1 text-sm">{projectName}</h2>
              <p className="text-xs text-gray-600">{projectDescription}</p>
              <div className="text-xs text-gray-500 mt-2">
                Pages: {nodes.length} | Connections: {edges.length}
              </div>
              
              {/* Connection Legend */}
              <div className="mt-3 pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-600 mb-1">Connection Handles:</div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-500">Input</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-500">Output</span>
                  </div>
                </div>
              </div>
            </Panel>
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {/* Bottom Toolbar - Hovering at bottom */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-6 py-3 hover:shadow-xl transition-shadow duration-200">
                      <div className="flex items-center gap-4">
              {/* Connection Tool */}
              <button
                title="Add Connection"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </button>
              
              {/* Conditional Logic Tool */}
            <button
              title="Add Conditional Logic"
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
            
            {/* Divider */}
            <div className="w-px h-6 bg-gray-300"></div>
            
            {/* Show/Hide Palette */}
            <button
              onClick={() => setShowPagePalette(!showPagePalette)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition-colors"
            >
              {showPagePalette ? 'Hide' : 'Show'} Palette
            </button>
            
            {/* Save Button */}
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm transition-colors"
            >
              Save
            </button>
            
            {/* Delete Button - Only show when node is selected */}
            {selectedNode && (
              <button
                onClick={deleteSelectedNode}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
