import React from 'react';
import { Activity, Server, Cpu, HardDrive } from 'lucide-react';

const SystemHealthWidget = () => {
  const healthMetrics = [
    {
      name: 'CPU Usage',
      value: '23%',
      status: 'healthy',
      icon: Cpu,
      color: 'text-success'
    },
    {
      name: 'Memory Usage',
      value: '67%',
      status: 'warning',
      icon: Server,
      color: 'text-warning'
    },
    {
      name: 'Disk Usage',
      value: '45%',
      status: 'healthy',
      icon: HardDrive,
      color: 'text-success'
    },
    {
      name: 'Network',
      value: 'Online',
      status: 'healthy',
      icon: Activity,
      color: 'text-success'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">System Health</h3>
        <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
      </div>

      <div className="space-y-4">
        {healthMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconComponent className={`h-4 w-4 ${metric.color}`} />
                <span className="text-sm font-medium text-foreground">
                  {metric.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{metric.value}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.status === 'healthy' ? 'bg-success' : 
                  metric.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                }`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemHealthWidget;