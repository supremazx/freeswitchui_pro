import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AIUsageSummary = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  // AI Services Usage Data
  const [usageData, setUsageData] = useState({
    totalApiCalls: 156420,
    totalCost: 4275.30,
    averageLatency: 145,
    successRate: 98.7,
    topService: 'Speech-to-Text',
    monthlyGrowth: 12.8
  });

  // Usage trends data
  const usageTrends = [
    { date: '2025-07-17', stt: 12500, tts: 8900, llm: 4200, cost: 580 },
    { date: '2025-07-18', stt: 13200, tts: 9400, llm: 4800, cost: 620 },
    { date: '2025-07-19', stt: 11800, tts: 8600, llm: 4000, cost: 540 },
    { date: '2025-07-20', stt: 14500, tts: 10200, llm: 5200, cost: 680 },
    { date: '2025-07-21', stt: 15200, tts: 10800, llm: 5600, cost: 720 },
    { date: '2025-07-22', stt: 13800, tts: 9900, llm: 5000, cost: 650 },
    { date: '2025-07-23', stt: 16200, tts: 11500, llm: 6100, cost: 780 },
    { date: '2025-07-24', stt: 14900, tts: 10600, llm: 5400, cost: 710 }
  ];

  // Service distribution data
  const serviceDistribution = [
    { name: 'Speech-to-Text', value: 45.2, color: 'var(--color-primary)', calls: 70850 },
    { name: 'Text-to-Speech', value: 32.8, color: 'var(--color-success)', calls: 51290 },
    { name: 'LLM Processing', value: 22.0, color: 'var(--color-warning)', calls: 34280 }
  ];

  // Top tenant usage data
  const topTenants = [
    {
      id: 1,
      name: 'ABC Corporation',
      totalCalls: 28500,
      cost: 892.40,
      primaryService: 'STT',
      growth: 15.2,
      efficiency: 96.8
    },
    {
      id: 2,
      name: 'TechStart Inc',
      totalCalls: 19200,
      cost: 634.80,
      primaryService: 'TTS',
      growth: 8.7,
      efficiency: 94.2
    },
    {
      id: 3,
      name: 'Global Solutions',
      totalCalls: 22800,
      cost: 758.20,
      primaryService: 'LLM',
      growth: -3.1,
      efficiency: 98.1
    },
    {
      id: 4,
      name: 'Enterprise Ltd',
      totalCalls: 15600,
      cost: 487.30,
      primaryService: 'STT',
      growth: 12.4,
      efficiency: 95.5
    },
    {
      id: 5,
      name: 'Digital Corp',
      totalCalls: 13400,
      cost: 421.60,
      primaryService: 'TTS',
      growth: 22.8,
      efficiency: 97.3
    }
  ];

  // Performance metrics
  const performanceMetrics = [
    {
      service: 'Speech-to-Text',
      icon: 'Mic',
      avgLatency: '118ms',
      successRate: '99.2%',
      peakUsage: '2.4K/min',
      status: 'excellent'
    },
    {
      service: 'Text-to-Speech',
      icon: 'Volume2',
      avgLatency: '95ms',
      successRate: '98.8%',
      peakUsage: '1.8K/min',
      status: 'excellent'
    },
    {
      service: 'LLM Processing',
      icon: 'Brain',
      avgLatency: '342ms',
      successRate: '97.9%',
      peakUsage: '680/min',
      status: 'good'
    }
  ];

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'poor': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-success';
    if (growth < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI Usage Summary</h3>
              <p className="text-sm text-muted-foreground">AI services analytics and consumption insights across tenants</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {timeRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleTimeRangeChange(option.value)}
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
            <button className="text-sm text-primary hover:text-primary/80 font-medium flex items-center">
              <Icon name="RefreshCw" size={14} className="mr-1" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm text-muted-foreground">Updating analytics...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-1 bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{usageData?.totalApiCalls?.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total API Calls</p>
                <div className="flex items-center justify-center mt-1">
                  <Icon name="TrendingUp" size={12} className="text-success mr-1" />
                  <span className="text-xs text-success">+{usageData?.monthlyGrowth}%</span>
                </div>
              </div>
              <div className="lg:col-span-1 bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{formatCurrency(usageData?.totalCost)}</p>
                <p className="text-xs text-muted-foreground">Total Cost</p>
                <div className="flex items-center justify-center mt-1">
                  <Icon name="DollarSign" size={12} className="text-warning mr-1" />
                  <span className="text-xs text-muted-foreground">{formatCurrency(usageData?.totalCost / usageData?.totalApiCalls * 1000)} per 1K</span>
                </div>
              </div>
              <div className="lg:col-span-1 bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{usageData?.averageLatency}ms</p>
                <p className="text-xs text-muted-foreground">Avg Latency</p>
                <div className="flex items-center justify-center mt-1">
                  <Icon name="Zap" size={12} className="text-primary mr-1" />
                  <span className="text-xs text-primary">Optimized</span>
                </div>
              </div>
              <div className="lg:col-span-1 bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{usageData?.successRate}%</p>
                <p className="text-xs text-muted-foreground">Success Rate</p>
                <div className="flex items-center justify-center mt-1">
                  <Icon name="CheckCircle" size={12} className="text-success mr-1" />
                  <span className="text-xs text-success">Excellent</span>
                </div>
              </div>
              <div className="lg:col-span-1 bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{usageData?.topService}</p>
                <p className="text-xs text-muted-foreground">Top Service</p>
                <div className="flex items-center justify-center mt-1">
                  <Icon name="Mic" size={12} className="text-accent mr-1" />
                  <span className="text-xs text-accent">45.2% share</span>
                </div>
              </div>
              <div className="lg:col-span-1 bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{new Date().toLocaleDateString('en-US', { day: 'numeric' })}</p>
                <p className="text-xs text-muted-foreground">Peak Day</p>
                <div className="flex items-center justify-center mt-1">
                  <Icon name="Calendar" size={12} className="text-muted-foreground mr-1" />
                  <span className="text-xs text-muted-foreground">This Month</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Usage Trends Chart */}
              <div className="lg:col-span-2 bg-muted/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">Usage Trends</h4>
                    <p className="text-sm text-muted-foreground">Daily API calls by service type</p>
                  </div>
                  <Icon name="TrendingUp" size={16} className="text-primary" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={usageTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis 
                        dataKey="date" 
                        stroke="var(--color-muted-foreground)"
                        tickFormatter={formatDate}
                        fontSize={12}
                      />
                      <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--color-popover)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                        labelFormatter={(value) => formatDate(value)}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="stt" 
                        stroke="var(--color-primary)" 
                        strokeWidth={2}
                        name="Speech-to-Text"
                        dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="tts" 
                        stroke="var(--color-success)" 
                        strokeWidth={2}
                        name="Text-to-Speech"
                        dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="llm" 
                        stroke="var(--color-warning)" 
                        strokeWidth={2}
                        name="LLM Processing"
                        dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Service Distribution Pie Chart */}
              <div className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">Service Distribution</h4>
                    <p className="text-sm text-muted-foreground">Usage by service type</p>
                  </div>
                  <Icon name="PieChart" size={16} className="text-accent" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        fontSize={10}
                      >
                        {serviceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--color-popover)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                        formatter={(value, name, props) => [
                          `${value}% (${props.payload.calls.toLocaleString()} calls)`,
                          props.payload.name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-foreground">Service Performance</h4>
                  <p className="text-sm text-muted-foreground">Real-time performance metrics</p>
                </div>
                <Icon name="Activity" size={16} className="text-primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.service} className="border border-border rounded-lg p-3 bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                          <Icon name={metric.icon} size={12} className="text-primary" />
                        </div>
                        <span className="font-medium text-foreground text-sm">{metric.service}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        metric.status === 'excellent' ? 'bg-success/10 text-success' :
                        metric.status === 'good' ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'
                      }`}>
                        {metric.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Latency</span>
                        <span className="text-xs font-medium text-foreground">{metric.avgLatency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Success Rate</span>
                        <span className="text-xs font-medium text-foreground">{metric.successRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Peak</span>
                        <span className="text-xs font-medium text-foreground">{metric.peakUsage}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Tenants Table */}
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-foreground">Top AI Service Consumers</h4>
                  <p className="text-sm text-muted-foreground">Highest usage tenants by volume and cost</p>
                </div>
                <Icon name="Building2" size={16} className="text-accent" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Tenant</th>
                      <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">API Calls</th>
                      <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Cost</th>
                      <th className="text-center py-2 px-3 text-xs font-medium text-muted-foreground">Primary Service</th>
                      <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Growth</th>
                      <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topTenants.map((tenant) => (
                      <tr key={tenant.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                              <Icon name="Building2" size={12} className="text-primary" />
                            </div>
                            <span className="font-medium text-foreground text-sm">{tenant.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right text-foreground font-mono text-sm">
                          {tenant.totalCalls.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right text-foreground font-mono text-sm">
                          {formatCurrency(tenant.cost)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                            {tenant.primaryService}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className={`text-sm font-medium ${getGrowthColor(tenant.growth)}`}>
                            {tenant.growth > 0 ? '+' : ''}{tenant.growth}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className={`text-sm font-medium ${tenant.efficiency >= 97 ? 'text-success' : tenant.efficiency >= 95 ? 'text-primary' : 'text-warning'}`}>
                            {tenant.efficiency}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Data updated: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-xs text-muted-foreground hover:text-foreground flex items-center">
              <Icon name="Download" size={12} className="mr-1" />
              Export Data
            </button>
            <button className="text-xs text-muted-foreground hover:text-foreground flex items-center">
              <Icon name="Settings" size={12} className="mr-1" />
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIUsageSummary;