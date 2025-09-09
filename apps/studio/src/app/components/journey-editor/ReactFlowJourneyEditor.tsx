'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
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
import { PageCarousel } from './PageCarousel';
import { PageEditor } from './PageEditor';
import { ConditionalLogicModal } from './ConditionalLogicModal';
import { useDatabase } from '@/hooks/useDatabase';

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

// Global ref to store the edit function
let globalEditFunction: ((nodeId: string) => void) | null = null;

// Custom node types for different page types
const CustomNode = ({ data, id, selected, hasConditionalLogic }: { data: any; id: string; selected?: boolean; hasConditionalLogic?: boolean }) => {
  const getNodeBorderColor = (pageType: string) => {
    switch (pageType) {
      case 'start': return 'border-green-500';
      case 'content': return 'border-blue-500';
      case 'question': return 'border-yellow-500';
      case 'check-answers': return 'border-purple-500';
      case 'confirmation': return 'border-green-600';
      case 'service-navigation': return 'border-indigo-500';
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
      case 'service-navigation': return '/icons/service-navigation.svg';
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
        {hasConditionalLogic && (
          <div className="ml-auto">
            <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center" title="Has conditional logic">
              <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="text-gray-900 font-semibold text-sm">
        {data.label}
      </div>
      {data.description && (
        <div className="text-gray-600 text-xs mt-1">
          {data.description}
        </div>
      )}
      
      {/* Edit Button - Only show when node is selected */}
      {selected && (
        <button
          className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
          title="Edit Page"
          onClick={(e) => {
            e.stopPropagation(); // Prevent node selection toggle
            globalEditFunction?.(id); // Call the global edit function
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}
    </div>
  );
};

// Wrapper component to pass conditional logic data
const CustomNodeWrapper = (props: any) => {
  const { conditionalRules } = props;
  const hasConditionalLogic = conditionalRules?.some((rule: any) => rule.source_page_id === props.id) || false;
  return <CustomNode {...props} hasConditionalLogic={hasConditionalLogic} />;
};

// Create a stable node types object
const nodeTypes: NodeTypes = {
  custom: CustomNodeWrapper,
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
  
  // Page Edit Mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [currentEditingNode, setCurrentEditingNode] = useState<any>(null);

  // Conditional Logic Modal state
  const [showConditionalLogicModal, setShowConditionalLogicModal] = useState(false);
  const [conditionalRules, setConditionalRules] = useState<any[]>([]);
  const [pageFields, setPageFields] = useState<{[pageId: string]: any[]}>({});

  // Database operations
  const { saveProject, loading: saveLoading, error: saveError } = useDatabase();

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

  // Removed drag and drop functionality - using click only



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

  // Handle editing a page
  const handleEditPage = useCallback((nodeId: string) => {
    console.log('Edit page:', nodeId);
    const nodeToEdit = nodes.find((n: any) => n.id === nodeId);
    setEditingPageId(nodeId);
    setCurrentEditingNode(nodeToEdit);
    setIsEditMode(true);
    setSelectedNode(null); // Clear selection when entering edit mode
  }, [nodes]);

  // Return to journey editor mode
  const handleBackToJourney = useCallback(() => {
    setIsEditMode(false);
    setEditingPageId(null);
    setCurrentEditingNode(null);
  }, []);

  // Handle saving page data
  const handleSavePage = useCallback(async (pageData: any) => {
    console.log('🎯 ReactFlowJourneyEditor.handleSavePage called with:', {
      editingPageId,
      hasFields: !!pageData.fields,
      fieldsCount: pageData.fields?.length || 0,
      fields: pageData.fields
    });
    
    // Update the node data with the new page content
    setNodes((nds: any) => 
      nds.map((node: any) => 
        node.id === editingPageId 
          ? { ...node, data: { ...node.data, ...pageData } }
          : node
      )
    );
    
    // Update the current editing node with the new data
    if (currentEditingNode) {
      setCurrentEditingNode({
        ...currentEditingNode,
        data: { ...currentEditingNode.data, ...pageData }
      });
    }

    // Save fields to database if they exist
    if (pageData.fields && pageData.fields.length > 0 && editingPageId) {
      try {
        // First, delete existing fields for this page
        await fetch(`/api/page-fields?pageId=${editingPageId}`, {
          method: 'DELETE'
        });

        // Then save new fields
        for (const field of pageData.fields) {
          console.log(`💾 Saving field to database:`, {
            fieldId: field.id,
            fieldName: field.name,
            fieldType: field.type,
            fieldLabel: field.label,
            hasOptions: !!field.options,
            options: field.options
          });
          
          await fetch('/api/page-fields', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pageId: editingPageId,
              field: field
            }),
          });
        }
        
        // Update the pageFields state
        setPageFields(prev => ({
          ...prev,
          [editingPageId]: pageData.fields
        }));
        
        console.log('Fields saved to database successfully');
      } catch (error) {
        console.error('Error saving fields to database:', error);
      }
    }
    
    // Show success message (you could add a toast notification here)
    console.log('Page saved successfully');
  }, [editingPageId, setNodes, currentEditingNode]);

  // Handle selecting a different page in edit mode
  const handlePageSelect = useCallback((pageId: string) => {
    const nodeToEdit = nodes.find((n: any) => n.id === pageId);
    setEditingPageId(pageId);
    setCurrentEditingNode(nodeToEdit);
  }, [nodes]);

  // Set the global edit function
  useEffect(() => {
    globalEditFunction = handleEditPage;
  }, [handleEditPage]);

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

  // Load fields for a specific page
  const loadPageFields = useCallback(async (pageId: string) => {
    try {
      console.log(`🔄 Loading fields for page: ${pageId}`);
      const response = await fetch(`/api/page-fields?pageId=${pageId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Loaded ${data.fields?.length || 0} fields for page ${pageId}:`, data.fields);
        
        // Detailed field inspection
        if (data.fields && data.fields.length > 0) {
          data.fields.forEach((field: any, index: number) => {
            console.log(`   Field ${index}: ${field.label} (${field.type})`, {
              hasOptions: !!field.options,
              options: field.options
            });
          });
        }
        
        setPageFields(prev => ({
          ...prev,
          [pageId]: data.fields || []
        }));
      } else {
        console.error(`❌ Failed to load fields for page ${pageId}:`, response.status, response.statusText);
      }
    } catch (error) {
      console.error('❌ Error loading page fields:', error);
    }
  }, []);

  // Conditional Logic Functions
  const handleOpenConditionalLogic = useCallback(async () => {
    setShowConditionalLogicModal(true);
    // Load fields for all pages when opening the modal
    console.log('Opening conditional logic modal, loading fields for all pages...');
    for (const node of nodes as any[]) {
      console.log(`Loading fields for page ${node.id}:`, node.data.fields);
      await loadPageFields(node.id);
    }
  }, [nodes, loadPageFields]);

  const handleCloseConditionalLogic = useCallback(() => {
    setShowConditionalLogicModal(false);
  }, []);

  const handleSaveCondition = useCallback(async (condition: any) => {
    try {
      const requestData = {
        id: condition.id,
        projectId,
        sourcePageId: condition.sourcePageId,
        targetPageId: condition.toPageId,
        fieldName: condition.fieldName,
        conditionType: condition.conditionType,
        conditionValue: condition.conditionValue,
        conditionLabel: condition.conditionLabel,
        jsonlogicExpression: JSON.stringify(condition.expression)
      };
      
      console.log('🚀 Saving conditional rule:', requestData);
      console.log('📋 Required fields check:', {
        id: !!requestData.id,
        projectId: !!requestData.projectId,
        sourcePageId: !!requestData.sourcePageId,
        targetPageId: !!requestData.targetPageId,
        fieldName: !!requestData.fieldName,
        conditionType: !!requestData.conditionType,
        conditionValue: !!requestData.conditionValue,
        jsonlogicExpression: !!requestData.jsonlogicExpression
      });
      
      const response = await fetch('/api/conditional-rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Refresh conditional rules
        const rulesResponse = await fetch(`/api/conditional-rules?projectId=${projectId}`);
        if (rulesResponse.ok) {
          const data = await rulesResponse.json();
          setConditionalRules(data.rules);
        }
        console.log('✅ Conditional rule saved successfully');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Failed to save conditional rule:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
      }
    } catch (error) {
      console.error('Error saving conditional rule:', error);
    }
  }, [projectId]);

  // Load conditional rules on component mount
  useEffect(() => {
    const loadConditionalRules = async () => {
      try {
        const response = await fetch(`/api/conditional-rules?projectId=${projectId}`);
        if (response.ok) {
          const data = await response.json();
          setConditionalRules(data.rules);
        }
      } catch (error) {
        console.error('Error loading conditional rules:', error);
      }
    };

    loadConditionalRules();
  }, [projectId]);

  // Save project data to database
  const handleSave = useCallback(async () => {
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

    const success = await saveProject(projectData);
    if (success) {
      console.log('Project saved successfully to database');
    } else {
      console.error('Failed to save project to database');
    }
  }, [projectId, projectName, projectDescription, startType, nodes, edges, saveProject]);

  return (
    <div className="flex h-full bg-gray-50">
      {/* Inject custom styles for thicker crosshair and connection lines */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {isEditMode ? (
        // Page Edit Mode
        <div className="flex flex-col w-full">
          {/* Page Carousel at top */}
          <PageCarousel 
            nodes={nodes}
            editingPageId={editingPageId}
            onPageSelect={handlePageSelect}
            onBackToJourney={handleBackToJourney}
          />
          
          {/* Page Editor */}
          <PageEditor 
            node={currentEditingNode}
            onSave={handleSavePage}
            editingPageId={editingPageId}
          />
        </div>
      ) : (
        // Journey Editor Mode
        <>
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
                nodes={nodes.map((node: any) => ({
                  ...node,
                  data: {
                    ...node.data,
                    conditionalRules
                  }
                })) as any}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
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
                  onClick={handleOpenConditionalLogic}
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
                  disabled={saveLoading}
                  className={`px-3 py-1 text-white rounded text-sm transition-colors ${
                    saveLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {saveLoading ? 'Saving...' : 'Save'}
                </button>
                
                {/* Error Display */}
                {saveError && (
                  <div className="text-red-600 text-xs mt-1">
                    Error: {saveError}
                  </div>
                )}
                
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
        </>
      )}

      {/* Conditional Logic Modal */}
      <ConditionalLogicModal
        isOpen={showConditionalLogicModal}
        onClose={handleCloseConditionalLogic}
        pages={nodes.map((node: any) => {
          const nodeFields = node.data.fields || [];
          const dbFields = pageFields[node.id] || [];
          const allFields = nodeFields.length > 0 ? nodeFields : dbFields;
          
          console.log(`📊 Page ${node.id} field sources:`, {
            nodeFields: nodeFields.length,
            dbFields: dbFields.length,
            using: allFields.length > 0 ? (nodeFields.length > 0 ? 'node' : 'db') : 'none'
          });
          
          return {
            id: node.id,
            key: node.id,
            title: node.data.label,
            type: node.data.pageType,
            path: `/${node.id}`,
            fields: allFields,
            next: [],
            conditions: [],
            metadata: {}
          };
        })}
        selectedPageId={selectedNode || undefined}
        onSaveCondition={handleSaveCondition}
        existingConditions={conditionalRules}
        onLoadPageFields={loadPageFields}
        pageFields={pageFields}
      />
    </div>
  );
}
