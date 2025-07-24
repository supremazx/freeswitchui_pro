import React from 'react';
import Icon from '../../../components/AppIcon';

const ExtensionStats = ({ extensions, selectedTenant }) => {
  const filteredExtensions = selectedTenant === 'all' 
    ? extensions 
    : extensions.filter(ext => ext.tenant === selectedTenant);

  const stats = {
    total: filteredExtensions.length,
    online: filteredExtensions.filter(ext => ext.status === 'online').length,
    offline: filteredExtensions.filter(ext => ext.status === 'offline').length,
    busy: filteredExtensions.filter(ext => ext.status === 'busy').length,
    away: filteredExtensions.filter(ext => ext.status === 'away').length,
    aiEnabled: filteredExtensions.filter(ext => ext.aiFeatures).length,
    voicemailEnabled: filteredExtensions.filter(ext => ext.voicemail).length,
    recordingEnabled: filteredExtensions.filter(ext => ext.recording).length
  };

  const recentActivity = [
    {
      id: 1,
      type: 'registration',
      extension: '1001',
      user: 'John Smith',
      message: 'Extension registered from new device',
      timestamp: '2 minutes ago',
      icon: 'UserCheck',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'call',
      extension: '1005',
      user: 'Sarah Johnson',
      message: 'Outbound call to +1-555-0123',
      timestamp: '5 minutes ago',
      icon: 'PhoneOutgoing',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'voicemail',
      extension: '1003',
      user: 'Mike Davis',
      message: 'New voicemail received',
      timestamp: '8 minutes ago',
      icon: 'Voicemail',
      color: 'text-accent'
    },
    {
      id: 4,
      type: 'config',
      extension: '1007',
      user: 'Lisa Wilson',
      message: 'Call forwarding updated',
      timestamp: '12 minutes ago',
      icon: 'Settings',
      color: 'text-warning'
    },
    {
      id: 5,
      type: 'error',
      extension: '1002',
      user: 'Tom Brown',
      message: 'Registration failed - check credentials',
      timestamp: '15 minutes ago',
      icon: 'AlertTriangle',
      color: 'text-error'
    }
  ];

  const statCards = [
    {
      title: 'Total Extensions',
      value: stats.total,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Online',
      value: stats.online,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Offline',
      value: stats.offline,
      icon: 'UserX',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    },
    {
      title: 'AI Enabled',
      value: stats.aiEnabled,
      icon: 'Brain',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={stat.icon} size={24} className={stat.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Status Distribution</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-foreground">Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{stats.online}</span>
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success rounded-full"
                  style={{ width: `${stats.total > 0 ? (stats.online / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-sm text-foreground">Busy</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{stats.busy}</span>
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-error rounded-full"
                  style={{ width: `${stats.total > 0 ? (stats.busy / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-sm text-foreground">Away</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{stats.away}</span>
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-warning rounded-full"
                  style={{ width: `${stats.total > 0 ? (stats.away / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
              <span className="text-sm text-foreground">Offline</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{stats.offline}</span>
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-muted-foreground rounded-full"
                  style={{ width: `${stats.total > 0 ? (stats.offline / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Usage */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Feature Usage</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Brain" size={16} className="text-accent" />
              <span className="text-sm text-foreground">AI Features</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {stats.aiEnabled}/{stats.total}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Voicemail" size={16} className="text-primary" />
              <span className="text-sm text-foreground">Voicemail</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {stats.voicemailEnabled}/{stats.total}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Mic" size={16} className="text-warning" />
              <span className="text-sm text-foreground">Call Recording</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {stats.recordingEnabled}/{stats.total}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <button className="text-sm text-primary hover:text-primary/80">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0`}>
                <Icon name={activity.icon} size={14} className={activity.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    {activity.extension}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {activity.user}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtensionStats;