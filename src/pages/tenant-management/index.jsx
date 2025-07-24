import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PageHeader from '../../components/ui/PageHeader';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import TenantFilters from './components/TenantFilters';
import TenantTable from './components/TenantTable';
import TenantSummaryPanel from './components/TenantSummaryPanel';
import TenantModal from './components/TenantModal';

const TenantManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'company', direction: 'asc' });
  const [modalState, setModalState] = useState({ isOpen: false, tenant: null, mode: 'view' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock tenant data
  const mockTenants = [
    {
      id: 1,
      company: "Acme Corporation",
      domain: "acme.telecom.pro",
      plan: "enterprise",
      status: "active",
      activeExtensions: 45,
      totalExtensions: 50,
      callVolume: 12847,
      aiUsage: { used: 850, quota: 1000 },
      billingEmail: "billing@acme.com",
      adminName: "John Smith",
      adminEmail: "admin@acme.com",
      features: ["voicemail", "conference", "recording", "ai_transcription"],
      pricing: {
        currency: 'USD',
        perMinuteRates: {
          local: { rate: 0.012, enabled: true, peakRate: 0.015, offPeakRate: 0.010 },
          national: { rate: 0.022, enabled: true, peakRate: 0.027, offPeakRate: 0.018 },
          international: { rate: 0.075, enabled: true, peakRate: 0.085, offPeakRate: 0.065 },
          mobile: { rate: 0.032, enabled: true, peakRate: 0.038, offPeakRate: 0.026 },
          conference: { rate: 0.040, enabled: true, peakRate: 0.050, offPeakRate: 0.032 },
          ai_transcription: { rate: 0.006, enabled: true, peakRate: 0.008, offPeakRate: 0.005 },
          ai_analysis: { rate: 0.010, enabled: false, peakRate: 0.012, offPeakRate: 0.008 }
        },
        minimumCharges: {
          local: 0.03,
          national: 0.08,
          international: 0.20,
          mobile: 0.12,
          conference: 0.15,
          ai_transcription: 0.01,
          ai_analysis: 0.03
        },
        globalMinimums: {
          perCall: 0.01,
          monthly: 50.00
        },
        pricingTiers: {
          bronze: { enabled: false, minVolume: 0, maxVolume: 1000, discount: 0 },
          silver: { enabled: false, minVolume: 1001, maxVolume: 5000, discount: 5 },
          gold: { enabled: true, minVolume: 5001, maxVolume: 15000, discount: 12 },
          platinum: { enabled: true, minVolume: 15001, maxVolume: 999999, discount: 18 }
        }
      }
    },
    {
      id: 2,
      company: "TechStart Solutions",
      domain: "techstart.telecom.pro",
      plan: "professional",
      status: "active",
      activeExtensions: 28,
      totalExtensions: 30,
      callVolume: 8934,
      aiUsage: { used: 420, quota: 500 },
      billingEmail: "finance@techstart.com",
      adminName: "Sarah Johnson",
      adminEmail: "sarah@techstart.com",
      features: ["voicemail", "conference", "ai_transcription"]
    },
    {
      id: 3,
      company: "Global Enterprises",
      domain: "global.telecom.pro",
      plan: "enterprise",
      status: "active",
      activeExtensions: 156,
      totalExtensions: 200,
      callVolume: 34521,
      aiUsage: { used: 1850, quota: 2000 },
      billingEmail: "accounts@global.com",
      adminName: "Michael Chen",
      adminEmail: "mchen@global.com",
      features: ["voicemail", "conference", "recording", "analytics", "ai_transcription", "ai_sentiment"]
    }
  ];

  // Simulate loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFilteredTenants(mockTenants);
        setError(null);
      } catch (err) {
        setError('Failed to load tenant data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFiltersChange = (filters) => {
    let filtered = [...mockTenants];

    if (filters.search) {
      filtered = filtered.filter(tenant =>
        tenant.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        tenant.domain.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.plan) {
      filtered = filtered.filter(tenant => tenant.plan === filters.plan);
    }

    if (filters.status) {
      filtered = filtered.filter(tenant => tenant.status === filters.status);
    }

    if (filters.usageThreshold) {
      filtered = filtered.filter(tenant => {
        const usagePercent = (tenant.aiUsage.used / tenant.aiUsage.quota) * 100;
        switch (filters.usageThreshold) {
          case 'low': return usagePercent < 50;
          case 'medium': return usagePercent >= 50 && usagePercent <= 80;
          case 'high': return usagePercent > 80 && usagePercent <= 100;
          case 'exceeded': return usagePercent > 100;
          default: return true;
        }
      });
    }

    setFilteredTenants(filtered);
  };

  const handleClearFilters = () => {
    setFilteredTenants(mockTenants);
  };

  const handleSelectTenant = (tenantId, checked) => {
    if (checked) {
      setSelectedTenants([...selectedTenants, tenantId]);
    } else {
      setSelectedTenants(selectedTenants.filter(id => id !== tenantId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedTenants(filteredTenants.map(tenant => tenant.id));
    } else {
      setSelectedTenants([]);
    }
  };

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...filteredTenants].sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      if (column === 'extensions') {
        aValue = a.activeExtensions;
        bValue = b.activeExtensions;
      } else if (column === 'callVolume') {
        aValue = a.callVolume;
        bValue = b.callVolume;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredTenants(sorted);
    setSortConfig({ key: column, direction });
  };

  const handleTenantAction = (action, tenant) => {
    switch (action) {
      case 'view':
        setModalState({ isOpen: true, tenant, mode: 'view' });
        break;
      case 'edit':
        setModalState({ isOpen: true, tenant, mode: 'edit' });
        break;
      case 'suspend': console.log('Suspending tenant:', tenant.company);
        break;
      case 'delete':
        console.log('Deleting tenant:', tenant.company);
        break;
      default:
        break;
    }
  };

  const handleBulkAction = (action, tenantIds) => {
    console.log(`Performing ${action} on tenants:`, tenantIds);
    setSelectedTenants([]);
  };

  const handleAddNewTenant = () => {
    setModalState({ isOpen: true, tenant: null, mode: 'create' });
  };

  const handleModalClose = () => {
    setModalState({ isOpen: false, tenant: null, mode: 'view' });
  };

  const handleModalSave = (formData) => {
    console.log('Saving tenant data:', formData);
    handleModalClose();
  };

  const helpContent = (
    <div className="space-y-3">
      <p>Manage multi-tenant telephony systems and configurations from this centralized dashboard.</p>
      <div className="space-y-2">
        <p className="font-medium">Key Features:</p>
        <ul className="text-sm space-y-1 ml-4 list-disc">
          <li>Create and configure tenant accounts</li>
          <li>Monitor extension usage and call volumes</li>
          <li>Set up custom pricing plans</li>
          <li>Track AI service utilization</li>
          <li>Manage billing and subscriptions</li>
        </ul>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
        <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
        
        <main className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-6">
            <LoadingSpinner overlay text="Loading tenant data..." />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
        <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
        
        <main className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-6">
            <EmptyState
              icon="AlertTriangle"
              title="Unable to load tenant data"
              description={error}
              action={{
                label: "Try Again",
                onClick: () => window.location.reload(),
                variant: "default",
                icon: "RefreshCw"
              }}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
              <PageHeader
                title="Tenant Management"
                description="Manage multi-tenant telephony systems and configurations with comprehensive oversight and control"
                icon="Building2"
                helpContent={helpContent}
                actions={[
                  {
                    label: "Add New Tenant",
                    onClick: handleAddNewTenant,
                    icon: "Plus",
                    variant: "default"
                  }
                ]}
              />

              <TenantFilters
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />

              {filteredTenants.length === 0 ? (
                <EmptyState
                  icon="Building2"
                  title="No tenants found"
                  description="No tenants match your current filters. Try adjusting your search criteria or add a new tenant to get started."
                  action={{
                    label: "Add First Tenant",
                    onClick: handleAddNewTenant,
                    icon: "Plus"
                  }}
                />
              ) : (
                <TenantTable
                  tenants={filteredTenants}
                  selectedTenants={selectedTenants}
                  onSelectTenant={handleSelectTenant}
                  onSelectAll={handleSelectAll}
                  onTenantAction={handleTenantAction}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                />
              )}
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-80">
              <TenantSummaryPanel
                selectedTenants={selectedTenants}
                onBulkAction={handleBulkAction}
              />
            </div>
          </div>
        </div>
      </main>

      <TenantModal
        tenant={modalState.tenant}
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        mode={modalState.mode}
      />
    </div>
  );
};

export default TenantManagement;