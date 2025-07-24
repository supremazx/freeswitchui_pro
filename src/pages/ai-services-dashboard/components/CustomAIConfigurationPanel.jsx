import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CustomAIConfigurationPanel = ({ 
  serviceType, 
  config, 
  onConfigChange, 
  onTestConnection, 
  isTestingConnection, 
  connectionStatus 
}) => {
  const [customParameters, setCustomParameters] = useState(config?.customParameters || []);

  const authMethods = [
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'api_key', label: 'API Key Header' },
    { value: 'basic', label: 'Basic Authentication' },
    { value: 'oauth2', label: 'OAuth 2.0' },
    { value: 'custom', label: 'Custom Headers' }
  ];

  const httpMethods = [
    { value: 'POST', label: 'POST' },
    { value: 'GET', label: 'GET' },
    { value: 'PUT', label: 'PUT' },
    { value: 'PATCH', label: 'PATCH' }
  ];

  const contentTypes = [
    { value: 'application/json', label: 'JSON' },
    { value: 'application/x-www-form-urlencoded', label: 'Form Data' },
    { value: 'multipart/form-data', label: 'Multipart Form' },
    { value: 'text/plain', label: 'Plain Text' },
    { value: 'application/xml', label: 'XML' }
  ];

  const parameterTypes = [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'array', label: 'Array' },
    { value: 'object', label: 'Object' }
  ];

  const addCustomParameter = () => {
    const newParameter = {
      id: `param_${Date.now()}`,
      key: '',
      value: '',
      type: 'string',
      required: false,
      description: ''
    };
    const updatedParameters = [...customParameters, newParameter];
    setCustomParameters(updatedParameters);
    onConfigChange({ ...config, customParameters: updatedParameters });
  };

  const updateCustomParameter = (id, field, value) => {
    const updatedParameters = customParameters.map(param =>
      param.id === id ? { ...param, [field]: value } : param
    );
    setCustomParameters(updatedParameters);
    onConfigChange({ ...config, customParameters: updatedParameters });
  };

  const removeCustomParameter = (id) => {
    const updatedParameters = customParameters.filter(param => param.id !== id);
    setCustomParameters(updatedParameters);
    onConfigChange({ ...config, customParameters: updatedParameters });
  };

  const getServiceIcon = () => {
    switch (serviceType) {
      case 'stt': return 'Mic';
      case 'tts': return 'Volume2';
      case 'llm': return 'Brain';
      default: return 'Settings';
    }
  };

  const getServiceTitle = () => {
    switch (serviceType) {
      case 'stt': return 'Custom Speech-to-Text Engine';
      case 'tts': return 'Custom Text-to-Speech Engine';
      case 'llm': return 'Custom Large Language Model';
      default: return 'Custom AI Engine';
    }
  };

  const getServiceColor = () => {
    switch (serviceType) {
      case 'stt': return 'text-success';
      case 'tts': return 'text-warning';
      case 'llm': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getServiceBgColor = () => {
    switch (serviceType) {
      case 'stt': return 'bg-success/10';
      case 'tts': return 'bg-warning/10';
      case 'llm': return 'bg-primary/10';
      default: return 'bg-muted';
    }
  };

  const renderConnectionStatus = () => {
    if (!connectionStatus || connectionStatus === 'idle') return null;

    const statusConfig = {
      success: { icon: 'CheckCircle', color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', text: 'Custom engine connected successfully' },
      error: { icon: 'XCircle', color: 'text-error', bg: 'bg-error/10', border: 'border-error/20', text: 'Failed to connect to custom engine' },
      testing: { icon: 'Clock', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', text: 'Testing custom engine connection...' }
    };

    const status = statusConfig[connectionStatus];
    if (!status) return null;

    return (
      <div className={`flex items-center space-x-3 p-4 rounded-lg border mb-6 ${status.bg} ${status.border}`}>
        <Icon name={status.icon} size={20} className={status.color} />
        <span className={`font-medium ${status.color}`}>{status.text}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderConnectionStatus()}
      
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className={`w-10 h-10 ${getServiceBgColor()} rounded-lg flex items-center justify-center`}>
            <Icon name={getServiceIcon()} size={20} className={getServiceColor()} />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{getServiceTitle()}</h4>
            <p className="text-sm text-muted-foreground">Configure custom AI engine with flexible API parameters</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Configuration */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-foreground">Basic Configuration</h5>
            
            <Input
              label="Engine Name"
              value={config?.engineName || ''}
              onChange={(e) => onConfigChange({ ...config, engineName: e.target.value })}
              placeholder="My Custom AI Engine"
              description="A friendly name for your custom AI engine"
              required
            />

            <Input
              label="API Endpoint URL"
              type="url"
              value={config?.endpoint || ''}
              onChange={(e) => onConfigChange({ ...config, endpoint: e.target.value })}
              placeholder="https://api.your-custom-ai.com/v1/process"
              description="The full URL to your custom AI engine API endpoint"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="HTTP Method"
                options={httpMethods}
                value={config?.httpMethod || 'POST'}
                onChange={(value) => onConfigChange({ ...config, httpMethod: value })}
                description="HTTP method for API requests"
              />
              <Select
                label="Content Type"
                options={contentTypes}
                value={config?.contentType || 'application/json'}
                onChange={(value) => onConfigChange({ ...config, contentType: value })}
                description="Content type for request body"
              />
            </div>
          </div>

          {/* Authentication Configuration */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-foreground">Authentication</h5>
            
            <Select
              label="Authentication Method"
              options={authMethods}
              value={config?.authMethod || 'bearer'}
              onChange={(value) => onConfigChange({ ...config, authMethod: value })}
              description="How to authenticate with your AI engine"
            />

            {config?.authMethod === 'bearer' && (
              <Input
                label="Bearer Token"
                type="password"
                value={config?.authToken || ''}
                onChange={(e) => onConfigChange({ ...config, authToken: e.target.value })}
                placeholder="your-bearer-token-here"
                description="Bearer token for authorization header"
                required
              />
            )}

            {config?.authMethod === 'api_key' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="API Key Header Name"
                  value={config?.apiKeyHeader || 'X-API-Key'}
                  onChange={(e) => onConfigChange({ ...config, apiKeyHeader: e.target.value })}
                  placeholder="X-API-Key"
                  description="Name of the API key header"
                />
                <Input
                  label="API Key Value"
                  type="password"
                  value={config?.apiKeyValue || ''}
                  onChange={(e) => onConfigChange({ ...config, apiKeyValue: e.target.value })}
                  placeholder="your-api-key-here"
                  description="Your API key value"
                  required
                />
              </div>
            )}

            {config?.authMethod === 'basic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Username"
                  value={config?.username || ''}
                  onChange={(e) => onConfigChange({ ...config, username: e.target.value })}
                  placeholder="username"
                  description="Basic auth username"
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  value={config?.password || ''}
                  onChange={(e) => onConfigChange({ ...config, password: e.target.value })}
                  placeholder="password"
                  description="Basic auth password"
                  required
                />
              </div>
            )}

            {config?.authMethod === 'oauth2' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Client ID"
                  value={config?.clientId || ''}
                  onChange={(e) => onConfigChange({ ...config, clientId: e.target.value })}
                  placeholder="your-client-id"
                  description="OAuth 2.0 client ID"
                  required
                />
                <Input
                  label="Client Secret"
                  type="password"
                  value={config?.clientSecret || ''}
                  onChange={(e) => onConfigChange({ ...config, clientSecret: e.target.value })}
                  placeholder="your-client-secret"
                  description="OAuth 2.0 client secret"
                  required
                />
              </div>
            )}
          </div>

          {/* Request Configuration */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-foreground">Request Configuration</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Request Timeout (seconds)"
                type="number"
                value={config?.timeout || '30'}
                onChange={(e) => onConfigChange({ ...config, timeout: e.target.value })}
                min="5"
                max="300"
                description="Maximum time to wait for responses"
              />
              <Input
                label="Max Retries"
                type="number"
                value={config?.maxRetries || '3'}
                onChange={(e) => onConfigChange({ ...config, maxRetries: e.target.value })}
                min="0"
                max="10"
                description="Number of retry attempts on failure"
              />
              <Input
                label="Rate Limit (requests/minute)"
                type="number"
                value={config?.rateLimit || '60'}
                onChange={(e) => onConfigChange({ ...config, rateLimit: e.target.value })}
                min="1"
                max="1000"
                description="Maximum requests per minute"
              />
            </div>
          </div>

          {/* Custom Parameters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-medium text-foreground">Custom Parameters</h5>
              <Button
                variant="outline"
                size="sm"
                onClick={addCustomParameter}
                iconName="Plus"
                iconPosition="left"
              >
                Add Parameter
              </Button>
            </div>

            {customParameters.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Icon name="Settings" size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No custom parameters added yet.</p>
                <p className="text-xs">Add parameters to customize your AI engine requests.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {customParameters.map((param) => (
                  <div key={param.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h6 className="text-sm font-medium text-foreground">Parameter #{customParameters.indexOf(param) + 1}</h6>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomParameter(param.id)}
                        iconName="Trash2"
                        className="text-error hover:text-error hover:bg-error/10"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Input
                        label="Parameter Key"
                        value={param.key}
                        onChange={(e) => updateCustomParameter(param.id, 'key', e.target.value)}
                        placeholder="parameter_name"
                        description="API parameter name"
                      />
                      <Input
                        label="Default Value"
                        value={param.value}
                        onChange={(e) => updateCustomParameter(param.id, 'value', e.target.value)}
                        placeholder="default_value"
                        description="Default parameter value"
                      />
                      <Select
                        label="Type"
                        options={parameterTypes}
                        value={param.type}
                        onChange={(value) => updateCustomParameter(param.id, 'type', value)}
                        description="Parameter data type"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        label="Description"
                        value={param.description}
                        onChange={(e) => updateCustomParameter(param.id, 'description', e.target.value)}
                        placeholder="Describe this parameter"
                        description="Help text for this parameter"
                      />
                      <div className="flex items-center space-x-2 mt-6">
                        <input
                          type="checkbox"
                          id={`required-${param.id}`}
                          checked={param.required}
                          onChange={(e) => updateCustomParameter(param.id, 'required', e.target.checked)}
                          className="h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                        <label htmlFor={`required-${param.id}`} className="text-sm text-foreground">
                          Required parameter
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Response Configuration */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-foreground">Response Configuration</h5>
            
            <Input
              label="Response Data Path"
              value={config?.responsePath || ''}
              onChange={(e) => onConfigChange({ ...config, responsePath: e.target.value })}
              placeholder="data.result"
              description="JSON path to extract the main result from response (e.g., 'data.result', 'choices[0].message.content')"
            />

            <Input
              label="Error Message Path"
              value={config?.errorPath || ''}
              onChange={(e) => onConfigChange({ ...config, errorPath: e.target.value })}
              placeholder="error.message"
              description="JSON path to extract error messages from failed responses"
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => onTestConnection(serviceType)}
              disabled={isTestingConnection || !config?.endpoint?.trim()}
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
  );
};

export default CustomAIConfigurationPanel;