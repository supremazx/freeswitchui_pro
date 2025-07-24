import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallAnalyticsCharts = ({ data }) => {
  const [activeChart, setActiveChart] = useState('volume');

  const chartTabs = [
    { id: 'volume', label: 'Call Volume', icon: 'BarChart3' },
    { id: 'cost', label: 'Cost Analysis', icon: 'DollarSign' },
    { id: 'ai', label: 'AI Utilization', icon: 'Brain' },
    { id: 'disposition', label: 'Call Status', icon: 'PieChart' }
  ];

  const volumeData = [
    { date: '2024-07-17', calls: 245, answered: 198, failed: 47 },
    { date: '2024-07-18', calls: 312, answered: 267, failed: 45 },
    { date: '2024-07-19', calls: 289, answered: 234, failed: 55 },
    { date: '2024-07-20', calls: 356, answered: 298, failed: 58 },
    { date: '2024-07-21', calls: 278, answered: 221, failed: 57 },
    { date: '2024-07-22', calls: 423, answered: 367, failed: 56 },
    { date: '2024-07-23', calls: 398, answered: 334, failed: 64 },
    { date: '2024-07-24', calls: 187, answered: 156, failed: 31 }
  ];

  const costData = [
    { date: '2024-07-17', cost: 1245.67, aiCost: 234.12 },
    { date: '2024-07-18', cost: 1567.89, aiCost: 298.45 },
    { date: '2024-07-19', cost: 1389.23, aiCost: 267.89 },
    { date: '2024-07-20', cost: 1789.45, aiCost: 345.67 },
    { date: '2024-07-21', cost: 1456.78, aiCost: 289.34 },
    { date: '2024-07-22', cost: 2134.56, aiCost: 423.78 },
    { date: '2024-07-23', cost: 1987.34, aiCost: 398.12 },
    { date: '2024-07-24', cost: 934.12, aiCost: 187.45 }
  ];

  const aiUtilizationData = [
    { date: '2024-07-17', transcription: 156, sentiment: 134, summary: 98 },
    { date: '2024-07-18', transcription: 203, sentiment: 178, summary: 145 },
    { date: '2024-07-19', transcription: 187, sentiment: 156, summary: 123 },
    { date: '2024-07-20', transcription: 234, sentiment: 198, summary: 167 },
    { date: '2024-07-21', transcription: 178, sentiment: 145, summary: 112 },
    { date: '2024-07-22', transcription: 298, sentiment: 256, summary: 203 },
    { date: '2024-07-23', transcription: 267, sentiment: 234, summary: 189 },
    { date: '2024-07-24', transcription: 123, sentiment: 98, summary: 78 }
  ];

  const dispositionData = [
    { name: 'Answered', value: 2275, color: '#059669' },
    { name: 'Busy', value: 156, color: '#d97706' },
    { name: 'Failed', value: 423, color: '#dc2626' },
    { name: 'No Answer', value: 234, color: '#64748b' }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{formatDate(label)}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' && entry.name.includes('Cost') 
                ? `$${entry.value.toFixed(2)}` 
                : entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'volume':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="var(--color-muted-foreground)"
              />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="answered" fill="var(--color-success)" name="Answered" />
              <Bar dataKey="failed" fill="var(--color-error)" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'cost':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="var(--color-muted-foreground)"
              />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="Total Cost"
              />
              <Line 
                type="monotone" 
                dataKey="aiCost" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                name="AI Cost"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'ai':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aiUtilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="var(--color-muted-foreground)"
              />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="transcription" fill="var(--color-primary)" name="Transcription" />
              <Bar dataKey="sentiment" fill="var(--color-accent)" name="Sentiment Analysis" />
              <Bar dataKey="summary" fill="var(--color-secondary)" name="AI Summary" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'disposition':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dispositionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {dispositionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [value.toLocaleString(), 'Calls']}
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Chart Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {chartTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeChart === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveChart(tab.id)}
              className="flex-shrink-0 rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
              data-active={activeChart === tab.id}
            >
              <Icon name={tab.icon} size={16} className="mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {chartTabs.find(tab => tab.id === activeChart)?.label}
            </h3>
            <p className="text-sm text-muted-foreground">
              Last 7 days performance overview
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={14} className="mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="RefreshCw" size={14} className="mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {renderChart()}

        {/* Chart Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeChart === 'volume' && (
            <>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">2,488</div>
                <div className="text-sm text-muted-foreground">Total Calls</div>
              </div>
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">2,075</div>
                <div className="text-sm text-muted-foreground">Answered</div>
              </div>
              <div className="text-center p-3 bg-error/10 rounded-lg">
                <div className="text-2xl font-bold text-error">413</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">83.4%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </>
          )}

          {activeChart === 'cost' && (
            <>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">$12,503</div>
                <div className="text-sm text-muted-foreground">Total Cost</div>
              </div>
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <div className="text-2xl font-bold text-accent">$2,442</div>
                <div className="text-sm text-muted-foreground">AI Services</div>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning">$5.02</div>
                <div className="text-sm text-muted-foreground">Avg per Call</div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">19.5%</div>
                <div className="text-sm text-muted-foreground">AI Cost Ratio</div>
              </div>
            </>
          )}

          {activeChart === 'ai' && (
            <>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">1,646</div>
                <div className="text-sm text-muted-foreground">Transcriptions</div>
              </div>
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <div className="text-2xl font-bold text-accent">1,399</div>
                <div className="text-sm text-muted-foreground">Sentiment Analysis</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary">1,115</div>
                <div className="text-sm text-muted-foreground">AI Summaries</div>
              </div>
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">66.1%</div>
                <div className="text-sm text-muted-foreground">AI Coverage</div>
              </div>
            </>
          )}

          {activeChart === 'disposition' && (
            <>
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">73.5%</div>
                <div className="text-sm text-muted-foreground">Answered</div>
              </div>
              <div className="text-center p-3 bg-error/10 rounded-lg">
                <div className="text-2xl font-bold text-error">13.7%</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-muted-foreground">7.6%</div>
                <div className="text-sm text-muted-foreground">No Answer</div>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning">5.0%</div>
                <div className="text-sm text-muted-foreground">Busy</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallAnalyticsCharts;