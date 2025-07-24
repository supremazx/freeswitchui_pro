import React from 'react';
import Icon from '../../../components/AppIcon';

const ServerStats = ({ servers }) => {
  const totalServers = servers.length;
  const healthyServers = servers.filter(s => s.status === 'healthy').length;
  const warningServers = servers.filter(s => s.status === 'warning').length;
  const criticalServers = servers.filter(s => s.status === 'critical').length;
  const offlineServers = servers.filter(s => s.status === 'offline').length;

  const totalActiveCalls = servers.reduce((sum, server) => sum + server.activeCalls, 0);
  const totalRegisteredUsers = servers.reduce((sum, server) => sum + server.registeredUsers, 0);
  const averageCpuUsage = Math.round(servers.reduce((sum, server) => sum + server.cpuUsage, 0) / totalServers);
  const averageMemoryUsage = Math.round(servers.reduce((sum, server) => sum + server.memoryUsage, 0) / totalServers);

  const stats = [
    {
      title: 'Total Servers',
      value: totalServers,
      icon: 'Server',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Healthy Servers',
      value: healthyServers,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Warning Servers',
      value: warningServers,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Critical/Offline',
      value: criticalServers + offlineServers,
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  const performanceStats = [
    {
      title: 'Active Calls',
      value: totalActiveCalls.toLocaleString(),
      icon: 'Phone',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Registered Users',
      value: totalRegisteredUsers.toLocaleString(),
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Avg CPU Usage',
      value: `${averageCpuUsage}%`,
      icon: 'Cpu',
      color: averageCpuUsage > 80 ? 'text-error' : averageCpuUsage > 60 ? 'text-warning' : 'text-success',
      bgColor: averageCpuUsage > 80 ? 'bg-error/10' : averageCpuUsage > 60 ? 'bg-warning/10' : 'bg-success/10'
    },
    {
      title: 'Avg Memory Usage',
      value: `${averageMemoryUsage}%`,
      icon: 'HardDrive',
      color: averageMemoryUsage > 80 ? 'text-error' : averageMemoryUsage > 60 ? 'text-warning' : 'text-success',
      bgColor: averageMemoryUsage > 80 ? 'bg-error/10' : averageMemoryUsage > 60 ? 'bg-warning/10' : 'bg-success/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Server Status Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Server Status Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                <Icon name={stat.icon} size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceStats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                <Icon name={stat.icon} size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">System Alerts</h3>
          <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="space-y-3">
          {criticalServers > 0 && (
            <div className="flex items-center space-x-3 p-3 bg-error/10 border border-error/20 rounded-lg">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <div className="flex-1">
                <p className="text-sm font-medium text-error">Critical Server Alert</p>
                <p className="text-xs text-error/80">{criticalServers} server(s) in critical state requiring immediate attention</p>
              </div>
            </div>
          )}
          
          {warningServers > 0 && (
            <div className="flex items-center space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <div className="flex-1">
                <p className="text-sm font-medium text-warning">Performance Warning</p>
                <p className="text-xs text-warning/80">{warningServers} server(s) showing performance degradation</p>
              </div>
            </div>
          )}
          
          {offlineServers > 0 && (
            <div className="flex items-center space-x-3 p-3 bg-error/10 border border-error/20 rounded-lg">
              <Icon name="WifiOff" size={16} className="text-error" />
              <div className="flex-1">
                <p className="text-sm font-medium text-error">Offline Servers</p>
                <p className="text-xs text-error/80">{offlineServers} server(s) are currently offline</p>
              </div>
            </div>
          )}
          
          {criticalServers === 0 && warningServers === 0 && offlineServers === 0 && (
            <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium text-success">All Systems Operational</p>
                <p className="text-xs text-success/80">No critical alerts or warnings detected</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Diagnostics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Diagnostics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Icon name="Activity" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">Network Connectivity</p>
                <p className="text-sm text-muted-foreground">Test server connections</p>
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
          
          <button className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Icon name="Zap" size={20} className="text-warning" />
              <div>
                <p className="font-medium text-foreground">Performance Test</p>
                <p className="text-sm text-muted-foreground">Run system benchmarks</p>
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
          
          <button className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-success" />
              <div>
                <p className="font-medium text-foreground">Security Scan</p>
                <p className="text-sm text-muted-foreground">Check security status</p>
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
          
          <button className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Icon name="Database" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">Database Health</p>
                <p className="text-sm text-muted-foreground">Verify data integrity</p>
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerStats;