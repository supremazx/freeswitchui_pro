import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkOperations = ({ selectedExtensions, onBulkOperation, extensions, tenants }) => {
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkOperation, setBulkOperation] = useState('');
  const [bulkSettings, setBulkSettings] = useState({
    tenant: '',
    password: '',
    voicemail: false,
    callForwarding: false,
    forwardingNumber: '',
    aiFeatures: false,
    recording: false,
    enabled: true
  });

  const bulkOperationOptions = [
    { value: 'enable', label: 'Enable Extensions' },
    { value: 'disable', label: 'Disable Extensions' },
    { value: 'reset_password', label: 'Reset Passwords' },
    { value: 'move_tenant', label: 'Move to Tenant' },
    { value: 'enable_voicemail', label: 'Enable Voicemail' },
    { value: 'disable_voicemail', label: 'Disable Voicemail' },
    { value: 'enable_ai', label: 'Enable AI Features' },
    { value: 'disable_ai', label: 'Disable AI Features' },
    { value: 'enable_recording', label: 'Enable Call Recording' },
    { value: 'disable_recording', label: 'Disable Call Recording' },
    { value: 'delete', label: 'Delete Extensions' }
  ];

  const tenantOptions = tenants.map(tenant => ({
    value: tenant.id,
    label: tenant.name
  }));

  const selectedExtensionDetails = extensions.filter(ext => 
    selectedExtensions.includes(ext.id)
  );

  const handleBulkOperation = (operation) => {
    if (operation === 'delete' || operation === 'reset_password') {
      // Show confirmation for destructive operations
      if (window.confirm(`Are you sure you want to ${operation.replace('_', ' ')} ${selectedExtensions.length} extension(s)?`)) {
        onBulkOperation(operation, selectedExtensions, bulkSettings);
      }
    } else {
      setBulkOperation(operation);
      setShowBulkModal(true);
    }
  };

  const executeBulkOperation = () => {
    onBulkOperation(bulkOperation, selectedExtensions, bulkSettings);
    setShowBulkModal(false);
    setBulkOperation('');
    setBulkSettings({
      tenant: '',
      password: '',
      voicemail: false,
      callForwarding: false,
      forwardingNumber: '',
      aiFeatures: false,
      recording: false,
      enabled: true
    });
  };

  const getOperationDescription = (operation) => {
    switch (operation) {
      case 'enable': return 'Enable selected extensions for incoming and outgoing calls';
      case 'disable': return 'Disable selected extensions temporarily';
      case 'move_tenant': return 'Move selected extensions to a different tenant';
      case 'enable_voicemail': return 'Enable voicemail feature for selected extensions';
      case 'enable_ai': return 'Enable AI features for selected extensions';
      case 'enable_recording': return 'Enable call recording for selected extensions';
      default: return '';
    }
  };

  if (selectedExtensions.length === 0) {
    return (
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Icon name="Info" size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Select extensions to perform bulk operations
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckSquare" size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                {selectedExtensions.length} extension{selectedExtensions.length !== 1 ? 's' : ''} selected
              </p>
              <p className="text-sm text-muted-foreground">
                Choose a bulk operation to apply to selected extensions
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkOperation('enable')}
            >
              <Icon name="UserCheck" size={14} className="mr-1" />
              Enable
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkOperation('disable')}
            >
              <Icon name="UserX" size={14} className="mr-1" />
              Disable
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkOperation('reset_password')}
            >
              <Icon name="Key" size={14} className="mr-1" />
              Reset Passwords
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkOperation('move_tenant')}
            >
              <Icon name="Building2" size={14} className="mr-1" />
              Move Tenant
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkOperation('enable_ai')}
            >
              <Icon name="Brain" size={14} className="mr-1" />
              AI Features
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleBulkOperation('delete')}
            >
              <Icon name="Trash2" size={14} className="mr-1" />
              Delete
            </Button>
          </div>
        </div>

        {/* Selected Extensions Preview */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm font-medium text-foreground mb-2">Selected Extensions:</p>
          <div className="flex flex-wrap gap-2">
            {selectedExtensionDetails.slice(0, 10).map((ext) => (
              <span
                key={ext.id}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
              >
                {ext.number} - {ext.userName}
              </span>
            ))}
            {selectedExtensionDetails.length > 10 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                +{selectedExtensionDetails.length - 10} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Operation Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1002 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Bulk Operation
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure settings for {selectedExtensions.length} extension{selectedExtensions.length !== 1 ? 's' : ''}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBulkModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-foreground font-medium mb-1">
                  {bulkOperationOptions.find(op => op.value === bulkOperation)?.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {getOperationDescription(bulkOperation)}
                </p>
              </div>

              {bulkOperation === 'move_tenant' && (
                <Select
                  label="Target Tenant"
                  options={tenantOptions}
                  value={bulkSettings.tenant}
                  onChange={(value) => setBulkSettings(prev => ({ ...prev, tenant: value }))}
                  required
                />
              )}

              {bulkOperation === 'reset_password' && (
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password for all selected extensions"
                  value={bulkSettings.password}
                  onChange={(e) => setBulkSettings(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              )}

              {bulkOperation === 'enable_voicemail' && (
                <div className="space-y-4">
                  <Checkbox
                    label="Enable Voicemail"
                    checked={bulkSettings.voicemail}
                    onChange={(e) => setBulkSettings(prev => ({ ...prev, voicemail: e.target.checked }))}
                  />
                  <Input
                    label="Default Voicemail PIN"
                    type="password"
                    placeholder="Default PIN for all extensions"
                    value={bulkSettings.voicemailPin}
                    onChange={(e) => setBulkSettings(prev => ({ ...prev, voicemailPin: e.target.value }))}
                  />
                </div>
              )}

              {bulkOperation === 'enable_ai' && (
                <div className="space-y-4">
                  <Checkbox
                    label="Enable AI Features"
                    checked={bulkSettings.aiFeatures}
                    onChange={(e) => setBulkSettings(prev => ({ ...prev, aiFeatures: e.target.checked }))}
                  />
                  <div className="ml-6 space-y-2">
                    <Checkbox
                      label="Real-time Transcription"
                      checked={bulkSettings.aiTranscription}
                      onChange={(e) => setBulkSettings(prev => ({ ...prev, aiTranscription: e.target.checked }))}
                    />
                    <Checkbox
                      label="Sentiment Analysis"
                      checked={bulkSettings.aiSentiment}
                      onChange={(e) => setBulkSettings(prev => ({ ...prev, aiSentiment: e.target.checked }))}
                    />
                    <Checkbox
                      label="Call Summarization"
                      checked={bulkSettings.aiSummary}
                      onChange={(e) => setBulkSettings(prev => ({ ...prev, aiSummary: e.target.checked }))}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setShowBulkModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={executeBulkOperation}>
                Apply to {selectedExtensions.length} Extension{selectedExtensions.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkOperations;