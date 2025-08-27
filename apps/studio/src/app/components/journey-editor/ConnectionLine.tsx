'use client';

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export function ConnectionLine({ startX, startY, endX, endY }: ConnectionLineProps) {
  // Calculate the path for the connection line
  const midX = (startX + endX) / 2;
  
  // Create a curved path using SVG path commands
  const pathData = `M ${startX} ${startY} Q ${midX} ${startY} ${endX} ${endY}`;
  
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {/* Connection Line */}
      <path
        d={pathData}
        stroke="#6B7280"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5,5"
        className="animate-pulse"
      />
      
      {/* Arrow Head */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#6B7280"
          />
        </marker>
      </defs>
      
      {/* Connection Line with Arrow */}
      <path
        d={pathData}
        stroke="#6B7280"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
}
