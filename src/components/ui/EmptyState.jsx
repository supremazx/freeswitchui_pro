import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { cn } from '../../utils/cn';

const EmptyState = ({
  icon = 'FileText',
  title,
  description,
  action = null,
  illustration = null,
  size = 'default',
  className
}) => {
  const sizeClasses = {
    sm: 'py-8',
    default: 'py-12',
    lg: 'py-16'
  };

  const iconSizes = {
    sm: 32,
    default: 48,
    lg: 64
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center",
      sizeClasses[size],
      className
    )}>
      {illustration ? (
        <div className="mb-6">
          {illustration}
        </div>
      ) : (
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon 
            name={icon} 
            size={iconSizes[size]} 
            className="text-muted-foreground" 
          />
        </div>
      )}
      
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-muted-foreground mb-6 text-balance">
            {description}
          </p>
        )}
        
        {action && (
          <Button
            variant={action.variant || 'default'}
            size={action.size || 'default'}
            iconName={action.icon}
            iconPosition={action.iconPosition || 'left'}
            onClick={action.onClick}
            disabled={action.disabled}
            loading={action.loading}
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;