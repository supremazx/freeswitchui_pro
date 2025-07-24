import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ filters, onFiltersChange, onSavePreset, savedPresets, onLoadPreset }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [showPresetInput, setShowPresetInput] = useState(false);

  const tenantOptions = [
    { value: '', label: 'All Tenants' },
    { value: 'abc-corp', label: 'ABC Corp' },
    { value: 'xyz-ltd', label: 'XYZ Ltd' },
    { value: 'tech-solutions', label: 'Tech Solutions' },
    { value: 'global-comm', label: 'Global Communications' }
  ];

  const callTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'inbound', label: 'Inbound' },
    { value: 'outbound', label: 'Outbound' },
    { value: 'internal', label: 'Internal' },
    { value: 'conference', label: 'Conference' }
  ];

  const dispositionOptions = [
    { value: '', label: 'All Status' },
    { value: 'answered', label: 'Answered' },
    { value: 'busy', label: 'Busy' },
    { value: 'failed', label: 'Failed' },
    { value: 'no-answer', label: 'No Answer' }
  ];

  const aiStatusOptions = [
    { value: '', label: 'All AI Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'processing', label: 'Processing' },
    { value: 'failed', label: 'Failed' },
    { value: 'pending', label: 'Pending' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleSavePreset = () => {
    if (presetName.trim()) {
      onSavePreset(presetName.trim(), filters);
      setPresetName('');
      setShowPresetInput(false);
    }
  };

  const clearAllFilters = () => {
    onFiltersChange({
      dateFrom: '',
      dateTo: '',
      tenant: '',
      callType: '',
      disposition: '',
      aiStatus: '',
      caller: '',
      callee: '',
      minDuration: '',
      maxDuration: '',
      minCost: '',
      maxCost: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            disabled={activeFiltersCount === 0}
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </Button>
        </div>
      </div>

      {/* Quick Filters - Always Visible */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Date From</label>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Date To</label>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tenant</label>
            <select
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={filters.tenant}
              onChange={(e) => handleFilterChange('tenant', e.target.value)}
            >
              {tenantOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Call Type</label>
            <select
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={filters.callType}
              onChange={(e) => handleFilterChange('callType', e.target.value)}
            >
              {callTypeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <select
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={filters.disposition}
                onChange={(e) => handleFilterChange('disposition', e.target.value)}
              >
                {dispositionOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">AI Status</label>
              <select
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={filters.aiStatus}
                onChange={(e) => handleFilterChange('aiStatus', e.target.value)}
              >
                {aiStatusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Caller</label>
              <Input
                type="text"
                placeholder="Enter caller number"
                value={filters.caller}
                onChange={(e) => handleFilterChange('caller', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Callee</label>
              <Input
                type="text"
                placeholder="Enter callee number"
                value={filters.callee}
                onChange={(e) => handleFilterChange('callee', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Min Duration (sec)</label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minDuration}
                onChange={(e) => handleFilterChange('minDuration', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Max Duration (sec)</label>
              <Input
                type="number"
                placeholder="3600"
                value={filters.maxDuration}
                onChange={(e) => handleFilterChange('maxDuration', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Min Cost ($)</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={filters.minCost}
                onChange={(e) => handleFilterChange('minCost', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Max Cost ($)</label>
              <Input
                type="number"
                step="0.01"
                placeholder="100.00"
                value={filters.maxCost}
                onChange={(e) => handleFilterChange('maxCost', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Saved Presets */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Saved Presets</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPresetInput(!showPresetInput)}
          >
            <Icon name="Plus" size={14} className="mr-1" />
            Save Current
          </Button>
        </div>

        {showPresetInput && (
          <div className="flex items-center space-x-2 mb-3">
            <Input
              type="text"
              placeholder="Preset name"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" size="sm" onClick={handleSavePreset}>
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowPresetInput(false);
                setPresetName('');
              }}
            >
              Cancel
            </Button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {savedPresets.map((preset) => (
            <Button
              key={preset.id}
              variant="outline"
              size="sm"
              onClick={() => onLoadPreset(preset)}
              className="text-xs"
            >
              {preset.name}
            </Button>
          ))}
          {savedPresets.length === 0 && (
            <p className="text-sm text-muted-foreground">No saved presets</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;