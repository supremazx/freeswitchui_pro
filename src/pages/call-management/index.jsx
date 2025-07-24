import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CallFilters from './components/CallFilters';
import CallTable from './components/CallTable';
import CallStatistics from './components/CallStatistics';
import CallActions from './components/CallActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CallManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [filters, setFilters] = useState({});
  const [calls, setCalls] = useState([]);
  const [stats, setStats] = useState({});
  const [queueStatus, setQueueStatus] = useState([]);
  const [conferenceRooms, setConferenceRooms] = useState([]);

  // Mock data for active calls
  const mockCalls = [
    {
      id: "call-001",
      callId: "1734-5678-9012",
      caller: "+1 (555) 123-4567",
      destination: "1001 (John Doe)",
      duration: 245,
      status: "active",
      type: "inbound",
      tenant: "ABC Corp",
      server: "fs-server-01",
      codec: "G.711",
      quality: 4,
      startTime: "2025-01-24 17:52:00",
      aiStatus: {
        transcription: true,
        sentiment: true,
        recording: true,
        sentimentScore: "Positive (0.8)",
        language: "English"
      },
      formattedDuration: "4:05"
    },
    {
      id: "call-002",
      callId: "1734-5678-9013",
      caller: "1002 (Jane Smith)",
      destination: "+1 (555) 987-6543",
      duration: 128,
      status: "ringing",
      type: "outbound",
      tenant: "XYZ Ltd",
      server: "fs-server-02",
      codec: "G.722",
      quality: 5,
      startTime: "2025-01-24 17:54:15",
      aiStatus: {
        transcription: false,
        sentiment: false,
        recording: false,
        sentimentScore: null,
        language: "Auto"
      },
      formattedDuration: "2:08"
    },
    {
      id: "call-003",
      callId: "1734-5678-9014",
      caller: "+1 (555) 456-7890",
      destination: "Support Queue",
      duration: 67,
      status: "hold",
      type: "inbound",
      tenant: "Tech Solutions Inc",
      server: "fs-server-01",
      codec: "G.711",
      quality: 3,
      startTime: "2025-01-24 17:55:30",
      aiStatus: {
        transcription: true,
        sentiment: true,
        recording: false,
        sentimentScore: "Neutral (0.5)",
        language: "English"
      },
      formattedDuration: "1:07"
    },
    {
      id: "call-004",
      callId: "1734-5678-9015",
      caller: "1003 (Mike Johnson)",
      destination: "Conference Room A",
      duration: 892,
      status: "recording",
      type: "conference",
      tenant: "Global Communications",
      server: "fs-server-03",
      codec: "G.722",
      quality: 5,
      startTime: "2025-01-24 17:41:45",
      aiStatus: {
        transcription: true,
        sentiment: true,
        recording: true,
        sentimentScore: "Mixed (0.6)",
        language: "English"
      },
      formattedDuration: "14:52"
    },
    {
      id: "call-005",
      callId: "1734-5678-9016",
      caller: "+1 (555) 321-0987",
      destination: "1004 (Sarah Wilson)",
      duration: 34,
      status: "transferring",
      type: "transfer",
      tenant: "ABC Corp",
      server: "fs-server-02",
      codec: "G.711",
      quality: 4,
      startTime: "2025-01-24 17:56:10",
      aiStatus: {
        transcription: false,
        sentiment: false,
        recording: false,
        sentimentScore: null,
        language: "Auto"
      },
      formattedDuration: "0:34"
    }
  ];

  // Mock statistics
  const mockStats = {
    activeCalls: 247,
    waitingCalls: 12,
    onHoldCalls: 8,
    recordingCalls: 15,
    avgWaitTime: 23,
    successRate: 94.7,
    recentRecordings: [
      {
        id: "rec-001",
        caller: "+1 (555) 123-4567",
        duration: "3:45",
        timestamp: "2 min ago"
      },
      {
        id: "rec-002",
        caller: "1002 (Jane Smith)",
        duration: "7:22",
        timestamp: "5 min ago"
      },
      {
        id: "rec-003",
        caller: "+1 (555) 789-0123",
        duration: "2:18",
        timestamp: "8 min ago"
      }
    ]
  };

  // Mock queue status
  const mockQueueStatus = [
    {
      id: "queue-support",
      name: "Support Queue",
      description: "General customer support",
      status: "normal",
      waiting: 3,
      agents: 8
    },
    {
      id: "queue-sales",
      name: "Sales Queue",
      description: "Sales inquiries and leads",
      status: "busy",
      waiting: 7,
      agents: 5
    },
    {
      id: "queue-technical",
      name: "Technical Queue",
      description: "Technical support and issues",
      status: "overloaded",
      waiting: 12,
      agents: 3
    }
  ];

  // Mock conference rooms
  const mockConferenceRooms = [
    {
      id: "conf-001",
      name: "Board Meeting",
      number: "3001",
      participants: 8
    },
    {
      id: "conf-002",
      name: "Team Standup",
      number: "3002",
      participants: 12
    },
    {
      id: "conf-003",
      name: "Client Presentation",
      number: "3003",
      participants: 5
    }
  ];

  useEffect(() => {
    // Initialize data
    setCalls(mockCalls);
    setStats(mockStats);
    setQueueStatus(mockQueueStatus);
    setConferenceRooms(mockConferenceRooms);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setCalls(prevCalls => 
        prevCalls.map(call => ({
          ...call,
          duration: call.duration + 1,
          formattedDuration: formatDuration(call.duration + 1)
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to calls data
    let filteredCalls = mockCalls;
    
    if (newFilters.search) {
      filteredCalls = filteredCalls.filter(call => 
        call.caller.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        call.destination.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        call.callId.includes(newFilters.search)
      );
    }
    
    if (newFilters.tenant) {
      filteredCalls = filteredCalls.filter(call => 
        call.tenant.toLowerCase().includes(newFilters.tenant.toLowerCase())
      );
    }
    
    if (newFilters.callType) {
      filteredCalls = filteredCalls.filter(call => call.type === newFilters.callType);
    }
    
    if (newFilters.status) {
      filteredCalls = filteredCalls.filter(call => call.status === newFilters.status);
    }
    
    setCalls(filteredCalls);
  };

  const handleCallAction = (action, callId) => {
    console.log(`Performing ${action} on call ${callId}`);
    
    if (action === 'view') {
      const call = calls.find(c => c.id === callId);
      setSelectedCall(call);
      setShowActions(true);
    } else {
      // Handle other actions
      setCalls(prevCalls => 
        prevCalls.map(call => {
          if (call.id === callId) {
            switch (action) {
              case 'hold':
                return { ...call, status: 'hold' };
              case 'terminate':
                return { ...call, status: 'terminated' };
              case 'transfer':
                return { ...call, status: 'transferring' };
              default:
                return call;
            }
          }
          return call;
        })
      );
    }
  };

  const handleActionExecute = (actionData) => {
    console.log('Executing action:', actionData);
    // Handle action execution
    handleCallAction(actionData.type, actionData.callId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} pt-16`}>
        <div className="p-6">
          <div className="max-w-full mx-auto">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Call Management</h1>
                <p className="text-muted-foreground mt-2">
                  Monitor and control active calls across all tenant systems with real-time updates
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Settings">
                  Call Settings
                </Button>
                <Button variant="default" iconName="PhoneCall">
                  Make Call
                </Button>
              </div>
            </div>

            {/* Filters */}
            <CallFilters
              onFiltersChange={handleFiltersChange}
              activeCallsCount={stats.activeCalls}
              totalCallsToday={1247}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Call Table - Takes up 3 columns on xl screens */}
              <div className="xl:col-span-3">
                <CallTable
                  calls={calls}
                  onCallAction={handleCallAction}
                />
              </div>

              {/* Right Panel - Statistics and Actions */}
              <div className="xl:col-span-1">
                <div className="space-y-6">
                  <CallStatistics
                    stats={stats}
                    queueStatus={queueStatus}
                    conferenceRooms={conferenceRooms}
                  />
                  
                  {showActions && (
                    <CallActions
                      selectedCall={selectedCall}
                      onAction={handleActionExecute}
                      onClose={() => {
                        setShowActions(false);
                        setSelectedCall(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Banner */}
            <div className="mt-8 bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error" />
                <div>
                  <p className="text-sm font-medium text-error">Emergency Call Handling</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Emergency calls are automatically prioritized and highlighted with red indicators. 
                    Use emergency override controls for immediate intervention.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Emergency Protocols
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CallManagement;