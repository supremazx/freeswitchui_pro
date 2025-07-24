import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy,  } from '@dnd-kit/sortable';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PageHeader from '../../components/ui/PageHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import DraggableWidget from '../../components/ui/DraggableWidget';
import KPICard from './components/KPICard';
import CallActivityFeed from './components/CallActivityFeed';
import SystemAlerts from './components/SystemAlerts';
import QuickActions from './components/QuickActions';
import CallVolumeChart from './components/CallVolumeChart';
import TenantUsageChart from './components/TenantUsageChart';
import AISystemSummary from './components/AISystemSummary';
import AIUsageSummary from './components/AIUsageSummary';
import DashboardCustomizationToolbar from './components/DashboardCustomizationToolbar';
import DashboardWidget from './components/DashboardWidget';
import SystemHealthWidget from './components/SystemHealthWidget';
import RecentCallsWidget from './components/RecentCallsWidget';
import ExtensionStatusWidget from './components/ExtensionStatusWidget';
import useDashboardCustomization from '../../hooks/useDashboardCustomization';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [realTimeData, setRealTimeData] = useState({
    activeCalls: 247,
    systemUptime: '99.8%',
    registeredExtensions: 1456,
    aiServiceUsage: '2.3K'
  });

  const {
    customizationMode,
    setCustomizationMode,
    selectedCategory,
    setSelectedCategory,
    toggleWidget,
    addWidget,
    reorderWidgets,
    applyAutoLayout,
    resetToDefaults,
    getVisibleWidgets,
    getAvailableWidgets,
    getCategories,
    isWidgetVisible
  } = useDashboardCustomization();

  // Configure drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Get widget lists
  const visibleWidgets = getVisibleWidgets();
  const availableWidgets = getAvailableWidgets();
  const categories = getCategories();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate WebSocket connection for real-time updates
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeCalls: Math.max(0, prev.activeCalls + Math.floor(Math.random() * 20) - 10),
        aiServiceUsage: `${(parseFloat(prev.aiServiceUsage.replace('K', '')) + (Math.random() * 0.4 - 0.2)).toFixed(1)}K`
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [loading]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Handle auto layout arrangement
  const handleAutoLayout = (layoutType) => {
    applyAutoLayout(layoutType);
  };

  // Handle drag start event
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderWidgets(active.id, over.id);
    }
    
    setActiveId(null);
  };

  // Handle drag cancel event
  const handleDragCancel = () => {
    setActiveId(null);
  };

  const kpiData = [
    {
      title: 'Active Calls',
      value: realTimeData.activeCalls.toString(),
      change: '+12%',
      changeType: 'increase',
      icon: 'Phone',
      color: 'primary'
    },
    {
      title: 'System Uptime',
      value: realTimeData.systemUptime,
      change: '+0.2%',
      changeType: 'increase',
      icon: 'Activity',
      color: 'success'
    },
    {
      title: 'Registered Extensions',
      value: realTimeData.registeredExtensions.toLocaleString(),
      change: '+8',
      changeType: 'increase',
      icon: 'Users',
      color: 'accent'
    },
    {
      title: 'AI Service Usage',
      value: realTimeData.aiServiceUsage,
      change: '+15%',
      changeType: 'increase',
      icon: 'Brain',
      color: 'warning'
    }
  ];

  // Render widget based on ID
  const renderWidget = (widgetId, animationDelay = 0, isOverlay = false) => {
    const widgetProps = {
      className: isOverlay ? "animate-fade-in opacity-90 transform rotate-2 scale-105" : "animate-fade-in",
      style: isOverlay ? {} : { animationDelay: `${animationDelay}ms` }
    };

    // Check if widget is minimized for drag operations
    const isWidgetMinimized = (() => {
      try {
        const savedState = localStorage.getItem(`widget-minimized-${widgetId}`);
        return savedState ? JSON.parse(savedState) : false;
      } catch {
        return false;
      }
    })();

    const widgetContent = (() => {
      switch (widgetId) {
        case 'kpiCards':
          return (
            <DashboardWidget
              widgetId={widgetId}
              title="KPI Overview"
              customizationMode={customizationMode}
              onToggleVisibility={toggleWidget}
              className="col-span-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {kpiData.map((kpi, index) => (
                  <KPICard
                    key={index}
                    title={kpi.title}
                    value={kpi.value}
                    change={kpi.change}
                    changeType={kpi.changeType}
                    icon={kpi.icon}
                    color={kpi.color}
                  />
                ))}
              </div>
            </DashboardWidget>
          );

        case 'callVolumeChart':
          return (
            <DashboardWidget
              widgetId={widgetId}
              title="Call Volume Chart"
              customizationMode={customizationMode}
              onToggleVisibility={toggleWidget}
            >
              <CallVolumeChart />
            </DashboardWidget>
          );

        case 'tenantUsageChart':
          return (
            <DashboardWidget
              widgetId={widgetId}
              title="Tenant Usage Chart"
              customizationMode={customizationMode}
              onToggleVisibility={toggleWidget}
            >
              <TenantUsageChart />
            </DashboardWidget>
          );

        case 'aiUsageSummary':
          return (
            <DashboardWidget
              widgetId={widgetId}
              title="AI Usage Summary"
              customizationMode={customizationMode}
              onToggleVisibility={toggleWidget}
              className="col-span-full"
            >
              <AIUsageSummary />
            </DashboardWidget>
          );

        case 'aiSystemSummary':
          return (
            <DashboardWidget
              widgetId={widgetId}
              title="AI System Summary"
              customizationMode={customizationMode}
              onToggleVisibility={toggleWidget}
              className="col-span-full"
            >
              <AISystemSummary realTimeData={realTimeData} />
            </DashboardWidget>
          );

        case 'callActivityFeed':
          return (
            <DashboardWidget
              widgetId={widgetId}
              title="Call Activity Feed"
              customizationMode={customizationMode}
              onToggleVisibility={toggleWidget}
            >
              <CallActivityFeed />
            </DashboardWidget>
          );

        case 'systemAlerts':
          return (
            <DashboardWidget
              widgetId={widgetId}
              title="System Alerts"
              customizationMode={customizationMode}
              onToggleVisibility={toggleWidget}
            >
              <SystemAlerts />
            </DashboardWidget>
          );

        case 'quickActions':
          return (
            <DashboardWidget
              widgetId={widgetId}
              title="Quick Actions"
              customizationMode={customizationMode}
              onToggleVisibility={toggleWidget}
            >
              <QuickActions />
            </DashboardWidget>
          );

        case 'systemHealth':
          return (
            <DashboardWidget
              widgetId={widgetId}
              title="System Health Monitor"
              customizationMode={customizationMode}
              onToggleVisibility={toggleWidget}
            >
              <SystemHealthWidget />
            </DashboardWidget>
          );

        case 'recentCalls':
          return (
            <DashboardWidget
              widgetId={widgetId}
              title="Recent Calls"
              customizationMode={customizationMode}
              onToggleVisibility={toggleWidget}
            >
              <RecentCallsWidget />
            </DashboardWidget>
          );

        case 'extensionStatus':
          return (
            <DashboardWidget
              widgetId={widgetId}
              title="Extension Status"
              customizationMode={customizationMode}
              onToggleVisibility={toggleWidget}
            >
              <ExtensionStatusWidget />
            </DashboardWidget>
          );

        default:
          return null;
      }
    })();

    if (isOverlay) {
      return (
        <div className="bg-background border-2 border-primary shadow-2xl rounded-lg max-w-sm" {...widgetProps}>
          {widgetContent}
        </div>
      );
    }

    return (
      <DraggableWidget
        key={widgetId}
        id={widgetId}
        customizationMode={customizationMode}
        activeId={activeId}
        isMinimized={isWidgetMinimized}
        {...widgetProps}
      >
        {widgetContent}
      </DraggableWidget>
    );
  };

  const helpContent = (
    <div className="space-y-3">
      <p>Monitor your FreeSWITCH telephony infrastructure in real-time with comprehensive system insights.</p>
      <div className="space-y-2">
        <p className="font-medium">Dashboard Features:</p>
        <ul className="text-sm space-y-1 ml-4 list-disc">
          <li>Real-time call monitoring and statistics</li>
          <li>System health and performance metrics</li>
          <li>Active alerts and notifications</li>
          <li>Quick access to management tools</li>
          <li>Tenant usage analytics and trends</li>
          <li>Customizable widget layout and visibility</li>
          <li>Drag and drop widget reordering</li>
          <li>Auto layout arrangement with multiple options</li>
        </ul>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
        <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
        
        <main className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <LoadingSpinner overlay text="Loading dashboard..." />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          <PageHeader
            title="System Dashboard"
            description="Real-time monitoring and management of FreeSWITCH telephony infrastructure"
            icon="LayoutDashboard"
            helpContent={helpContent}
            showBreadcrumb={false}
          />

          {/* Dashboard Customization Toolbar */}
          <DashboardCustomizationToolbar
            customizationMode={customizationMode}
            setCustomizationMode={setCustomizationMode}
            availableWidgets={availableWidgets}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddWidget={addWidget}
            onAutoLayout={handleAutoLayout}
            onResetToDefaults={resetToDefaults}
            onToggleWidget={toggleWidget}
            visibleWidgets={visibleWidgets}
          />

          {/* Drag and Drop Context */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={visibleWidgets.map(w => w.id)}
              strategy={verticalListSortingStrategy}
            >
              {/* Dynamic Widget Grid */}
              <div className="space-y-8">
                {visibleWidgets.map((widget, index) => {
                  // Special handling for KPI cards to span full width
                  if (widget.id === 'kpiCards' || widget.id === 'aiUsageSummary' || widget.id === 'aiSystemSummary') {
                    return renderWidget(widget.id, index * 100);
                  }

                  // Group other widgets in responsive grid
                  const isNewRow = index === 0 || 
                    (index > 0 && ['kpiCards', 'aiUsageSummary', 'aiSystemSummary'].includes(visibleWidgets[index - 1].id));
                  
                  if (isNewRow) {
                    // Find consecutive widgets that aren't full-width
                    const remainingWidgets = visibleWidgets.slice(index);
                    const nextFullWidgetIndex = remainingWidgets.findIndex(w => 
                      ['kpiCards', 'aiUsageSummary', 'aiSystemSummary'].includes(w.id)
                    );
                    const widgetsInRow = nextFullWidgetIndex === -1 ? 
                      remainingWidgets : 
                      remainingWidgets.slice(0, nextFullWidgetIndex);

                    return (
                      <div key={`row-${index}`} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {widgetsInRow.map((rowWidget, rowIndex) => 
                          renderWidget(rowWidget.id, (index + rowIndex) * 100)
                        )}
                      </div>
                    );
                  }

                  return null; // Already rendered in row above
                })}
              </div>
            </SortableContext>
            
            {/* Drag Overlay - Shows shadow/preview of dragged widget */}
            <DragOverlay>
              {activeId ? renderWidget(activeId, 0, true) : null}
            </DragOverlay>
          </DndContext>

          {/* Empty State */}
          {visibleWidgets.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <div className="h-16 w-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No widgets visible</h3>
                <p className="text-sm">Use the customize dashboard button to add widgets to your dashboard.</p>
              </div>
            </div>
          )}

          {/* Enhanced Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} FreeSwitchUI Pro. All rights reserved.
                </p>
                <div className="hidden sm:flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
                  <span>System Status: Operational</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <span className="text-sm text-muted-foreground">Last updated:</span>
                <span className="text-sm font-medium text-foreground">
                  {new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;