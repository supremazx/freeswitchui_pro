import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PromptManagementPanel = () => {
  const [activePromptCategory, setActivePromptCategory] = useState('system');
  const [selectedPromptTemplate, setSelectedPromptTemplate] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [promptName, setPromptName] = useState('');
  const [promptDescription, setPromptDescription] = useState('');

  const promptCategories = [
    { id: 'system', label: 'System Prompts', icon: 'Settings' },
    { id: 'call-summary', label: 'Call Summaries', icon: 'FileText' },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: 'Heart' },
    { id: 'ivr', label: 'IVR Responses', icon: 'Phone' },
    { id: 'transcription', label: 'Transcription Enhancement', icon: 'Mic' },
    { id: 'custom', label: 'Custom Prompts', icon: 'Edit' }
  ];

  const systemPrompts = [
    {
      id: 'default-assistant',
      name: 'Default Assistant',
      description: 'General purpose AI assistant for FreeSWITCH interactions',
      prompt: 'You are a helpful AI assistant integrated with FreeSWITCH telephony system. You provide accurate, concise, and professional responses. Always maintain caller privacy and follow telecommunications best practices.',
      variables: ['caller_id', 'call_duration', 'tenant_name'],
      isActive: true,
      usage: 245
    },
    {
      id: 'technical-support',
      name: 'Technical Support',
      description: 'Specialized prompt for technical support calls',
      prompt: 'You are a technical support specialist for FreeSWITCH systems. Provide clear, step-by-step solutions for technical issues. Ask clarifying questions when needed and escalate complex issues appropriately.',
      variables: ['issue_type', 'system_version', 'error_code'],
      isActive: false,
      usage: 89
    }
  ];

  const callSummaryPrompts = [
    {
      id: 'standard-summary',
      name: 'Standard Call Summary',
      description: 'General call summarization template',
      prompt: 'Analyze the following call transcript and provide a concise summary including: 1) Call purpose/reason 2) Key discussion points 3) Action items 4) Call outcome. Keep it professional and under 200 words.\n\nCall Transcript:\n{transcript}',
      variables: ['transcript', 'call_type', 'participants'],
      isActive: true,
      usage: 892
    },
    {
      id: 'sales-summary',
      name: 'Sales Call Summary',
      description: 'Specialized for sales and business calls',
      prompt: 'Summarize this sales call focusing on: 1) Customer needs/pain points 2) Products/services discussed 3) Pricing mentioned 4) Next steps/follow-up actions 5) Deal probability. Format as bullet points.\n\nCall Transcript:\n{transcript}',
      variables: ['transcript', 'customer_name', 'deal_value'],
      isActive: true,
      usage: 456
    }
  ];

  const sentimentPrompts = [
    {
      id: 'customer-sentiment',
      name: 'Customer Sentiment Analysis',
      description: 'Analyze customer satisfaction and emotion',
      prompt: 'Analyze the sentiment of this call transcript. Provide: 1) Overall sentiment score (1-10) 2) Emotional indicators 3) Customer satisfaction level 4) Areas of concern. Be objective and specific.\n\nTranscript:\n{transcript}',
      variables: ['transcript', 'interaction_type'],
      isActive: true,
      usage: 623
    },
    {
      id: 'agent-performance',
      name: 'Agent Performance Analysis',
      description: 'Evaluate agent performance and professionalism',
      prompt: 'Evaluate the agent\'s performance in this call: 1) Communication effectiveness 2) Problem-solving approach 3) Professionalism score 4) Improvement suggestions. Provide constructive feedback.\n\nCall Transcript:\n{transcript}',
      variables: ['transcript', 'agent_id', 'call_type'],
      isActive: false,
      usage: 234
    }
  ];

  const ivrPrompts = [
    {
      id: 'menu-generation',
      name: 'Dynamic Menu Generation',
      description: 'Generate IVR menu options based on context',
      prompt: 'Generate appropriate IVR menu options for {business_type} during {time_period}. Include: 1) Relevant departments 2) Emergency options 3) Self-service options 4) Professional greeting. Keep options under 8 choices.',
      variables: ['business_type', 'time_period', 'available_services'],
      isActive: true,
      usage: 156
    },
    {
      id: 'smart-routing',
      name: 'Smart Call Routing',
      description: 'Intelligent call routing suggestions',
      prompt: 'Based on caller input "{caller_input}" and available agents, suggest optimal routing. Consider: 1) Agent skills 2) Queue lengths 3) Priority level 4) Previous interactions. Provide routing decision with confidence score.',
      variables: ['caller_input', 'agent_skills', 'queue_status'],
      isActive: true,
      usage: 78
    }
  ];

  const customPrompts = [
    {
      id: 'custom-001',
      name: 'Compliance Check',
      description: 'Custom prompt for regulatory compliance verification',
      prompt: 'Review this call for compliance with telecommunications regulations. Check for: 1) Proper disclosures 2) Consent verification 3) Data protection compliance 4) Recording notifications. Flag any issues.\n\nCall Content:\n{content}',
      variables: ['content', 'regulation_type', 'jurisdiction'],
      isActive: true,
      usage: 45,
      createdBy: 'Admin',
      createdDate: '2025-07-20'
    }
  ];

  const getPromptsByCategory = (category) => {
    switch (category) {
      case 'system': return systemPrompts;
      case 'call-summary': return callSummaryPrompts;
      case 'sentiment': return sentimentPrompts;
      case 'ivr': return ivrPrompts;
      case 'custom': return customPrompts;
      default: return [];
    }
  };

  const handlePromptSelect = (promptId) => {
    const prompts = getPromptsByCategory(activePromptCategory);
    const selectedPrompt = prompts.find(p => p.id === promptId);
    if (selectedPrompt) {
      setSelectedPromptTemplate(promptId);
      setCustomPrompt(selectedPrompt.prompt);
      setPromptName(selectedPrompt.name);
      setPromptDescription(selectedPrompt.description);
    }
  };

  const handleSavePrompt = () => {
    // Handle saving/updating prompt logic here
    console.log('Saving prompt:', {
      name: promptName,
      description: promptDescription,
      prompt: customPrompt,
      category: activePromptCategory
    });
  };

  const handleTestPrompt = () => {
    // Handle prompt testing logic here
    console.log('Testing prompt:', customPrompt);
  };

  const renderPromptList = () => {
    const prompts = getPromptsByCategory(activePromptCategory);
    
    return (
      <div className="space-y-3">
        {prompts.map((prompt) => (
          <div 
            key={prompt.id} 
            className={`border border-border rounded-lg p-4 hover:bg-muted/30 cursor-pointer transition-colors ${
              selectedPromptTemplate === prompt.id ? 'bg-primary/5 border-primary/20' : ''
            }`}
            onClick={() => handlePromptSelect(prompt.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground text-sm">{prompt.name}</h4>
                  {prompt.isActive && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-success/10 text-success">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{prompt.description}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Usage: {prompt.usage}</span>
                  {prompt.variables && (
                    <span>Variables: {prompt.variables.length}</span>
                  )}
                  {prompt.createdBy && (
                    <span>By: {prompt.createdBy}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" iconName="Edit" />
                <Button variant="ghost" size="sm" iconName="Copy" />
              </div>
            </div>
            
            {prompt.variables && prompt.variables.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex flex-wrap gap-1">
                  {prompt.variables.map((variable) => (
                    <span 
                      key={variable}
                      className="inline-flex items-center px-2 py-1 rounded text-xs bg-accent/10 text-accent font-mono"
                    >
                      {`{${variable}}`}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {activePromptCategory === 'custom' && (
          <Button 
            variant="outline" 
            className="w-full" 
            iconName="Plus" 
            iconPosition="left"
          >
            Create New Custom Prompt
          </Button>
        )}
      </div>
    );
  };

  const renderPromptEditor = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prompt Name"
            value={promptName}
            onChange={(e) => setPromptName(e.target.value)}
            placeholder="Enter prompt name"
            description="Descriptive name for this prompt"
          />
          <Select
            label="Template"
            options={[
              { value: '', label: 'Select a template...' },
              ...getPromptsByCategory(activePromptCategory).map(p => ({
                value: p.id,
                label: p.name
              }))
            ]}
            value={selectedPromptTemplate}
            onChange={handlePromptSelect}
            description="Choose from existing templates"
          />
        </div>

        <Input
          label="Description"
          value={promptDescription}
          onChange={(e) => setPromptDescription(e.target.value)}
          placeholder="Brief description of prompt purpose"
          description="Explain what this prompt is used for"
        />

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Prompt Content
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Enter your prompt content here. Use {variable_name} for dynamic variables."
            className="w-full h-48 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use curly braces for variables: {`{caller_id}`, `{transcript}`, `{business_type}`}
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-accent" />
            <span className="text-sm text-foreground">
              Characters: {customPrompt.length} / 4000
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              iconName="Play" 
              iconPosition="left"
              onClick={handleTestPrompt}
              disabled={!customPrompt.trim()}
            >
              Test Prompt
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              iconName="Save" 
              iconPosition="left"
              onClick={handleSavePrompt}
              disabled={!promptName.trim() || !customPrompt.trim()}
            >
              Save Prompt
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-accent" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">Prompt Management</h4>
            <p className="text-sm text-muted-foreground">Configure and manage AI prompts for different FreeSWITCH use cases</p>
          </div>
        </div>

        {/* Prompt Category Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1 bg-muted rounded-lg p-1">
            {promptCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActivePromptCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activePromptCategory === category.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={category.icon} size={14} />
                <span className="hidden sm:inline">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prompt Templates List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium text-foreground">Available Templates</h5>
              <span className="text-xs text-muted-foreground">
                {getPromptsByCategory(activePromptCategory).length} templates
              </span>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {renderPromptList()}
            </div>
          </div>

          {/* Prompt Editor */}
          <div>
            <h5 className="font-medium text-foreground mb-4">Prompt Editor</h5>
            {renderPromptEditor()}
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Prompt Usage Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">1,856</div>
            <div className="text-sm text-muted-foreground">Total Executions</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success mb-1">23</div>
            <div className="text-sm text-muted-foreground">Active Prompts</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-warning mb-1">4.2s</div>
            <div className="text-sm text-muted-foreground">Avg Response Time</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-accent mb-1">94.8%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptManagementPanel;