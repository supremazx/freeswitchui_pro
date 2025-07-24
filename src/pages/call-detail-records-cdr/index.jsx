import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CallRecordsTable from './components/CallRecordsTable';
import FilterPanel from './components/FilterPanel';
import CallAnalyticsCharts from './components/CallAnalyticsCharts';
import ExportToolbar from './components/ExportToolbar';
import StatsSidebar from './components/StatsSidebar';
import SearchBar from './components/SearchBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CallDetailRecordsCDR = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [showStatsSidebar, setShowStatsSidebar] = useState(true);
  const [searchHistory, setSearchHistory] = useState([
    'failed calls last week',
    'ABC Corp high cost calls',
    'negative sentiment calls'
  ]);

  const [filters, setFilters] = useState({
    dateFrom: '2024-07-17',
    dateTo: '2024-07-24',
    tenant: '',
    callType: '',
    disposition: '',
    aiStatus: '',
    caller: '',
    callee: '',
    minDuration: '',
    maxDuration: '',
    minCost: '',
    maxCost: ''
  });

  const [savedPresets] = useState([
    { id: 1, name: 'Failed Calls', filters: { disposition: 'failed' } },
    { id: 2, name: 'High Cost', filters: { minCost: '10' } },
    { id: 3, name: 'AI Pending', filters: { aiStatus: 'pending' } },
    { id: 4, name: 'Today Only', filters: { dateFrom: '2024-07-24', dateTo: '2024-07-24' } }
  ]);

  // Mock call records data
  const mockCallRecords = [
    {
      id: 'cdr-001',
      timestamp: new Date('2024-07-24T14:30:15'),
      caller: '+1-555-0123',
      callerName: 'John Smith',
      callee: '+1-555-0456',
      calleeName: 'Sarah Johnson',
      duration: 245,
      cost: 12.45,
      disposition: 'Answered',
      tenant: 'ABC Corp',
      aiStatus: 'Completed',
      callId: 'fs-call-789123',
      direction: 'Inbound',
      gateway: 'GW-001',
      codec: 'G.711',
      aiAnalysis: {
        sentiment: 'Positive',
        summary: 'Customer inquiry about product features and pricing. Positive interaction with successful resolution.',
        transcriptionAvailable: true
      }
    },
    {
      id: 'cdr-002',
      timestamp: new Date('2024-07-24T14:15:32'),
      caller: '+1-555-0789',
      callerName: 'Mike Wilson',
      callee: '+1-555-0234',
      calleeName: 'Lisa Chen',
      duration: 0,
      cost: 0.25,
      disposition: 'Failed',
      tenant: 'XYZ Ltd',
      aiStatus: 'Failed',
      callId: 'fs-call-789124',
      direction: 'Outbound',
      gateway: 'GW-002',
      codec: 'G.729',
      aiAnalysis: null
    },
    {
      id: 'cdr-003',
      timestamp: new Date('2024-07-24T13:45:18'),
      caller: '+1-555-0345',
      callerName: 'Emma Davis',
      callee: '+1-555-0678',
      calleeName: 'Robert Brown',
      duration: 567,
      cost: 28.35,
      disposition: 'Answered',
      tenant: 'Tech Solutions',
      aiStatus: 'Processing',
      callId: 'fs-call-789125',
      direction: 'Internal',
      gateway: 'GW-001',
      codec: 'G.722',
      aiAnalysis: {
        sentiment: 'Neutral',
        summary: 'Technical support call regarding system configuration. Issue escalated to senior technician.',
        transcriptionAvailable: true
      }
    },
    {
      id: 'cdr-004',
      timestamp: new Date('2024-07-24T13:20:45'),
      caller: '+1-555-0901',
      callerName: 'David Miller',
      callee: '+1-555-0567',
      calleeName: 'Jennifer Taylor',
      duration: 123,
      cost: 6.15,
      disposition: 'Busy',
      tenant: 'Global Comm',
      aiStatus: 'Pending',
      callId: 'fs-call-789126',
      direction: 'Outbound',
      gateway: 'GW-003',
      codec: 'G.711',
      aiAnalysis: null
    },
    {
      id: 'cdr-005',
      timestamp: new Date('2024-07-24T12:55:12'),
      caller: '+1-555-0432',
      callerName: 'Amanda White',
      callee: '+1-555-0876',
      calleeName: 'Kevin Anderson',
      duration: 789,
      cost: 39.45,
      disposition: 'Answered',
      tenant: 'ABC Corp',
      aiStatus: 'Completed',
      callId: 'fs-call-789127',
      direction: 'Inbound',
      gateway: 'GW-001',
      codec: 'G.711',
      aiAnalysis: {
        sentiment: 'Negative',
        summary: 'Customer complaint about service quality and billing issues. Requires follow-up action.',
        transcriptionAvailable: true
      }
    },
    {
      id: 'cdr-006',
      timestamp: new Date('2024-07-24T12:30:28'),
      caller: '+1-555-0654',
      callerName: 'Chris Garcia',
      callee: '+1-555-0321',
      calleeName: 'Michelle Lee',
      duration: 0,
      cost: 0.15,
      disposition: 'No Answer',
      tenant: 'StartupCo',
      aiStatus: 'Pending',
      callId: 'fs-call-789128',
      direction: 'Outbound',
      gateway: 'GW-002',
      codec: 'G.729',
      aiAnalysis: null
    },
    {
      id: 'cdr-007',
      timestamp: new Date('2024-07-24T11:45:33'),
      caller: '+1-555-0987',
      callerName: 'Rachel Martinez',
      callee: '+1-555-0543',
      calleeName: 'Thomas Wilson',
      duration: 456,
      cost: 22.80,
      disposition: 'Answered',
      tenant: 'XYZ Ltd',
      aiStatus: 'Completed',
      callId: 'fs-call-789129',
      direction: 'Inbound',
      gateway: 'GW-003',
      codec: 'G.722',
      aiAnalysis: {
        sentiment: 'Positive',
        summary: 'Sales inquiry about enterprise solutions. Customer expressed strong interest in premium package.',
        transcriptionAvailable: true
      }
    },
    {
      id: 'cdr-008',
      timestamp: new Date('2024-07-24T11:20:15'),
      caller: '+1-555-0765',
      callerName: 'Steven Clark',
      callee: '+1-555-0198',
      calleeName: 'Nicole Rodriguez',
      duration: 334,
      cost: 16.70,
      disposition: 'Answered',
      tenant: 'Tech Solutions',
      aiStatus: 'Processing',
      callId: 'fs-call-789130',
      direction: 'Internal',
      gateway: 'GW-001',
      codec: 'G.711',
      aiAnalysis: {
        sentiment: 'Neutral',
        summary: 'Internal coordination call about project timeline and resource allocation.',
        transcriptionAvailable: false
      }
    }
  ];

  // Mock statistics data
  const mockStats = {
    totalCalls: 2488,
    answeredCalls: 2075,
    failedCalls: 413,
    totalCost: 12503.45,
    avgCostPerCall: 5.02,
    todayCalls: 187,
    aiPending: 234,
    highCostCalls: 56
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleRecordSelect = (recordId) => {
    setSelectedRecords(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleBulkSelect = (recordIds) => {
    setSelectedRecords(recordIds);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSavePreset = (name, filterData) => {
    console.log('Saving preset:', name, filterData);
    // In a real app, this would save to backend
  };

  const handleLoadPreset = (preset) => {
    setFilters({ ...filters, ...preset.filters });
  };

  const handleExport = (format, columns, selectedIds) => {
    console.log('Exporting:', { format, columns, selectedIds });
    // In a real app, this would trigger export process
  };

  const handleBulkAction = (actionId, recordIds) => {
    console.log('Bulk action:', actionId, recordIds);
    // In a real app, this would perform the bulk action
  };

  const handleSearch = (query) => {
    console.log('Searching:', query);
    setSearchHistory(prev => [query, ...prev.filter(item => item !== query)].slice(0, 5));
    // In a real app, this would filter records based on search
  };

  const handleAdvancedSearch = (searchFilters) => {
    console.log('Advanced search:', searchFilters);
    // In a real app, this would perform AI-powered search
  };

  const handleQuickFilter = (filterId) => {
    console.log('Quick filter:', filterId);
    // Apply quick filter based on filterId
    switch (filterId) {
      case 'today':
        setFilters(prev => ({ ...prev, dateFrom: '2024-07-24', dateTo: '2024-07-24' }));
        break;
      case 'failed':
        setFilters(prev => ({ ...prev, disposition: 'failed' }));
        break;
      case 'ai-pending':
        setFilters(prev => ({ ...prev, aiStatus: 'pending' }));
        break;
      case 'high-cost':
        setFilters(prev => ({ ...prev, minCost: '10' }));
        break;
      default:
        break;
    }
  };

  const handleClearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} pt-16`}>
        <div className={`flex ${showStatsSidebar ? 'mr-80' : ''} transition-all duration-300`}>
          <div className="flex-1 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Breadcrumb />
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={24} className="text-primary" />
                  <h1 className="text-2xl font-bold text-foreground">Call Detail Records</h1>
                </div>
                <p className="text-muted-foreground mt-1">
                  Comprehensive call analytics and historical data with AI-enhanced insights
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowStatsSidebar(!showStatsSidebar)}
                >
                  <Icon name={showStatsSidebar ? 'PanelRightClose' : 'PanelRightOpen'} size={16} className="mr-2" />
                  {showStatsSidebar ? 'Hide' : 'Show'} Stats
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              onAdvancedSearch={handleAdvancedSearch}
              searchHistory={searchHistory}
              onClearHistory={handleClearSearchHistory}
            />

            {/* Analytics Charts */}
            <CallAnalyticsCharts data={mockCallRecords} />

            {/* Filter Panel */}
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onSavePreset={handleSavePreset}
              savedPresets={savedPresets}
              onLoadPreset={handleLoadPreset}
            />

            {/* Export Toolbar */}
            <ExportToolbar
              selectedRecords={selectedRecords}
              totalRecords={mockCallRecords.length}
              onExport={handleExport}
              onBulkAction={handleBulkAction}
            />

            {/* Call Records Table */}
            <CallRecordsTable
              records={mockCallRecords}
              onRecordSelect={handleRecordSelect}
              selectedRecords={selectedRecords}
              onBulkSelect={handleBulkSelect}
            />
          </div>
        </div>

        {/* Stats Sidebar */}
        {showStatsSidebar && (
          <div className="fixed right-0 top-16 bottom-0">
            <StatsSidebar
              stats={mockStats}
              onQuickFilter={handleQuickFilter}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default CallDetailRecordsCDR;