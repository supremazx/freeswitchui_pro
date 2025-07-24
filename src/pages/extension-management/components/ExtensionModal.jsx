import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExtensionModal = ({ isOpen, onClose, extension, onSave, tenants }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    number: '',
    userName: '',
    email: '',
    password: '',
    tenant: '',
    device: 'softphone',
    voicemail: false,
    callForwarding: false,
    forwardingNumber: '',
    aiFeatures: false,
    recording: false,
    hotDesking: false,
    presenceEnabled: true,
    maxConcurrentCalls: 1,
    callTimeout: 30,
    voicemailPin: '',
    aiTranscription: false,
    aiSentiment: false,
    aiSummary: false,
    customRouting: false,
    routingRules: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (extension) {
      setFormData({
        number: extension.number || '',
        userName: extension.userName || '',
        email: extension.email || '',
        password: '',
        tenant: extension.tenant || '',
        device: extension.device || 'softphone',
        voicemail: extension.voicemail || false,
        callForwarding: extension.callForwarding || false,
        forwardingNumber: extension.forwardingNumber || '',
        aiFeatures: extension.aiFeatures || false,
        recording: extension.recording || false,
        hotDesking: extension.hotDesking || false,
        presenceEnabled: extension.presenceEnabled !== false,
        maxConcurrentCalls: extension.maxConcurrentCalls || 1,
        callTimeout: extension.callTimeout || 30,
        voicemailPin: extension.voicemailPin || '',
        aiTranscription: extension.aiTranscription || false,
        aiSentiment: extension.aiSentiment || false,
        aiSummary: extension.aiSummary || false,
        customRouting: extension.customRouting || false,
        routingRules: extension.routingRules || []
      });
    } else {
      setFormData({
        number: '',
        userName: '',
        email: '',
        password: '',
        tenant: '',
        device: 'softphone',
        voicemail: false,
        callForwarding: false,
        forwardingNumber: '',
        aiFeatures: false,
        recording: false,
        hotDesking: false,
        presenceEnabled: true,
        maxConcurrentCalls: 1,
        callTimeout: 30,
        voicemailPin: '',
        aiTranscription: false,
        aiSentiment: false,
        aiSummary: false,
        customRouting: false,
        routingRules: []
      });
    }
    setErrors({});
  }, [extension, isOpen]);

  const deviceOptions = [
    { value: 'softphone', label: 'Softphone' },
    { value: 'desk_phone', label: 'Desk Phone' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'webrtc', label: 'WebRTC Browser' }
  ];

  const tenantOptions = tenants.map(tenant => ({
    value: tenant.id,
    label: tenant.name
  }));

  const tabs = [
    { id: 'basic', label: 'Basic Settings', icon: 'User' },
    { id: 'features', label: 'Features', icon: 'Settings' },
    { id: 'ai', label: 'AI Services', icon: 'Brain' },
    { id: 'routing', label: 'Call Routing', icon: 'Route' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.number.trim()) {
      newErrors.number = 'Extension number is required';
    } else if (!/^\d{3,5}$/.test(formData.number)) {
      newErrors.number = 'Extension must be 3-5 digits';
    }

    if (!formData.userName.trim()) {
      newErrors.userName = 'User name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!extension && !formData.password.trim()) {
      newErrors.password = 'Password is required for new extensions';
    }

    if (!formData.tenant) {
      newErrors.tenant = 'Tenant selection is required';
    }

    if (formData.callForwarding && !formData.forwardingNumber.trim()) {
      newErrors.forwardingNumber = 'Forwarding number is required when call forwarding is enabled';
    }

    if (formData.voicemail && !formData.voicemailPin.trim()) {
      newErrors.voicemailPin = 'Voicemail PIN is required when voicemail is enabled';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1002 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {extension ? 'Edit Extension' : 'Create Extension'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {extension ? `Modify settings for extension ${extension.number}` : 'Configure a new extension'}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-0 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Basic Settings Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Extension Number"
                  type="text"
                  placeholder="e.g., 1001"
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  error={errors.number}
                  required
                />
                <Select
                  label="Tenant"
                  options={tenantOptions}
                  value={formData.tenant}
                  onChange={(value) => handleInputChange('tenant', value)}
                  error={errors.tenant}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="User Name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  error={errors.userName}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john.doe@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label={extension ? "New Password (leave blank to keep current)" : "Password"}
                  type="password"
                  placeholder="Enter secure password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  required={!extension}
                />
                <Select
                  label="Device Type"
                  options={deviceOptions}
                  value={formData.device}
                  onChange={(value) => handleInputChange('device', value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Max Concurrent Calls"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.maxConcurrentCalls}
                  onChange={(e) => handleInputChange('maxConcurrentCalls', parseInt(e.target.value))}
                />
                <Input
                  label="Call Timeout (seconds)"
                  type="number"
                  min="10"
                  max="120"
                  value={formData.callTimeout}
                  onChange={(e) => handleInputChange('callTimeout', parseInt(e.target.value))}
                />
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Checkbox
                    label="Voicemail"
                    description="Enable voicemail for this extension"
                    checked={formData.voicemail}
                    onChange={(e) => handleInputChange('voicemail', e.target.checked)}
                  />
                  {formData.voicemail && (
                    <Input
                      label="Voicemail PIN"
                      type="password"
                      placeholder="4-digit PIN"
                      value={formData.voicemailPin}
                      onChange={(e) => handleInputChange('voicemailPin', e.target.value)}
                      error={errors.voicemailPin}
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <Checkbox
                    label="Call Forwarding"
                    description="Enable call forwarding options"
                    checked={formData.callForwarding}
                    onChange={(e) => handleInputChange('callForwarding', e.target.checked)}
                  />
                  {formData.callForwarding && (
                    <Input
                      label="Forwarding Number"
                      type="tel"
                      placeholder="+1234567890"
                      value={formData.forwardingNumber}
                      onChange={(e) => handleInputChange('forwardingNumber', e.target.value)}
                      error={errors.forwardingNumber}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Checkbox
                  label="Call Recording"
                  description="Automatically record all calls"
                  checked={formData.recording}
                  onChange={(e) => handleInputChange('recording', e.target.checked)}
                />
                <Checkbox
                  label="Hot Desking"
                  description="Allow login from any device"
                  checked={formData.hotDesking}
                  onChange={(e) => handleInputChange('hotDesking', e.target.checked)}
                />
              </div>

              <Checkbox
                label="Presence Management"
                description="Enable presence status updates"
                checked={formData.presenceEnabled}
                onChange={(e) => handleInputChange('presenceEnabled', e.target.checked)}
              />
            </div>
          )}

          {/* AI Services Tab */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Brain" size={16} className="text-accent" />
                  <h3 className="font-medium text-foreground">AI Features</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable AI-powered features for enhanced communication capabilities
                </p>
              </div>

              <Checkbox
                label="Enable AI Features"
                description="Master switch for all AI capabilities"
                checked={formData.aiFeatures}
                onChange={(e) => handleInputChange('aiFeatures', e.target.checked)}
              />

              {formData.aiFeatures && (
                <div className="ml-6 space-y-4 border-l-2 border-accent/20 pl-6">
                  <Checkbox
                    label="Real-time Transcription"
                    description="Convert speech to text during calls"
                    checked={formData.aiTranscription}
                    onChange={(e) => handleInputChange('aiTranscription', e.target.checked)}
                  />
                  
                  <Checkbox
                    label="Sentiment Analysis"
                    description="Analyze emotional tone of conversations"
                    checked={formData.aiSentiment}
                    onChange={(e) => handleInputChange('aiSentiment', e.target.checked)}
                  />
                  
                  <Checkbox
                    label="Call Summarization"
                    description="Generate automatic call summaries"
                    checked={formData.aiSummary}
                    onChange={(e) => handleInputChange('aiSummary', e.target.checked)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Call Routing Tab */}
          {activeTab === 'routing' && (
            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Route" size={16} className="text-primary" />
                  <h3 className="font-medium text-foreground">Call Routing Rules</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Configure custom routing behavior for incoming calls
                </p>
              </div>

              <Checkbox
                label="Enable Custom Routing"
                description="Use custom rules instead of default routing"
                checked={formData.customRouting}
                onChange={(e) => handleInputChange('customRouting', e.target.checked)}
              />

              {formData.customRouting && (
                <div className="ml-6 space-y-4 border-l-2 border-primary/20 pl-6">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">Time-based Routing</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Route calls differently based on time of day
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Business Hours Start"
                        type="time"
                        value="09:00"
                        onChange={() => {}}
                      />
                      <Input
                        label="Business Hours End"
                        type="time"
                        value="17:00"
                        onChange={() => {}}
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">Caller ID Routing</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Route calls based on caller identification
                    </p>
                    <Input
                      label="VIP Numbers (comma-separated)"
                      type="text"
                      placeholder="+1234567890, +0987654321"
                      value=""
                      onChange={() => {}}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {extension ? 'Update Extension' : 'Create Extension'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionModal;