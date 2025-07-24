import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatsSidebar = ({ stats, onQuickFilter }) => {
  const quickFilters = [
    { id: 'today', label: 'Today', icon: 'Calendar', count: stats.todayCalls },
    { id: 'failed', label: 'Failed Calls', icon: 'XCircle', count: stats.failedCalls },
    { id: 'ai-pending', label: 'AI Pending', icon: 'Clock', count: stats.aiPending },
    { id: 'high-cost', label: 'High Cost', icon: 'DollarSign', count: stats.highCostCalls }
  ];

  const aiInsights = [
    {
      id: 'sentiment-positive',
      label: 'Positive Sentiment',
      value: '68%',
      trend: '+5%',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'avg-duration',
      label: 'Avg Call Duration',
      value: '4:32',
      trend: '-12s',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'transcription-rate',
      label: 'Transcription Rate',
      value: '85%',
      trend: '+3%',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  const topTenants = [
    { name: 'ABC Corp', calls: 1247, cost: 6234.56 },
    { name: 'XYZ Ltd', calls: 892, cost: 4456.78 },
    { name: 'Tech Solutions', calls: 634, cost: 3178.90 },
    { name: 'Global Comm', calls: 456, cost: 2289.34 },
    { name: 'StartupCo', calls: 234, cost: 1167.45 }
  ];

  return (
    <div className="w-80 bg-card border-l border-border overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Analytics Overview</h3>
        <p className="text-sm text-muted-foreground mt-1">Real-time insights and statistics</p>
      </div>

      {/* Quick Stats */}
      <div className="p-4 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Key Metrics</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/30 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-foreground">{stats.totalCalls.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Calls</div>
            </div>
            <div className="bg-success/10 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-success">{((stats.answeredCalls / stats.totalCalls) * 100).toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-primary">${stats.totalCost.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Cost</div>
            </div>
            <div className="bg-accent/10 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-accent">${stats.avgCostPerCall.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Avg Cost</div>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Filters</h4>
          <div className="space-y-2">
            {quickFilters.map((filter) => (
              <Button
                key={filter.id}
                variant="ghost"
                size="sm"
                onClick={() => onQuickFilter(filter.id)}
                className="w-full justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Icon name={filter.icon} size={14} />
                  <span>{filter.label}</span>
                </div>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  {filter.count.toLocaleString()}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">AI Insights</h4>
          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <div key={insight.id} className={`${insight.bgColor} rounded-lg p-3`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{insight.label}</span>
                  <span className={`text-xs ${insight.color}`}>{insight.trend}</span>
                </div>
                <div className={`text-lg font-bold ${insight.color}`}>{insight.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tenants */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Top Tenants</h4>
          <div className="space-y-2">
            {topTenants.map((tenant, index) => (
              <div key={tenant.name} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{tenant.name}</div>
                    <div className="text-xs text-muted-foreground">{tenant.calls} calls</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">${tenant.cost.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">System Status</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-success/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-foreground">CDR Processing</span>
              </div>
              <span className="text-xs text-success">Active</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-success/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-foreground">AI Services</span>
              </div>
              <span className="text-xs text-success">Online</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-warning/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span className="text-sm text-foreground">Export Queue</span>
              </div>
              <span className="text-xs text-warning">3 pending</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Activity</h4>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Download" size={12} />
                <span>Export completed</span>
              </div>
              <div>CSV export of 1,247 records - 2 min ago</div>
            </div>
            <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Brain" size={12} />
                <span>AI analysis finished</span>
              </div>
              <div>Processed 156 call transcriptions - 5 min ago</div>
            </div>
            <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="AlertTriangle" size={12} />
                <span>High cost alert</span>
              </div>
              <div>Call exceeded $50 threshold - 8 min ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            <Icon name="RefreshCw" size={14} className="mr-2" />
            Refresh Data
          </Button>
          <Button variant="ghost" size="sm" className="w-full">
            <Icon name="Settings" size={14} className="mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatsSidebar;