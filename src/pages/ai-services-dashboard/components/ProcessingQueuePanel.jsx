import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingQueuePanel = () => {
  const [activeTab, setActiveTab] = useState('transcription');

  const transcriptionJobs = [
    {
      id: 'txn_001',
      tenant: 'ABC Corp',
      type: 'Speech-to-Text',
      fileName: 'conference_call_20240724.wav',
      duration: '45:32',
      progress: 75,
      status: 'processing',
      estimatedTime: '2 min',
      priority: 'high'
    },
    {
      id: 'txn_002',
      tenant: 'TechStart Inc',
      type: 'Speech-to-Text',
      fileName: 'customer_support_call.mp3',
      duration: '12:18',
      progress: 100,
      status: 'completed',
      estimatedTime: 'Complete',
      priority: 'normal'
    },
    {
      id: 'txn_003',
      tenant: 'Global Solutions',
      type: 'Speech-to-Text',
      fileName: 'team_meeting_recording.wav',
      duration: '1:23:45',
      progress: 25,
      status: 'processing',
      estimatedTime: '8 min',
      priority: 'low'
    }
  ];

  const ttsJobs = [
    {
      id: 'tts_001',
      tenant: 'ABC Corp',
      type: 'Text-to-Speech',
      text: 'Welcome to our customer service. Please hold while we connect you...',
      voice: 'Sarah (Neural)',
      progress: 90,
      status: 'processing',
      estimatedTime: '30 sec',
      priority: 'high'
    },
    {
      id: 'tts_002',
      tenant: 'Enterprise Ltd',
      type: 'Text-to-Speech',
      text: 'Your call is important to us. Current wait time is approximately 5 minutes.',
      voice: 'David (Standard)',
      progress: 100,
      status: 'completed',
      estimatedTime: 'Complete',
      priority: 'normal'
    }
  ];

  const llmJobs = [
    {
      id: 'llm_001',
      tenant: 'ABC Corp',
      type: 'Call Summarization',
      model: 'GPT-4',
      inputTokens: 2450,
      progress: 60,
      status: 'processing',
      estimatedTime: '1 min',
      priority: 'high'
    },
    {
      id: 'llm_002',
      tenant: 'TechStart Inc',
      type: 'Sentiment Analysis',
      model: 'Claude-3',
      inputTokens: 890,
      progress: 100,
      status: 'completed',
      estimatedTime: 'Complete',
      priority: 'normal'
    },
    {
      id: 'llm_003',
      tenant: 'Global Solutions',
      type: 'Intent Classification',
      model: 'GPT-3.5',
      inputTokens: 1250,
      progress: 15,
      status: 'queued',
      estimatedTime: '3 min',
      priority: 'low'
    }
  ];

  const getJobData = () => {
    switch (activeTab) {
      case 'transcription': return transcriptionJobs;
      case 'tts': return ttsJobs;
      case 'llm': return llmJobs;
      default: return [];
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-warning';
      case 'queued': return 'text-muted-foreground';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'processing': return 'Clock';
      case 'queued': return 'Timer';
      case 'failed': return 'XCircle';
      default: return 'Clock';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'normal': return 'bg-warning';
      case 'low': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  const tabs = [
    { id: 'transcription', label: 'Speech-to-Text', icon: 'Mic', count: transcriptionJobs.length },
    { id: 'tts', label: 'Text-to-Speech', icon: 'Volume2', count: ttsJobs.length },
    { id: 'llm', label: 'LLM Processing', icon: 'Brain', count: llmJobs.length }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Processing Queue</h3>
            <p className="text-sm text-muted-foreground">Real-time AI processing jobs</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
              Refresh
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Settings" size={16} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {getJobData().map((job) => (
            <div key={job.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(job.priority)}`}></div>
                    <Icon 
                      name={getStatusIcon(job.status)} 
                      size={16} 
                      className={getStatusColor(job.status)} 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-foreground">{job.id}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {job.tenant}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.type}</p>
                    {job.fileName && (
                      <p className="text-xs text-muted-foreground mt-1 font-mono">
                        {job.fileName} {job.duration && `(${job.duration})`}
                      </p>
                    )}
                    {job.text && (
                      <p className="text-xs text-muted-foreground mt-1 truncate max-w-md">
                        "{job.text}"
                      </p>
                    )}
                    {job.model && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Model: {job.model} {job.inputTokens && `• ${job.inputTokens} tokens`}
                      </p>
                    )}
                    {job.voice && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Voice: {job.voice}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{job.progress}%</p>
                  <p className="text-xs text-muted-foreground">{job.estimatedTime}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    job.status === 'completed' ? 'bg-success' : 
                    job.status === 'processing' ? 'bg-warning' : 
                    job.status === 'failed' ? 'bg-error' : 'bg-muted-foreground'
                  }`}
                  style={{ width: `${job.progress}%` }}
                ></div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium ${getStatusColor(job.status)}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Priority: {job.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {job.status === 'processing' && (
                    <Button variant="ghost" size="sm" iconName="Pause">
                      Pause
                    </Button>
                  )}
                  {job.status === 'completed' && (
                    <Button variant="ghost" size="sm" iconName="Download">
                      Download
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {getJobData().length === 0 && (
          <div className="text-center py-12">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Active Jobs</h4>
            <p className="text-sm text-muted-foreground">
              No {activeTab === 'transcription' ? 'transcription' : activeTab === 'tts' ? 'text-to-speech' : 'LLM processing'} jobs in queue
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingQueuePanel;