import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ExtensionTable = ({ 
  extensions, 
  selectedExtensions, 
  onSelectionChange, 
  onEditExtension, 
  onToggleExtension, 
  onCallForwarding,
  sortConfig,
  onSort 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'busy', label: 'Busy' },
    { value: 'away', label: 'Away' }
  ];

  const filteredExtensions = extensions.filter(ext => {
    const matchesSearch = ext.number.includes(searchTerm) || 
                         ext.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ext.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ext.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(filteredExtensions.map(ext => ext.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectExtension = (extensionId, checked) => {
    if (checked) {
      onSelectionChange([...selectedExtensions, extensionId]);
    } else {
      onSelectionChange(selectedExtensions.filter(id => id !== extensionId));
    }
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'offline': return 'text-muted-foreground';
      case 'busy': return 'text-error';
      case 'away': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'online': return 'bg-success/10';
      case 'offline': return 'bg-muted';
      case 'busy': return 'bg-error/10';
      case 'away': return 'bg-warning/10';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Table Filters */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search extensions, names, or emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by status"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedExtensions.length === filteredExtensions.length && filteredExtensions.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => onSort('number')}
                  className="font-semibold text-foreground hover:text-primary"
                >
                  Extension
                  <Icon name={getSortIcon('number')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => onSort('userName')}
                  className="font-semibold text-foreground hover:text-primary"
                >
                  User
                  <Icon name={getSortIcon('userName')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  onClick={() => onSort('tenant')}
                  className="font-semibold text-foreground hover:text-primary"
                >
                  Tenant
                  <Icon name={getSortIcon('tenant')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Features</th>
              <th className="text-left p-4">Last Activity</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExtensions.map((extension) => (
              <tr key={extension.id} className="border-t border-border hover:bg-muted/30">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedExtensions.includes(extension.id)}
                    onChange={(e) => handleSelectExtension(extension.id, e.target.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Phone" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{extension.number}</p>
                      <p className="text-xs text-muted-foreground">{extension.device}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{extension.userName}</p>
                    <p className="text-sm text-muted-foreground">{extension.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/10 text-secondary">
                    {extension.tenant}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusBg(extension.status)}`}>
                      <div className={`w-full h-full rounded-full ${extension.status === 'online' ? 'animate-pulse' : ''}`}></div>
                    </div>
                    <span className={`text-sm font-medium capitalize ${getStatusColor(extension.status)}`}>
                      {extension.status}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {extension.voicemail && (
                      <Icon name="Voicemail" size={14} className="text-primary" title="Voicemail enabled" />
                    )}
                    {extension.callForwarding && (
                      <Icon name="PhoneForwarded" size={14} className="text-accent" title="Call forwarding active" />
                    )}
                    {extension.aiFeatures && (
                      <Icon name="Brain" size={14} className="text-success" title="AI features enabled" />
                    )}
                    {extension.recording && (
                      <Icon name="Mic" size={14} className="text-warning" title="Call recording enabled" />
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-sm text-foreground">{extension.lastActivity}</p>
                    <p className="text-xs text-muted-foreground">{extension.lastSeen}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditExtension(extension)}
                      title="Edit extension"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onCallForwarding(extension)}
                      title="Call forwarding"
                    >
                      <Icon name="PhoneForwarded" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleExtension(extension)}
                      title={extension.enabled ? 'Disable extension' : 'Enable extension'}
                    >
                      <Icon name={extension.enabled ? 'UserX' : 'UserCheck'} size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden">
        {filteredExtensions.map((extension) => (
          <div key={extension.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedExtensions.includes(extension.id)}
                  onChange={(e) => handleSelectExtension(extension.id, e.target.checked)}
                  className="rounded border-border"
                />
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Phone" size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{extension.number}</p>
                  <p className="text-sm text-muted-foreground">{extension.userName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getStatusBg(extension.status)}`}>
                  <div className={`w-full h-full rounded-full ${extension.status === 'online' ? 'animate-pulse' : ''}`}></div>
                </div>
                <span className={`text-sm font-medium capitalize ${getStatusColor(extension.status)}`}>
                  {extension.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm text-foreground">{extension.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tenant</p>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/10 text-secondary">
                  {extension.tenant}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {extension.voicemail && (
                  <Icon name="Voicemail" size={14} className="text-primary" />
                )}
                {extension.callForwarding && (
                  <Icon name="PhoneForwarded" size={14} className="text-accent" />
                )}
                {extension.aiFeatures && (
                  <Icon name="Brain" size={14} className="text-success" />
                )}
                {extension.recording && (
                  <Icon name="Mic" size={14} className="text-warning" />
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditExtension(extension)}
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onCallForwarding(extension)}
                >
                  <Icon name="PhoneForwarded" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleExtension(extension)}
                >
                  <Icon name={extension.enabled ? 'UserX' : 'UserCheck'} size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExtensions.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No extensions found</h3>
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== 'all' ?'Try adjusting your search or filter criteria' :'No extensions have been configured yet'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ExtensionTable;