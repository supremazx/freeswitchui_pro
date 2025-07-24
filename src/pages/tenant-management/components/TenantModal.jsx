import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import PricingConfiguration from './PricingConfiguration';
import useClickOutside from '../../../hooks/useClickOutside';

const TenantModal = ({ tenant, isOpen, onClose, onSave, mode = 'view' }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    company: tenant?.company || '',
    domain: tenant?.domain || '',
    plan: tenant?.plan || 'starter',
    status: tenant?.status || 'active',
    maxExtensions: tenant?.totalExtensions || 50,
    aiQuota: tenant?.aiUsage?.quota || 1000,
    billingEmail: tenant?.billingEmail || '',
    adminName: tenant?.adminName || '',
    adminEmail: tenant?.adminEmail || '',
    features: tenant?.features || [],
    pricing: tenant?.pricing || {
      currency: 'USD',
      perMinuteRates: {
        local: { rate: 0.015, enabled: true, peakRate: 0.018, offPeakRate: 0.012 },
        national: { rate: 0.025, enabled: true, peakRate: 0.030, offPeakRate: 0.020 },
        international: { rate: 0.085, enabled: true, peakRate: 0.095, offPeakRate: 0.075 },
        mobile: { rate: 0.035, enabled: true, peakRate: 0.042, offPeakRate: 0.028 },
        conference: { rate: 0.045, enabled: true, peakRate: 0.055, offPeakRate: 0.035 },
        ai_transcription: { rate: 0.008, enabled: false, peakRate: 0.010, offPeakRate: 0.006 },
        ai_analysis: { rate: 0.012, enabled: false, peakRate: 0.015, offPeakRate: 0.009 }
      },
      minimumCharges: {
        local: 0.05,
        national: 0.10,
        international: 0.25,
        mobile: 0.15,
        conference: 0.20,
        ai_transcription: 0.02,
        ai_analysis: 0.05
      },
      globalMinimums: {
        perCall: 0.01,
        monthly: 25.00
      },
      pricingTiers: {
        bronze: { enabled: true, minVolume: 0, maxVolume: 1000, discount: 0 },
        silver: { enabled: true, minVolume: 1001, maxVolume: 5000, discount: 5 },
        gold: { enabled: true, minVolume: 5001, maxVolume: 15000, discount: 10 },
        platinum: { enabled: true, minVolume: 15001, maxVolume: 999999, discount: 15 }
      },
      billingCycle: {
        frequency: 'monthly',
        paymentTerms: 30
      },
      rateCalculation: {
        increment: '6',
        precision: '3'
      },
      specialConditions: {
        connectionFee: { enabled: false, amount: 0 },
        weekendRates: false,
        volumeCommitments: false
      }
    }
  });

  // Click outside handler for modal backdrop
  const modalRef = useClickOutside(
    () => {
      // Only close if clicking on the backdrop, not the modal content
      onClose();
    },
    isOpen
  );

  const tabs = [
    { id: 'general', label: 'General Settings', icon: 'Settings' },
    { id: 'pricing', label: 'Pricing & Rates', icon: 'DollarSign' },
    { id: 'ai', label: 'AI Services', icon: 'Brain' },
    { id: 'billing', label: 'Billing', icon: 'CreditCard' },
    { id: 'users', label: 'User Management', icon: 'Users' }
  ];

  const planOptions = [
    { value: 'starter', label: 'Starter Plan' },
    { value: 'professional', label: 'Professional Plan' },
    { value: 'enterprise', label: 'Enterprise Plan' },
    { value: 'custom', label: 'Custom Plan' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'trial', label: 'Trial' },
    { value: 'expired', label: 'Expired' }
  ];

  const featureOptions = [
    { id: 'voicemail', label: 'Voicemail System' },
    { id: 'conference', label: 'Conference Rooms' },
    { id: 'recording', label: 'Call Recording' },
    { id: 'analytics', label: 'Advanced Analytics' },
    { id: 'ai_transcription', label: 'AI Transcription' },
    { id: 'ai_sentiment', label: 'Sentiment Analysis' },
    { id: 'webrtc', label: 'WebRTC Support' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (featureId, checked) => {
    setFormData(prev => ({
      ...prev,
      features: checked
        ? [...prev.features, featureId]
        : prev.features.filter(f => f !== featureId)
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company Name"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          required
          disabled={mode === 'view'}
        />
        <Input
          label="Domain"
          value={formData.domain}
          onChange={(e) => handleInputChange('domain', e.target.value)}
          placeholder="company.example.com"
          disabled={mode === 'view'}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Subscription Plan"
          options={planOptions}
          value={formData.plan}
          onChange={(value) => handleInputChange('plan', value)}
          disabled={mode === 'view'}
        />
        <Select
          label="Status"
          options={statusOptions}
          value={formData.status}
          onChange={(value) => handleInputChange('status', value)}
          disabled={mode === 'view'}
        />
      </div>

      <Input
        label="Maximum Extensions"
        type="number"
        value={formData.maxExtensions}
        onChange={(e) => handleInputChange('maxExtensions', parseInt(e.target.value))}
        min="1"
        max="10000"
        disabled={mode === 'view'}
      />

      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Available Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {featureOptions.map((feature) => (
            <Checkbox
              key={feature.id}
              label={feature.label}
              checked={formData.features.includes(feature.id)}
              onChange={(e) => handleFeatureToggle(feature.id, e.target.checked)}
              disabled={mode === 'view'}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderAITab = () => (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2">AI Usage Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{tenant?.aiUsage?.used || 0}</div>
            <div className="text-xs text-muted-foreground">Minutes Used</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{formData.aiQuota}</div>
            <div className="text-xs text-muted-foreground">Monthly Quota</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {formData.aiQuota - (tenant?.aiUsage?.used || 0)}
            </div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
        </div>
      </div>

      <Input
        label="AI Processing Quota (minutes/month)"
        type="number"
        value={formData.aiQuota}
        onChange={(e) => handleInputChange('aiQuota', parseInt(e.target.value))}
        min="0"
        max="100000"
        disabled={mode === 'view'}
        description="Monthly limit for AI transcription and processing services"
      />

      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">AI Service Configuration</h4>
        <div className="space-y-3">
          <Checkbox
            label="Real-time Transcription"
            checked={formData.features.includes('ai_transcription')}
            onChange={(e) => handleFeatureToggle('ai_transcription', e.target.checked)}
            disabled={mode === 'view'}
            description="Enable live call transcription services"
          />
          <Checkbox
            label="Sentiment Analysis"
            checked={formData.features.includes('ai_sentiment')}
            onChange={(e) => handleFeatureToggle('ai_sentiment', e.target.checked)}
            disabled={mode === 'view'}
            description="Analyze customer sentiment during calls"
          />
          <Checkbox
            label="Call Summarization"
            checked={formData.features.includes('ai_summary')}
            onChange={(e) => handleFeatureToggle('ai_summary', e.target.checked)}
            disabled={mode === 'view'}
            description="Generate automatic call summaries"
          />
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Billing Email"
          type="email"
          value={formData.billingEmail}
          onChange={(e) => handleInputChange('billingEmail', e.target.value)}
          disabled={mode === 'view'}
        />
        <Input
          label="Billing Cycle"
          value="Monthly"
          disabled
          description="Billing frequency cannot be changed"
        />
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Current Month Usage</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Base Subscription</div>
            <div className="text-lg font-semibold text-foreground">$149.00</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">AI Services</div>
            <div className="text-lg font-semibold text-foreground">$24.50</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Additional Extensions</div>
            <div className="text-lg font-semibold text-foreground">$15.00</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Estimated</div>
            <div className="text-lg font-semibold text-primary">$188.50</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Payment History</h4>
        <div className="space-y-2">
          {[
            { date: '2025-01-01', amount: '$149.00', status: 'paid' },
            { date: '2024-12-01', amount: '$149.00', status: 'paid' },
            { date: '2024-11-01', amount: '$149.00', status: 'paid' }
          ].map((payment, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <div className="text-sm font-medium text-foreground">{payment.date}</div>
                <div className="text-xs text-muted-foreground">Monthly subscription</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{payment.amount}</div>
                <div className="text-xs text-success">Paid</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Admin Name"
          value={formData.adminName}
          onChange={(e) => handleInputChange('adminName', e.target.value)}
          disabled={mode === 'view'}
        />
        <Input
          label="Admin Email"
          type="email"
          value={formData.adminEmail}
          onChange={(e) => handleInputChange('adminEmail', e.target.value)}
          disabled={mode === 'view'}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-foreground">Extension Users</h4>
          {mode !== 'view' && (
            <Button variant="outline" size="sm" iconName="Plus">
              Add User
            </Button>
          )}
        </div>
        
        <div className="space-y-2">
          {[
            { name: 'John Smith', email: 'john@company.com', extension: '1001', role: 'Admin' },
            { name: 'Sarah Johnson', email: 'sarah@company.com', extension: '1002', role: 'User' },
            { name: 'Mike Wilson', email: 'mike@company.com', extension: '1003', role: 'User' }
          ].map((user, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">Ext. {user.extension}</div>
                <div className="text-xs text-muted-foreground">{user.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPricingTab = () => (
    <div className="h-full">
      <PricingConfiguration
        pricingData={formData.pricing}
        onChange={(updatedPricing) => handleInputChange('pricing', updatedPricing)}
        disabled={mode === 'view'}
      />
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralTab();
      case 'pricing': return renderPricingTab();
      case 'ai': return renderAITab();
      case 'billing': return renderBillingTab();
      case 'users': return renderUsersTab();
      default: return renderGeneralTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1002 p-4" ref={modalRef}>
      <div 
        className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={handleModalContentClick}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === 'create' ? 'Add New Tenant' : 
               mode === 'edit' ? 'Edit Tenant' : 'Tenant Details'}
            </h2>
            {tenant && (
              <p className="text-sm text-muted-foreground mt-1">
                {tenant.company} - {tenant.domain}
              </p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="flex h-[calc(90vh-140px)]">
          {/* Tabs Sidebar */}
          <div className="w-64 border-r border-border p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {mode !== 'view' && (
            <Button onClick={handleSave}>
              {mode === 'create' ? 'Create Tenant' : 'Save Changes'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantModal;