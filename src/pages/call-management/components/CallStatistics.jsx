import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallStatistics = ({ stats, queueStatus, conferenceRooms }) => {
  const getQueueStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-success bg-success/10';
      case 'busy': return 'text-warning bg-warning/10';
      case 'overloaded': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Live Statistics</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{stats.activeCalls}</div>
            <div className="text-xs text-muted-foreground">Active Calls</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent">{stats.waitingCalls}</div>
            <div className="text-xs text-muted-foreground">In Queue</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-warning">{stats.onHoldCalls}</div>
            <div className="text-xs text-muted-foreground">On Hold</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-error">{stats.recordingCalls}</div>
            <div className="text-xs text-muted-foreground">Recording</div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average Wait Time:</span>
            <span className="font-medium text-foreground">{stats.avgWaitTime}s</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">Call Success Rate:</span>
            <span className="font-medium text-success">{stats.successRate}%</span>
          </div>
        </div>
      </div>

      {/* Queue Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Queue Status</h3>
        
        <div className="space-y-3">
          {queueStatus.map((queue) => (
            <div key={queue.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{queue.name}</p>
                  <p className="text-xs text-muted-foreground">{queue.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getQueueStatusColor(queue.status)}`}>
                    {queue.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {queue.waiting} waiting • {queue.agents} agents
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conference Rooms */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Conference Rooms</h3>
          <Button variant="outline" size="sm" iconName="Plus">
            New Room
          </Button>
        </div>
        
        <div className="space-y-3">
          {conferenceRooms.map((room) => (
            <div key={room.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Video" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{room.name}</p>
                  <p className="text-xs text-muted-foreground">Room {room.number}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{room.participants}</p>
                  <p className="text-xs text-muted-foreground">participants</p>
                </div>
                <Button variant="ghost" size="icon" title="Join room">
                  <Icon name="LogIn" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {conferenceRooms.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Video" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No active conference rooms</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-1 gap-3">
          <Button variant="outline" className="justify-start" iconName="PhoneCall">
            Make Test Call
          </Button>
          <Button variant="outline" className="justify-start" iconName="Broadcast">
            System Announcement
          </Button>
          <Button variant="outline" className="justify-start" iconName="AlertTriangle">
            Emergency Override
          </Button>
          <Button variant="outline" className="justify-start" iconName="Settings">
            Call Routing Rules
          </Button>
        </div>
      </div>

      {/* Recent Recordings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Recordings</h3>
        
        <div className="space-y-3">
          {stats.recentRecordings?.map((recording) => (
            <div key={recording.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Play" size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{recording.caller}</p>
                  <p className="text-xs text-muted-foreground">{recording.duration} • {recording.timestamp}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" title="Play recording">
                  <Icon name="Play" size={14} />
                </Button>
                <Button variant="ghost" size="icon" title="Download">
                  <Icon name="Download" size={14} />
                </Button>
              </div>
            </div>
          )) || (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">No recent recordings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallStatistics;