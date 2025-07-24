import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ServerFilters = ({ filters, onFiltersChange, onBulkAction }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status', count: 24 },
    { value: 'healthy', label: 'Healthy', count: 18 },
    { value: 'warning', label: 'Warning', count: 4 },
    { value: 'critical', label: 'Critical', count: 1 },
    { value: 'offline', label: 'Offline', count: 1 }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'us-east-1', label: 'US East (Virginia)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'eu-west-1', label: 'EU West (Ireland)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' }
  ];

  const bulkActions = [
    { value: 'restart', label: 'Restart Servers', icon: 'RotateCcw' },
    { value: 'maintenance', label: 'Enable Maintenance', icon: 'Pause' },
    { value: 'update', label: 'Update Servers', icon: 'Download' },
    { value: 'backup', label: 'Create Backup', icon: 'Archive' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Side - Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <Input
              type="search"
              placeholder="Search servers..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pl-10 w-64"
            />
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground whitespace-nowrap">Status:</span>
            <div className="flex space-x-1">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onFiltersChange({ ...filters, status: option.value })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.status === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  {option.label}
                  <span className="ml-1 text-xs opacity-75">({option.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground whitespace-nowrap">Location:</span>
            <select
              value={filters.location}
              onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
              className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Bulk Actions */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">Bulk Actions:</span>
            <div className="flex space-x-1">
              {bulkActions.map((action) => (
                <Button
                  key={action.value}
                  variant="outline"
                  size="sm"
                  onClick={() => onBulkAction(action.value)}
                  className="flex items-center space-x-1"
                >
                  <Icon name={action.icon} size={14} />
                  <span className="hidden sm:inline">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Add Server */}
          <Button variant="default" className="flex items-center space-x-2">
            <Icon name="Plus" size={16} />
            <span>Add Server</span>
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.search || filters.status !== 'all' || filters.location !== 'all') && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">Active Filters:</span>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  Search: "{filters.search}"
                  <button
                    onClick={() => onFiltersChange({ ...filters, search: '' })}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters.status !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  Status: {statusOptions.find(s => s.value === filters.status)?.label}
                  <button
                    onClick={() => onFiltersChange({ ...filters, status: 'all' })}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters.location !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  Location: {locationOptions.find(l => l.value === filters.location)?.label}
                  <button
                    onClick={() => onFiltersChange({ ...filters, location: 'all' })}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              <button
                onClick={() => onFiltersChange({ search: '', status: 'all', location: 'all' })}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerFilters;