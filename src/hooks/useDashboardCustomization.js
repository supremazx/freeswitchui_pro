import { useState, useEffect, useCallback } from 'react';

/**
 * Auto layout algorithms for different arrangement types
 */
const layoutAlgorithms = {
  // Grid layout - balanced arrangement
  grid: (widgets) => {
    const fullWidthWidgets = ['kpiCards', 'aiUsageSummary', 'aiSystemSummary'];
    let order = 1;
    const updatedWidgets = {};

    // Process full-width widgets first
    widgets.filter(w => fullWidthWidgets.includes(w.id))
      .forEach(widget => {
        updatedWidgets[widget.id] = { ...widget, order: order++ };
      });

    // Then process regular widgets in groups of 3
    const regularWidgets = widgets.filter(w => !fullWidthWidgets.includes(w.id));
    regularWidgets.forEach(widget => {
      updatedWidgets[widget.id] = { ...widget, order: order++ };
    });

    return updatedWidgets;
  },

  // Compact layout - minimize spacing
  compact: (widgets) => {
    const categories = ['metrics', 'analytics', 'ai', 'activity', 'monitoring', 'tools'];
    let order = 1;
    const updatedWidgets = {};

    // Group by category for better organization
    categories.forEach(category => {
      const categoryWidgets = widgets.filter(w => w.category === category);
      categoryWidgets.forEach(widget => {
        updatedWidgets[widget.id] = { ...widget, order: order++ };
      });
    });

    // Handle any remaining widgets
    widgets.filter(w => !categories.includes(w.category)).forEach(widget => {
      updatedWidgets[widget.id] = { ...widget, order: order++ };
    });

    return updatedWidgets;
  },

  // Vertical stack - single column
  vertical: (widgets) => {
    const updatedWidgets = {};
    
    // Sort by priority: KPI cards first, then analytics, then others
    const priorityOrder = {
      'kpiCards': 1,
      'callVolumeChart': 2,
      'tenantUsageChart': 3,
      'aiSystemSummary': 4,
      'aiUsageSummary': 5
    };

    const sortedWidgets = [...widgets].sort((a, b) => {
      const aPriority = priorityOrder[a.id] || 999;
      const bPriority = priorityOrder[b.id] || 999;
      if (aPriority !== bPriority) return aPriority - bPriority;
      return a.title.localeCompare(b.title);
    });

    sortedWidgets.forEach((widget, index) => {
      updatedWidgets[widget.id] = { ...widget, order: index + 1 };
    });

    return updatedWidgets;
  },

  // Horizontal flow - arrange in rows
  horizontal: (widgets) => {
    const updatedWidgets = {};
    const fullWidthWidgets = ['kpiCards', 'aiUsageSummary', 'aiSystemSummary'];
    
    // Separate full-width and regular widgets
    const fullWidth = widgets.filter(w => fullWidthWidgets.includes(w.id));
    const regular = widgets.filter(w => !fullWidthWidgets.includes(w.id));
    
    let order = 1;
    
    // Alternate between full-width widgets and rows of regular widgets
    const regularChunks = [];
    for (let i = 0; i < regular.length; i += 3) {
      regularChunks.push(regular.slice(i, i + 3));
    }
    
    // Interleave full-width widgets with regular widget rows
    const maxLength = Math.max(fullWidth.length, regularChunks.length);
    
    for (let i = 0; i < maxLength; i++) {
      // Add full-width widget if available
      if (fullWidth[i]) {
        updatedWidgets[fullWidth[i].id] = { ...fullWidth[i], order: order++ };
      }
      
      // Add row of regular widgets if available
      if (regularChunks[i]) {
        regularChunks[i].forEach(widget => {
          updatedWidgets[widget.id] = { ...widget, order: order++ };
        });
      }
    }

    return updatedWidgets;
  }
};

/**
 * Custom hook for managing dashboard widget customization
 * Handles widget visibility, positions, and available widgets
 */
export const useDashboardCustomization = () => {
  // Default widget configuration
  const defaultWidgets = {
    kpiCards: { id: 'kpiCards', title: 'KPI Overview', visible: true, order: 1, category: 'metrics' },
    callVolumeChart: { id: 'callVolumeChart', title: 'Call Volume Chart', visible: true, order: 2, category: 'analytics' },
    tenantUsageChart: { id: 'tenantUsageChart', title: 'Tenant Usage Chart', visible: true, order: 3, category: 'analytics' },
    aiUsageSummary: { id: 'aiUsageSummary', title: 'AI Usage Summary', visible: true, order: 4, category: 'ai' },
    aiSystemSummary: { id: 'aiSystemSummary', title: 'AI System Summary', visible: true, order: 5, category: 'ai' },
    callActivityFeed: { id: 'callActivityFeed', title: 'Call Activity Feed', visible: true, order: 6, category: 'activity' },
    systemAlerts: { id: 'systemAlerts', title: 'System Alerts', visible: true, order: 7, category: 'monitoring' },
    quickActions: { id: 'quickActions', title: 'Quick Actions', visible: true, order: 8, category: 'tools' }
  };

  // Available widgets that can be added
  const availableWidgets = {
    systemHealth: { id: 'systemHealth', title: 'System Health Monitor', visible: false, order: 9, category: 'monitoring' },
    recentCalls: { id: 'recentCalls', title: 'Recent Calls', visible: false, order: 10, category: 'activity' },
    extensionStatus: { id: 'extensionStatus', title: 'Extension Status', visible: false, order: 11, category: 'metrics' },
    networkTraffic: { id: 'networkTraffic', title: 'Network Traffic', visible: false, order: 12, category: 'analytics' },
    errorLogs: { id: 'errorLogs', title: 'Error Logs', visible: false, order: 13, category: 'monitoring' },
    performanceMetrics: { id: 'performanceMetrics', title: 'Performance Metrics', visible: false, order: 14, category: 'metrics' }
  };

  const [widgets, setWidgets] = useState(() => {
    try {
      const saved = localStorage.getItem('dashboardWidgets');
      if (saved) {
        const parsedWidgets = JSON.parse(saved);
        // Merge with default widgets to ensure all widgets are present
        return { ...defaultWidgets, ...availableWidgets, ...parsedWidgets };
      }
    } catch (error) {
      console.warn('Failed to load dashboard configuration:', error);
    }
    return { ...defaultWidgets, ...availableWidgets };
  });

  const [customizationMode, setCustomizationMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Save to localStorage whenever widgets change
  useEffect(() => {
    try {
      localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
    } catch (error) {
      console.warn('Failed to save dashboard configuration:', error);
    }
  }, [widgets]);

  // Toggle widget visibility
  const toggleWidget = useCallback((widgetId) => {
    setWidgets(prev => ({
      ...prev,
      [widgetId]: {
        ...prev[widgetId],
        visible: !prev[widgetId]?.visible
      }
    }));
  }, []);

  // Add new widget
  const addWidget = useCallback((widgetId) => {
    setWidgets(prev => ({
      ...prev,
      [widgetId]: {
        ...prev[widgetId],
        visible: true
      }
    }));
  }, []);

  // Remove widget
  const removeWidget = useCallback((widgetId) => {
    setWidgets(prev => ({
      ...prev,
      [widgetId]: {
        ...prev[widgetId],
        visible: false
      }
    }));
  }, []);

  // Reorder widgets - new function for drag and drop
  const reorderWidgets = useCallback((activeId, overId) => {
    if (activeId === overId) return;

    setWidgets(prev => {
      const visibleWidgets = Object.values(prev).filter(w => w?.visible);
      const activeIndex = visibleWidgets.findIndex(w => w?.id === activeId);
      const overIndex = visibleWidgets.findIndex(w => w?.id === overId);

      if (activeIndex === -1 || overIndex === -1) return prev;

      // Create new order array
      const newOrder = [...visibleWidgets];
      const [removed] = newOrder.splice(activeIndex, 1);
      newOrder.splice(overIndex, 0, removed);

      // Update order values
      const updatedWidgets = { ...prev };
      newOrder.forEach((widget, index) => {
        updatedWidgets[widget.id] = {
          ...updatedWidgets[widget.id],
          order: index + 1
        };
      });

      return updatedWidgets;
    });
  }, []);

  // Auto layout arrangement - new function
  const applyAutoLayout = useCallback((layoutType) => {
    if (!layoutAlgorithms[layoutType]) {
      console.warn(`Unknown layout type: ${layoutType}`);
      return;
    }

    setWidgets(prev => {
      const visibleWidgets = Object.values(prev).filter(w => w?.visible);
      const arrangedWidgets = layoutAlgorithms[layoutType](visibleWidgets);
      
      return {
        ...prev,
        ...arrangedWidgets
      };
    });
  }, []);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setWidgets({ ...defaultWidgets, ...availableWidgets });
  }, []);

  // Get visible widgets sorted by order
  const getVisibleWidgets = useCallback(() => {
    return Object.values(widgets)
      .filter(widget => widget?.visible)
      .sort((a, b) => (a?.order || 0) - (b?.order || 0));
  }, [widgets]);

  // Get available widgets (not currently visible)
  const getAvailableWidgets = useCallback(() => {
    return Object.values(widgets)
      .filter(widget => !widget?.visible)
      .filter(widget => selectedCategory === 'all' || widget?.category === selectedCategory)
      .sort((a, b) => (a?.title || '').localeCompare(b?.title || ''));
  }, [widgets, selectedCategory]);

  // Get widget categories
  const getCategories = useCallback(() => {
    const categories = new Set(Object.values(widgets).map(w => w?.category).filter(Boolean));
    return Array.from(categories);
  }, [widgets]);

  // Check if widget is visible
  const isWidgetVisible = useCallback((widgetId) => {
    return widgets[widgetId]?.visible || false;
  }, [widgets]);

  return {
    widgets,
    customizationMode,
    setCustomizationMode,
    selectedCategory,
    setSelectedCategory,
    toggleWidget,
    addWidget,
    removeWidget,
    reorderWidgets,
    applyAutoLayout,
    resetToDefaults,
    getVisibleWidgets,
    getAvailableWidgets,
    getCategories,
    isWidgetVisible
  };
};

export default useDashboardCustomization;