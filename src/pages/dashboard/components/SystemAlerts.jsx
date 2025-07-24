import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'error',
      title: 'Server Connection Lost',
      message: 'FreeSWITCH server fs-02 is not responding. Last seen 5 minutes ago.',
      timestamp: new Date(Date.now() - 300000),
      severity: 'high',
      tenant: 'XYZ Ltd'
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Call Volume',
      message: 'Tenant ABC Corp is experiencing 85% capacity utilization.',
      timestamp: new Date(Date.now() - 600000),
      severity: 'medium',
      tenant: 'ABC Corp'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance window scheduled for tonight at 2:00 AM EST.',
      timestamp: new Date(Date.now() - 1800000),
      severity: 'low',
      tenant: 'System'
    },
    {
      id: 4,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily system backup completed successfully. 2.3GB archived.',
      timestamp: new Date(Date.now() - 3600000),
      severity: 'low',
      tenant: 'System'
    },
    {
      id: 5,
      type: 'warning',
      title: 'AI Service Quota',
      message: 'Speech-to-text API usage at 75% of monthly quota for DEF Inc.',
      timestamp: new Date(Date.now() - 7200000),
      severity: 'medium',
      tenant: 'DEF Inc'
    }
  ];

  const getAlertIcon = (type) => {
    const icons = {
      error: 'AlertCircle',
      warning: 'AlertTriangle',
      info: 'Info',
      success: 'CheckCircle'
    };
    return icons[type] || 'Bell';
  };

  const getAlertColor = (type) => {
    const colors = {
      error: 'text-error',
      warning: 'text-warning',
      info: 'text-accent',
      success: 'text-success'
    };
    return colors[type] || 'text-muted-foreground';
  };

  const getSeverityBadge = (severity) => {
    const badges = {
      high: 'bg-error/10 text-error border-error/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-muted text-muted-foreground border-border'
    };
    return badges[severity] || badges.low;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">System Alerts</h3>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 text-xs font-medium bg-error/10 text-error rounded-full">
              2 Critical
            </span>
            <button className="text-sm text-primary hover:text-primary/80">
              View All
            </button>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getAlertColor(alert.type)}`}>
                <Icon name={getAlertIcon(alert.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{alert.title}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityBadge(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{alert.tenant}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(alert.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            Mark All as Read
          </button>
          <button className="text-sm text-muted-foreground hover:text-foreground">
            Alert Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemAlerts;