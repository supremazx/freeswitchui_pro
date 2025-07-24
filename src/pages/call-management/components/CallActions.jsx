import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CallActions = ({ selectedCall, onAction, onClose }) => {
  const [actionType, setActionType] = useState('');
  const [transferTarget, setTransferTarget] = useState('');
  const [whisperMessage, setWhisperMessage] = useState('');
  const [recordingOptions, setRecordingOptions] = useState({
    format: 'wav',
    quality: 'high'
  });

  const actionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'transfer', label: 'Transfer Call' },
    { value: 'hold', label: 'Put on Hold' },
    { value: 'record', label: 'Start Recording' },
    { value: 'whisper', label: 'Whisper Coach' },
    { value: 'barge', label: 'Barge In' },
    { value: 'park', label: 'Park Call' },
    { value: 'terminate', label: 'Terminate Call' }
  ];

  const transferTargets = [
    { value: '', label: 'Select Target' },
    { value: '1001', label: 'Extension 1001 - John Doe' },
    { value: '1002', label: 'Extension 1002 - Jane Smith' },
    { value: '1003', label: 'Extension 1003 - Mike Johnson' },
    { value: 'queue-support', label: 'Support Queue' },
    { value: 'queue-sales', label: 'Sales Queue' },
    { value: 'voicemail', label: 'Voicemail' }
  ];

  const formatOptions = [
    { value: 'wav', label: 'WAV (Uncompressed)' },
    { value: 'mp3', label: 'MP3 (Compressed)' },
    { value: 'flac', label: 'FLAC (Lossless)' }
  ];

  const qualityOptions = [
    { value: 'high', label: 'High Quality' },
    { value: 'medium', label: 'Medium Quality' },
    { value: 'low', label: 'Low Quality' }
  ];

  const handleExecuteAction = () => {
    const actionData = {
      type: actionType,
      callId: selectedCall?.id,
      target: transferTarget,
      message: whisperMessage,
      options: recordingOptions
    };
    
    onAction(actionData);
    onClose();
  };

  const renderActionForm = () => {
    switch (actionType) {
      case 'transfer':
        return (
          <div className="space-y-4">
            <Select
              label="Transfer to"
              placeholder="Select transfer target"
              options={transferTargets}
              value={transferTarget}
              onChange={setTransferTarget}
              required
            />
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">
                The call will be transferred immediately. The original caller will be connected to the selected target.
              </p>
            </div>
          </div>
        );

      case 'whisper':
        return (
          <div className="space-y-4">
            <Input
              label="Whisper Message"
              type="text"
              placeholder="Enter message to whisper to agent..."
              value={whisperMessage}
              onChange={(e) => setWhisperMessage(e.target.value)}
              description="Only the agent will hear this message"
              required
            />
          </div>
        );

      case 'record':
        return (
          <div className="space-y-4">
            <Select
              label="Recording Format"
              options={formatOptions}
              value={recordingOptions.format}
              onChange={(value) => setRecordingOptions(prev => ({ ...prev, format: value }))}
            />
            <Select
              label="Quality"
              options={qualityOptions}
              value={recordingOptions.quality}
              onChange={(value) => setRecordingOptions(prev => ({ ...prev, quality: value }))}
            />
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Recording will start immediately and continue until the call ends or is manually stopped.
              </p>
            </div>
          </div>
        );

      case 'hold':
        return (
          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              The call will be placed on hold. Hold music will play for the caller.
            </p>
          </div>
        );

      case 'barge':
        return (
          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              You will join the call as a third party. Both the agent and caller will hear you.
            </p>
          </div>
        );

      case 'park':
        return (
          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              The call will be parked and can be retrieved later using the park extension.
            </p>
          </div>
        );

      case 'terminate':
        return (
          <div className="bg-error/10 border border-error/20 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <p className="text-sm font-medium text-error">Warning</p>
            </div>
            <p className="text-xs text-muted-foreground">
              This action will immediately terminate the call. This cannot be undone.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  if (!selectedCall) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="Phone" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Select a call to perform actions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Call Actions</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={16} />
        </Button>
      </div>

      {/* Selected Call Info */}
      <div className="bg-muted/30 p-4 rounded-lg mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <Icon name="Phone" size={16} className="text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Call {selectedCall.callId}</p>
            <p className="text-xs text-muted-foreground">{selectedCall.caller} → {selectedCall.destination}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground">Duration:</span>
            <span className="ml-2 font-mono text-foreground">{selectedCall.formattedDuration}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span>
            <span className="ml-2 text-foreground">{selectedCall.status}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Tenant:</span>
            <span className="ml-2 text-foreground">{selectedCall.tenant}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Server:</span>
            <span className="ml-2 text-foreground">{selectedCall.server}</span>
          </div>
        </div>
      </div>

      {/* Action Selection */}
      <div className="space-y-6">
        <Select
          label="Action"
          placeholder="Select an action to perform"
          options={actionOptions}
          value={actionType}
          onChange={setActionType}
          required
        />

        {/* Action-specific Form */}
        {actionType && renderActionForm()}

        {/* Action Buttons */}
        {actionType && (
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setActionType('')}>
              Cancel
            </Button>
            <Button
              variant={actionType === 'terminate' ? 'destructive' : 'default'}
              onClick={handleExecuteAction}
              disabled={
                (actionType === 'transfer' && !transferTarget) ||
                (actionType === 'whisper' && !whisperMessage)
              }
            >
              {actionType === 'terminate' ? 'Terminate Call' : 'Execute Action'}
            </Button>
          </div>
        )}
      </div>

      {/* Emergency Actions */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Emergency Actions</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="AlertTriangle"
            onClick={() => onAction({ type: 'emergency-hold', callId: selectedCall.id })}
          >
            Emergency Hold
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Shield"
            onClick={() => onAction({ type: 'priority-escalate', callId: selectedCall.id })}
          >
            Priority Escalate
          </Button>
          <Button
            variant="destructive"
            size="sm"
            iconName="PhoneOff"
            onClick={() => onAction({ type: 'force-terminate', callId: selectedCall.id })}
          >
            Force Terminate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallActions;