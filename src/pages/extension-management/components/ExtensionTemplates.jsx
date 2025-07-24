import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const ExtensionTemplates = ({ onCreateFromTemplate, tenants }) => {
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateSettings, setTemplateSettings] = useState({
    startingNumber: '',
    count: 1,
    tenant: '',
    namePrefix: '',
    emailDomain: '',
    password: ''
  });

  const templates = [
    {
      id: 'basic_user',
      name: 'Basic User',
      description: 'Standard extension with basic calling features',
      icon: 'User',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      features: {
        voicemail: true,
        callForwarding: false,
        aiFeatures: false,
        recording: false,
        hotDesking: false,
        presenceEnabled: true,
        maxConcurrentCalls: 1
      }
    },
    {
      id: 'power_user',
      name: 'Power User',
      description: 'Advanced extension with enhanced features',
      icon: 'Crown',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      features: {
        voicemail: true,
        callForwarding: true,
        aiFeatures: false,
        recording: true,
        hotDesking: true,
        presenceEnabled: true,
        maxConcurrentCalls: 3
      }
    },
    {
      id: 'ai_enhanced',
      name: 'AI Enhanced',
      description: 'Extension with full AI capabilities',
      icon: 'Brain',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      features: {
        voicemail: true,
        callForwarding: true,
        aiFeatures: true,
        aiTranscription: true,
        aiSentiment: true,
        aiSummary: true,
        recording: true,
        hotDesking: true,
        presenceEnabled: true,
        maxConcurrentCalls: 2
      }
    },
    {
      id: 'call_center',
      name: 'Call Center Agent',
      description: 'Optimized for call center operations',
      icon: 'Headphones',
      color: 'text-success',
      bgColor: 'bg-success/10',
      features: {
        voicemail: false,
        callForwarding: false,
        aiFeatures: true,
        aiTranscription: true,
        aiSentiment: true,
        recording: true,
        hotDesking: true,
        presenceEnabled: true,
        maxConcurrentCalls: 1
      }
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Premium features for executives',
      icon: 'Briefcase',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      features: {
        voicemail: true,
        callForwarding: true,
        aiFeatures: true,
        aiTranscription: true,
        aiSentiment: true,
        aiSummary: true,
        recording: true,
        hotDesking: false,
        presenceEnabled: true,
        maxConcurrentCalls: 5
      }
    },
    {
      id: 'conference_room',
      name: 'Conference Room',
      description: 'Dedicated conference room extension',
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      features: {
        voicemail: false,
        callForwarding: false,
        aiFeatures: true,
        aiTranscription: true,
        recording: true,
        hotDesking: false,
        presenceEnabled: false,
        maxConcurrentCalls: 10
      }
    }
  ];

  const tenantOptions = tenants.map(tenant => ({
    value: tenant.id,
    label: tenant.name
  }));

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowTemplateModal(true);
  };

  const handleCreateFromTemplate = () => {
    const extensionData = {
      template: selectedTemplate,
      settings: templateSettings
    };
    onCreateFromTemplate(extensionData);
    setShowTemplateModal(false);
    setSelectedTemplate(null);
    setTemplateSettings({
      startingNumber: '',
      count: 1,
      tenant: '',
      namePrefix: '',
      emailDomain: '',
      password: ''
    });
  };

  const getFeatureList = (features) => {
    const enabledFeatures = Object.entries(features)
      .filter(([key, value]) => value === true)
      .map(([key]) => {
        switch (key) {
          case 'voicemail': return 'Voicemail';
          case 'callForwarding': return 'Call Forwarding';
          case 'aiFeatures': return 'AI Features';
          case 'aiTranscription': return 'AI Transcription';
          case 'aiSentiment': return 'Sentiment Analysis';
          case 'aiSummary': return 'Call Summary';
          case 'recording': return 'Call Recording';
          case 'hotDesking': return 'Hot Desking';
          case 'presenceEnabled': return 'Presence';
          default: return key;
        }
      });
    
    return enabledFeatures.slice(0, 3);
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Extension Templates</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Quick deployment using pre-configured templates
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowTemplateModal(true)}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Custom Template
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 ${template.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon name={template.icon} size={24} className={template.color} />
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>

              <h4 className="font-semibold text-foreground mb-2">{template.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Max Calls:</span>
                  <span className="font-medium text-foreground">
                    {template.features.maxConcurrentCalls}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {getFeatureList(template.features).map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                  {Object.values(template.features).filter(v => v === true).length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                      +{Object.values(template.features).filter(v => v === true).length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTemplateSelect(template);
                }}
              >
                Use Template
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Template Configuration Modal */}
      {showTemplateModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1002 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Deploy: {selectedTemplate.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure bulk extension deployment
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTemplateModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
              {/* Template Preview */}
              <div className={`${selectedTemplate.bgColor} border border-border rounded-lg p-4`}>
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name={selectedTemplate.icon} size={20} className={selectedTemplate.color} />
                  <div>
                    <h4 className="font-semibold text-foreground">{selectedTemplate.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Features Included:</p>
                    <ul className="mt-1 space-y-1">
                      {Object.entries(selectedTemplate.features)
                        .filter(([key, value]) => value === true)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <li key={key} className="flex items-center space-x-2">
                            <Icon name="Check" size={12} className="text-success" />
                            <span className="text-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Configuration:</p>
                    <ul className="mt-1 space-y-1 text-foreground">
                      <li>Max Calls: {selectedTemplate.features.maxConcurrentCalls}</li>
                      <li>Voicemail: {selectedTemplate.features.voicemail ? 'Yes' : 'No'}</li>
                      <li>AI Features: {selectedTemplate.features.aiFeatures ? 'Yes' : 'No'}</li>
                      <li>Recording: {selectedTemplate.features.recording ? 'Yes' : 'No'}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Deployment Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Starting Extension Number"
                  type="text"
                  placeholder="e.g., 2001"
                  value={templateSettings.startingNumber}
                  onChange={(e) => setTemplateSettings(prev => ({ ...prev, startingNumber: e.target.value }))}
                  required
                />
                <Input
                  label="Number of Extensions"
                  type="number"
                  min="1"
                  max="100"
                  value={templateSettings.count}
                  onChange={(e) => setTemplateSettings(prev => ({ ...prev, count: parseInt(e.target.value) }))}
                  required
                />
              </div>

              <Select
                label="Target Tenant"
                options={tenantOptions}
                value={templateSettings.tenant}
                onChange={(value) => setTemplateSettings(prev => ({ ...prev, tenant: value }))}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Name Prefix"
                  type="text"
                  placeholder="e.g., User, Agent, Room"
                  value={templateSettings.namePrefix}
                  onChange={(e) => setTemplateSettings(prev => ({ ...prev, namePrefix: e.target.value }))}
                />
                <Input
                  label="Email Domain"
                  type="text"
                  placeholder="e.g., company.com"
                  value={templateSettings.emailDomain}
                  onChange={(e) => setTemplateSettings(prev => ({ ...prev, emailDomain: e.target.value }))}
                />
              </div>

              <Input
                label="Default Password"
                type="password"
                placeholder="Password for all created extensions"
                value={templateSettings.password}
                onChange={(e) => setTemplateSettings(prev => ({ ...prev, password: e.target.value }))}
                required
              />

              {/* Preview */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Preview</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  This will create {templateSettings.count} extension{templateSettings.count !== 1 ? 's' : ''}:
                </p>
                <div className="space-y-1 text-sm">
                  {Array.from({ length: Math.min(templateSettings.count, 3) }, (_, i) => {
                    const extNumber = parseInt(templateSettings.startingNumber) + i;
                    const userName = `${templateSettings.namePrefix || 'User'} ${i + 1}`;
                    const email = templateSettings.emailDomain 
                      ? `${(templateSettings.namePrefix || 'user').toLowerCase()}${i + 1}@${templateSettings.emailDomain}`
                      : `${(templateSettings.namePrefix || 'user').toLowerCase()}${i + 1}@example.com`;
                    
                    return (
                      <div key={i} className="flex items-center space-x-4 text-foreground">
                        <span className="font-mono">{extNumber}</span>
                        <span>{userName}</span>
                        <span className="text-muted-foreground">{email}</span>
                      </div>
                    );
                  })}
                  {templateSettings.count > 3 && (
                    <p className="text-muted-foreground">... and {templateSettings.count - 3} more</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setShowTemplateModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateFromTemplate}>
                Create {templateSettings.count} Extension{templateSettings.count !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExtensionTemplates;