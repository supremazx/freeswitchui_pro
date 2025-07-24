import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServerCard = ({ server, onViewDetails, onToggleStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-success text-success-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-error text-error-foreground';
      case 'offline': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      case 'offline': return 'Circle';
      default: return 'Circle';
    }
  };

  const formatUptime = (hours) => {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return days > 0 ? `${days}d ${remainingHours}h` : `${remainingHours}h`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{server.name}</h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
              <Icon name={getStatusIcon(server.status)} size={12} className="mr-1" />
              {server.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{server.location}</p>
          <p className="text-xs text-muted-foreground font-mono">{server.ipAddress}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewDetails(server)}
            className="w-8 h-8"
          >
            <Icon name="Eye" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleStatus(server)}
            className="w-8 h-8"
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">CPU Usage</span>
            <span className="text-xs font-medium text-foreground">{server.cpuUsage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                server.cpuUsage > 80 ? 'bg-error' : server.cpuUsage > 60 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${server.cpuUsage}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Memory</span>
            <span className="text-xs font-medium text-foreground">{server.memoryUsage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                server.memoryUsage > 80 ? 'bg-error' : server.memoryUsage > 60 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${server.memoryUsage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Phone" size={14} className="text-primary" />
            <span className="text-lg font-semibold text-foreground">{server.activeCalls}</span>
          </div>
          <p className="text-xs text-muted-foreground">Active Calls</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Users" size={14} className="text-accent" />
            <span className="text-lg font-semibold text-foreground">{server.registeredUsers}</span>
          </div>
          <p className="text-xs text-muted-foreground">Registered</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Clock" size={14} className="text-success" />
            <span className="text-lg font-semibold text-foreground">{formatUptime(server.uptime)}</span>
          </div>
          <p className="text-xs text-muted-foreground">Uptime</p>
        </div>
      </div>

      {/* Tenant Info */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Building2" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Tenants:</span>
            <span className="text-sm font-medium text-foreground">{server.tenantCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Cpu" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">{server.version}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerCard;