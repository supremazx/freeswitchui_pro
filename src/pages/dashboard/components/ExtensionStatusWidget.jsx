import React from 'react';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

const ExtensionStatusWidget = () => {
  const extensionStats = {
    total: 1456,
    online: 1234,
    offline: 198,
    busy: 24
  };

  const recentExtensions = [
    { extension: '1001', status: 'online', user: 'John Doe', lastActivity: '2 min ago' },
    { extension: '1002', status: 'busy', user: 'Jane Smith', lastActivity: '5 min ago' },
    { extension: '1003', status: 'offline', user: 'Bob Wilson', lastActivity: '1 hour ago' },
    { extension: '1004', status: 'online', user: 'Alice Brown', lastActivity: 'just now' },
    { extension: '1005', status: 'online', user: 'Charlie Davis', lastActivity: '3 min ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-success bg-success/10';
      case 'busy':
        return 'text-warning bg-warning/10';
      case 'offline':
        return 'text-muted-foreground bg-muted/20';
      default:
        return 'text-muted-foreground bg-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return UserCheck;
      case 'busy':
        return Clock;
      case 'offline':
        return UserX;
      default:
        return Users;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Extension Status</h3>
        <Users className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-success/5 border border-success/20 rounded-lg">
          <UserCheck className="h-8 w-8 text-success" />
          <div>
            <div className="text-xl font-bold text-success">{extensionStats.online}</div>
            <div className="text-xs text-success">Online</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted/20 border border-border rounded-lg">
          <UserX className="h-8 w-8 text-muted-foreground" />
          <div>
            <div className="text-xl font-bold text-foreground">{extensionStats.offline}</div>
            <div className="text-xs text-muted-foreground">Offline</div>
          </div>
        </div>
      </div>

      {/* Recent Extensions */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Activity</h4>
        {recentExtensions.map((ext, index) => {
          const StatusIcon = getStatusIcon(ext.status);
          return (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-full ${getStatusColor(ext.status)}`}>
                  <StatusIcon className="h-3 w-3" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground">ext-{ext.extension}</span>
                    <span className="text-xs text-muted-foreground">{ext.user}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{ext.lastActivity}</div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ext.status)}`}>
                {ext.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExtensionStatusWidget;