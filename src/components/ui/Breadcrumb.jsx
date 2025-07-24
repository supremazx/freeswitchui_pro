import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeMap = {
    '/dashboard': { label: 'Dashboard', parent: null },
    '/tenant-management': { label: 'Tenant Management', parent: null },
    '/free-s-witch-server-management': { label: 'FreeSWITCH Servers', parent: null },
    '/call-management': { label: 'Call Management', parent: null },
    '/extension-management': { label: 'Extension Management', parent: null },
    '/ai-services-dashboard': { label: 'AI Services', parent: null },
    '/call-detail-records-cdr': { label: 'Call Detail Records', parent: null },
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard' }];
    
    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const route = routeMap[currentPath];
      if (route) {
        breadcrumbs.push({
          label: route.label,
          path: currentPath
        });
      }
    });

    // Remove duplicate home if current page is dashboard
    if (breadcrumbs.length > 1 && breadcrumbs[1].path === '/dashboard') {
      breadcrumbs.splice(0, 1);
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium">{crumb.label}</span>
          ) : (
            <Link
              to={crumb.path}
              className="hover:text-foreground transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;