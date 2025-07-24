import React, { useState } from 'react';
import { Settings, Plus, RotateCcw, Grid, Eye, EyeOff, X, LayoutGrid, Columns, Rows, Maximize2 } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { useClickOutside } from '../../../hooks/useClickOutside';

const DashboardCustomizationToolbar = ({
  customizationMode,
  setCustomizationMode,
  availableWidgets,
  categories,
  selectedCategory,
  setSelectedCategory,
  onAddWidget,
  onResetToDefaults,
  onToggleWidget,
  onAutoLayout,
  visibleWidgets
}) => {
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [showAutoLayoutPanel, setShowAutoLayoutPanel] = useState(false);
  const addPanelRef = useClickOutside(() => setShowAddPanel(false), showAddPanel);
  const autoLayoutPanelRef = useClickOutside(() => setShowAutoLayoutPanel(false), showAutoLayoutPanel);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(cat => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1)
    }))
  ];

  const layoutOptions = [
    {
      id: 'grid',
      name: 'Grid Layout',
      description: 'Arrange widgets in a balanced grid pattern',
      icon: LayoutGrid
    },
    {
      id: 'compact',
      name: 'Compact Layout',
      description: 'Minimize space between widgets for maximum density',
      icon: Maximize2
    },
    {
      id: 'vertical',
      name: 'Vertical Stack',
      description: 'Stack widgets vertically in single column',
      icon: Columns
    },
    {
      id: 'horizontal',
      name: 'Horizontal Flow',
      description: 'Arrange widgets in horizontal rows',
      icon: Rows
    }
  ];

  const handleAddWidget = (widgetId) => {
    onAddWidget(widgetId);
    setShowAddPanel(false);
  };

  const handleAutoLayout = (layoutType) => {
    onAutoLayout(layoutType);
    setShowAutoLayoutPanel(false);
  };

  return (
    <div className="mb-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Main Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant={customizationMode ? "destructive" : "outline"}
              size="sm"
              onClick={() => setCustomizationMode(!customizationMode)}
              className="flex items-center gap-2"
            >
              {customizationMode ? (
                <>
                  <X className="h-4 w-4" />
                  Exit Customize
                </>
              ) : (
                <>
                  <Settings className="h-4 w-4" />
                  Customize Dashboard
                </>
              )}
            </Button>

            {customizationMode && (
              <>
                {/* Add Widget Button */}
                <div className="relative" ref={addPanelRef}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddPanel(!showAddPanel)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Widget
                  </Button>

                  {/* Add Widget Panel */}
                  {showAddPanel && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-foreground">Add Widget</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAddPanel(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-3">
                          <Select
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            options={categoryOptions}
                            placeholder="Select category"
                          />
                        </div>

                        {/* Available Widgets */}
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {availableWidgets?.length > 0 ? (
                            availableWidgets.map((widget) => (
                              <div
                                key={widget.id}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                              >
                                <div>
                                  <h4 className="font-medium text-sm text-foreground">
                                    {widget.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground">
                                    {widget.category}
                                  </p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleAddWidget(widget.id)}
                                  className="ml-2"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-muted-foreground">
                              <Grid className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">No widgets available to add</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Auto Layout Button */}
                <div className="relative" ref={autoLayoutPanelRef}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAutoLayoutPanel(!showAutoLayoutPanel)}
                    className="flex items-center gap-2"
                    disabled={visibleWidgets?.length === 0}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Auto Layout
                  </Button>

                  {/* Auto Layout Panel */}
                  {showAutoLayoutPanel && (
                    <div className="absolute top-full left-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-foreground">Auto Layout Arrangement</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAutoLayoutPanel(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          Automatically arrange your widgets with optimized spacing and alignment.
                        </p>

                        {/* Layout Options */}
                        <div className="space-y-3">
                          {layoutOptions.map((layout) => {
                            const IconComponent = layout.icon;
                            return (
                              <div
                                key={layout.id}
                                className="flex items-start gap-3 p-3 bg-muted/30 hover:bg-muted/60 rounded-lg cursor-pointer transition-colors group"
                                onClick={() => handleAutoLayout(layout.id)}
                              >
                                <div className="p-2 bg-primary/10 group-hover:bg-primary/20 rounded-lg transition-colors">
                                  <IconComponent className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm text-foreground mb-1">
                                    {layout.name}
                                  </h4>
                                  <p className="text-xs text-muted-foreground">
                                    {layout.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                          <div className="flex items-start gap-2">
                            <LayoutGrid className="h-4 w-4 text-accent mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Smart Arrangement</p>
                              <p className="text-xs text-muted-foreground">
                                Layouts automatically adapt to your screen size and widget content.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reset Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onResetToDefaults}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </>
            )}
          </div>

          {/* Visible Widgets Count */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{visibleWidgets?.length || 0} widgets visible</span>
            </div>
          </div>
        </div>

        {/* Customization Mode Info */}
        {customizationMode && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Settings className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Customization Mode Active
                </p>
                <p className="text-xs text-muted-foreground">
                  Use Auto Layout for quick arrangement, drag widgets to reorder manually, or click eye icons to show/hide widgets.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Current Widgets List (in customization mode) */}
        {customizationMode && visibleWidgets?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Active Widgets</h4>
            <div className="flex flex-wrap gap-2">
              {visibleWidgets.map((widget) => (
                <div
                  key={widget.id}
                  className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm"
                >
                  <span className="text-foreground">{widget.title}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleWidget(widget.id)}
                    className="h-5 w-5 p-0 hover:bg-destructive/20 hover:text-destructive"
                  >
                    <EyeOff className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCustomizationToolbar;