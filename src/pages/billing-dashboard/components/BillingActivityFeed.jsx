import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillingActivityFeed = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'payment_received',
      tenant: 'Enterprise Corp',
      amount: 45000,
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      status: 'success'
    },
    {
      id: 2,
      type: 'invoice_generated',
      tenant: 'TechStart Inc',
      amount: 32000,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'pending'
    },
    {
      id: 3,
      type: 'payment_failed',
      tenant: 'Digital Solutions',
      amount: 8500,
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: 'failed'
    },
    {
      id: 4,
      type: 'usage_charge',
      tenant: 'Cloud Networks',
      amount: 1250,
      timestamp: new Date(Date.now() - 1.2 * 60 * 60 * 1000),
      status: 'processed'
    },
    {
      id: 5,
      type: 'payment_received',
      tenant: 'Global Services',
      amount: 28000,
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
      status: 'success'
    },
    {
      id: 6,
      type: 'invoice_overdue',
      tenant: 'StartupTech Ltd',
      amount: 15000,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'overdue'
    }
  ]);

  const [filter, setFilter] = useState('all');

  // Simulate real-time activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      const activityTypes = ['payment_received', 'invoice_generated', 'usage_charge'];
      const tenants = ['Enterprise Corp', 'TechStart Inc', 'Global Services', 'Digital Solutions'];
      const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const randomTenant = tenants[Math.floor(Math.random() * tenants.length)];
      const randomAmount = Math.floor(Math.random() * 50000) + 1000;

      const newActivity = {
        id: Date.now(),
        type: randomType,
        tenant: randomTenant,
        amount: randomAmount,
        timestamp: new Date(),
        status: randomType === 'payment_received' ? 'success' : 
                randomType === 'invoice_generated' ? 'pending' : 'processed'
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type) => {
    const icons = {
      payment_received: 'CheckCircle',
      payment_failed: 'XCircle',
      invoice_generated: 'FileText',
      invoice_overdue: 'AlertTriangle',
      usage_charge: 'Activity'
    };
    return icons[type] || 'Circle';
  };

  const getActivityColor = (status) => {
    const colors = {
      success: 'text-success',
      failed: 'text-error',
      pending: 'text-warning',
      overdue: 'text-error',
      processed: 'text-accent'
    };
    return colors[status] || 'text-muted-foreground';
  };

  const getActivityTitle = (type) => {
    const titles = {
      payment_received: 'Payment Received',
      payment_failed: 'Payment Failed',
      invoice_generated: 'Invoice Generated',
      invoice_overdue: 'Invoice Overdue',
      usage_charge: 'Usage Charge Applied'
    };
    return titles[type] || 'Unknown Activity';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.status === filter);

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Billing Activity</h3>
          <p className="text-sm text-muted-foreground">Real-time financial transactions</p>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { key: 'all', label: 'All', count: activities.length },
          { key: 'success', label: 'Success', count: activities.filter(a => a.status === 'success').length },
          { key: 'failed', label: 'Failed', count: activities.filter(a => a.status === 'failed').length },
          { key: 'pending', label: 'Pending', count: activities.filter(a => a.status === 'pending').length }
        ].map(filterOption => (
          <Button
            key={filterOption.key}
            variant={filter === filterOption.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(filterOption.key)}
            className="h-8 px-3 text-xs"
          >
            {filterOption.label}
            <span className="ml-1 px-1.5 py-0.5 bg-background/50 rounded text-xs">
              {filterOption.count}
            </span>
          </Button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-muted ${getActivityColor(activity.status)}`}>
              <Icon name={getActivityIcon(activity.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {getActivityTitle(activity.type)}
                </p>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground mb-1">
                {activity.tenant}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  ${activity.amount.toLocaleString()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full bg-muted ${getActivityColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">No activities found for the selected filter</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="w-full">
          <Icon name="History" size={14} className="mr-2" />
          View Full History
        </Button>
      </div>
    </div>
  );
};

export default BillingActivityFeed;