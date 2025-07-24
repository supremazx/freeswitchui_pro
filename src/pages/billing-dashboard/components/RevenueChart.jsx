import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RevenueChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('6m');

  const revenueData = [
    { month: 'Jan', revenue: 125000, recurring: 95000, usage: 30000, target: 120000 },
    { month: 'Feb', revenue: 132000, recurring: 98000, usage: 34000, target: 125000 },
    { month: 'Mar', revenue: 127000, recurring: 100000, usage: 27000, target: 130000 },
    { month: 'Apr', revenue: 145000, recurring: 105000, usage: 40000, target: 135000 },
    { month: 'May', revenue: 138000, recurring: 108000, usage: 30000, target: 140000 },
    { month: 'Jun', revenue: 156000, recurring: 112000, usage: 44000, target: 145000 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="font-medium text-foreground mb-2">{`${label} 2024`}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-muted-foreground capitalize">
                  {entry.dataKey}:
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">
                ${entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Revenue Trends</h3>
          <p className="text-sm text-muted-foreground">Monthly revenue breakdown with targets</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {/* Chart Type Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('line')}
              className="h-8 px-3"
            >
              <Icon name="TrendingUp" size={14} className="mr-1" />
              Line
            </Button>
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('bar')}
              className="h-8 px-3"
            >
              <Icon name="BarChart3" size={14} className="mr-1" />
              Bar
            </Button>
          </div>

          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="h-8 px-3 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
            <option value="1y">1 Year</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--color-muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--color-muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--color-primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--color-primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--color-primary))', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="hsl(var(--color-muted-foreground))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          ) : (
            <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--color-muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--color-muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="recurring" stackId="a" fill="hsl(var(--color-success))" radius={[0, 0, 4, 4]} />
              <Bar dataKey="usage" stackId="a" fill="hsl(var(--color-accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-xs text-muted-foreground">Total Revenue</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-xs text-muted-foreground">Recurring Revenue</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <span className="text-xs text-muted-foreground">Usage Charges</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-1 bg-muted-foreground rounded-full opacity-60"></div>
          <span className="text-xs text-muted-foreground">Target</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;