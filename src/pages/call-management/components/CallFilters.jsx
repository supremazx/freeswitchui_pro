import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CallFilters = ({ onFiltersChange, activeCallsCount, totalCallsToday }) => {
  const [filters, setFilters] = useState({
    search: '',
    tenant: '',
    callType: '',
    status: '',
    timeRange: 'all'
  });

  const tenantOptions = [
    { value: '', label: 'All Tenants' },
    { value: 'abc-corp', label: 'ABC Corp' },
    { value: 'xyz-ltd', label: 'XYZ Ltd' },
    { value: 'tech-solutions', label: 'Tech Solutions Inc' },
    { value: 'global-comm', label: 'Global Communications' }
  ];

  const callTypeOptions = [
    { value: '', label: 'All Call Types' },
    { value: 'inbound', label: 'Inbound' },
    { value: 'outbound', label: 'Outbound' },
    { value: 'internal', label: 'Internal' },
    { value: 'conference', label: 'Conference' },
    { value: 'transfer', label: 'Transfer' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'ringing', label: 'Ringing' },
    { value: 'hold', label: 'On Hold' },
    { value: 'recording', label: 'Recording' },
    { value: 'transferring', label: 'Transferring' }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last-hour', label: 'Last Hour' },
    { value: 'today', label: 'Today' },
    { value: 'last-24h', label: 'Last 24 Hours' },
    { value: 'this-week', label: 'This Week' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      tenant: '',
      callType: '',
      status: '',
      timeRange: 'all'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value !== 'all');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Stats Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm text-muted-foreground">Active Calls</p>
              <p className="text-2xl font-bold text-foreground">{activeCallsCount}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="TrendingUp" size={16} className="text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Total Today</p>
              <p className="text-2xl font-bold text-foreground">{totalCallsToday}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export
          </Button>
          <Button variant="default" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search by phone number, caller ID..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full"
          />
        </div>

        <Select
          placeholder="Select tenant"
          options={tenantOptions}
          value={filters.tenant}
          onChange={(value) => handleFilterChange('tenant', value)}
        />

        <Select
          placeholder="Call type"
          options={callTypeOptions}
          value={filters.callType}
          onChange={(value) => handleFilterChange('callType', value)}
        />

        <Select
          placeholder="Status"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <div className="flex items-end space-x-2">
          <Select
            placeholder="Time range"
            options={timeRangeOptions}
            value={filters.timeRange}
            onChange={(value) => handleFilterChange('timeRange', value)}
            className="flex-1"
          />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              title="Clear filters"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallFilters;