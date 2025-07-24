import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportToolbar = ({ selectedRecords, totalRecords, onExport, onBulkAction }) => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState({
    timestamp: true,
    caller: true,
    callee: true,
    duration: true,
    cost: true,
    disposition: true,
    tenant: true,
    aiStatus: true,
    callId: false,
    direction: false,
    gateway: false,
    codec: false
  });

  const exportFormats = [
    { id: 'csv', label: 'CSV File', icon: 'FileText', description: 'Comma-separated values' },
    { id: 'excel', label: 'Excel File', icon: 'FileSpreadsheet', description: 'Microsoft Excel format' },
    { id: 'pdf', label: 'PDF Report', icon: 'FileDown', description: 'Formatted PDF document' },
    { id: 'json', label: 'JSON Data', icon: 'Code', description: 'Raw JSON format' }
  ];

  const bulkActions = [
    { id: 'ai-analyze', label: 'Run AI Analysis', icon: 'Brain', description: 'Process selected calls with AI' },
    { id: 'transcribe', label: 'Generate Transcripts', icon: 'FileText', description: 'Create call transcriptions' },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: 'Heart', description: 'Analyze call sentiment' },
    { id: 'delete', label: 'Delete Records', icon: 'Trash2', description: 'Remove selected records', variant: 'destructive' }
  ];

  const availableColumns = [
    { id: 'timestamp', label: 'Date/Time', required: true },
    { id: 'caller', label: 'Caller', required: true },
    { id: 'callee', label: 'Callee', required: true },
    { id: 'duration', label: 'Duration' },
    { id: 'cost', label: 'Cost' },
    { id: 'disposition', label: 'Status' },
    { id: 'tenant', label: 'Tenant' },
    { id: 'aiStatus', label: 'AI Status' },
    { id: 'callId', label: 'Call ID' },
    { id: 'direction', label: 'Direction' },
    { id: 'gateway', label: 'Gateway' },
    { id: 'codec', label: 'Codec' }
  ];

  const handleExport = (format) => {
    const columns = Object.keys(selectedColumns).filter(key => selectedColumns[key]);
    onExport(format, columns, selectedRecords.length > 0 ? selectedRecords : null);
    setShowExportOptions(false);
  };

  const handleBulkAction = (actionId) => {
    onBulkAction(actionId, selectedRecords);
    setShowBulkActions(false);
  };

  const toggleColumn = (columnId) => {
    if (availableColumns.find(col => col.id === columnId)?.required) return;
    
    setSelectedColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  const selectedColumnsCount = Object.values(selectedColumns).filter(Boolean).length;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Selection Info */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {selectedRecords.length > 0 ? (
              <span>
                <span className="font-medium text-foreground">{selectedRecords.length}</span> of{' '}
                <span className="font-medium text-foreground">{totalRecords}</span> records selected
              </span>
            ) : (
              <span>
                <span className="font-medium text-foreground">{totalRecords}</span> total records
              </span>
            )}
          </div>
          {selectedRecords.length > 0 && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-primary font-medium">Selection Active</span>
            </div>
          )}
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Column Selector */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowColumnSelector(!showColumnSelector)}
            >
              <Icon name="Columns" size={14} className="mr-2" />
              Columns ({selectedColumnsCount})
            </Button>

            {showColumnSelector && (
              <div className="absolute right-0 top-12 w-64 bg-popover border border-border rounded-lg shadow-lg z-1001">
                <div className="p-3 border-b border-border">
                  <h4 className="font-medium text-foreground">Select Columns</h4>
                  <p className="text-xs text-muted-foreground mt-1">Choose columns for export</p>
                </div>
                <div className="p-3 max-h-64 overflow-y-auto">
                  {availableColumns.map((column) => (
                    <label
                      key={column.id}
                      className={`flex items-center space-x-2 p-2 rounded hover:bg-muted/50 cursor-pointer ${
                        column.required ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedColumns[column.id]}
                        onChange={() => toggleColumn(column.id)}
                        disabled={column.required}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">{column.label}</span>
                      {column.required && (
                        <span className="text-xs text-muted-foreground">(Required)</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedRecords.length > 0 && (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkActions(!showBulkActions)}
              >
                <Icon name="Settings" size={14} className="mr-2" />
                Actions
              </Button>

              {showBulkActions && (
                <div className="absolute right-0 top-12 w-72 bg-popover border border-border rounded-lg shadow-lg z-1001">
                  <div className="p-3 border-b border-border">
                    <h4 className="font-medium text-foreground">Bulk Actions</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Apply to {selectedRecords.length} selected records
                    </p>
                  </div>
                  <div className="p-2">
                    {bulkActions.map((action) => (
                      <Button
                        key={action.id}
                        variant={action.variant || 'ghost'}
                        size="sm"
                        onClick={() => handleBulkAction(action.id)}
                        className="w-full justify-start mb-1"
                      >
                        <Icon name={action.icon} size={14} className="mr-3" />
                        <div className="text-left">
                          <div className="font-medium">{action.label}</div>
                          <div className="text-xs opacity-75">{action.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Export Options */}
          <div className="relative">
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowExportOptions(!showExportOptions)}
            >
              <Icon name="Download" size={14} className="mr-2" />
              Export
            </Button>

            {showExportOptions && (
              <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-lg z-1001">
                <div className="p-3 border-b border-border">
                  <h4 className="font-medium text-foreground">Export Options</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedRecords.length > 0 
                      ? `Export ${selectedRecords.length} selected records`
                      : `Export all ${totalRecords} records`
                    }
                  </p>
                </div>
                <div className="p-2">
                  {exportFormats.map((format) => (
                    <Button
                      key={format.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleExport(format.id)}
                      className="w-full justify-start mb-1"
                    >
                      <Icon name={format.icon} size={14} className="mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{format.label}</div>
                        <div className="text-xs opacity-75">{format.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    <Icon name="Info" size={12} className="inline mr-1" />
                    Exports include {selectedColumnsCount} selected columns
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside handlers */}
      {(showExportOptions || showBulkActions || showColumnSelector) && (
        <div
          className="fixed inset-0 z-999"
          onClick={() => {
            setShowExportOptions(false);
            setShowBulkActions(false);
            setShowColumnSelector(false);
          }}
        />
      )}
    </div>
  );
};

export default ExportToolbar;