import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallRecordsTable = ({ records, onRecordSelect, selectedRecords, onBulkSelect }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [expandedRows, setExpandedRows] = useState(new Set());

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const toggleRowExpansion = (recordId) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recordId)) {
        newSet.delete(recordId);
      } else {
        newSet.add(recordId);
      }
      return newSet;
    });
  };

  const getDispositionColor = (disposition) => {
    switch (disposition.toLowerCase()) {
      case 'answered': return 'text-success bg-success/10';
      case 'busy': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      case 'no answer': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getAiStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-success bg-success/10';
      case 'processing': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      case 'pending': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const sortedRecords = [...records].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  className="rounded border-border"
                  checked={selectedRecords.length === records.length}
                  onChange={(e) => onBulkSelect(e.target.checked ? records.map(r => r.id) : [])}
                />
              </th>
              {[
                { key: 'timestamp', label: 'Date/Time' },
                { key: 'caller', label: 'Caller' },
                { key: 'callee', label: 'Callee' },
                { key: 'duration', label: 'Duration' },
                { key: 'cost', label: 'Cost' },
                { key: 'disposition', label: 'Status' },
                { key: 'tenant', label: 'Tenant' },
                { key: 'aiStatus', label: 'AI Analysis' }
              ].map(column => (
                <th
                  key={column.key}
                  className="text-left p-4 font-medium text-foreground cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    <Icon
                      name={sortConfig.key === column.key && sortConfig.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'}
                      size={14}
                      className={sortConfig.key === column.key ? 'text-primary' : 'text-muted-foreground'}
                    />
                  </div>
                </th>
              ))}
              <th className="w-16 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {sortedRecords.map((record) => (
              <React.Fragment key={record.id}>
                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      checked={selectedRecords.includes(record.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onBulkSelect([...selectedRecords, record.id]);
                        } else {
                          onBulkSelect(selectedRecords.filter(id => id !== record.id));
                        }
                      }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="font-medium text-foreground">
                        {new Date(record.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-muted-foreground">
                        {new Date(record.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="font-medium text-foreground">{record.caller}</div>
                      <div className="text-muted-foreground">{record.callerName}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="font-medium text-foreground">{record.callee}</div>
                      <div className="text-muted-foreground">{record.calleeName}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono text-foreground">
                      {formatDuration(record.duration)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-foreground">
                      ${record.cost.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDispositionColor(record.disposition)}`}>
                      {record.disposition}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{record.tenant}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAiStatusColor(record.aiStatus)}`}>
                      {record.aiStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleRowExpansion(record.id)}
                    >
                      <Icon
                        name={expandedRows.has(record.id) ? 'ChevronUp' : 'ChevronDown'}
                        size={16}
                      />
                    </Button>
                  </td>
                </tr>
                {expandedRows.has(record.id) && (
                  <tr className="border-b border-border bg-muted/20">
                    <td colSpan="10" className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-foreground">Call Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Call ID:</span>
                              <span className="ml-2 font-mono text-foreground">{record.callId}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Direction:</span>
                              <span className="ml-2 text-foreground">{record.direction}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Gateway:</span>
                              <span className="ml-2 text-foreground">{record.gateway}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Codec:</span>
                              <span className="ml-2 text-foreground">{record.codec}</span>
                            </div>
                          </div>
                        </div>
                        {record.aiAnalysis && (
                          <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">AI Analysis</h4>
                            <div className="space-y-3">
                              {record.aiAnalysis.sentiment && (
                                <div>
                                  <span className="text-muted-foreground text-sm">Sentiment:</span>
                                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                                    record.aiAnalysis.sentiment === 'Positive' ? 'bg-success/10 text-success' :
                                    record.aiAnalysis.sentiment === 'Negative'? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                                  }`}>
                                    {record.aiAnalysis.sentiment}
                                  </span>
                                </div>
                              )}
                              {record.aiAnalysis.summary && (
                                <div>
                                  <span className="text-muted-foreground text-sm">Summary:</span>
                                  <p className="mt-1 text-sm text-foreground">{record.aiAnalysis.summary}</p>
                                </div>
                              )}
                              {record.aiAnalysis.transcriptionAvailable && (
                                <Button variant="outline" size="sm">
                                  <Icon name="FileText" size={14} className="mr-2" />
                                  View Transcription
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedRecords.map((record) => (
          <div key={record.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-border"
                  checked={selectedRecords.includes(record.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onBulkSelect([...selectedRecords, record.id]);
                    } else {
                      onBulkSelect(selectedRecords.filter(id => id !== record.id));
                    }
                  }}
                />
                <div>
                  <div className="font-medium text-foreground">
                    {record.caller} → {record.callee}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(record.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleRowExpansion(record.id)}
              >
                <Icon
                  name={expandedRows.has(record.id) ? 'ChevronUp' : 'ChevronDown'}
                  size={16}
                />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <span className="ml-2 font-mono text-foreground">{formatDuration(record.duration)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Cost:</span>
                <span className="ml-2 font-medium text-foreground">${record.cost.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDispositionColor(record.disposition)}`}>
                  {record.disposition}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAiStatusColor(record.aiStatus)}`}>
                  {record.aiStatus}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{record.tenant}</span>
            </div>

            {expandedRows.has(record.id) && (
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Call ID:</span>
                    <span className="ml-2 font-mono text-foreground text-xs">{record.callId}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Direction:</span>
                    <span className="ml-2 text-foreground">{record.direction}</span>
                  </div>
                </div>
                {record.aiAnalysis && (
                  <div className="space-y-2">
                    <h5 className="font-medium text-foreground">AI Analysis</h5>
                    {record.aiAnalysis.sentiment && (
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground text-sm">Sentiment:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          record.aiAnalysis.sentiment === 'Positive' ? 'bg-success/10 text-success' :
                          record.aiAnalysis.sentiment === 'Negative'? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                        }`}>
                          {record.aiAnalysis.sentiment}
                        </span>
                      </div>
                    )}
                    {record.aiAnalysis.summary && (
                      <p className="text-sm text-foreground">{record.aiAnalysis.summary}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallRecordsTable;