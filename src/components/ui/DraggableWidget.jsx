import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ArrowDown } from 'lucide-react';

const DraggableWidget = ({ 
  id, 
  children, 
  customizationMode = false,
  isDragDisabled = false,
  activeId = null,
  className = '',
  isMinimized = false,
  ...props 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ 
    id,
    disabled: isDragDisabled || !customizationMode
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isActive = activeId === id;
  const showDropZone = customizationMode && activeId && !isActive;

  return (
    <div className="relative">
      {/* Drop Zone Indicator - Shows above the widget when dragging */}
      {showDropZone && (
        <div className="relative mb-4">
          <div className="absolute inset-0 border-2 border-dashed border-primary/40 bg-primary/5 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 animate-pulse">
            <div className="flex items-center space-x-2 text-primary font-medium text-sm">
              <ArrowDown className="w-4 h-4" />
              <span>Drop widget here</span>
            </div>
          </div>
          <div className="h-4"></div>
        </div>
      )}

      <div
        ref={setNodeRef}
        style={style}
        className={`relative group ${className} ${
          customizationMode && !isDragDisabled 
            ? 'cursor-grab active:cursor-grabbing' : ''
        } ${
          isDragging ? 'opacity-50 scale-95 shadow-2xl z-50' : ''
        } ${
          isOver && !isDragging ? 'ring-2 ring-primary/50 ring-offset-2' : ''
        }`}
        {...(customizationMode && !isDragDisabled ? { ...attributes, ...listeners } : {})}
        {...props}
      >
        {/* Enhanced Drag Handle - Always visible in customization mode, positioned for minimized widgets */}
        {customizationMode && !isDragDisabled && (
          <div
            className={`absolute z-20 bg-primary text-primary-foreground rounded-md p-1.5 shadow-lg pointer-events-none transition-all duration-200 ${
              isMinimized 
                ? 'top-2 right-2 opacity-100' // Always visible for minimized widgets
                : '-top-2 -right-2 opacity-0 group-hover:opacity-100' // Hover behavior for expanded widgets
            }`}
            title="Drag to reorder"
          >
            <GripVertical className="w-4 h-4" />
          </div>
        )}
        
        {/* Enhanced Drag overlay indicator - Better visibility for minimized widgets */}
        {customizationMode && !isDragDisabled && !isDragging && (
          <div 
            className={`absolute inset-0 border-2 border-dashed rounded-lg transition-all duration-200 pointer-events-none z-10 ${
              isMinimized
                ? 'border-primary/30 opacity-0 group-hover:opacity-100 bg-primary/5' // Enhanced visibility for minimized
                : 'border-primary/20 opacity-0 group-hover:opacity-100'
            }`} 
          />
        )}

        {/* Widget Content */}
        <div className={customizationMode && !isDragDisabled ? 'relative z-0' : ''}>
          {children}
        </div>

        {/* Minimized Widget Drag Feedback */}
        {customizationMode && !isDragDisabled && isMinimized && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15">
            <div className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-medium shadow-md">
              Drag to reorder
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableWidget;