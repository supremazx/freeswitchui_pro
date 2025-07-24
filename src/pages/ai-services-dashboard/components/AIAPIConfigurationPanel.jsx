import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import CustomAIConfigurationPanel from './CustomAIConfigurationPanel';
import PromptManagementPanel from './PromptManagementPanel';

const AIAPIConfigurationPanel = () => {
  const [selectedTenant, setSelectedTenant] = useState('abc-corp');
  const [activeService, setActiveService] = useState('stt');
  const [activeSubTab, setActiveSubTab] = useState('config');
  const [connectionStatuses, setConnectionStatuses] = useState({
    stt: 'idle',
    tts: 'idle',
    llm: 'idle'
  });
  const [testingConnections, setTestingConnections] = useState({
    stt: false,
    tts: false,
    llm: false
  });

  // STT API Configuration State
  const [sttConfig, setSttConfig] = useState({
    apiKey: '',
    endpoint: 'https://api.openai.com/v1/audio/transcriptions',
    provider: 'openai',
    model: 'whisper-1',
    timeout: '30',
    maxFileSize: '25'
  });

  // Custom STT Configuration State
  const [customSttConfig, setCustomSttConfig] = useState({
    engineName: '',
    endpoint: '',
    httpMethod: 'POST',
    contentType: 'application/json',
    authMethod: 'bearer',
    authToken: '',
    timeout: '30',
    maxRetries: '3',
    rateLimit: '60',
    responsePath: '',
    errorPath: '',
    customParameters: []
  });

  // TTS API Configuration State
  const [ttsConfig, setTtsConfig] = useState({
    apiKey: '',
    endpoint: 'https://api.openai.com/v1/audio/speech',
    provider: 'openai',
    model: 'tts-1',
    voice: 'alloy',
    timeout: '30',
    maxChars: '4000'
  });

  // Custom TTS Configuration State
  const [customTtsConfig, setCustomTtsConfig] = useState({
    engineName: '',
    endpoint: '',
    httpMethod: 'POST',
    contentType: 'application/json',
    authMethod: 'bearer',
    authToken: '',
    timeout: '30',
    maxRetries: '3',
    rateLimit: '60',
    responsePath: '',
    errorPath: '',
    customParameters: []
  });

  // LLM API Configuration State
  const [llmConfig, setLlmConfig] = useState({
    apiKey: '',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    maxTokens: '4096',
    temperature: '0.7',
    timeout: '60'
  });

  // Custom LLM Configuration State
  const [customLlmConfig, setCustomLlmConfig] = useState({
    engineName: '',
    endpoint: '',
    httpMethod: 'POST',
    contentType: 'application/json',
    authMethod: 'bearer',
    authToken: '',
    timeout: '60',
    maxRetries: '3',
    rateLimit: '60',
    responsePath: '',
    errorPath: '',
    customParameters: []
  });

  const tenantOptions = [
    { value: 'abc-corp', label: 'ABC Corp' },
    { value: 'techstart-inc', label: 'TechStart Inc' },
    { value: 'global-solutions', label: 'Global Solutions' },
    { value: 'enterprise-ltd', label: 'Enterprise Ltd' }
  ];

  const sttProviders = [
    { value: 'openai', label: 'OpenAI Whisper' },
    { value: 'google', label: 'Google Speech-to-Text' },
    { value: 'azure', label: 'Azure Speech Services' },
    { value: 'aws', label: 'Amazon Transcribe' },
    { value: 'deepgram', label: 'Deepgram' },
    { value: 'groq', label: 'Groq' },
    { value: 'custom', label: 'Custom AI Engine' }
  ];

  const ttsProviders = [
    { value: 'openai', label: 'OpenAI TTS' },
    { value: 'google', label: 'Google Text-to-Speech' },
    { value: 'azure', label: 'Azure Speech Services' },
    { value: 'aws', label: 'Amazon Polly' },
    { value: 'elevenlabs', label: 'ElevenLabs' },
    { value: 'groq', label: 'Groq' },
    { value: 'custom', label: 'Custom AI Engine' }
  ];

  const llmProviders = [
    { value: 'openai', label: 'OpenAI GPT' },
    { value: 'anthropic', label: 'Anthropic Claude' },
    { value: 'google', label: 'Google Gemini' },
    { value: 'groq', label: 'Groq' },
    { value: 'azure', label: 'Azure OpenAI' },
    { value: 'custom', label: 'Custom AI Engine' }
  ];

  const sttModels = {
    openai: [
      { value: 'whisper-1', label: 'Whisper v1' }
    ],
    google: [
      { value: 'latest_long', label: 'Latest Long' },
      { value: 'latest_short', label: 'Latest Short' }
    ],
    azure: [
      { value: 'whisper', label: 'Whisper' }
    ],
    groq: [
      { value: 'whisper-large-v3', label: 'Whisper Large v3' },
      { value: 'distil-whisper-large-v3-en', label: 'Distil Whisper Large v3 EN' }
    ]
  };

  const ttsModels = {
    openai: [
      { value: 'tts-1', label: 'TTS-1' },
      { value: 'tts-1-hd', label: 'TTS-1 HD' }
    ],
    google: [
      { value: 'standard', label: 'Standard' },
      { value: 'wavenet', label: 'WaveNet' },
      { value: 'neural2', label: 'Neural2' }
    ],
    groq: [
      { value: 'groq-tts-1', label: 'Groq TTS v1' },
      { value: 'groq-tts-fast', label: 'Groq TTS Fast' }
    ]
  };

  const llmModels = {
    openai: [
      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
      { value: 'gpt-4', label: 'GPT-4' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' }
    ],
    anthropic: [
      { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
      { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
      { value: 'claude-3-opus', label: 'Claude 3 Opus' }
    ],
    groq: [
      { value: 'llama2-70b-4096', label: 'Llama2 70B' },
      { value: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' },
      { value: 'gemma-7b-it', label: 'Gemma 7B IT' }
    ]
  };

  const voiceOptions = [
    { value: 'alloy', label: 'Alloy' },
    { value: 'echo', label: 'Echo' },
    { value: 'fable', label: 'Fable' },
    { value: 'onyx', label: 'Onyx' },
    { value: 'nova', label: 'Nova' },
    { value: 'shimmer', label: 'Shimmer' }
  ];

  const services = [
    { id: 'stt', label: 'Speech-to-Text API', icon: 'Mic' },
    { id: 'tts', label: 'Text-to-Speech API', icon: 'Volume2' },
    { id: 'llm', label: 'LLM API', icon: 'Brain' }
  ];

  const llmSubTabs = [
    { id: 'config', label: 'Configuration', icon: 'Settings' },
    { id: 'prompts', label: 'Prompts', icon: 'MessageSquare' }
  ];

  const handleTestConnection = async (serviceType) => {
    const config = serviceType === 'stt' ? sttConfig : serviceType === 'tts' ? ttsConfig : llmConfig;
    
    // Check if using custom provider
    if (config.provider === 'custom') {
      const customConfig = serviceType === 'stt' ? customSttConfig : serviceType === 'tts' ? customTtsConfig : customLlmConfig;
      if (!customConfig.endpoint?.trim()) {
        setConnectionStatuses(prev => ({ ...prev, [serviceType]: 'error' }));
        return;
      }
    } else if (!config.apiKey?.trim()) {
      setConnectionStatuses(prev => ({ ...prev, [serviceType]: 'error' }));
      return;
    }

    setTestingConnections(prev => ({ ...prev, [serviceType]: true }));
    setConnectionStatuses(prev => ({ ...prev, [serviceType]: 'testing' }));

    // Simulate API connection test
    setTimeout(() => {
      setTestingConnections(prev => ({ ...prev, [serviceType]: false }));
      setConnectionStatuses(prev => ({ ...prev, [serviceType]: 'success' }));
    }, 2000);
  };

  const getConnectionStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      case 'testing': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = (status) => {
    switch (status) {
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'testing': return 'Clock';
      default: return 'Circle';
    }
  };

  const getConnectionStatusText = (status) => {
    switch (status) {
      case 'success': return 'Connection successful';
      case 'error': return 'Connection failed';
      case 'testing': return 'Testing connection...';
      default: return 'Not tested';
    }
  };

  const renderConnectionStatus = (serviceType) => {
    const status = connectionStatuses[serviceType];
    if (status === 'idle') return null;

    return (
      <div className={`flex items-center space-x-3 p-4 rounded-lg border mb-6 ${
        status === 'success' ? 'bg-success/10 border-success/20' :
        status === 'error' ? 'bg-error/10 border-error/20' : 'bg-warning/10 border-warning/20'
      }`}>
        <Icon 
          name={getConnectionStatusIcon(status)} 
          size={20} 
          className={getConnectionStatusColor(status)} 
        />
        <span className={`font-medium ${getConnectionStatusColor(status)}`}>
          {getConnectionStatusText(status)}
        </span>
      </div>
    );
  };

  const renderSTTConfiguration = () => {
    // If custom provider is selected, show custom configuration
    if (sttConfig.provider === 'custom') {
      return (
        <CustomAIConfigurationPanel
          serviceType="stt"
          config={customSttConfig}
          onConfigChange={setCustomSttConfig}
          onTestConnection={handleTestConnection}
          isTestingConnection={testingConnections.stt}
          connectionStatus={connectionStatuses.stt}
        />
      );
    }

    return (
      <div className="space-y-6">
        {renderConnectionStatus('stt')}
        
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Mic" size={20} className="text-success" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Speech-to-Text API Configuration</h4>
              <p className="text-sm text-muted-foreground">Configure STT service provider and credentials</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="STT Provider"
                options={sttProviders}
                value={sttConfig.provider}
                onChange={(value) => setSttConfig(prev => ({ ...prev, provider: value, model: sttModels[value]?.[0]?.value || '' }))}
                description="Select your speech-to-text service provider"
              />
              {sttConfig.provider !== 'custom' && (
                <Select
                  label="Model"
                  options={sttModels[sttConfig.provider] || []}
                  value={sttConfig.model}
                  onChange={(value) => setSttConfig(prev => ({ ...prev, model: value }))}
                  description="Choose the STT model to use"
                />
              )}
            </div>

            {sttConfig.provider !== 'custom' && (
              <>
                <Input
                  label="API Key"
                  type="password"
                  value={sttConfig.apiKey}
                  onChange={(e) => setSttConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="sk-..."
                  description="Your STT API key for authentication"
                  required
                />

                <Input
                  label="API Endpoint"
                  type="url"
                  value={sttConfig.endpoint}
                  onChange={(e) => setSttConfig(prev => ({ ...prev, endpoint: e.target.value }))}
                  placeholder="https://api.openai.com/v1/audio/transcriptions"
                  description="STT API endpoint URL"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Request Timeout (seconds)"
                    type="number"
                    value={sttConfig.timeout}
                    onChange={(e) => setSttConfig(prev => ({ ...prev, timeout: e.target.value }))}
                    min="5"
                    max="300"
                    description="Maximum time to wait for STT responses"
                  />
                  <Input
                    label="Max File Size (MB)"
                    type="number"
                    value={sttConfig.maxFileSize}
                    onChange={(e) => setSttConfig(prev => ({ ...prev, maxFileSize: e.target.value }))}
                    min="1"
                    max="200"
                    description="Maximum audio file size allowed"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => handleTestConnection('stt')}
                    disabled={testingConnections.stt || !sttConfig.apiKey?.trim()}
                    iconName={testingConnections.stt ? "Loader2" : "Wifi"}
                    iconPosition="left"
                    className={testingConnections.stt ? "animate-spin" : ""}
                  >
                    {testingConnections.stt ? 'Testing...' : 'Test Connection'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTTSConfiguration = () => {
    // If custom provider is selected, show custom configuration
    if (ttsConfig.provider === 'custom') {
      return (
        <CustomAIConfigurationPanel
          serviceType="tts"
          config={customTtsConfig}
          onConfigChange={setCustomTtsConfig}
          onTestConnection={handleTestConnection}
          isTestingConnection={testingConnections.tts}
          connectionStatus={connectionStatuses.tts}
        />
      );
    }

    return (
      <div className="space-y-6">
        {renderConnectionStatus('tts')}
        
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Volume2" size={20} className="text-warning" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Text-to-Speech API Configuration</h4>
              <p className="text-sm text-muted-foreground">Configure TTS service provider and credentials</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="TTS Provider"
                options={ttsProviders}
                value={ttsConfig.provider}
                onChange={(value) => setTtsConfig(prev => ({ ...prev, provider: value, model: ttsModels[value]?.[0]?.value || '' }))}
                description="Select your text-to-speech service provider"
              />
              {ttsConfig.provider !== 'custom' && (
                <Select
                  label="Model"
                  options={ttsModels[ttsConfig.provider] || []}
                  value={ttsConfig.model}
                  onChange={(value) => setTtsConfig(prev => ({ ...prev, model: value }))}
                  description="Choose the TTS model to use"
                />
              )}
            </div>

            {ttsConfig.provider !== 'custom' && (
              <>
                <Input
                  label="API Key"
                  type="password"
                  value={ttsConfig.apiKey}
                  onChange={(e) => setTtsConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="sk-..."
                  description="Your TTS API key for authentication"
                  required
                />

                <Input
                  label="API Endpoint"
                  type="url"
                  value={ttsConfig.endpoint}
                  onChange={(e) => setTtsConfig(prev => ({ ...prev, endpoint: e.target.value }))}
                  placeholder="https://api.openai.com/v1/audio/speech"
                  description="TTS API endpoint URL"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Voice"
                    options={voiceOptions}
                    value={ttsConfig.voice}
                    onChange={(value) => setTtsConfig(prev => ({ ...prev, voice: value }))}
                    description="Select the voice for speech synthesis"
                  />
                  <Input
                    label="Max Characters"
                    type="number"
                    value={ttsConfig.maxChars}
                    onChange={(e) => setTtsConfig(prev => ({ ...prev, maxChars: e.target.value }))}
                    min="100"
                    max="10000"
                    description="Maximum characters per TTS request"
                  />
                </div>

                <Input
                  label="Request Timeout (seconds)"
                  type="number"
                  value={ttsConfig.timeout}
                  onChange={(e) => setTtsConfig(prev => ({ ...prev, timeout: e.target.value }))}
                  min="5"
                  max="300"
                  description="Maximum time to wait for TTS responses"
                />

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => handleTestConnection('tts')}
                    disabled={testingConnections.tts || !ttsConfig.apiKey?.trim()}
                    iconName={testingConnections.tts ? "Loader2" : "Wifi"}
                    iconPosition="left"
                    className={testingConnections.tts ? "animate-spin" : ""}
                  >
                    {testingConnections.tts ? 'Testing...' : 'Test Connection'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderLLMConfiguration = () => {
    // If custom provider is selected, show custom configuration
    if (llmConfig.provider === 'custom') {
      return (
        <CustomAIConfigurationPanel
          serviceType="llm"
          config={customLlmConfig}
          onConfigChange={setCustomLlmConfig}
          onTestConnection={handleTestConnection}
          isTestingConnection={testingConnections.llm}
          connectionStatus={connectionStatuses.llm}
        />
      );
    }

    return (
      <div className="space-y-6">
        {renderConnectionStatus('llm')}
        
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Large Language Model API Configuration</h4>
              <p className="text-sm text-muted-foreground">Configure LLM service provider and credentials</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="LLM Provider"
                options={llmProviders}
                value={llmConfig.provider}
                onChange={(value) => setLlmConfig(prev => ({ ...prev, provider: value, model: llmModels[value]?.[0]?.value || '' }))}
                description="Select your LLM service provider"
              />
              {llmConfig.provider !== 'custom' && (
                <Select
                  label="Model"
                  options={llmModels[llmConfig.provider] || []}
                  value={llmConfig.model}
                  onChange={(value) => setLlmConfig(prev => ({ ...prev, model: value }))}
                  description="Choose the LLM model to use"
                />
              )}
            </div>

            {llmConfig.provider !== 'custom' && (
              <>
                <Input
                  label="API Key"
                  type="password"
                  value={llmConfig.apiKey}
                  onChange={(e) => setLlmConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="sk-..."
                  description="Your LLM API key for authentication"
                  required
                />

                <Input
                  label="API Endpoint"
                  type="url"
                  value={llmConfig.endpoint}
                  onChange={(e) => setLlmConfig(prev => ({ ...prev, endpoint: e.target.value }))}
                  placeholder="https://api.openai.com/v1/chat/completions"
                  description="LLM API endpoint URL"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Max Tokens"
                    type="number"
                    value={llmConfig.maxTokens}
                    onChange={(e) => setLlmConfig(prev => ({ ...prev, maxTokens: e.target.value }))}
                    min="1"
                    max="32768"
                    description="Maximum tokens for model responses"
                  />
                  <Input
                    label="Temperature"
                    type="number"
                    value={llmConfig.temperature}
                    onChange={(e) => setLlmConfig(prev => ({ ...prev, temperature: e.target.value }))}
                    min="0"
                    max="2"
                    step="0.1"
                    description="Controls randomness in model outputs"
                  />
                  <Input
                    label="Timeout (seconds)"
                    type="number"
                    value={llmConfig.timeout}
                    onChange={(e) => setLlmConfig(prev => ({ ...prev, timeout: e.target.value }))}
                    min="5"
                    max="300"
                    description="Maximum time to wait for LLM responses"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => handleTestConnection('llm')}
                    disabled={testingConnections.llm || !llmConfig.apiKey?.trim()}
                    iconName={testingConnections.llm ? "Loader2" : "Wifi"}
                    iconPosition="left"
                    className={testingConnections.llm ? "animate-spin" : ""}
                  >
                    {testingConnections.llm ? 'Testing...' : 'Test Connection'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderLLMContent = () => {
    return (
      <div className="space-y-6">
        {/* LLM Sub-tabs */}
        <div className="flex space-x-1 bg-muted/50 rounded-lg p-1">
          {llmSubTabs.map((subTab) => (
            <button
              key={subTab.id}
              onClick={() => setActiveSubTab(subTab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSubTab === subTab.id
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={subTab.icon} size={16} />
              <span>{subTab.label}</span>
            </button>
          ))}
        </div>

        {/* Sub-tab Content */}
        {activeSubTab === 'config' && renderLLMConfiguration()}
        {activeSubTab === 'prompts' && <PromptManagementPanel />}
      </div>
    );
  };

  const renderServiceContent = () => {
    switch (activeService) {
      case 'stt': return renderSTTConfiguration();
      case 'tts': return renderTTSConfiguration();
      case 'llm': return renderLLMContent();
      default: return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI API Configuration</h3>
            <p className="text-sm text-muted-foreground">Configure API endpoints and credentials for AI services</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select
              options={tenantOptions}
              value={selectedTenant}
              onChange={setSelectedTenant}
              className="w-48"
            />
          </div>
        </div>

        {/* Service Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeService === service.id
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={service.icon} size={16} />
              <span className="hidden sm:inline">{service.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {renderServiceContent()}
        
        <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-border">
          <Button variant="outline">
            Reset to Defaults
          </Button>
          <Button variant="default" iconName="Save" iconPosition="left">
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAPIConfigurationPanel;