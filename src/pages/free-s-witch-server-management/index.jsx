import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ServerCard from './components/ServerCard';
import ServerDetailsModal from './components/ServerDetailsModal';
import ServerFilters from './components/ServerFilters';
import ServerStats from './components/ServerStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FreeSwitchServerManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStatsPanel, setShowStatsPanel] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    location: 'all'
  });

  // Mock server data
  const [servers] = useState([
    {
      id: 'fs-01',
      name: 'FreeSWITCH-Primary-01',
      location: 'US East (Virginia)',
      ipAddress: '10.0.1.100',
      status: 'healthy',
      cpuUsage: 45,
      memoryUsage: 62,
      activeCalls: 89,
      registeredUsers: 1247,
      uptime: 168,
      tenantCount: 12,
      version: 'v1.10.7'
    },
    {
      id: 'fs-02',
      name: 'FreeSWITCH-Primary-02',
      location: 'US East (Virginia)',
      ipAddress: '10.0.1.101',
      status: 'healthy',
      cpuUsage: 38,
      memoryUsage: 55,
      activeCalls: 67,
      registeredUsers: 892,
      uptime: 145,
      tenantCount: 8,
      version: 'v1.10.7'
    },
    {
      id: 'fs-03',
      name: 'FreeSWITCH-West-01',
      location: 'US West (Oregon)',
      ipAddress: '10.0.2.100',
      status: 'warning',
      cpuUsage: 78,
      memoryUsage: 84,
      activeCalls: 156,
      registeredUsers: 2134,
      uptime: 72,
      tenantCount: 18,
      version: 'v1.10.6'
    },
    {
      id: 'fs-04',
      name: 'FreeSWITCH-West-02',
      location: 'US West (Oregon)',
      ipAddress: '10.0.2.101',
      status: 'healthy',
      cpuUsage: 52,
      memoryUsage: 68,
      activeCalls: 91,
      registeredUsers: 1456,
      uptime: 96,
      tenantCount: 14,
      version: 'v1.10.7'
    },
    {
      id: 'fs-05',
      name: 'FreeSWITCH-EU-01',
      location: 'EU West (Ireland)',
      ipAddress: '10.0.3.100',
      status: 'healthy',
      cpuUsage: 41,
      memoryUsage: 59,
      activeCalls: 73,
      registeredUsers: 1089,
      uptime: 120,
      tenantCount: 11,
      version: 'v1.10.7'
    },
    {
      id: 'fs-06',
      name: 'FreeSWITCH-EU-02',
      location: 'EU West (Ireland)',
      ipAddress: '10.0.3.101',
      status: 'warning',
      cpuUsage: 69,
      memoryUsage: 76,
      activeCalls: 134,
      registeredUsers: 1823,
      uptime: 48,
      tenantCount: 16,
      version: 'v1.10.6'
    },
    {
      id: 'fs-07',
      name: 'FreeSWITCH-APAC-01',
      location: 'Asia Pacific (Singapore)',
      ipAddress: '10.0.4.100',
      status: 'critical',
      cpuUsage: 92,
      memoryUsage: 95,
      activeCalls: 203,
      registeredUsers: 2567,
      uptime: 24,
      tenantCount: 22,
      version: 'v1.10.5'
    },
    {
      id: 'fs-08',
      name: 'FreeSWITCH-APAC-02',
      location: 'Asia Pacific (Singapore)',
      ipAddress: '10.0.4.101',
      status: 'offline',
      cpuUsage: 0,
      memoryUsage: 0,
      activeCalls: 0,
      registeredUsers: 0,
      uptime: 0,
      tenantCount: 0,
      version: 'v1.10.7'
    }
  ]);

  // Filter servers based on current filters
  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         server.location.toLowerCase().includes(filters.search.toLowerCase()) ||
                         server.ipAddress.includes(filters.search);
    const matchesStatus = filters.status === 'all' || server.status === filters.status;
    const matchesLocation = filters.location === 'all' || server.location.includes(filters.location);
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const handleViewDetails = (server) => {
    setSelectedServer(server);
    setShowDetailsModal(true);
  };

  const handleToggleStatus = (server) => {
    // Handle server actions menu
    console.log('Toggle status for server:', server.id);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action);
    // Handle bulk operations
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real application, this would update server data via WebSocket
      console.log('Real-time update simulation');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} pt-16`}>
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">FreeSWITCH Server Management</h1>
                <p className="text-muted-foreground">
                  Monitor and manage your FreeSWITCH telephony infrastructure across all deployments
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <Button
                  variant={showStatsPanel ? "default" : "outline"}
                  onClick={() => setShowStatsPanel(!showStatsPanel)}
                  className="flex items-center space-x-2"
                >
                  <Icon name="BarChart3" size={16} />
                  <span>Statistics</span>
                </Button>
                
                <Button variant="outline" className="flex items-center space-x-2">
                  <Icon name="RefreshCw" size={16} />
                  <span>Refresh</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className={`${showStatsPanel ? 'xl:col-span-3' : 'xl:col-span-4'}`}>
                {/* Filters */}
                <ServerFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onBulkAction={handleBulkAction}
                />

                {/* Server Grid */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">
                      Server Infrastructure ({filteredServers.length} servers)
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span>Live monitoring active</span>
                    </div>
                  </div>

                  {filteredServers.length === 0 ? (
                    <div className="bg-card border border-border rounded-lg p-12 text-center">
                      <Icon name="Server" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No servers found</h3>
                      <p className="text-muted-foreground mb-4">
                        No servers match your current filter criteria.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setFilters({ search: '', status: 'all', location: 'all' })}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                      {filteredServers.map((server) => (
                        <ServerCard
                          key={server.id}
                          server={server}
                          onViewDetails={handleViewDetails}
                          onToggleStatus={handleToggleStatus}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Panel */}
              {showStatsPanel && (
                <div className="xl:col-span-1">
                  <ServerStats servers={servers} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Server Details Modal */}
      <ServerDetailsModal
        server={selectedServer}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedServer(null);
        }}
      />
    </div>
  );
};

export default FreeSwitchServerManagement;