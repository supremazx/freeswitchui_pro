import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import KPICard from '../dashboard/components/KPICard';
import RevenueChart from './components/RevenueChart';
import TenantBillingChart from './components/TenantBillingChart';
import BillingActivityFeed from './components/BillingActivityFeed';
import BillingAlerts from './components/BillingAlerts';
import PaymentProcessingPanel from './components/PaymentProcessingPanel';
import InvoiceManagementPanel from './components/InvoiceManagementPanel';

const BillingDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [billingData, setBillingData] = useState({
    monthlyRecurringRevenue: 127500,
    outstandingInvoices: 23,
    paymentSuccessRate: 98.2,
    usageCharges: 42300
  });

  // Simulate real-time billing updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBillingData(prev => ({
        ...prev,
        monthlyRecurringRevenue: prev.monthlyRecurringRevenue + Math.floor(Math.random() * 1000) - 500,
        paymentSuccessRate: Math.min(100, Math.max(95, prev.paymentSuccessRate + (Math.random() * 0.4 - 0.2))),
        usageCharges: prev.usageCharges + Math.floor(Math.random() * 200) - 100
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const financialKPIs = [
    {
      title: 'Monthly Revenue',
      value: `$${(billingData.monthlyRecurringRevenue / 1000).toFixed(1)}K`,
      change: '+8.3%',
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'success'
    },
    {
      title: 'Outstanding Invoices',
      value: billingData.outstandingInvoices.toString(),
      change: '-12%',
      changeType: 'decrease',
      icon: 'FileText',
      color: 'warning'
    },
    {
      title: 'Payment Success Rate',
      value: `${billingData.paymentSuccessRate.toFixed(1)}%`,
      change: '+0.8%',
      changeType: 'increase',
      icon: 'CheckCircle',
      color: 'primary'
    },
    {
      title: 'Usage Charges',
      value: `$${(billingData.usageCharges / 1000).toFixed(1)}K`,
      change: '+15.2%',
      changeType: 'increase',
      icon: 'Activity',
      color: 'accent'
    }
  ];

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Billing Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive financial oversight and revenue management across all tenant accounts
            </p>
          </div>

          {/* Financial KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {financialKPIs.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={kpi.icon}
                color={kpi.color}
              />
            ))}
          </div>

          {/* Revenue Analytics Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <RevenueChart />
            <TenantBillingChart />
          </div>

          {/* Main Content Grid - Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {/* Billing Activity Feed */}
            <div className="lg:col-span-1 xl:col-span-1">
              <BillingActivityFeed />
            </div>

            {/* Payment Processing Panel */}
            <div className="lg:col-span-1 xl:col-span-1">
              <PaymentProcessingPanel />
            </div>

            {/* Billing Alerts & Quick Actions */}
            <div className="lg:col-span-2 xl:col-span-1">
              <BillingAlerts />
            </div>
          </div>

          {/* Invoice Management Panel */}
          <div className="mb-8">
            <InvoiceManagementPanel />
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} FreeSwitchUI Pro - Billing & Revenue Management
              </p>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <span className="text-sm text-muted-foreground">Last billing sync:</span>
                <span className="text-sm font-medium text-foreground">
                  {new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillingDashboard;