import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const GroqApiConfig = () => {
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('https://api.groq.com/openai/v1');
  const [selectedModel, setSelectedModel] = useState('llama3-8b-8192');
  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const groqModels = [
    { value: 'llama3-8b-8192', label: 'Llama 3 8B' },
    { value: 'llama3-70b-8192', label: 'Llama 3 70B' },
    { value: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' },
    { value: 'gemma-7b-it', label: 'Gemma 7B IT' },
    { value: 'gemma2-9b-it', label: 'Gemma 2 9B IT' }
  ];

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setConnectionStatus('error');
      return;
    }

    setIsTestingConnection(true);
    setConnectionStatus('testing');

    // Simulate API connection test
    setTimeout(() => {
      setIsTestingConnection(false);
      setConnectionStatus('success');
    }, 2000);
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      case 'testing': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'testing': return 'Clock';
      default: return 'Circle';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'success': return 'Connection successful';
      case 'error': return 'Connection failed';
      case 'testing': return 'Testing connection...';
      default: return 'Not tested';
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Status Banner */}
      {connectionStatus !== 'idle' && (
        <div className={`flex items-center space-x-3 p-4 rounded-lg border ${
          connectionStatus === 'success' ? 'bg-success/10 border-success/20' :
          connectionStatus === 'error'? 'bg-error/10 border-error/20' : 'bg-warning/10 border-warning/20'
        }`}>
          <Icon 
            name={getConnectionStatusIcon()} 
            size={20} 
            className={getConnectionStatusColor()} 
          />
          <span className={`font-medium ${getConnectionStatusColor()}`}>
            {getConnectionStatusText()}
          </span>
        </div>
      )}

      {/* API Configuration Section */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Key" size={20} className="text-accent" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">Groq API Configuration</h4>
            <p className="text-sm text-muted-foreground">Configure your Groq API credentials and endpoints</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="API Key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="gsk_..."
            description="Your Groq API key for authentication"
            required
          />

          <Input
            label="API Endpoint"
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.groq.com/openai/v1"
            description="Groq API endpoint URL"
            required
          />

          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <Select
                label="Default Model"
                options={groqModels}
                value={selectedModel}
                onChange={setSelectedModel}
                description="Select the default Groq model for LLM operations"
              />
            </div>
            <div className="pt-6">
              <Button
                variant="outline"
                onClick={handleTestConnection}
                disabled={isTestingConnection || !apiKey.trim()}
                iconName={isTestingConnection ? "Loader2" : "Wifi"}
                iconPosition="left"
                className={isTestingConnection ? "animate-spin" : ""}
              >
                {isTestingConnection ? 'Testing...' : 'Test Connection'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Capabilities */}
      <div className="border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Groq Service Capabilities</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Brain" size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">LLM Processing</p>
              <p className="text-xs text-muted-foreground">Fast inference with Groq models</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="Mic" size={16} className="text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">Speech-to-Text</p>
              <p className="text-xs text-muted-foreground">Whisper model support</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="Volume2" size={16} className="text-warning" />
            </div>
            <div>
              <p className="font-medium text-foreground">Text-to-Speech</p>
              <p className="text-xs text-muted-foreground">Via compatible models</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Advanced Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Request Timeout (seconds)"
            type="number"
            defaultValue="30"
            min="5"
            max="300"
            description="Maximum time to wait for API responses"
          />

          <Input
            label="Max Tokens"
            type="number"
            defaultValue="4096"
            min="1"
            max="32768"
            description="Maximum tokens for model responses"
          />

          <Input
            label="Temperature"
            type="number"
            defaultValue="0.7"
            min="0"
            max="2"
            step="0.1"
            description="Controls randomness in model outputs"
          />

          <Input
            label="Top P"
            type="number"
            defaultValue="1.0"
            min="0"
            max="1"
            step="0.1"
            description="Nucleus sampling parameter"
          />
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Enable Streaming Responses</span>
            <button className="w-10 h-6 bg-primary rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Stream responses for better user experience with long outputs
          </p>
        </div>
      </div>

      {/* Usage Monitoring */}
      <div className="border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Usage Monitoring</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-foreground">12.5K</p>
            <p className="text-xs text-muted-foreground">Requests Today</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-foreground">2.1M</p>
            <p className="text-xs text-muted-foreground">Tokens Used</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-foreground">89ms</p>
            <p className="text-xs text-muted-foreground">Avg Response</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-foreground">$24.50</p>
            <p className="text-xs text-muted-foreground">Cost This Month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroqApiConfig;