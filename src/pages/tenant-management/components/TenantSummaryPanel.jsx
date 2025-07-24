import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TenantSummaryPanel = ({ selectedTenants, onBulkAction }) => {
  const summaryStats = [
    {
      label: 'Total Tenants',
      value: '247',
      icon: 'Building2',
      color: 'text-primary'
    },
    {
      label: 'Active Tenants',
      value: '198',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      label: 'Trial Tenants',
      value: '32',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      label: 'Suspended',
      value: '17',
      icon: 'AlertTriangle',
      color: 'text-error'
    }
  ];

  const billingMetrics = [
    {
      label: 'Monthly Revenue',
      value: '$47,850',
      change: '+12.5%',
      positive: true
    },
    {
      label: 'AI Usage Costs',
      value: '$8,420',
      change: '+8.2%',
      positive: true
    },
    {
      label: 'Avg. Revenue/Tenant',
      value: '$194',
      change: '-2.1%',
      positive: false
    }
  ];

  const bulkActions = [
    { id: 'suspend', label: 'Suspend Selected', icon: 'Pause', variant: 'outline' },
    { id: 'activate', label: 'Activate Selected', icon: 'Play', variant: 'outline' },
    { id: 'export', label: 'Export Data', icon: 'Download', variant: 'outline' },
    { id: 'delete', label: 'Delete Selected', icon: 'Trash2', variant: 'destructive' }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Tenant Overview</h3>
        <div className="space-y-4">
          {summaryStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center`}>
                  <Icon name={stat.icon} size={16} className={stat.color} />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <span className="text-lg font-semibold text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Metrics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Billing Metrics</h3>
        <div className="space-y-4">
          {billingMetrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-foreground">{metric.value}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    metric.positive 
                      ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTenants.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Bulk Actions ({selectedTenants.length} selected)
          </h3>
          <div className="space-y-2">
            {bulkActions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                size="sm"
                fullWidth
                iconName={action.icon}
                iconPosition="left"
                onClick={() => onBulkAction(action.id, selectedTenants)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="FileText"
            iconPosition="left"
          >
            Generate Report
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Settings"
            iconPosition="left"
          >
            Global Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Bell"
            iconPosition="left"
          >
            Setup Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenantSummaryPanel;