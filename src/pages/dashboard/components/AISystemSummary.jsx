import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AISystemSummary = ({ realTimeData }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  // Simulate AI analysis based on real-time data
  useEffect(() => {
    const generateAIInsights = () => {
      setIsAnalyzing(true);
      
      // Simulate AI processing delay
      setTimeout(() => {
        const insights = analyzeSystemMetrics(realTimeData);
        setSummaryData(insights);
        setIsAnalyzing(false);
      }, 2000);
    };

    if (realTimeData) {
      generateAIInsights();
    }
  }, [realTimeData]);

  const analyzeSystemMetrics = (data) => {
    const { activeCalls, systemUptime, registeredExtensions, aiServiceUsage } = data;
    
    // AI analysis logic
    const uptimePercent = parseFloat(systemUptime.replace('%', ''));
    const aiUsageNum = parseFloat(aiServiceUsage.replace('K', ''));
    
    let systemHealth = 'Excellent';
    let healthColor = 'success';
    let recommendations = [];
    let criticalInsights = [];

    // System health analysis
    if (uptimePercent < 98) {
      systemHealth = 'Needs Attention';
      healthColor = 'warning';
      recommendations.push('Monitor system stability and identify connectivity issues');
    } else if (uptimePercent < 95) {
      systemHealth = 'Critical';
      healthColor = 'error';
      recommendations.push('Immediate intervention required for system stability');
    }

    // Call volume analysis
    if (activeCalls > 300) {
      criticalInsights.push('High call volume detected - consider load balancing');
      recommendations.push('Scale up server resources to handle peak traffic');
    } else if (activeCalls < 50) {
      criticalInsights.push('Low call activity - potential system or network issues');
    }

    // AI service usage analysis
    if (aiUsageNum > 3.0) {
      criticalInsights.push('AI services experiencing heavy usage - monitor performance');
      recommendations.push('Consider upgrading AI service quotas for optimal performance');
    }

    // Extension analysis
    if (registeredExtensions > 1500) {
      recommendations.push('Large extension count - optimize registration processes');
    }

    return {
      systemHealth,
      healthColor,
      criticalInsights: criticalInsights.length > 0 ? criticalInsights : ['System operating within normal parameters'],
      recommendations: recommendations.length > 0 ? recommendations : ['Continue monitoring system performance'],
      confidence: 94,
      lastAnalysis: new Date()
    };
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI System Summary</h3>
              <p className="text-sm text-muted-foreground">Intelligent insights and recommendations</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-primary">Analyzing...</span>
              </div>
            ) : summaryData && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">
                  Updated {formatTimeAgo(summaryData.lastAnalysis)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">AI analyzing system performance...</p>
            </div>
          </div>
        ) : summaryData ? (
          <div className="space-y-6">
            {/* System Health Overview */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Activity" size={20} className={`text-${summaryData.healthColor}`} />
                <div>
                  <p className="font-medium text-foreground">System Health Status</p>
                  <p className={`text-sm text-${summaryData.healthColor}`}>{summaryData.systemHealth}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <p className="font-medium text-foreground">{summaryData.confidence}%</p>
              </div>
            </div>

            {/* Critical Insights */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center">
                <Icon name="AlertCircle" size={16} className="mr-2" />
                Critical Insights
              </h4>
              <div className="space-y-2">
                {summaryData.criticalInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                    <Icon name="Zap" size={16} className="text-accent mt-0.5" />
                    <p className="text-sm text-foreground">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center">
                <Icon name="Lightbulb" size={16} className="mr-2" />
                AI Recommendations
              </h4>
              <div className="space-y-3">
                {summaryData.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Metrics Analyzed</p>
                <p className="font-semibold text-foreground">4 Systems</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Analysis Duration</p>
                <p className="font-semibold text-foreground">2.3s</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Brain" size={32} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">No data available for analysis</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <button className="text-sm text-primary hover:text-primary/80 font-medium flex items-center">
            <Icon name="RefreshCw" size={14} className="mr-1" />
            Refresh Analysis
          </button>
          <button className="text-sm text-muted-foreground hover:text-foreground flex items-center">
            <Icon name="Settings" size={14} className="mr-1" />
            AI Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISystemSummary;