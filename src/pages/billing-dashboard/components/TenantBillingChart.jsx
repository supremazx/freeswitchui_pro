import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TenantBillingChart = () => {
  const [viewType, setViewType] = useState('pie');

  const tenantBillingData = [
    { tenant: 'Enterprise Corp', revenue: 45000, percentage: 28.8, color: 'hsl(var(--color-primary))' },
    { tenant: 'TechStart Inc', revenue: 32000, percentage: 20.5, color: 'hsl(var(--color-success))' },
    { tenant: 'Global Services', revenue: 28000, percentage: 17.9, color: 'hsl(var(--color-accent))' },
    { tenant: 'Digital Solutions', revenue: 24000, percentage: 15.4, color: 'hsl(var(--color-warning))' },
    { tenant: 'Cloud Networks', revenue: 18000, percentage: 11.5, color: 'hsl(var(--color-secondary))' },
    { tenant: 'Others', revenue: 9000, percentage: 5.8, color: 'hsl(var(--color-muted-foreground))' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="font-medium text-foreground mb-2">{data.tenant}</p>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Revenue:</span>
              <span className="text-sm font-medium text-foreground">
                ${data.revenue?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Share:</span>
              <span className="text-sm font-medium text-foreground">
                {data.percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show labels for small slices

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Tenant Billing Distribution</h3>
          <p className="text-sm text-muted-foreground">Revenue breakdown by tenant accounts</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewType === 'pie' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('pie')}
              className="h-8 px-3"
            >
              <Icon name="PieChart" size={14} className="mr-1" />
              Pie
            </Button>
            <Button
              variant={viewType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('bar')}
              className="h-8 px-3"
            >
              <Icon name="BarChart3" size={14} className="mr-1" />
              Bar
            </Button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === 'pie' ? (
            <PieChart>
              <Pie
                data={tenantBillingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="revenue"
              >
                {tenantBillingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          ) : (
            <BarChart
              data={tenantBillingData}
              margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
              <XAxis 
                dataKey="tenant"
                stroke="hsl(var(--color-muted-foreground))"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="hsl(var(--color-muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {tenantBillingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">6</p>
          <p className="text-xs text-muted-foreground">Active Tenants</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">$156K</p>
          <p className="text-xs text-muted-foreground">Total Revenue</p>
        </div>
        <div className="text-center col-span-2 sm:col-span-1">
          <p className="text-2xl font-bold text-accent">$26K</p>
          <p className="text-xs text-muted-foreground">Average per Tenant</p>
        </div>
      </div>
    </div>
  );
};

export default TenantBillingChart;