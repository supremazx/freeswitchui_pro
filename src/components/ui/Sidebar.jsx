import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Tooltip from './Tooltip';
import QuickSetupModal from './QuickSetupModal';

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const [isQuickSetupOpen, setIsQuickSetupOpen] = useState(false);
  
  // Initialize expanded sections from localStorage or default values
  const [expandedSections, setExpandedSections] = useState(() => {
    try {
      const saved = localStorage.getItem('sidebar-expanded-sections');
      return saved ? JSON.parse(saved) : {
        operations: true,
        configuration: true,
        analytics: true
      };
    } catch (error) {
      return {
        operations: true,
        configuration: true,
        analytics: true
      };
    }
  });

  // Save and restore scroll position
  useEffect(() => {
    const navElement = navRef.current;
    if (navElement) {
      // Restore scroll position
      navElement.scrollTop = scrollPositionRef.current;
      
      // Save scroll position on scroll
      const handleScroll = () => {
        scrollPositionRef.current = navElement.scrollTop;
        try {
          localStorage.setItem('sidebar-scroll-position', navElement.scrollTop.toString());
        } catch (error) {
          // Handle localStorage not available
          console.warn('Could not save scroll position to localStorage');
        }
      };
      
      navElement.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        navElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [collapsed]);

  // Restore scroll position from localStorage on mount
  useEffect(() => {
    try {
      const savedScrollPosition = localStorage.getItem('sidebar-scroll-position');
      if (savedScrollPosition) {
        scrollPositionRef.current = parseInt(savedScrollPosition, 10);
      }
    } catch (error) {
      // Handle localStorage not available
      console.warn('Could not restore scroll position from localStorage');
    }
  }, []);

  // Save expanded sections to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('sidebar-expanded-sections', JSON.stringify(expandedSections));
    } catch (error) {
      // Handle localStorage not available
      console.warn('Could not save sidebar state to localStorage');
    }
  }, [expandedSections]);

  // Quick Setup actions that will trigger the modal
  const quickSetupActions = [
    {
      id: 'tenant',
      title: 'Create Tenant',
      icon: 'Building2',
      color: 'primary'
    },
    {
      id: 'extension',
      title: 'Add Extension',
      icon: 'UserPlus',
      color: 'success'
    },
    {
      id: 'server',
      title: 'Configure Server',
      icon: 'Server',
      color: 'accent'
    },
    {
      id: 'billing',
      title: 'Setup Billing',
      icon: 'CreditCard',
      color: 'warning'
    }
  ];

  const navigationSections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      items: [
        {
          path: '/dashboard',
          label: 'System Overview',
          icon: 'LayoutDashboard',
          description: 'Real-time system monitoring and status',
          badge: null
        }
      ]
    },
    {
      id: 'operations',
      title: 'Operations',
      items: [
        {
          path: '/call-management',
          label: 'Call Management',
          icon: 'Phone',
          description: 'Active call monitoring and control',
          badge: '247'
        }
      ]
    },
    {
      id: 'configuration',
      title: 'Configuration',
      items: [
        {
          path: '/tenant-management',
          label: 'Tenant Management',
          icon: 'Building2',
          description: 'Multi-tenant configuration and settings',
          badge: null
        },
        {
          path: '/free-s-witch-server-management',
          label: 'FreeSWITCH Servers',
          icon: 'Server',
          description: 'Server configuration and management',
          badge: null
        },
        {
          path: '/extension-management',
          label: 'Extension Management',
          icon: 'Users',
          description: 'User extensions and SIP configuration',
          badge: null
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Finance',
      items: [
        {
          path: '/billing-dashboard',
          label: 'Billing',
          icon: 'CreditCard',
          description: 'Revenue management and financial oversight',
          badge: null
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & AI',
      items: [
        {
          path: '/call-detail-records-cdr',
          label: 'Call Detail Records',
          icon: 'FileText',
          description: 'Historical call data and reporting',
          badge: null
        },
        {
          path: '/ai-services-dashboard',
          label: 'AI Services',
          icon: 'Brain',
          description: 'AI-powered analytics and insights',
          badge: 'NEW'
        }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    if (!collapsed) {
      setExpandedSections(prev => ({
        ...prev,
        [sectionId]: !prev[sectionId]
      }));
      
      // Maintain scroll position after section toggle
      setTimeout(() => {
        if (navRef.current) {
          navRef.current.scrollTop = scrollPositionRef.current;
        }
      }, 50);
    }
  };

  // Auto-expand section when navigating to a page within that section
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find which section contains the current path
    navigationSections.forEach(section => {
      const hasActiveItem = section.items.some(item => item.path === currentPath);
      if (hasActiveItem && section.id !== 'dashboard') {
        setExpandedSections(prev => ({
          ...prev,
          [section.id]: true
        }));
      }
    });
    
    // Restore scroll position after navigation
    setTimeout(() => {
      if (navRef.current) {
        navRef.current.scrollTop = scrollPositionRef.current;
      }
    }, 100);
  }, [location.pathname]);

  // Handle navigation click with scroll position preservation
  const handleNavigationClick = (event, path) => {
    // Save current scroll position before navigation
    if (navRef.current) {
      scrollPositionRef.current = navRef.current.scrollTop;
      try {
        localStorage.setItem('sidebar-scroll-position', scrollPositionRef.current.toString());
      } catch (error) {
        console.warn('Could not save scroll position');
      }
    }
  };

  const handleQuickSetupClick = () => {
    setIsQuickSetupOpen(true);
  };

  const handleQuickSetupClose = () => {
    setIsQuickSetupOpen(false);
  };

  const getQuickActionColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20',
      accent: 'bg-accent/10 text-accent hover:bg-accent/20'
    };
    return colors[color] || colors.primary;
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-998 lg:hidden animate-fade-in"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-card/95 backdrop-blur-sm border-r border-border z-999 sidebar-transition glass-effect ${
          collapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'translate-x-0 w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border/50">
            {!collapsed && (
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Navigation
                </h2>
                <Tooltip content="Collapse sidebar" position="right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggle}
                    className="hidden lg:flex w-8 h-8 smooth-hover user-friendly-focus"
                  >
                    <Icon name="PanelLeftClose" size={16} />
                  </Button>
                </Tooltip>
              </div>
            )}
            {collapsed && (
              <div className="flex justify-center">
                <Tooltip content="Expand sidebar" position="right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggle}
                    className="w-8 h-8 smooth-hover user-friendly-focus"
                  >
                    <Icon name="PanelLeftOpen" size={16} />
                  </Button>
                </Tooltip>
              </div>
            )}
          </div>

          {/* Quick Setup Section - Top Priority */}
          <div className="p-4 border-b border-border/50 bg-muted/20">
            {!collapsed ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground flex items-center">
                    <Icon name="Zap" size={16} className="mr-2 text-primary" />
                    Quick Setup
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
                    onClick={handleQuickSetupClick}
                  >
                    Open Wizard
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {quickSetupActions.map((action) => (
                    <Tooltip key={action.id} content={action.title} position="top">
                      <button
                        onClick={handleQuickSetupClick}
                        className={`p-3 rounded-lg border transition-all duration-200 smooth-hover user-friendly-focus ${getQuickActionColorClasses(action.color)}`}
                      >
                        <Icon name={action.icon} size={16} className="mx-auto" />
                        <p className="text-xs mt-1 font-medium truncate">{action.title.split(' ')[0]}</p>
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Tooltip content="Quick Setup - Click any icon to start" position="right">
                  <div className="flex justify-center mb-2">
                    <Icon name="Zap" size={14} className="text-primary" />
                  </div>
                </Tooltip>
                <div className="space-y-1">
                  {quickSetupActions.map((action) => (
                    <Tooltip key={action.id} content={`Quick Setup: ${action.title}`} position="right">
                      <button
                        onClick={handleQuickSetupClick}
                        className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200 smooth-hover user-friendly-focus ${getQuickActionColorClasses(action.color)}`}
                      >
                        <Icon name={action.icon} size={14} />
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="flex-1 overflow-y-auto p-4 space-y-6" style={{ scrollBehavior: 'auto' }}>
            {navigationSections.map((section) => (
              <div key={section.id}>
                {/* Section Header */}
                {section.id !== 'dashboard' && (
                  <div className="mb-3">
                    {!collapsed ? (
                      <Button
                        variant="ghost"
                        onClick={() => toggleSection(section.id)}
                        className="w-full justify-between p-2 h-auto text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground smooth-hover user-friendly-focus"
                      >
                        <span>{section.title}</span>
                        <Icon
                          name="ChevronDown"
                          size={14}
                          className={`transition-transform duration-200 ${
                            expandedSections[section.id] ? 'rotate-0' : '-rotate-90'
                          }`}
                        />
                      </Button>
                    ) : (
                      <div className="w-full h-px bg-border/50 my-2" />
                    )}
                  </div>
                )}

                {/* Section Items */}
                <div
                  className={`space-y-1 ${
                    !collapsed && section.id !== 'dashboard' && !expandedSections[section.id]
                      ? 'hidden' : ''
                  }`}
                >
                  {section.items.map((item) => {
                    const LinkComponent = (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={(e) => handleNavigationClick(e, item.path)}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg nav-item-hover group user-friendly-focus ${
                          isActive(item.path)
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon
                          name={item.icon}
                          size={18}
                          className={`flex-shrink-0 ${
                            isActive(item.path)
                              ? 'text-primary-foreground'
                              : 'text-muted-foreground group-hover:text-foreground'
                          }`}
                        />
                        {!collapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium truncate">
                                {item.label}
                              </p>
                              {item.badge && (
                                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                                  item.badge === 'NEW' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs opacity-75 truncate">
                              {item.description}
                            </p>
                          </div>
                        )}
                      </Link>
                    );

                    return collapsed ? (
                      <Tooltip
                        key={item.path}
                        content={
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs opacity-75 mt-1">{item.description}</div>
                          </div>
                        }
                        position="right"
                      >
                        {LinkComponent}
                      </Tooltip>
                    ) : (
                      LinkComponent
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border/50">
            {!collapsed ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-3 py-2 bg-muted/30 rounded-lg">
                  <Icon name="Activity" size={14} className="text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">Active Calls</p>
                    <p className="text-xs text-muted-foreground font-mono">247</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <Tooltip content="Active Calls: 247" position="right">
                  <div className="text-xs font-mono text-muted-foreground">247</div>
                </Tooltip>
              </div>
            )}
          </div>
        </div>

        {/* Quick Setup Modal */}
        <QuickSetupModal 
          isOpen={isQuickSetupOpen} 
          onClose={handleQuickSetupClose} 
        />
      </aside>
    </>
  );
};

export default Sidebar;