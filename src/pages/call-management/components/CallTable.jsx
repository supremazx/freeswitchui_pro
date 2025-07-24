import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CallTable = ({ calls, onCallAction }) => {
  const [selectedCalls, setSelectedCalls] = useState([]);
  const [expandedCall, setExpandedCall] = useState(null);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'ringing': return 'text-warning bg-warning/10';
      case 'hold': return 'text-secondary bg-secondary/10';
      case 'recording': return 'text-error bg-error/10';
      case 'transferring': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCallTypeIcon = (type) => {
    switch (type) {
      case 'inbound': return 'PhoneIncoming';
      case 'outbound': return 'PhoneOutgoing';
      case 'internal': return 'Phone';
      case 'conference': return 'Users';
      case 'transfer': return 'PhoneForwarded';
      default: return 'Phone';
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCalls(calls.map(call => call.id));
    } else {
      setSelectedCalls([]);
    }
  };

  const handleSelectCall = (callId, checked) => {
    if (checked) {
      setSelectedCalls([...selectedCalls, callId]);
    } else {
      setSelectedCalls(selectedCalls.filter(id => id !== callId));
    }
  };

  const toggleCallDetails = (callId) => {
    setExpandedCall(expandedCall === callId ? null : callId);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-muted/50 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedCalls.length === calls.length && calls.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-foreground">
              {selectedCalls.length > 0 ? `${selectedCalls.length} selected` : 'Select all'}
            </span>
          </div>
          
          {selectedCalls.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="PhoneOff">
                Terminate Selected
              </Button>
              <Button variant="outline" size="sm" iconName="Pause">
                Hold Selected
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Call Info</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Participants</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Duration</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tenant</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">AI Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call) => (
              <React.Fragment key={call.id}>
                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedCalls.includes(call.id)}
                        onChange={(e) => handleSelectCall(call.id, e.target.checked)}
                        className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                      />
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getCallTypeIcon(call.type)} 
                          size={16} 
                          className="text-muted-foreground" 
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{call.callId}</p>
                          <p className="text-xs text-muted-foreground">{call.type}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{call.caller}</p>
                      <p className="text-xs text-muted-foreground">→ {call.destination}</p>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="font-mono text-sm text-foreground">
                      {formatDuration(call.duration)}
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                      {call.status}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-foreground">{call.tenant}</span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {call.aiStatus.transcription && (
                        <Icon name="FileText" size={14} className="text-success" title="Transcription active" />
                      )}
                      {call.aiStatus.sentiment && (
                        <Icon name="Heart" size={14} className="text-accent" title="Sentiment analysis" />
                      )}
                      {call.aiStatus.recording && (
                        <Icon name="Mic" size={14} className="text-error" title="Recording" />
                      )}
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleCallDetails(call.id)}
                        title="View details"
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onCallAction('transfer', call.id)}
                        title="Transfer call"
                      >
                        <Icon name="PhoneForwarded" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onCallAction('hold', call.id)}
                        title="Hold call"
                      >
                        <Icon name="Pause" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onCallAction('terminate', call.id)}
                        title="Terminate call"
                        className="text-error hover:text-error"
                      >
                        <Icon name="PhoneOff" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Details Row */}
                {expandedCall === call.id && (
                  <tr className="bg-muted/20 border-b border-border">
                    <td colSpan="7" className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Call Details</h4>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p>Started: {call.startTime}</p>
                            <p>Server: {call.server}</p>
                            <p>Codec: {call.codec}</p>
                            <p>Quality: {call.quality}/5</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">AI Processing</h4>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Transcription:</span>
                              <span className={call.aiStatus.transcription ? 'text-success' : 'text-muted-foreground'}>
                                {call.aiStatus.transcription ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Sentiment:</span>
                              <span className="text-accent">{call.aiStatus.sentimentScore || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Language:</span>
                              <span className="text-foreground">{call.aiStatus.language || 'Auto'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Quick Actions</h4>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" iconName="Headphones">
                              Listen
                            </Button>
                            <Button variant="outline" size="sm" iconName="MessageSquare">
                              Whisper
                            </Button>
                            <Button variant="outline" size="sm" iconName="UserPlus">
                              Barge In
                            </Button>
                            <Button variant="outline" size="sm" iconName="Square">
                              Park
                            </Button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      {calls.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Phone" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No active calls found</p>
        </div>
      )}
    </div>
  );
};

export default CallTable;