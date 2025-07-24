import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServerDetailsModal = ({ server, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !server) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'performance', label: 'Performance', icon: 'Activity' },
    { id: 'configuration', label: 'Configuration', icon: 'Settings' },
    { id: 'logs', label: 'Logs', icon: 'FileText' }
  ];

  const performanceMetrics = [
    { label: 'CPU Usage', value: `${server.cpuUsage}%`, trend: '+2.3%', color: 'text-success' },
    { label: 'Memory Usage', value: `${server.memoryUsage}%`, trend: '-1.2%', color: 'text-error' },
    { label: 'Disk I/O', value: '45 MB/s', trend: '+5.7%', color: 'text-success' },
    { label: 'Network I/O', value: '128 MB/s', trend: '+12.4%', color: 'text-success' },
    { label: 'Call Processing', value: '99.8%', trend: '+0.1%', color: 'text-success' },
    { label: 'SIP Registrations', value: '2,847', trend: '+156', color: 'text-success' }
  ];

  const configurationSettings = [
    { category: 'SIP Profiles', items: ['internal', 'external', 'outbound'] },
    { category: 'Modules', items: ['mod_sofia', 'mod_dialplan_xml', 'mod_conference', 'mod_voicemail'] },
    { category: 'Codecs', items: ['PCMU', 'PCMA', 'G729', 'G722', 'Opus'] },
    { category: 'Security', items: ['ACL enabled', 'Rate limiting active', 'Fail2ban configured'] }
  ];

  const recentLogs = [
    { timestamp: '2025-07-24 17:55:32', level: 'INFO', message: 'SIP registration successful for user@domain.com' },
    { timestamp: '2025-07-24 17:54:18', level: 'WARN', message: 'High CPU usage detected: 85%' },
    { timestamp: '2025-07-24 17:53:45', level: 'INFO', message: 'Conference room created: conf-12345' },
    { timestamp: '2025-07-24 17:52:12', level: 'ERROR', message: 'Failed to connect to gateway: gw-primary' },
    { timestamp: '2025-07-24 17:51:33', level: 'INFO', message: 'Call completed successfully: duration 00:05:23' }
  ];

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'ERROR': return 'text-error';
      case 'WARN': return 'text-warning';
      case 'INFO': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1002 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Server" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{server.name}</h2>
              <p className="text-sm text-muted-foreground">{server.location} • {server.ipAddress}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Activity" size={20} className="text-success" />
                    <h3 className="font-semibold text-foreground">System Health</h3>
                  </div>
                  <p className="text-2xl font-bold text-success mb-1">Healthy</p>
                  <p className="text-sm text-muted-foreground">All services operational</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Phone" size={20} className="text-primary" />
                    <h3 className="font-semibold text-foreground">Active Calls</h3>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">{server.activeCalls}</p>
                  <p className="text-sm text-muted-foreground">Peak: 156 today</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Clock" size={20} className="text-accent" />
                    <h3 className="font-semibold text-foreground">Uptime</h3>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">{Math.floor(server.uptime / 24)}d</p>
                  <p className="text-sm text-muted-foreground">Since last restart</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Restart Server
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Icon name="Pause" size={16} className="mr-2" />
                    Maintenance Mode
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Icon name="Download" size={16} className="mr-2" />
                    Export Logs
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Reload Config
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{metric.label}</h4>
                      <span className={`text-sm font-medium ${metric.color}`}>{metric.trend}</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  </div>
                ))}
              </div>

              {/* Performance Chart Placeholder */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Performance Trends (Last 24 Hours)</h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                  <div className="text-center">
                    <Icon name="TrendingUp" size={48} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Performance charts would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'configuration' && (
            <div className="space-y-6">
              {configurationSettings.map((config, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">{config.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {config.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Recent Logs</h3>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Logs
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg overflow-hidden">
                {recentLogs.map((log, index) => (
                  <div key={index} className="p-4 border-b border-border last:border-b-0 font-mono text-sm">
                    <div className="flex items-start space-x-4">
                      <span className="text-muted-foreground whitespace-nowrap">{log.timestamp}</span>
                      <span className={`font-medium whitespace-nowrap ${getLogLevelColor(log.level)}`}>
                        [{log.level}]
                      </span>
                      <span className="text-foreground flex-1">{log.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServerDetailsModal;