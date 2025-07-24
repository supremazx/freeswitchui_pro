import React, { useState, useEffect } from 'react';
import { EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../../../components/ui/Button';

const DashboardWidget = ({
  widgetId,
  title,
  children,
  customizationMode = false,
  onToggleVisibility,
  className = '',
  isMinimized: externalMinimizedState,
  onMinimizedChange,
  ...props
}) => {
  const [internalMinimizedState, setInternalMinimizedState] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isMinimized = externalMinimizedState !== undefined ? externalMinimizedState : internalMinimizedState;
  const setIsMinimized = onMinimizedChange || setInternalMinimizedState;

  // Load minimized state from localStorage on mount (only for internal state)
  useEffect(() => {
    if (externalMinimizedState === undefined) {
      try {
        const savedState = localStorage.getItem(`widget-minimized-${widgetId}`);
        if (savedState !== null) {
          setInternalMinimizedState(JSON.parse(savedState));
        }
      } catch (error) {
        console.warn('Failed to load widget minimized state:', error);
      }
    }
  }, [widgetId, externalMinimizedState]);

  // Save minimized state to localStorage when it changes (only for internal state)
  useEffect(() => {
    if (externalMinimizedState === undefined) {
      try {
        localStorage.setItem(`widget-minimized-${widgetId}`, JSON.stringify(internalMinimizedState));
      } catch (error) {
        console.warn('Failed to save widget minimized state:', error);
      }
    }
  }, [widgetId, internalMinimizedState, externalMinimizedState]);

  const handleMinimizeToggle = (e) => {
    // Prevent event bubbling to avoid interfering with drag operations
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const handleHideWidget = (e) => {
    // Prevent event bubbling to avoid interfering with drag operations
    e.stopPropagation();
    onToggleVisibility?.(widgetId);
  };

  return (
    <div className={`relative group ${className}`} {...props}>
      {/* Widget Container - Enhanced for drag operations */}
      <div className={`bg-card border border-border rounded-lg overflow-hidden transition-all duration-200 ${
        customizationMode ? 'hover:shadow-md' : ''
      }`}>
        {/* Widget Title Bar with Controls - Enhanced for minimized drag operations */}
        <div className={`flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border ${
          isMinimized && customizationMode ? 'hover:bg-muted/50 transition-colors' : ''
        }`}>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            {isMinimized && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                Minimized
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            {/* Minimize/Expand Button - Enhanced to prevent drag interference */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMinimizeToggle}
              className="h-6 w-6 p-0 hover:bg-muted z-30 relative"
              title={isMinimized ? 'Expand widget' : 'Minimize widget'}
            >
              {isMinimized ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronUp className="h-3 w-3" />
              )}
            </Button>

            {/* Hide Widget Button - Only in customization mode */}
            {customizationMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHideWidget}
                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive z-30 relative"
                title="Hide widget"
              >
                <EyeOff className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Widget Content - Hidden when minimized */}
        {!isMinimized && (
          <div className="relative">
            {children}
          </div>
        )}

        {/* Enhanced Minimized State Info - Better for drag operations */}
        {isMinimized && (
          <div className={`px-4 py-3 text-center transition-all duration-200 ${
            customizationMode ? 'hover:bg-muted/20' : ''
          }`}>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xs text-muted-foreground italic">
                Widget minimized
              </span>
              {customizationMode && (
                <span className="text-xs text-primary font-medium">
                  • Drag to reorder
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Customization Overlay - Better feedback for minimized widgets */}
      {customizationMode && (
        <div className={`absolute inset-0 bg-primary/5 border-2 border-primary/20 rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none ${
          isMinimized ? 'bg-primary/8 border-primary/30' : ''
        }`}>
          <div className="absolute bottom-2 left-2">
            <div className="px-2 py-1 bg-card border border-primary/30 rounded text-xs font-medium text-foreground shadow-sm">
              {isMinimized ? `${title} (Minimized)` : title}
            </div>
          </div>
          {isMinimized && (
            <div className="absolute top-2 right-2">
              <div className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs font-medium shadow-sm">
                Draggable
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardWidget;