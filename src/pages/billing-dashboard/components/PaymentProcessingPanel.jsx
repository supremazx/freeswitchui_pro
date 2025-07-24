import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentProcessingPanel = () => {
  const [activeTab, setActiveTab] = useState('recent');
  
  const recentPayments = [
    {
      id: 'PAY-001',
      tenant: 'Enterprise Corp',
      amount: 45000,
      method: 'Bank Transfer',
      status: 'completed',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      processor: 'Stripe'
    },
    {
      id: 'PAY-002',
      tenant: 'Global Services',
      amount: 28000,
      method: 'Credit Card',
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      processor: 'PayPal'
    },
    {
      id: 'PAY-003',
      tenant: 'Digital Solutions',
      amount: 8500,
      method: 'Credit Card',
      status: 'failed',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      processor: 'Stripe'
    },
    {
      id: 'PAY-004',
      tenant: 'TechStart Inc',
      amount: 32000,
      method: 'ACH',
      status: 'processing',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      processor: 'Plaid'
    }
  ];

  const processingStats = {
    totalVolume: 156000,
    successRate: 98.2,
    avgProcessingTime: '2.3s',
    activeProcessors: 3
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-success bg-success/10',
      failed: 'text-error bg-error/10',
      processing: 'text-warning bg-warning/10',
      pending: 'text-accent bg-accent/10'
    };
    return colors[status] || 'text-muted-foreground bg-muted/10';
  };

  const getMethodIcon = (method) => {
    const icons = {
      'Credit Card': 'CreditCard',
      'Bank Transfer': 'Building2',
      'ACH': 'Building',
      'PayPal': 'Wallet',
      'Crypto': 'Coins'
    };
    return icons[method] || 'DollarSign';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Payment Processing</h3>
          <p className="text-sm text-muted-foreground">Transaction monitoring and management</p>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="RefreshCw" size={14} className="mr-2" />
          Refresh
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        <Button
          variant={activeTab === 'recent' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('recent')}
          className="flex-1 h-8"
        >
          Recent Payments
        </Button>
        <Button
          variant={activeTab === 'stats' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('stats')}
          className="flex-1 h-8"
        >
          Statistics
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'recent' ? (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recentPayments.map((payment) => (
            <div key={payment.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={getMethodIcon(payment.method)} size={16} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{payment.tenant}</p>
                    <p className="text-xs text-muted-foreground">{payment.method} • {payment.processor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">${payment.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{formatTimeAgo(payment.timestamp)}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-mono">{payment.id}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Processing Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-success">${(processingStats.totalVolume / 1000).toFixed(0)}K</p>
              <p className="text-xs text-muted-foreground">Volume Today</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">{processingStats.successRate}%</p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-accent">{processingStats.avgProcessingTime}</p>
              <p className="text-xs text-muted-foreground">Avg Processing</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">{processingStats.activeProcessors}</p>
              <p className="text-xs text-muted-foreground">Active Processors</p>
            </div>
          </div>

          {/* Payment Method Distribution */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Payment Methods</h4>
            <div className="space-y-2">
              {[
                { method: 'Credit Card', percentage: 45, amount: 70200 },
                { method: 'Bank Transfer', percentage: 35, amount: 54600 },
                { method: 'ACH', percentage: 15, amount: 23400 },
                { method: 'Other', percentage: 5, amount: 7800 }
              ].map((item) => (
                <div key={item.method} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name={getMethodIcon(item.method)} size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{item.method}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{item.percentage}%</span>
                    <span className="text-xs font-medium text-foreground w-12">${(item.amount / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Icon name="FileDown" size={14} className="mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Icon name="Settings" size={14} className="mr-2" />
            Configure
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessingPanel;