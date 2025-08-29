'use client';

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isPreview?: boolean;
}

export function ConnectionLine({ startX, startY, endX, endY, isPreview = false }: ConnectionLineProps) {
  // Calculate the path for the connection line
  const midX = (startX + endX) / 2;
  
  // Create a curved path using SVG path commands
  const pathData = `M ${startX} ${startY} Q ${midX} ${startY} ${endX} ${endY}`;
  
  // Different styles for preview vs actual connections
  const strokeColor = isPreview ? "#3B82F6" : "#6B7280";
  const strokeWidth = isPreview ? "3" : "2";
  const strokeDasharray = isPreview ? "8,4" : "5,5";
  
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {/* Connection Line */}
      <path
        d={pathData}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={strokeDasharray}
        className={isPreview ? "animate-pulse" : ""}
      />
      
      {/* Arrow Head */}
      <defs>
        <marker
          id={`arrowhead-${isPreview ? 'preview' : 'normal'}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={strokeColor}
          />
        </marker>
      </defs>
      
      {/* Connection Line with Arrow */}
      <path
        d={pathData}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        markerEnd={`url(#arrowhead-${isPreview ? 'preview' : 'normal'})`}
      />
    </svg>
  );
}
