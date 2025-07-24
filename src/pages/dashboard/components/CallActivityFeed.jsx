import React from 'react';
import Icon from '../../../components/AppIcon';

const CallActivityFeed = () => {
  const callActivities = [
    {
      id: 1,
      type: 'incoming',
      caller: '+1 (555) 123-4567',
      callee: 'ext-1001',
      tenant: 'ABC Corp',
      duration: '00:02:45',
      status: 'completed',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: 'outgoing',
      caller: 'ext-1002',
      callee: '+1 (555) 987-6543',
      tenant: 'XYZ Ltd',
      duration: '00:01:23',
      status: 'active',
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: 3,
      type: 'internal',
      caller: 'ext-1003',
      callee: 'ext-1004',
      tenant: 'ABC Corp',
      duration: '00:05:12',
      status: 'completed',
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: 4,
      type: 'incoming',
      caller: '+1 (555) 456-7890',
      callee: 'ext-1005',
      tenant: 'DEF Inc',
      duration: '00:00:45',
      status: 'missed',
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 5,
      type: 'conference',
      caller: 'Conference Room 1',
      callee: '5 participants',
      tenant: 'ABC Corp',
      duration: '00:15:30',
      status: 'active',
      timestamp: new Date(Date.now() - 1200000)
    }
  ];

  const getCallIcon = (type) => {
    const icons = {
      incoming: 'PhoneIncoming',
      outgoing: 'PhoneOutgoing',
      internal: 'Phone',
      conference: 'Users'
    };
    return icons[type] || 'Phone';
  };

  const getCallColor = (type) => {
    const colors = {
      incoming: 'text-accent',
      outgoing: 'text-primary',
      internal: 'text-success',
      conference: 'text-warning'
    };
    return colors[type] || 'text-muted-foreground';
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-success/10 text-success border-success/20',
      completed: 'bg-muted text-muted-foreground border-border',
      missed: 'bg-error/10 text-error border-error/20'
    };
    return badges[status] || badges.completed;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Real-time Call Activity</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {callActivities.map((activity) => (
          <div key={activity.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getCallColor(activity.type)}`}>
                <Icon name={getCallIcon(activity.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.caller} → {activity.callee}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{activity.tenant}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.duration}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium">
          View All Call Logs
        </button>
      </div>
    </div>
  );
};

export default CallActivityFeed;