import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIServicesSidebar = () => {
  const [activeSection, setActiveSection] = useState('logs');

  const recentLogs = [
    {
      id: 1,
      timestamp: '14:32:15',
      level: 'info',
      service: 'STT',
      message: 'Transcription completed for call_001.wav',
      tenant: 'ABC Corp'
    },
    {
      id: 2,
      timestamp: '14:31:42',
      level: 'warning',
      service: 'LLM',
      message: 'High token usage detected for tenant',
      tenant: 'TechStart Inc'
    },
    {
      id: 3,
      timestamp: '14:30:18',
      level: 'error',
      service: 'TTS',
      message: 'Voice synthesis failed - invalid SSML',
      tenant: 'Global Solutions'
    },
    {
      id: 4,
      timestamp: '14:29:55',
      level: 'info',
      service: 'STT',
      message: 'New language model loaded: es-ES',
      tenant: 'System'
    },
    {
      id: 5,
      timestamp: '14:28:33',
      level: 'success',
      service: 'LLM',
      message: 'Sentiment analysis batch completed',
      tenant: 'Enterprise Ltd'
    }
  ];

  const billingData = [
    {
      tenant: 'ABC Corp',
      thisMonth: 542.30,
      lastMonth: 498.75,
      trend: 'up',
      services: {
        stt: 245.80,
        tts: 156.20,
        llm: 140.30
      }
    },
    {
      tenant: 'TechStart Inc',
      thisMonth: 298.75,
      lastMonth: 325.40,
      trend: 'down',
      services: {
        stt: 145.30,
        tts: 89.45,
        llm: 64.00
      }
    },
    {
      tenant: 'Global Solutions',
      thisMonth: 445.20,
      lastMonth: 412.85,
      trend: 'up',
      services: {
        stt: 198.60,
        tts: 124.30,
        llm: 122.30
      }
    },
    {
      tenant: 'Enterprise Ltd',
      thisMonth: 234.80,
      lastMonth: 267.90,
      trend: 'down',
      services: {
        stt: 112.40,
        tts: 67.20,
        llm: 55.20
      }
    }
  ];

  const webhookStatus = [
    {
      id: 1,
      name: 'Transcription Complete',
      url: 'https://api.abccorp.com/webhooks/transcription',
      status: 'active',
      lastTriggered: '2 min ago',
      successRate: '99.2%'
    },
    {
      id: 2,
      name: 'Sentiment Analysis',
      url: 'https://hooks.techstart.io/sentiment',
      status: 'active',
      lastTriggered: '15 min ago',
      successRate: '98.7%'
    },
    {
      id: 3,
      name: 'Call Summary',
      url: 'https://api.globalsol.com/summary',
      status: 'error',
      lastTriggered: '1 hour ago',
      successRate: '85.3%'
    },
    {
      id: 4,
      name: 'TTS Generation',
      url: 'https://enterprise.ltd/api/tts',
      status: 'inactive',
      lastTriggered: '2 days ago',
      successRate: '94.1%'
    }
  ];

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'success': return 'text-success';
      case 'info': return 'text-accent';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getLogLevelIcon = (level) => {
    switch (level) {
      case 'success': return 'CheckCircle';
      case 'info': return 'Info';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'error': return 'text-error';
      case 'inactive': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'inactive': return 'Circle';
      default: return 'Circle';
    }
  };

  const sections = [
    { id: 'logs', label: 'Service Logs', icon: 'FileText' },
    { id: 'billing', label: 'Billing Summary', icon: 'DollarSign' },
    { id: 'webhooks', label: 'Webhook Status', icon: 'Webhook' }
  ];

  const renderLogs = () => (
    <div className="space-y-3">
      {recentLogs.map((log) => (
        <div key={log.id} className="p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
          <div className="flex items-start space-x-2">
            <Icon 
              name={getLogLevelIcon(log.level)} 
              size={14} 
              className={`mt-0.5 ${getLogLevelColor(log.level)}`} 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-mono text-muted-foreground">{log.timestamp}</span>
                <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  {log.service}
                </span>
              </div>
              <p className="text-sm text-foreground leading-tight">{log.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{log.tenant}</p>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full">
        View Full Logs
      </Button>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-4">
      {billingData.map((tenant, index) => (
        <div key={index} className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground text-sm">{tenant.tenant}</h4>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getTrendIcon(tenant.trend)} 
                size={14} 
                className={getTrendColor(tenant.trend)} 
              />
              <span className={`text-xs font-medium ${getTrendColor(tenant.trend)}`}>
                {tenant.trend === 'up' ? '+' : '-'}
                {Math.abs(((tenant.thisMonth - tenant.lastMonth) / tenant.lastMonth * 100)).toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">This Month</span>
              <span className="text-sm font-medium text-foreground">${tenant.thisMonth.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Last Month</span>
              <span className="text-xs text-muted-foreground">${tenant.lastMonth.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">STT</span>
                <span className="text-xs font-medium text-foreground">${tenant.services.stt.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">TTS</span>
                <span className="text-xs font-medium text-foreground">${tenant.services.tts.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">LLM</span>
                <span className="text-xs font-medium text-foreground">${tenant.services.llm.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full">
        Detailed Billing
      </Button>
    </div>
  );

  const renderWebhooks = () => (
    <div className="space-y-3">
      {webhookStatus.map((webhook) => (
        <div key={webhook.id} className="p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(webhook.status)} 
                size={14} 
                className={getStatusColor(webhook.status)} 
              />
              <h4 className="font-medium text-foreground text-sm">{webhook.name}</h4>
            </div>
            <span className={`text-xs font-medium ${getStatusColor(webhook.status)}`}>
              {webhook.status}
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground font-mono mb-2 truncate">
            {webhook.url}
          </p>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Last Triggered</span>
              <span className="text-xs text-foreground">{webhook.lastTriggered}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Success Rate</span>
              <span className={`text-xs font-medium ${
                parseFloat(webhook.successRate) > 95 ? 'text-success' : 
                parseFloat(webhook.successRate) > 90 ? 'text-warning' : 'text-error'
              }`}>
                {webhook.successRate}
              </span>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full">
        Manage Webhooks
      </Button>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'logs': return renderLogs();
      case 'billing': return renderBilling();
      case 'webhooks': return renderWebhooks();
      default: return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground mb-4">Quick Access</h3>
        
        {/* Section Tabs */}
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={section.icon} size={16} />
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default AIServicesSidebar;