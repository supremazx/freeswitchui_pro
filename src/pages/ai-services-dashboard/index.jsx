import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import UsageAnalyticsCard from './components/UsageAnalyticsCard';
import ProcessingQueuePanel from './components/ProcessingQueuePanel';
import ModelConfigurationPanel from './components/ModelConfigurationPanel';
import ServiceHealthMonitor from './components/ServiceHealthMonitor';
import AIServicesSidebar from './components/AIServicesSidebar';
import AIAPIConfigurationPanel from './components/AIAPIConfigurationPanel';

const AIServicesDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">AI Services Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Monitor and configure speech-to-text, text-to-speech, and LLM integration across all tenant communications
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">All Services Operational</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Usage Analytics */}
              <UsageAnalyticsCard />
              
              {/* AI API Configuration Panel */}
              <AIAPIConfigurationPanel />
              
              {/* Processing Queue */}
              <ProcessingQueuePanel />
              
              {/* Model Configuration */}
              <ModelConfigurationPanel />
              
              {/* Service Health Monitor */}
              <ServiceHealthMonitor />
            </div>

            {/* Right Column - Sidebar */}
            <div className="xl:col-span-1">
              <AIServicesSidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIServicesDashboard;