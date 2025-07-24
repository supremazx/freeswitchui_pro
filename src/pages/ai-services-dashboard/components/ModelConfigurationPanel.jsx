import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import GroqApiConfig from './GroqApiConfig';

const ModelConfigurationPanel = () => {
  const [selectedTenant, setSelectedTenant] = useState('abc-corp');
  const [activeService, setActiveService] = useState('speech-to-text');

  const tenantOptions = [
    { value: 'abc-corp', label: 'ABC Corp' },
    { value: 'techstart-inc', label: 'TechStart Inc' },
    { value: 'global-solutions', label: 'Global Solutions' },
    { value: 'enterprise-ltd', label: 'Enterprise Ltd' }
  ];

  const languageOptions = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'es-ES', label: 'Spanish (Spain)' },
    { value: 'fr-FR', label: 'French (France)' },
    { value: 'de-DE', label: 'German (Germany)' },
    { value: 'it-IT', label: 'Italian (Italy)' },
    { value: 'pt-BR', label: 'Portuguese (Brazil)' },
    { value: 'ja-JP', label: 'Japanese (Japan)' },
    { value: 'ko-KR', label: 'Korean (South Korea)' },
    { value: 'zh-CN', label: 'Chinese (Simplified)' }
  ];

  const voiceProfiles = [
    { 
      id: 'sarah-neural',
      name: 'Sarah',
      type: 'Neural',
      gender: 'Female',
      language: 'en-US',
      quality: 'Premium',
      cost: '$0.016/1K chars'
    },
    { 
      id: 'david-standard',
      name: 'David',
      type: 'Standard',
      gender: 'Male',
      language: 'en-US',
      quality: 'Standard',
      cost: '$0.004/1K chars'
    },
    { 
      id: 'emma-neural',
      name: 'Emma',
      type: 'Neural',
      gender: 'Female',
      language: 'en-GB',
      quality: 'Premium',
      cost: '$0.016/1K chars'
    },
    { 
      id: 'carlos-neural',
      name: 'Carlos',
      type: 'Neural',
      gender: 'Male',
      language: 'es-ES',
      quality: 'Premium',
      cost: '$0.016/1K chars'
    }
  ];

  const llmModels = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'OpenAI',
      type: 'Large Language Model',
      inputCost: '$0.03/1K tokens',
      outputCost: '$0.06/1K tokens',
      contextWindow: '8K tokens',
      status: 'active'
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      type: 'Large Language Model',
      inputCost: '$0.0015/1K tokens',
      outputCost: '$0.002/1K tokens',
      contextWindow: '4K tokens',
      status: 'active'
    },
    {
      id: 'claude-3',
      name: 'Claude-3',
      provider: 'Anthropic',
      type: 'Large Language Model',
      inputCost: '$0.025/1K tokens',
      outputCost: '$0.075/1K tokens',
      contextWindow: '100K tokens',
      status: 'inactive'
    }
  ];

  const customModels = [
    {
      id: 'custom-001',
      name: 'ABC Corp Custom STT',
      type: 'Speech-to-Text',
      status: 'training',
      progress: 65,
      accuracy: 'N/A',
      trainingData: '2,450 hours',
      estimatedCompletion: '2 days'
    },
    {
      id: 'custom-002',
      name: 'TechStart Domain TTS',
      type: 'Text-to-Speech',
      status: 'completed',
      progress: 100,
      accuracy: '94.2%',
      trainingData: '850 samples',
      estimatedCompletion: 'Complete'
    }
  ];

  const services = [
    { id: 'speech-to-text', label: 'Speech-to-Text', icon: 'Mic' },
    { id: 'text-to-speech', label: 'Text-to-Speech', icon: 'Volume2' },
    { id: 'llm-models', label: 'LLM Models', icon: 'Brain' },
    { id: 'groq-api', label: 'Groq API', icon: 'Zap' },
    { id: 'custom-models', label: 'Custom Models', icon: 'Settings' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'training': return 'text-warning';
      case 'completed': return 'text-success';
      case 'inactive': return 'text-muted-foreground';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'training': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'inactive': return 'Circle';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const renderSpeechToTextConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Primary Language"
          options={languageOptions}
          value="en-US"
          onChange={() => {}}
        />
        <Select
          label="Secondary Language"
          options={[{ value: '', label: 'None' }, ...languageOptions]}
          value=""
          onChange={() => {}}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Confidence Threshold"
          type="number"
          value="0.85"
          min="0"
          max="1"
          step="0.01"
          description="Minimum confidence score for transcription"
        />
        <Input
          label="Max Audio Duration (minutes)"
          type="number"
          value="60"
          min="1"
          max="180"
          description="Maximum allowed audio file duration"
        />
      </div>

      <div className="border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Advanced Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Enable Profanity Filter</span>
            <button className="w-10 h-6 bg-primary rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Auto-punctuation</span>
            <button className="w-10 h-6 bg-primary rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Speaker Diarization</span>
            <button className="w-10 h-6 bg-muted rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Real-time Processing</span>
            <button className="w-10 h-6 bg-primary rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTextToSpeechConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-foreground mb-4">Voice Profiles</h4>
          <div className="space-y-3">
            {voiceProfiles.map((voice) => (
              <div key={voice.id} className="border border-border rounded-lg p-4 hover:bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{voice.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {voice.gender} • {voice.language} • {voice.type}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" iconName="Play">
                    Preview
                  </Button>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Quality: {voice.quality}</span>
                  <span>{voice.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-4">Voice Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Speech Rate</label>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-muted-foreground">Slow</span>
                <div className="flex-1 h-2 bg-muted rounded-full relative">
                  <div className="w-3/5 h-2 bg-primary rounded-full"></div>
                  <div className="w-3 h-3 bg-primary rounded-full absolute right-2/5 top-[-2px]"></div>
                </div>
                <span className="text-xs text-muted-foreground">Fast</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Pitch</label>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-muted-foreground">Low</span>
                <div className="flex-1 h-2 bg-muted rounded-full relative">
                  <div className="w-1/2 h-2 bg-primary rounded-full"></div>
                  <div className="w-3 h-3 bg-primary rounded-full absolute right-1/2 top-[-2px]"></div>
                </div>
                <span className="text-xs text-muted-foreground">High</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Volume</label>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-muted-foreground">Quiet</span>
                <div className="flex-1 h-2 bg-muted rounded-full relative">
                  <div className="w-4/5 h-2 bg-primary rounded-full"></div>
                  <div className="w-3 h-3 bg-primary rounded-full absolute right-1/5 top-[-2px]"></div>
                </div>
                <span className="text-xs text-muted-foreground">Loud</span>
              </div>
            </div>

            <Input
              label="SSML Support"
              type="text"
              placeholder="<speak>Hello <break time='1s'/> World</speak>"
              description="Speech Synthesis Markup Language for advanced control"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLLMModelsConfig = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        {llmModels.map((model) => (
          <div key={model.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Brain" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{model.name}</h4>
                  <p className="text-sm text-muted-foreground">{model.provider} • {model.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(model.status)} 
                  size={16} 
                  className={getStatusColor(model.status)} 
                />
                <span className={`text-sm font-medium ${getStatusColor(model.status)}`}>
                  {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Input Cost</p>
                <p className="font-medium text-foreground">{model.inputCost}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Output Cost</p>
                <p className="font-medium text-foreground">{model.outputCost}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Context Window</p>
                <p className="font-medium text-foreground">{model.contextWindow}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={model.status === 'active' ? 'outline' : 'default'} 
                  size="sm"
                >
                  {model.status === 'active' ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomModelsConfig = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-foreground">Custom Model Training</h4>
          <p className="text-sm text-muted-foreground">Train specialized models for your use case</p>
        </div>
        <Button variant="default" iconName="Plus" iconPosition="left">
          Start Training
        </Button>
      </div>

      <div className="grid gap-4">
        {customModels.map((model) => (
          <div key={model.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{model.name}</h4>
                  <p className="text-sm text-muted-foreground">{model.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(model.status)} 
                  size={16} 
                  className={getStatusColor(model.status)} 
                />
                <span className={`text-sm font-medium ${getStatusColor(model.status)}`}>
                  {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                </span>
              </div>
            </div>

            {model.status === 'training' && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">Training Progress</span>
                  <span className="text-sm font-medium text-foreground">{model.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 bg-warning rounded-full transition-all duration-300"
                    style={{ width: `${model.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Training Data</p>
                <p className="font-medium text-foreground">{model.trainingData}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Accuracy</p>
                <p className="font-medium text-foreground">{model.accuracy}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Completion</p>
                <p className="font-medium text-foreground">{model.estimatedCompletion}</p>
              </div>
              <div className="flex items-center space-x-2">
                {model.status === 'training' && (
                  <Button variant="outline" size="sm" iconName="Pause">
                    Pause
                  </Button>
                )}
                {model.status === 'completed' && (
                  <Button variant="default" size="sm" iconName="Play">
                    Deploy
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServiceContent = () => {
    switch (activeService) {
      case 'speech-to-text': return renderSpeechToTextConfig();
      case 'text-to-speech': return renderTextToSpeechConfig();
      case 'llm-models': return renderLLMModelsConfig();
      case 'groq-api': return <GroqApiConfig />;
      case 'custom-models': return renderCustomModelsConfig();
      default: return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Model Configuration</h3>
            <p className="text-sm text-muted-foreground">Configure AI services and models per tenant</p>
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

export default ModelConfigurationPanel;