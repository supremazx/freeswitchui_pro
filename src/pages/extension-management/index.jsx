import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import ExtensionTable from './components/ExtensionTable';
import ExtensionModal from './components/ExtensionModal';
import ExtensionStats from './components/ExtensionStats';
import BulkOperations from './components/BulkOperations';
import ExtensionTemplates from './components/ExtensionTemplates';

const ExtensionManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState('all');
  const [selectedExtensions, setSelectedExtensions] = useState([]);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [editingExtension, setEditingExtension] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'number', direction: 'asc' });
  const [activeView, setActiveView] = useState('table');

  // Mock data
  const tenants = [
    { id: 'abc_corp', name: 'ABC Corp' },
    { id: 'xyz_ltd', name: 'XYZ Ltd' },
    { id: 'tech_solutions', name: 'Tech Solutions Inc' },
    { id: 'global_services', name: 'Global Services LLC' }
  ];

  const [extensions, setExtensions] = useState([
    {
      id: 1,
      number: '1001',
      userName: 'John Smith',
      email: 'john.smith@abccorp.com',
      tenant: 'ABC Corp',
      device: 'Softphone',
      status: 'online',
      voicemail: true,
      callForwarding: false,
      forwardingNumber: '',
      aiFeatures: true,
      recording: true,
      enabled: true,
      lastActivity: 'Outbound call',
      lastSeen: '2 minutes ago',
      hotDesking: false,
      presenceEnabled: true,
      maxConcurrentCalls: 2,
      callTimeout: 30,
      voicemailPin: '1234',
      aiTranscription: true,
      aiSentiment: true,
      aiSummary: true
    },
    {
      id: 2,
      number: '1002',
      userName: 'Sarah Johnson',
      email: 'sarah.johnson@abccorp.com',
      tenant: 'ABC Corp',
      device: 'Desk Phone',
      status: 'busy',
      voicemail: true,
      callForwarding: true,
      forwardingNumber: '+1-555-0123',
      aiFeatures: false,
      recording: false,
      enabled: true,
      lastActivity: 'Inbound call',
      lastSeen: '5 minutes ago',
      hotDesking: true,
      presenceEnabled: true,
      maxConcurrentCalls: 1,
      callTimeout: 45,
      voicemailPin: '5678'
    },
    {
      id: 3,
      number: '1003',
      userName: 'Mike Davis',
      email: 'mike.davis@xyzltd.com',
      tenant: 'XYZ Ltd',
      device: 'Mobile App',
      status: 'away',
      voicemail: true,
      callForwarding: false,
      forwardingNumber: '',
      aiFeatures: true,
      recording: true,
      enabled: true,
      lastActivity: 'Voicemail',
      lastSeen: '15 minutes ago',
      hotDesking: false,
      presenceEnabled: true,
      maxConcurrentCalls: 3,
      callTimeout: 30,
      voicemailPin: '9876',
      aiTranscription: true,
      aiSentiment: false,
      aiSummary: true
    },
    {
      id: 4,
      number: '1004',
      userName: 'Lisa Wilson',
      email: 'lisa.wilson@techsolutions.com',
      tenant: 'Tech Solutions Inc',
      device: 'WebRTC Browser',
      status: 'online',
      voicemail: false,
      callForwarding: true,
      forwardingNumber: '+1-555-0456',
      aiFeatures: true,
      recording: true,
      enabled: true,
      lastActivity: 'Conference call',
      lastSeen: '1 minute ago',
      hotDesking: true,
      presenceEnabled: true,
      maxConcurrentCalls: 5,
      callTimeout: 60,
      aiTranscription: true,
      aiSentiment: true,
      aiSummary: true
    },
    {
      id: 5,
      number: '1005',
      userName: 'Tom Brown',
      email: 'tom.brown@globalservices.com',
      tenant: 'Global Services LLC',
      device: 'Softphone',
      status: 'offline',
      voicemail: true,
      callForwarding: false,
      forwardingNumber: '',
      aiFeatures: false,
      recording: false,
      enabled: false,
      lastActivity: 'System logout',
      lastSeen: '2 hours ago',
      hotDesking: false,
      presenceEnabled: false,
      maxConcurrentCalls: 1,
      callTimeout: 30,
      voicemailPin: '4321'
    },
    {
      id: 6,
      number: '2001',
      userName: 'Conference Room A',
      email: 'conference.a@abccorp.com',
      tenant: 'ABC Corp',
      device: 'Conference System',
      status: 'online',
      voicemail: false,
      callForwarding: false,
      forwardingNumber: '',
      aiFeatures: true,
      recording: true,
      enabled: true,
      lastActivity: 'Conference session',
      lastSeen: '30 minutes ago',
      hotDesking: false,
      presenceEnabled: false,
      maxConcurrentCalls: 10,
      callTimeout: 120,
      aiTranscription: true,
      aiSentiment: false,
      aiSummary: true
    },
    {
      id: 7,
      number: '1006',
      userName: 'Emma Garcia',
      email: 'emma.garcia@xyzltd.com',
      tenant: 'XYZ Ltd',
      device: 'Softphone',
      status: 'online',
      voicemail: true,
      callForwarding: false,
      forwardingNumber: '',
      aiFeatures: true,
      recording: true,
      enabled: true,
      lastActivity: 'Customer call',
      lastSeen: '10 minutes ago',
      hotDesking: false,
      presenceEnabled: true,
      maxConcurrentCalls: 2,
      callTimeout: 30,
      voicemailPin: '7890',
      aiTranscription: true,
      aiSentiment: true,
      aiSummary: false
    },
    {
      id: 8,
      number: '1007',
      userName: 'David Lee',
      email: 'david.lee@techsolutions.com',
      tenant: 'Tech Solutions Inc',
      device: 'Desk Phone',
      status: 'busy',
      voicemail: true,
      callForwarding: true,
      forwardingNumber: '+1-555-0789',
      aiFeatures: false,
      recording: true,
      enabled: true,
      lastActivity: 'Support call',
      lastSeen: '3 minutes ago',
      hotDesking: false,
      presenceEnabled: true,
      maxConcurrentCalls: 1,
      callTimeout: 45,
      voicemailPin: '1357'
    }
  ]);

  const tenantOptions = [
    { value: 'all', label: 'All Tenants' },
    ...tenants.map(tenant => ({ value: tenant.name, label: tenant.name }))
  ];

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleEditExtension = (extension) => {
    setEditingExtension(extension);
    setShowExtensionModal(true);
  };

  const handleCreateExtension = () => {
    setEditingExtension(null);
    setShowExtensionModal(true);
  };

  const handleSaveExtension = (extensionData) => {
    if (editingExtension) {
      // Update existing extension
      setExtensions(prev => prev.map(ext => 
        ext.id === editingExtension.id 
          ? { ...ext, ...extensionData, id: editingExtension.id }
          : ext
      ));
    } else {
      // Create new extension
      const newExtension = {
        ...extensionData,
        id: Math.max(...extensions.map(e => e.id)) + 1,
        status: 'offline',
        enabled: true,
        lastActivity: 'Never',
        lastSeen: 'Never'
      };
      setExtensions(prev => [...prev, newExtension]);
    }
    setShowExtensionModal(false);
    setEditingExtension(null);
  };

  const handleToggleExtension = (extension) => {
    setExtensions(prev => prev.map(ext =>
      ext.id === extension.id
        ? { ...ext, enabled: !ext.enabled, status: ext.enabled ? 'offline' : 'online' }
        : ext
    ));
  };

  const handleCallForwarding = (extension) => {
    // Open call forwarding configuration
    console.log('Configure call forwarding for:', extension.number);
  };

  const handleBulkOperation = (operation, extensionIds, settings) => {
    setExtensions(prev => prev.map(ext => {
      if (!extensionIds.includes(ext.id)) return ext;
      
      switch (operation) {
        case 'enable':
          return { ...ext, enabled: true, status: 'online' };
        case 'disable':
          return { ...ext, enabled: false, status: 'offline' };
        case 'move_tenant':
          return { ...ext, tenant: settings.tenant };
        case 'enable_voicemail':
          return { ...ext, voicemail: true, voicemailPin: settings.voicemailPin || '0000' };
        case 'disable_voicemail':
          return { ...ext, voicemail: false };
        case 'enable_ai':
          return { 
            ...ext, 
            aiFeatures: true,
            aiTranscription: settings.aiTranscription || false,
            aiSentiment: settings.aiSentiment || false,
            aiSummary: settings.aiSummary || false
          };
        case 'disable_ai':
          return { 
            ...ext, 
            aiFeatures: false,
            aiTranscription: false,
            aiSentiment: false,
            aiSummary: false
          };
        case 'enable_recording':
          return { ...ext, recording: true };
        case 'disable_recording':
          return { ...ext, recording: false };
        case 'reset_password':
          return { ...ext, password: settings.password };
        default:
          return ext;
      }
    }));
    
    if (operation === 'delete') {
      setExtensions(prev => prev.filter(ext => !extensionIds.includes(ext.id)));
    }
    
    setSelectedExtensions([]);
  };

  const handleCreateFromTemplate = (templateData) => {
    const { template, settings } = templateData;
    const newExtensions = [];
    
    for (let i = 0; i < settings.count; i++) {
      const extensionNumber = (parseInt(settings.startingNumber) + i).toString();
      const userName = `${settings.namePrefix || 'User'} ${i + 1}`;
      const email = settings.emailDomain 
        ? `${(settings.namePrefix || 'user').toLowerCase()}${i + 1}@${settings.emailDomain}`
        : `${(settings.namePrefix || 'user').toLowerCase()}${i + 1}@example.com`;
      
      const newExtension = {
        id: Math.max(...extensions.map(e => e.id)) + i + 1,
        number: extensionNumber,
        userName,
        email,
        tenant: tenants.find(t => t.id === settings.tenant)?.name || settings.tenant,
        device: 'Softphone',
        status: 'offline',
        enabled: true,
        lastActivity: 'Never',
        lastSeen: 'Never',
        ...template.features
      };
      
      newExtensions.push(newExtension);
    }
    
    setExtensions(prev => [...prev, ...newExtensions]);
  };

  // Sort extensions
  const sortedExtensions = React.useMemo(() => {
    const sorted = [...extensions].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    return selectedTenant === 'all' 
      ? sorted 
      : sorted.filter(ext => ext.tenant === selectedTenant);
  }, [extensions, sortConfig, selectedTenant]);

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} pt-16`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Extension Management</h1>
              <p className="text-muted-foreground mt-2">
                Manage user extensions, features, and configurations across all tenants
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Select
                options={tenantOptions}
                value={selectedTenant}
                onChange={setSelectedTenant}
                className="w-48"
              />
              <Button
                variant="outline"
                onClick={() => setActiveView(activeView === 'table' ? 'stats' : 'table')}
              >
                <Icon name={activeView === 'table' ? 'BarChart3' : 'Table'} size={16} className="mr-2" />
                {activeView === 'table' ? 'Statistics' : 'Table View'}
              </Button>
              <Button onClick={handleCreateExtension}>
                <Icon name="Plus" size={16} className="mr-2" />
                Add Extension
              </Button>
            </div>
          </div>

          {/* View Toggle Tabs */}
          <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveView('table')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'table' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Table" size={16} className="mr-2 inline" />
              Extensions
            </button>
            <button
              onClick={() => setActiveView('stats')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'stats' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="BarChart3" size={16} className="mr-2 inline" />
              Statistics
            </button>
            <button
              onClick={() => setActiveView('templates')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'templates' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Layout" size={16} className="mr-2 inline" />
              Templates
            </button>
          </div>

          {/* Content based on active view */}
          {activeView === 'table' && (
            <div className="space-y-6">
              {/* Bulk Operations */}
              <BulkOperations
                selectedExtensions={selectedExtensions}
                onBulkOperation={handleBulkOperation}
                extensions={extensions}
                tenants={tenants}
              />

              {/* Extensions Table */}
              <ExtensionTable
                extensions={sortedExtensions}
                selectedExtensions={selectedExtensions}
                onSelectionChange={setSelectedExtensions}
                onEditExtension={handleEditExtension}
                onToggleExtension={handleToggleExtension}
                onCallForwarding={handleCallForwarding}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </div>
          )}

          {activeView === 'stats' && (
            <ExtensionStats
              extensions={extensions}
              selectedTenant={selectedTenant}
            />
          )}

          {activeView === 'templates' && (
            <ExtensionTemplates
              onCreateFromTemplate={handleCreateFromTemplate}
              tenants={tenants}
            />
          )}
        </div>
      </main>

      {/* Extension Modal */}
      <ExtensionModal
        isOpen={showExtensionModal}
        onClose={() => {
          setShowExtensionModal(false);
          setEditingExtension(null);
        }}
        extension={editingExtension}
        onSave={handleSaveExtension}
        tenants={tenants}
      />
    </div>
  );
};

export default ExtensionManagement;