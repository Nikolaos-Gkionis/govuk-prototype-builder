'use client';

import { useState, useRef } from 'react';
import { PageType } from '../../../types/prototype';

interface Page {
  id: string;
  type: PageType;
  title: string;
  x: number;
  y: number;
  connections: string[];
}

interface PageNodeProps {
  page: Page;
  isSelected: boolean;
  isDragging: boolean;
  onDragStart: (e: React.MouseEvent) => void;
  onDrag: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
  onClick: () => void;
  onDelete: () => void;
  onTitleChange: (title: string) => void;
}

const pageTypeConfig = {
  start: {
    icon: '/icons/start-page.svg',
    color: 'bg-green-500',
    borderColor: 'border-green-300',
    selectedBorderColor: 'border-green-600'
  },
  content: {
    icon: '/icons/question-page.svg',
    color: 'bg-blue-500',
    borderColor: 'border-blue-300',
    selectedBorderColor: 'border-blue-600'
  },
  question: {
    icon: '/icons/question-check.svg',
    color: 'bg-purple-500',
    borderColor: 'border-purple-300',
    selectedBorderColor: 'border-purple-600'
  },
  'check-answers': {
    icon: '/icons/cya-page.svg',
    color: 'bg-yellow-500',
    borderColor: 'border-yellow-300',
    selectedBorderColor: 'border-yellow-600'
  },
  confirmation: {
    icon: '/icons/confirmation-page.svg',
    color: 'bg-green-600',
    borderColor: 'border-green-400',
    selectedBorderColor: 'border-green-700'
  }
};

export function PageNode({
  page,
  isSelected,
  isDragging,
  onDragStart,
  onDrag,
  onDragEnd,
  onClick,
  onDelete,
  onTitleChange
}: PageNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(page.title);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const config = pageTypeConfig[page.type] || pageTypeConfig.content;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click only
      onDragStart(e);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      onDrag(e);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      onDragEnd();
    }
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditing) {
      setIsEditing(true);
      setEditTitle(page.title);
      setTimeout(() => titleInputRef.current?.focus(), 0);
    }
  };

  const handleTitleSubmit = () => {
    if (editTitle.trim()) {
      onTitleChange(editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(page.title);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      className={`absolute w-[300px] h-[100px] cursor-move select-none ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      style={{
        left: page.x,
        top: page.y,
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        transition: isDragging ? 'none' : 'all 0.2s ease'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={onClick}
    >
      {/* Page Node */}
      <div
        className={`relative w-full h-full rounded-lg border-2 shadow-lg ${
          isSelected 
            ? config.selectedBorderColor 
            : config.borderColor
        } bg-white hover:shadow-xl transition-all duration-200`}
      >
        {/* Header */}
        <div className="h-12 rounded-t-lg bg-gray-800 flex items-center justify-between px-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <img 
                src={config.icon} 
                alt={`${page.type} icon`}
                className="w-8 h-8"
                onError={(e) => {
                  console.error(`Failed to load icon: ${config.icon}`);
                  // Show fallback icon when SVG fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
                onLoad={() => {
                  console.log(`Successfully loaded icon: ${config.icon}`);
                }}
              />
              {/* Fallback icon when SVG fails to load */}
              <div 
                className="w-8 h-8 bg-white rounded flex items-center justify-center text-gray-800 font-bold text-sm hidden"
                style={{ display: 'none' }}
              >
                {page.type.charAt(0).toUpperCase()}
              </div>
            </div>
            <span className="text-white text-xs font-medium uppercase tracking-wide">
              {page.type}
            </span>
          </div>
          
          {/* Delete Button */}
          <button
            onClick={handleDeleteClick}
            className="text-white hover:text-red-200 transition-colors text-sm"
            title="Delete page"
          >
            🗑️
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          {isEditing ? (
            <input
              ref={titleInputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={handleTitleKeyDown}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter page title..."
            />
          ) : (
            <div
              onClick={handleTitleClick}
              className="min-h-[20px] px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-text transition-colors"
            >
              {page.title || 'Click to edit title'}
            </div>
          )}
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute -inset-1 rounded-lg border-2 border-blue-400 pointer-events-none animate-pulse" />
        )}
      </div>
    </div>
  );
}
