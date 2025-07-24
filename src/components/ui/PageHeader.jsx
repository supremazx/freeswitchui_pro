import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Breadcrumb from './Breadcrumb';
import ContextualHelp from './ContextualHelp';
import { cn } from '../../utils/cn';

const PageHeader = ({
  title,
  description,
  icon,
  actions = [],
  showBreadcrumb = true,
  helpContent = null,
  className,
  children
}) => {
  return (
    <div className={cn("mb-8", className)}>
      {showBreadcrumb && <Breadcrumb />}
      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start space-x-4">
          {icon && (
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name={icon} size={24} className="text-primary" />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-foreground text-balance">
                {title}
              </h1>
              {helpContent && (
                <ContextualHelp
                  title={`About ${title}`}
                  content={helpContent}
                  size="lg"
                />
              )}
            </div>
            
            {description && (
              <p className="text-muted-foreground mt-2 text-balance max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>

        {(actions.length > 0 || children) && (
          <div className="flex items-center space-x-3 flex-shrink-0">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'default'}
                size={action.size || 'default'}
                iconName={action.icon}
                iconPosition={action.iconPosition || 'left'}
                onClick={action.onClick}
                disabled={action.disabled}
                loading={action.loading}
                className={action.className}
              >
                {action.label}
              </Button>
            ))}
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;