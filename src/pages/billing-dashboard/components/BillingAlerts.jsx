import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillingAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'overdue',
      priority: 'high',
      title: 'Payment Overdue',
      message: 'StartupTech Ltd has an overdue invoice of $15,000 (30 days past due)',
      tenant: 'StartupTech Ltd',
      amount: 15000,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      actionRequired: true
    },
    {
      id: 2,
      type: 'failed_payment',
      priority: 'high',
      title: 'Payment Failed',
      message: 'Credit card payment failed for Digital Solutions - $8,500',
      tenant: 'Digital Solutions',
      amount: 8500,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      actionRequired: true
    },
    {
      id: 3,
      type: 'threshold',
      priority: 'medium',
      title: 'Usage Threshold Exceeded',
      message: 'Cloud Networks exceeded 80% of monthly usage limit',
      tenant: 'Cloud Networks',
      amount: null,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actionRequired: false
    },
    {
      id: 4,
      type: 'collection',
      priority: 'medium',
      title: 'Collection Workflow Started',
      message: 'Automated collection process initiated for overdue accounts',
      tenant: null,
      amount: 23500,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      actionRequired: false
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getAlertIcon = (type) => {
    const icons = {
      overdue: 'AlertTriangle',
      failed_payment: 'XCircle',
      threshold: 'TrendingUp',
      collection: 'Clock',
      success: 'CheckCircle'
    };
    return icons[type] || 'Bell';
  };

  const getAlertColor = (priority) => {
    const colors = {
      high: 'text-error bg-error/10 border-error/20',
      medium: 'text-warning bg-warning/10 border-warning/20',
      low: 'text-accent bg-accent/10 border-accent/20'
    };
    return colors[priority] || 'text-muted-foreground bg-muted/10';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error text-error-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-accent text-accent-foreground'
    };
    return colors[priority] || 'bg-muted text-muted-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : filter === 'action_required' 
      ? alerts.filter(alert => alert.actionRequired)
      : alerts.filter(alert => alert.priority === filter);

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Billing Alerts</h3>
          <p className="text-sm text-muted-foreground">
            {alerts.filter(a => a.actionRequired).length} require attention
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="Settings" size={14} className="mr-2" />
          Configure
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { key: 'all', label: 'All', count: alerts.length },
          { key: 'action_required', label: 'Action Required', count: alerts.filter(a => a.actionRequired).length },
          { key: 'high', label: 'High Priority', count: alerts.filter(a => a.priority === 'high').length },
          { key: 'medium', label: 'Medium', count: alerts.filter(a => a.priority === 'medium').length }
        ].map(filterOption => (
          <Button
            key={filterOption.key}
            variant={filter === filterOption.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(filterOption.key)}
            className="h-8 px-3 text-xs"
          >
            {filterOption.label}
            {filterOption.count > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-background/50 rounded text-xs">
                {filterOption.count}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className={`border rounded-lg p-4 ${getAlertColor(alert.priority)}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name={getAlertIcon(alert.type)} size={16} />
                <h4 className="text-sm font-medium">{alert.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(alert.priority)}`}>
                  {alert.priority}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs opacity-75">{formatTimeAgo(alert.timestamp)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dismissAlert(alert.id)}
                  className="w-6 h-6 hover:bg-background/50"
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
            </div>
            
            <p className="text-sm mb-3 opacity-90">{alert.message}</p>
            
            <div className="flex items-center justify-between">
              <div className="text-xs opacity-75">
                {alert.tenant && (
                  <span>Tenant: {alert.tenant}</span>
                )}
                {alert.amount && (
                  <span className="ml-2 font-medium">
                    Amount: ${alert.amount.toLocaleString()}
                  </span>
                )}
              </div>
              
              {alert.actionRequired && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="h-7 px-3 text-xs">
                    View Details
                  </Button>
                  <Button size="sm" className="h-7 px-3 text-xs">
                    Take Action
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            {filter === 'all' ? 'No alerts at this time' : 'No alerts match the selected filter'}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Icon name="Mail" size={14} className="mr-2" />
            Send Reminders
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Icon name="Play" size={14} className="mr-2" />
            Run Collections
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillingAlerts;