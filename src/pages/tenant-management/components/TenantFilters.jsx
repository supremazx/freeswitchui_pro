import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TenantFilters = ({ onFiltersChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    search: '',
    plan: '',
    status: '',
    usageThreshold: ''
  });

  const planOptions = [
    { value: '', label: 'All Plans' },
    { value: 'starter', label: 'Starter' },
    { value: 'professional', label: 'Professional' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'custom', label: 'Custom' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'trial', label: 'Trial' },
    { value: 'expired', label: 'Expired' }
  ];

  const usageOptions = [
    { value: '', label: 'All Usage' },
    { value: 'low', label: 'Low Usage (<50%)' },
    { value: 'medium', label: 'Medium Usage (50-80%)' },
    { value: 'high', label: 'High Usage (>80%)' },
    { value: 'exceeded', label: 'Quota Exceeded' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      plan: '',
      status: '',
      usageThreshold: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Tenants</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          label="Search Tenants"
          type="search"
          placeholder="Search by company name..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full"
        />

        <Select
          label="Subscription Plan"
          options={planOptions}
          value={filters.plan}
          onChange={(value) => handleFilterChange('plan', value)}
          placeholder="Select plan type"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Select status"
        />

        <Select
          label="Usage Threshold"
          options={usageOptions}
          value={filters.usageThreshold}
          onChange={(value) => handleFilterChange('usageThreshold', value)}
          placeholder="Select usage level"
        />
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Filter" size={16} />
            <span>Active filters applied</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantFilters;