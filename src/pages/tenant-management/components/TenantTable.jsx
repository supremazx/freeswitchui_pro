import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Tooltip from '../../../components/ui/Tooltip';
import { Checkbox } from '../../../components/ui/Checkbox';

const TenantTable = ({ tenants, selectedTenants, onSelectTenant, onSelectAll, onTenantAction, onSort, sortConfig }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { 
        color: 'bg-success/10 text-success border-success/20', 
        label: 'Active',
        icon: 'CheckCircle'
      },
      suspended: { 
        color: 'bg-error/10 text-error border-error/20', 
        label: 'Suspended',
        icon: 'Pause'
      },
      trial: { 
        color: 'bg-warning/10 text-warning border-warning/20', 
        label: 'Trial',
        icon: 'Clock'
      },
      expired: { 
        color: 'bg-muted text-muted-foreground border-border', 
        label: 'Expired',
        icon: 'XCircle'
      }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon name={config.icon} size={10} />
        <span>{config.label}</span>
      </span>
    );
  };

  const getPlanBadge = (plan) => {
    const planConfig = {
      starter: { color: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Starter' },
      professional: { color: 'bg-purple-50 text-purple-700 border-purple-200', label: 'Professional' },
      enterprise: { color: 'bg-green-50 text-green-700 border-green-200', label: 'Enterprise' },
      custom: { color: 'bg-orange-50 text-orange-700 border-orange-200', label: 'Custom' }
    };
    
    const config = planConfig[plan] || planConfig.starter;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getUsageBar = (used, total) => {
    const percentage = (used / total) * 100;
    let colorClass = 'bg-success';
    let bgClass = 'bg-success/10';
    
    if (percentage > 90) {
      colorClass = 'bg-error';
      bgClass = 'bg-error/10';
    } else if (percentage > 75) {
      colorClass = 'bg-warning';
      bgClass = 'bg-warning/10';
    }
    
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {used.toLocaleString()}/{total.toLocaleString()} mins
          </span>
          <span className="font-medium text-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
        <div className={`w-full ${bgClass} rounded-full h-2`}>
          <div
            className={`h-2 rounded-full ${colorClass} transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  const handleSort = (column) => {
    onSort(column);
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const columns = [
    { key: 'company', label: 'Company', sortable: true },
    { key: 'plan', label: 'Plan', sortable: true },
    { key: 'extensions', label: 'Extensions', sortable: true },
    { key: 'callVolume', label: 'Call Volume', sortable: true },
    { key: 'aiUsage', label: 'AI Usage', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Enhanced Table Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={selectedTenants.length === tenants.length && tenants.length > 0}
              indeterminate={selectedTenants.length > 0 && selectedTenants.length < tenants.length}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="user-friendly-focus"
            />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Tenants ({tenants.length})
              </h3>
              {selectedTenants.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {selectedTenants.length} selected
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Tooltip content="Export tenant data" position="bottom">
              <Button variant="outline" size="sm" iconName="Download" className="smooth-hover">
                Export
              </Button>
            </Tooltip>
            <Tooltip content="Refresh data" position="bottom">
              <Button variant="outline" size="sm" iconName="RefreshCw" className="smooth-hover">
                Refresh
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Enhanced Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20">
            <tr>
              <th className="w-12 px-6 py-4">
                {/* Checkbox column */}
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  {column.sortable ? (
                    <Tooltip content={`Sort by ${column.label}`} position="top">
                      <button
                        onClick={() => handleSort(column.key)}
                        className="flex items-center space-x-1 hover:text-foreground transition-colors smooth-hover user-friendly-focus rounded px-1 py-0.5"
                      >
                        <span>{column.label}</span>
                        <Icon 
                          name={getSortIcon(column.key)} 
                          size={14} 
                          className={`transition-colors ${
                            sortConfig.key === column.key ? 'text-primary' : ''
                          }`}
                        />
                      </button>
                    </Tooltip>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tenants.map((tenant) => (
              <tr
                key={tenant.id}
                className={`smooth-hover cursor-pointer ${
                  selectedTenants.includes(tenant.id) 
                    ? 'bg-accent/5 border-l-4 border-l-accent' :'hover:bg-muted/30'
                } ${hoveredRow === tenant.id ? 'shadow-sm' : ''}`}
                onMouseEnter={() => setHoveredRow(tenant.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onTenantAction('view', tenant)}
              >
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedTenants.includes(tenant.id)}
                    onChange={(e) => onSelectTenant(tenant.id, e.target.checked)}
                    className="user-friendly-focus"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="Building2" size={20} className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-foreground truncate">
                        {tenant.company}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {tenant.domain}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getPlanBadge(tenant.plan)}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-foreground">
                      {tenant.activeExtensions}/{tenant.totalExtensions}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(tenant.activeExtensions / tenant.totalExtensions) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((tenant.activeExtensions / tenant.totalExtensions) * 100)}%
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-foreground">
                      {tenant.callVolume?.toLocaleString() || 0} calls
                    </div>
                    <div className="text-xs text-muted-foreground">
                      This month
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getUsageBar(tenant.aiUsage?.used || 0, tenant.aiUsage?.quota || 1000)}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(tenant.status)}
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-1">
                    <Tooltip content="Edit tenant" position="top">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onTenantAction('edit', tenant)}
                        className="w-8 h-8 smooth-hover user-friendly-focus"
                      >
                        <Icon name="Edit" size={14} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Suspend tenant" position="top">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onTenantAction('suspend', tenant)}
                        className="w-8 h-8 smooth-hover user-friendly-focus text-warning hover:text-warning"
                      >
                        <Icon name="Pause" size={14} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete tenant" position="top">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onTenantAction('delete', tenant)}
                        className="w-8 h-8 smooth-hover user-friendly-focus text-error hover:text-error"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Table Footer */}
      <div className="px-6 py-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{tenants.length}</span> of{' '}
              <span className="font-medium text-foreground">{tenants.length}</span> tenants
            </div>
            {selectedTenants.length > 0 && (
              <div className="text-sm text-primary font-medium">
                {selectedTenants.length} selected
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Tooltip content="Previous page" position="top">
              <Button variant="outline" size="sm" disabled>
                <Icon name="ChevronLeft" size={16} />
              </Button>
            </Tooltip>
            <span className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md font-medium">
              1
            </span>
            <Tooltip content="Next page" position="top">
              <Button variant="outline" size="sm" disabled>
                <Icon name="ChevronRight" size={16} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantTable;