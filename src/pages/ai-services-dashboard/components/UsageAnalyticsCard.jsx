import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const UsageAnalyticsCard = () => {
  const usageData = [
    { month: 'Jan', apiCalls: 45000, cost: 1250, latency: 120 },
    { month: 'Feb', apiCalls: 52000, cost: 1450, latency: 115 },
    { month: 'Mar', apiCalls: 48000, cost: 1340, latency: 118 },
    { month: 'Apr', apiCalls: 61000, cost: 1700, latency: 110 },
    { month: 'May', apiCalls: 58000, cost: 1620, latency: 112 },
    { month: 'Jun', apiCalls: 67000, cost: 1870, latency: 108 },
    { month: 'Jul', apiCalls: 72000, cost: 2010, latency: 105 }
  ];

  const tenantMetrics = [
    {
      id: 1,
      name: "ABC Corp",
      apiCalls: 15420,
      accuracy: 94.2,
      cost: 542.30,
      trend: "up"
    },
    {
      id: 2,
      name: "TechStart Inc",
      apiCalls: 8750,
      accuracy: 91.8,
      cost: 298.75,
      trend: "up"
    },
    {
      id: 3,
      name: "Global Solutions",
      apiCalls: 12300,
      accuracy: 96.1,
      cost: 445.20,
      trend: "down"
    },
    {
      id: 4,
      name: "Enterprise Ltd",
      apiCalls: 6890,
      accuracy: 89.5,
      cost: 234.80,
      trend: "stable"
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* API Usage Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">API Usage Overview</h3>
            <p className="text-sm text-muted-foreground">Monthly API call volume and trends</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
        </div>
        
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="apiCalls" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">72K</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">+12.5%</p>
            <p className="text-xs text-muted-foreground">Growth</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">105ms</p>
            <p className="text-xs text-muted-foreground">Avg Latency</p>
          </div>
        </div>
      </div>

      {/* Cost Analytics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Cost Analytics</h3>
            <p className="text-sm text-muted-foreground">AI service costs and optimization</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={20} className="text-warning" />
          </div>
        </div>

        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
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
                dataKey="cost" 
                stroke="var(--color-warning)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">$2,010</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">$0.028</p>
            <p className="text-xs text-muted-foreground">Per API Call</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">$24K</p>
            <p className="text-xs text-muted-foreground">Annual Est.</p>
          </div>
        </div>
      </div>

      {/* Tenant Performance */}
      <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Tenant Performance</h3>
            <p className="text-sm text-muted-foreground">AI service usage by tenant</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Building2" size={20} className="text-accent" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tenant</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">API Calls</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Accuracy</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Cost</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Trend</th>
              </tr>
            </thead>
            <tbody>
              {tenantMetrics.map((tenant) => (
                <tr key={tenant.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Building2" size={16} className="text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{tenant.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-foreground font-mono">
                    {tenant.apiCalls.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-medium ${tenant.accuracy >= 95 ? 'text-success' : tenant.accuracy >= 90 ? 'text-warning' : 'text-error'}`}>
                      {tenant.accuracy}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-foreground font-mono">
                    ${tenant.cost.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Icon 
                      name={getTrendIcon(tenant.trend)} 
                      size={16} 
                      className={getTrendColor(tenant.trend)} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsageAnalyticsCard;