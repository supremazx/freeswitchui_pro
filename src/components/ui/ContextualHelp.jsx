import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { cn } from '../../utils/cn';

const ContextualHelp = ({
  title,
  content,
  position = 'right',
  size = 'default',
  variant = 'info',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: 'w-64',
    default: 'w-80',
    lg: 'w-96'
  };

  const variantClasses = {
    info: 'border-info/20 bg-info/5',
    warning: 'border-warning/20 bg-warning/5',
    success: 'border-success/20 bg-success/5',
    error: 'border-error/20 bg-error/5'
  };

  const iconVariants = {
    info: 'text-info',
    warning: 'text-warning',
    success: 'text-success',
    error: 'text-error'
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'right-full top-0 mr-2';
      case 'right':
        return 'left-full top-0 ml-2';
      case 'top':
        return 'bottom-full left-0 mb-2';
      case 'bottom':
        return 'top-full left-0 mt-2';
      default:
        return 'left-full top-0 ml-2';
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="icon"
        className={cn("w-5 h-5 text-muted-foreground hover:text-foreground", className)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name="HelpCircle" size={14} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Help Panel */}
          <div
            className={cn(
              "absolute z-50 p-4 bg-popover border rounded-lg shadow-lg animate-fade-in",
              sizeClasses[size],
              variantClasses[variant],
              getPositionClasses()
            )}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name="Info" 
                size={16} 
                className={cn("flex-shrink-0 mt-0.5", iconVariants[variant])} 
              />
              <div className="flex-1 min-w-0">
                {title && (
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    {title}
                  </h4>
                )}
                <div className="text-sm text-muted-foreground">
                  {typeof content === 'string' ? (
                    <p>{content}</p>
                  ) : (
                    content
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-5 h-5 text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContextualHelp;