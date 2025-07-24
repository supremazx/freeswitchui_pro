import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CallVolumeChart = () => {
  const chartData = [
    { time: '00:00', calls: 45, aiProcessed: 12 },
    { time: '02:00', calls: 32, aiProcessed: 8 },
    { time: '04:00', calls: 28, aiProcessed: 6 },
    { time: '06:00', calls: 65, aiProcessed: 18 },
    { time: '08:00', calls: 142, aiProcessed: 45 },
    { time: '10:00', calls: 198, aiProcessed: 67 },
    { time: '12:00', calls: 234, aiProcessed: 89 },
    { time: '14:00', calls: 267, aiProcessed: 102 },
    { time: '16:00', calls: 289, aiProcessed: 115 },
    { time: '18:00', calls: 245, aiProcessed: 87 },
    { time: '20:00', calls: 178, aiProcessed: 56 },
    { time: '22:00', calls: 123, aiProcessed: 34 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Call Volume Trends</h3>
            <p className="text-sm text-muted-foreground mt-1">24-hour call activity overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Total Calls</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-sm text-muted-foreground">AI Processed</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(30, 64, 175)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="rgb(30, 64, 175)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(14, 165, 233)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="rgb(14, 165, 233)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(226, 232, 240)" />
              <XAxis 
                dataKey="time" 
                stroke="rgb(100, 116, 139)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgb(100, 116, 139)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="calls"
                stroke="rgb(30, 64, 175)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#callsGradient)"
                name="Total Calls"
              />
              <Area
                type="monotone"
                dataKey="aiProcessed"
                stroke="rgb(14, 165, 233)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#aiGradient)"
                name="AI Processed"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CallVolumeChart;