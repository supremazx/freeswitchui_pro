import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const TenantUsageChart = () => {
  const tenantData = [
    { name: 'ABC Corp', value: 45, color: '#1e40af', calls: 1234 },
    { name: 'XYZ Ltd', value: 30, color: '#0ea5e9', calls: 892 },
    { name: 'DEF Inc', value: 15, color: '#059669', calls: 456 },
    { name: 'GHI Co', value: 10, color: '#d97706', calls: 298 }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">{`Usage: ${data.value}%`}</p>
          <p className="text-sm text-muted-foreground">{`Calls: ${data.calls}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Tenant Usage Distribution</h3>
            <p className="text-sm text-muted-foreground mt-1">Call volume by tenant</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">2,880</p>
            <p className="text-sm text-muted-foreground">Total Calls Today</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tenantData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {tenantData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {tenantData.map((tenant, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: tenant.color }}
                ></div>
                <span className="text-sm font-medium text-foreground">{tenant.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{tenant.calls}</p>
                <p className="text-xs text-muted-foreground">{tenant.value}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantUsageChart;