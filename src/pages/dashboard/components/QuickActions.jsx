import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Create Extension',
      description: 'Add new user extension',
      icon: 'UserPlus',
      color: 'primary',
      route: '/extension-management',
      count: null
    },
    {
      id: 2,
      title: 'Manage Calls',
      description: 'View active calls',
      icon: 'Phone',
      color: 'success',
      route: '/call-management',
      count: 247
    },
    {
      id: 3,
      title: 'Conference Rooms',
      description: 'Create meeting room',
      icon: 'Users',
      color: 'accent',
      route: '/call-management',
      count: 5
    },
    {
      id: 4,
      title: 'View CDRs',
      description: 'Call detail records',
      icon: 'FileText',
      color: 'warning',
      route: '/call-detail-records-cdr',
      count: null
    },
    {
      id: 5,
      title: 'AI Services',
      description: 'Speech & text processing',
      icon: 'Brain',
      color: 'primary',
      route: '/ai-services-dashboard',
      count: null
    },
    {
      id: 6,
      title: 'Server Status',
      description: 'FreeSWITCH servers',
      icon: 'Server',
      color: 'success',
      route: '/free-s-witch-server-management',
      count: 3
    }
  ];

  const recentActions = [
    {
      id: 1,
      action: 'Created extension 1025',
      user: 'Admin User',
      timestamp: new Date(Date.now() - 900000),
      tenant: 'ABC Corp'
    },
    {
      id: 2,
      action: 'Updated conference room settings',
      user: 'Admin User',
      timestamp: new Date(Date.now() - 1800000),
      tenant: 'XYZ Ltd'
    },
    {
      id: 3,
      action: 'Exported CDR report',
      user: 'Admin User',
      timestamp: new Date(Date.now() - 3600000),
      tenant: 'DEF Inc'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
      success: 'bg-success/10 text-success border-success/20 hover:bg-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20',
      accent: 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20'
    };
    return colors[color] || colors.primary;
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
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground mt-1">Common administrative tasks</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                to={action.route}
                className={`p-4 rounded-lg border transition-all duration-200 ${getColorClasses(action.color)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon name={action.icon} size={20} />
                  {action.count !== null && (
                    <span className="text-sm font-bold">{action.count}</span>
                  )}
                </div>
                <h4 className="font-medium mb-1">{action.title}</h4>
                <p className="text-xs opacity-80">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Actions */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Recent Actions</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
        </div>
        <div className="divide-y divide-border">
          {recentActions.map((action) => (
            <div key={action.id} className="p-4 hover:bg-muted/50">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="Activity" size={14} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{action.action}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">{action.user}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{action.tenant}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(action.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status Summary */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">System Status</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">FreeSWITCH Servers</span>
            </div>
            <span className="text-sm text-success">3/3 Online</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">AI Services</span>
            </div>
            <span className="text-sm text-success">Operational</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">Database</span>
            </div>
            <span className="text-sm text-warning">High Load</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">WebRTC Gateway</span>
            </div>
            <span className="text-sm text-success">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;