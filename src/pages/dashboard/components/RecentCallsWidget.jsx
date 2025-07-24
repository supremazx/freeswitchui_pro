import React from 'react';
import { Phone, PhoneCall, Clock } from 'lucide-react';

const RecentCallsWidget = () => {
  const recentCalls = [
    {
      id: 1,
      caller: '+1 (555) 123-4567',
      callee: 'ext-1001',
      duration: '2:45',
      status: 'completed',
      timestamp: '2 min ago'
    },
    {
      id: 2,
      caller: 'ext-1002',
      callee: '+1 (555) 987-6543',
      duration: '0:15',
      status: 'missed',
      timestamp: '5 min ago'
    },
    {
      id: 3,
      caller: '+1 (555) 456-7890',
      callee: 'ext-1003',
      duration: '1:23',
      status: 'completed',
      timestamp: '8 min ago'
    },
    {
      id: 4,
      caller: 'ext-1004',
      callee: '+1 (555) 321-0987',
      duration: '4:12',
      status: 'completed',
      timestamp: '12 min ago'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'missed':
        return 'text-destructive';
      case 'ongoing':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return PhoneCall;
      case 'missed':
        return Phone;
      default:
        return Phone;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Calls</h3>
        <Phone className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {recentCalls.map((call) => {
          const StatusIcon = getStatusIcon(call.status);
          return (
            <div key={call.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <StatusIcon className={`h-4 w-4 ${getStatusColor(call.status)}`} />
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-foreground">{call.caller}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-foreground">{call.callee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{call.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{call.duration}</div>
                <div className={`text-xs capitalize ${getStatusColor(call.status)}`}>
                  {call.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentCallsWidget;