import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceHealthMonitor = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const responseTimeData = [
    { time: '00:00', stt: 120, tts: 85, llm: 450 },
    { time: '04:00', stt: 115, tts: 82, llm: 420 },
    { time: '08:00', stt: 135, tts: 95, llm: 580 },
    { time: '12:00', stt: 145, tts: 105, llm: 620 },
    { time: '16:00', stt: 125, tts: 88, llm: 490 },
    { time: '20:00', stt: 118, tts: 85, llm: 465 },
    { time: '24:00', stt: 110, tts: 80, llm: 440 }
  ];

  const errorRateData = [
    { time: '00:00', errors: 0.2 },
    { time: '04:00', errors: 0.1 },
    { time: '08:00', errors: 0.8 },
    { time: '12:00', errors: 1.2 },
    { time: '16:00', errors: 0.6 },
    { time: '20:00', errors: 0.3 },
    { time: '24:00', errors: 0.2 }
  ];

  const serviceMetrics = [
    {
      id: 'speech-to-text',
      name: 'Speech-to-Text',
      icon: 'Mic',
      status: 'healthy',
      uptime: '99.98%',
      responseTime: '110ms',
      errorRate: '0.02%',
      throughput: '1,250 req/min',
      quota: { used: 75420, limit: 100000 }
    },
    {
      id: 'text-to-speech',
      name: 'Text-to-Speech',
      icon: 'Volume2',
      status: 'healthy',
      uptime: '99.95%',
      responseTime: '80ms',
      errorRate: '0.05%',
      throughput: '890 req/min',
      quota: { used: 42300, limit: 75000 }
    },
    {
      id: 'llm-processing',
      name: 'LLM Processing',
      icon: 'Brain',
      status: 'warning',
      uptime: '99.85%',
      responseTime: '440ms',
      errorRate: '0.15%',
      throughput: '320 req/min',
      quota: { used: 28900, limit: 50000 }
    },
    {
      id: 'sentiment-analysis',
      name: 'Sentiment Analysis',
      icon: 'Heart',
      status: 'healthy',
      uptime: '99.92%',
      responseTime: '95ms',
      errorRate: '0.08%',
      throughput: '650 req/min',
      quota: { used: 15600, limit: 25000 }
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      service: 'LLM Processing',
      message: 'Response time above threshold (440ms > 400ms)',
      timestamp: '2 min ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      service: 'Text-to-Speech',
      message: 'Quota utilization at 56% for ABC Corp',
      timestamp: '15 min ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'success',
      service: 'Speech-to-Text',
      message: 'Service performance improved after optimization',
      timestamp: '1 hour ago',
      severity: 'low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'info': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const timeRangeOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  return (
    <div className="space-y-6">
      {/* Service Status Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Service Health Overview</h3>
            <p className="text-sm text-muted-foreground">Real-time monitoring of AI service performance</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {timeRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeRange(option.value)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeRange === option.value
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="icon">
              <Icon name="RefreshCw" size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceMetrics.map((service) => (
            <div key={service.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={service.icon} size={16} className="text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground text-sm">{service.name}</h4>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getStatusIcon(service.status)} 
                    size={14} 
                    className={getStatusColor(service.status)} 
                  />
                  <span className={`text-xs font-medium ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Uptime</span>
                  <span className="text-xs font-medium text-foreground">{service.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Response Time</span>
                  <span className="text-xs font-medium text-foreground">{service.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Error Rate</span>
                  <span className="text-xs font-medium text-foreground">{service.errorRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Throughput</span>
                  <span className="text-xs font-medium text-foreground">{service.throughput}</span>
                </div>
              </div>

              {/* Quota Usage */}
              <div className="mt-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Quota Usage</span>
                  <span className="text-xs font-medium text-foreground">
                    {Math.round((service.quota.used / service.quota.limit) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      (service.quota.used / service.quota.limit) > 0.8 ? 'bg-error' :
                      (service.quota.used / service.quota.limit) > 0.6 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${(service.quota.used / service.quota.limit) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">
                    {service.quota.used.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {service.quota.limit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-foreground">Response Time Trends</h4>
              <p className="text-sm text-muted-foreground">Average response times by service</p>
            </div>
            <Icon name="Activity" size={20} className="text-primary" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="stt" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  name="Speech-to-Text"
                />
                <Line 
                  type="monotone" 
                  dataKey="tts" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  name="Text-to-Speech"
                />
                <Line 
                  type="monotone" 
                  dataKey="llm" 
                  stroke="var(--color-warning)" 
                  strokeWidth={2}
                  name="LLM Processing"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Error Rate Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-foreground">Error Rate Monitoring</h4>
              <p className="text-sm text-muted-foreground">System-wide error rate percentage</p>
            </div>
            <Icon name="AlertTriangle" size={20} className="text-warning" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={errorRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="errors" 
                  stroke="var(--color-error)" 
                  fill="var(--color-error)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts and Notifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-foreground">Recent Alerts</h4>
            <p className="text-sm text-muted-foreground">System alerts and notifications</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              View All
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Settings" size={16} />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <Icon 
                name={getAlertIcon(alert.type)} 
                size={16} 
                className={`mt-0.5 ${getAlertColor(alert.type)}`} 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-foreground text-sm">{alert.service}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    alert.severity === 'high' ? 'bg-error/10 text-error' :
                    alert.severity === 'medium'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="X" size={14} />
              </Button>
            </div>
          ))}
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">All Systems Operational</h4>
            <p className="text-sm text-muted-foreground">No active alerts or issues detected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceHealthMonitor;