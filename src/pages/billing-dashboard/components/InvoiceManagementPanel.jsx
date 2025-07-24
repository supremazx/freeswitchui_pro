import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InvoiceManagementPanel = () => {
  const [activeView, setActiveView] = useState('recent');
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  const recentInvoices = [
    {
      id: 'INV-2024-001',
      tenant: 'Enterprise Corp',
      amount: 45000,
      status: 'paid',
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      paidDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      currency: 'USD',
      items: 5
    },
    {
      id: 'INV-2024-002',
      tenant: 'TechStart Inc',
      amount: 32000,
      status: 'pending',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      paidDate: null,
      currency: 'USD',
      items: 3
    },
    {
      id: 'INV-2024-003',
      tenant: 'StartupTech Ltd',
      amount: 15000,
      status: 'overdue',
      dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      paidDate: null,
      currency: 'USD',
      items: 2
    },
    {
      id: 'INV-2024-004',
      tenant: 'Global Services',
      amount: 28000,
      status: 'draft',
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      paidDate: null,
      currency: 'USD',
      items: 4
    },
    {
      id: 'INV-2024-005',
      tenant: 'Digital Solutions',
      amount: 24000,
      status: 'sent',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      paidDate: null,
      currency: 'USD',
      items: 6
    },
    {
      id: 'INV-2024-006',
      tenant: 'Cloud Networks',
      amount: 18000,
      status: 'paid',
      dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      paidDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      currency: 'USD',
      items: 3
    }
  ];

  const upcomingInvoices = [
    {
      tenant: 'Enterprise Corp',
      estimatedAmount: 47000,
      generationDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      billingPeriod: 'February 2024'
    },
    {
      tenant: 'TechStart Inc',
      estimatedAmount: 34000,
      generationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      billingPeriod: 'February 2024'
    },
    {
      tenant: 'Global Services',
      estimatedAmount: 29000,
      generationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      billingPeriod: 'February 2024'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      paid: 'text-success bg-success/10 border-success/20',
      pending: 'text-warning bg-warning/10 border-warning/20',
      overdue: 'text-error bg-error/10 border-error/20',
      draft: 'text-muted-foreground bg-muted/10 border-muted/20',
      sent: 'text-accent bg-accent/10 border-accent/20'
    };
    return colors[status] || 'text-muted-foreground bg-muted/10';
  };

  const getStatusIcon = (status) => {
    const icons = {
      paid: 'CheckCircle',
      pending: 'Clock',
      overdue: 'AlertTriangle',
      draft: 'FileEdit',
      sent: 'Send'
    };
    return icons[status] || 'FileText';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleInvoiceSelect = (invoiceId) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedInvoices.length === recentInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(recentInvoices.map(inv => inv.id));
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Invoice Management</h3>
          <p className="text-sm text-muted-foreground">
            {recentInvoices.filter(inv => inv.status === 'overdue').length} overdue • 
            {recentInvoices.filter(inv => inv.status === 'pending').length} pending • 
            {recentInvoices.filter(inv => inv.status === 'draft').length} drafts
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Icon name="Plus" size={14} className="mr-2" />
            New Invoice
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="FileDown" size={14} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        <Button
          variant={activeView === 'recent' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveView('recent')}
          className="flex-1 h-8"
        >
          <Icon name="FileText" size={14} className="mr-2" />
          Recent Invoices
        </Button>
        <Button
          variant={activeView === 'upcoming' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveView('upcoming')}
          className="flex-1 h-8"
        >
          <Icon name="Calendar" size={14} className="mr-2" />
          Upcoming
        </Button>
      </div>

      {activeView === 'recent' ? (
        <>
          {/* Bulk Actions */}
          {selectedInvoices.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-accent/10 border border-accent/20 rounded-lg mb-4">
              <span className="text-sm text-accent">
                {selectedInvoices.length} invoice{selectedInvoices.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-7">
                  <Icon name="Send" size={12} className="mr-1" />
                  Send
                </Button>
                <Button variant="outline" size="sm" className="h-7">
                  <Icon name="Download" size={12} className="mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="h-7">
                  <Icon name="Trash2" size={12} className="mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Invoice Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.length === recentInvoices.length}
                      onChange={handleSelectAll}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Invoice</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Tenant</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Due Date</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedInvoices.includes(invoice.id)}
                        onChange={() => handleInvoiceSelect(invoice.id)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{invoice.id}</p>
                        <p className="text-xs text-muted-foreground">{invoice.items} items</p>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-foreground">{invoice.tenant}</td>
                    <td className="p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          ${invoice.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{invoice.currency}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center space-x-1 text-xs px-2 py-1 rounded-full border ${getStatusColor(invoice.status)}`}>
                        <Icon name={getStatusIcon(invoice.status)} size={12} />
                        <span className="capitalize">{invoice.status}</span>
                      </span>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="text-sm text-foreground">{formatDate(invoice.dueDate)}</p>
                        {invoice.paidDate && (
                          <p className="text-xs text-success">Paid {formatDate(invoice.paidDate)}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="w-7 h-7">
                          <Icon name="Eye" size={12} />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-7 h-7">
                          <Icon name="Edit" size={12} />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-7 h-7">
                          <Icon name="Download" size={12} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Upcoming Invoices */
        <div className="space-y-4">
          {upcomingInvoices.map((invoice, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{invoice.tenant}</p>
                    <p className="text-sm text-muted-foreground">{invoice.billingPeriod}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-foreground">
                    ${invoice.estimatedAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Estimated</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Generates on {formatDate(invoice.generationDate)}
                </span>
                <Button variant="outline" size="sm" className="h-7">
                  <Icon name="Edit" size={12} className="mr-1" />
                  Preview
                </Button>
              </div>
            </div>
          ))}
          
          <div className="text-center py-6 border-2 border-dashed border-border rounded-lg">
            <Icon name="Plus" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Set up automated invoice generation</p>
            <Button variant="outline" size="sm">
              Configure Automation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceManagementPanel;