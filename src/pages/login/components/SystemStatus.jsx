import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const systemMetrics = [
    {
      label: 'System Status',
      value: 'Operational',
      status: 'success',
      icon: 'CheckCircle'
    },
    {
      label: 'Active Servers',
      value: '12/12',
      status: 'success',
      icon: 'Server'
    },
    {
      label: 'Response Time',
      value: '< 50ms',
      status: 'success',
      icon: 'Zap'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">System Health</h3>
        <div className="text-xs text-gray-500">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>
      
      <div className="space-y-3">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={metric.icon} 
                size={14} 
                className={getStatusColor(metric.status)} 
              />
              <span className="text-xs text-gray-600">{metric.label}</span>
            </div>
            <span className={`text-xs font-medium ${getStatusColor(metric.status)}`}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600">
            All services operational - Last updated: {currentTime.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;