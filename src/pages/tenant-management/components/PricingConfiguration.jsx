import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PricingConfiguration = ({ pricingData, onChange, disabled = false }) => {
  const [activeSection, setActiveSection] = useState('rates');

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'CAD', label: 'CAD ($)' }
  ];

  const serviceTypes = [
    { id: 'local', label: 'Local Calls', description: 'Calls within the same area code' },
    { id: 'national', label: 'National Calls', description: 'Calls within the same country' },
    { id: 'international', label: 'International Calls', description: 'Calls to other countries' },
    { id: 'mobile', label: 'Mobile Calls', description: 'Calls to mobile numbers' },
    { id: 'conference', label: 'Conference Calls', description: 'Multi-party conference calls' },
    { id: 'ai_transcription', label: 'AI Transcription', description: 'Real-time call transcription' },
    { id: 'ai_analysis', label: 'AI Analysis', description: 'Sentiment and call analytics' }
  ];

  const tierOptions = [
    { value: 'bronze', label: 'Bronze Tier' },
    { value: 'silver', label: 'Silver Tier' },
    { value: 'gold', label: 'Gold Tier' },
    { value: 'platinum', label: 'Platinum Tier' }
  ];

  const handleInputChange = (field, value) => {
    onChange?.({ ...pricingData, [field]: value });
  };

  const handleRateChange = (serviceId, field, value) => {
    const updatedRates = {
      ...pricingData.perMinuteRates,
      [serviceId]: {
        ...pricingData.perMinuteRates?.[serviceId],
        [field]: parseFloat(value) || 0
      }
    };
    handleInputChange('perMinuteRates', updatedRates);
  };

  const handleMinimumChange = (serviceId, value) => {
    const updatedMinimums = {
      ...pricingData.minimumCharges,
      [serviceId]: parseFloat(value) || 0
    };
    handleInputChange('minimumCharges', updatedMinimums);
  };

  const handleTierChange = (tierId, field, value) => {
    const updatedTiers = {
      ...pricingData.pricingTiers,
      [tierId]: {
        ...pricingData.pricingTiers?.[tierId],
        [field]: field === 'enabled' ? value : parseFloat(value) || 0
      }
    };
    handleInputChange('pricingTiers', updatedTiers);
  };

  const addCustomService = () => {
    const customId = `custom_${Date.now()}`;
    const updatedRates = {
      ...pricingData.perMinuteRates,
      [customId]: { rate: 0, enabled: true }
    };
    handleInputChange('perMinuteRates', updatedRates);
  };

  const renderRatesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-foreground">Per-Minute Rates</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Configure pricing for different call types and services
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            options={currencyOptions}
            value={pricingData.currency || 'USD'}
            onChange={(value) => handleInputChange('currency', value)}
            disabled={disabled}
            className="w-32"
          />
          {!disabled && (
            <Button variant="outline" size="sm" onClick={addCustomService} iconName="Plus">
              Add Service
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {serviceTypes.map((service) => {
          const rate = pricingData.perMinuteRates?.[service.id] || { rate: 0, enabled: true };
          return (
            <div key={service.id} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={rate.enabled}
                    onChange={(e) => handleRateChange(service.id, 'enabled', e.target.checked)}
                    disabled={disabled}
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">{service.label}</div>
                    <div className="text-xs text-muted-foreground">{service.description}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={rate.rate}
                    onChange={(e) => handleRateChange(service.id, 'rate', e.target.value)}
                    step="0.001"
                    min="0"
                    max="999.999"
                    disabled={disabled || !rate.enabled}
                    className="w-24 text-right"
                  />
                  <span className="text-sm text-muted-foreground">
                    {pricingData.currency || 'USD'}/min
                  </span>
                </div>
              </div>
              {rate.enabled && (
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Peak Rate"
                    type="number"
                    value={rate.peakRate || rate.rate * 1.2}
                    onChange={(e) => handleRateChange(service.id, 'peakRate', e.target.value)}
                    step="0.001"
                    min="0"
                    disabled={disabled}
                    description="Higher rate during peak hours"
                  />
                  <Input
                    label="Off-Peak Rate"
                    type="number"
                    value={rate.offPeakRate || rate.rate * 0.8}
                    onChange={(e) => handleRateChange(service.id, 'offPeakRate', e.target.value)}
                    step="0.001"
                    min="0"
                    disabled={disabled}
                    description="Lower rate during off-peak hours"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMinimumChargesSection = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-foreground">Minimum Charges</h4>
        <p className="text-xs text-muted-foreground mt-1">
          Set minimum billing amounts for different services
        </p>
      </div>

      <div className="grid gap-4">
        <div className="bg-muted/30 rounded-lg p-4">
          <h5 className="text-sm font-medium text-foreground mb-3">Global Minimums</h5>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Per Call Minimum"
              type="number"
              value={pricingData.globalMinimums?.perCall || 0}
              onChange={(e) => handleInputChange('globalMinimums', {
                ...pricingData.globalMinimums,
                perCall: parseFloat(e.target.value) || 0
              })}
              step="0.01"
              min="0"
              disabled={disabled}
              description="Minimum charge per call regardless of duration"
            />
            <Input
              label="Monthly Minimum"
              type="number"
              value={pricingData.globalMinimums?.monthly || 0}
              onChange={(e) => handleInputChange('globalMinimums', {
                ...pricingData.globalMinimums,
                monthly: parseFloat(e.target.value) || 0
              })}
              step="0.01"
              min="0"
              disabled={disabled}
              description="Minimum monthly billing amount"
            />
          </div>
        </div>

        {serviceTypes.filter(s => pricingData.perMinuteRates?.[s.id]?.enabled).map((service) => (
          <div key={service.id} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">{service.label}</div>
                <div className="text-xs text-muted-foreground">{service.description}</div>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={pricingData.minimumCharges?.[service.id] || 0}
                  onChange={(e) => handleMinimumChange(service.id, e.target.value)}
                  step="0.01"
                  min="0"
                  disabled={disabled}
                  className="w-24 text-right"
                />
                <span className="text-sm text-muted-foreground">
                  {pricingData.currency || 'USD'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={16} className="text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Minimum Charge Policy
            </h5>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
              Minimum charges ensure profitability for short calls. They are applied when the calculated per-minute cost is below the minimum threshold.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPricingTiersSection = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-foreground">Customer Pricing Tiers</h4>
        <p className="text-xs text-muted-foreground mt-1">
          Create pricing tiers based on usage volume or customer status
        </p>
      </div>

      <div className="grid gap-4">
        {tierOptions.map((tier) => {
          const tierData = pricingData.pricingTiers?.[tier.value] || {};
          return (
            <div key={tier.value} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={tierData.enabled || false}
                    onChange={(e) => handleTierChange(tier.value, 'enabled', e.target.checked)}
                    disabled={disabled}
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">{tier.label}</div>
                    <div className="text-xs text-muted-foreground">
                      Volume-based pricing discounts
                    </div>
                  </div>
                </div>
                <div className="text-sm text-primary font-medium">
                  {tierData.discount || 0}% discount
                </div>
              </div>

              {tierData.enabled && (
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    label="Min Volume (mins/month)"
                    type="number"
                    value={tierData.minVolume || 0}
                    onChange={(e) => handleTierChange(tier.value, 'minVolume', e.target.value)}
                    min="0"
                    disabled={disabled}
                  />
                  <Input
                    label="Max Volume (mins/month)"
                    type="number"
                    value={tierData.maxVolume || 999999}
                    onChange={(e) => handleTierChange(tier.value, 'maxVolume', e.target.value)}
                    min="0"
                    disabled={disabled}
                  />
                  <Input
                    label="Discount %"
                    type="number"
                    value={tierData.discount || 0}
                    onChange={(e) => handleTierChange(tier.value, 'discount', e.target.value)}
                    min="0"
                    max="50"
                    step="0.1"
                    disabled={disabled}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Tier Assignment
            </h5>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              Customers are automatically assigned to the appropriate tier based on their monthly usage volume. Higher tiers receive better rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingParametersSection = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-foreground">Billing Parameters</h4>
        <p className="text-xs text-muted-foreground mt-1">
          Configure billing rules and payment terms
        </p>
      </div>

      <div className="grid gap-4">
        <div className="bg-muted/30 rounded-lg p-4">
          <h5 className="text-sm font-medium text-foreground mb-3">Billing Cycle</h5>
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Billing Frequency"
              options={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
                { value: 'annual', label: 'Annual' }
              ]}
              value={pricingData.billingCycle?.frequency || 'monthly'}
              onChange={(value) => handleInputChange('billingCycle', {
                ...pricingData.billingCycle,
                frequency: value
              })}
              disabled={disabled}
            />
            <Input
              label="Payment Terms (days)"
              type="number"
              value={pricingData.billingCycle?.paymentTerms || 30}
              onChange={(e) => handleInputChange('billingCycle', {
                ...pricingData.billingCycle,
                paymentTerms: parseInt(e.target.value) || 30
              })}
              min="1"
              max="90"
              disabled={disabled}
            />
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <h5 className="text-sm font-medium text-foreground mb-3">Rate Calculation</h5>
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Billing Increment"
              options={[
                { value: '1', label: '1 second' },
                { value: '6', label: '6 seconds' },
                { value: '30', label: '30 seconds' },
                { value: '60', label: '1 minute' }
              ]}
              value={pricingData.rateCalculation?.increment || '6'}
              onChange={(value) => handleInputChange('rateCalculation', {
                ...pricingData.rateCalculation,
                increment: value
              })}
              disabled={disabled}
              description="How call duration is rounded for billing"
            />
            <Select
              label="Rate Precision"
              options={[
                { value: '2', label: '2 decimal places' },
                { value: '3', label: '3 decimal places' },
                { value: '4', label: '4 decimal places' }
              ]}
              value={pricingData.rateCalculation?.precision || '3'}
              onChange={(value) => handleInputChange('rateCalculation', {
                ...pricingData.rateCalculation,
                precision: value
              })}
              disabled={disabled}
              description="Decimal precision for rate calculations"
            />
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <h5 className="text-sm font-medium text-foreground mb-3">Special Conditions</h5>
          <div className="space-y-3">
            <Checkbox
              label="Apply Connection Fee"
              checked={pricingData.specialConditions?.connectionFee?.enabled || false}
              onChange={(e) => handleInputChange('specialConditions', {
                ...pricingData.specialConditions,
                connectionFee: {
                  ...pricingData.specialConditions?.connectionFee,
                  enabled: e.target.checked
                }
              })}
              disabled={disabled}
              description="Charge a one-time fee for establishing connection"
            />
            {pricingData.specialConditions?.connectionFee?.enabled && (
              <Input
                type="number"
                value={pricingData.specialConditions?.connectionFee?.amount || 0}
                onChange={(e) => handleInputChange('specialConditions', {
                  ...pricingData.specialConditions,
                  connectionFee: {
                    ...pricingData.specialConditions?.connectionFee,
                    amount: parseFloat(e.target.value) || 0
                  }
                })}
                step="0.01"
                min="0"
                disabled={disabled}
                className="ml-6 w-32"
              />
            )}
            
            <Checkbox
              label="Weekend/Holiday Rates"
              checked={pricingData.specialConditions?.weekendRates || false}
              onChange={(e) => handleInputChange('specialConditions', {
                ...pricingData.specialConditions,
                weekendRates: e.target.checked
              })}
              disabled={disabled}
              description="Apply different rates for weekends and holidays"
            />

            <Checkbox
              label="Volume Commitments"
              checked={pricingData.specialConditions?.volumeCommitments || false}
              onChange={(e) => handleInputChange('specialConditions', {
                ...pricingData.specialConditions,
                volumeCommitments: e.target.checked
              })}
              disabled={disabled}
              description="Require minimum usage commitments for better rates"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'rates', label: 'Per-Minute Rates', icon: 'DollarSign' },
    { id: 'minimums', label: 'Minimum Charges', icon: 'TrendingUp' },
    { id: 'tiers', label: 'Pricing Tiers', icon: 'Layers' },
    { id: 'billing', label: 'Billing Parameters', icon: 'Settings' }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'rates': return renderRatesSection();
      case 'minimums': return renderMinimumChargesSection();
      case 'tiers': return renderPricingTiersSection();
      case 'billing': return renderBillingParametersSection();
      default: return renderRatesSection();
    }
  };

  return (
    <div className="flex h-full">
      {/* Section Navigation */}
      <div className="w-48 border-r border-border pr-4 mr-6">
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={section.icon} size={14} />
              <span className="text-xs font-medium">{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default PricingConfiguration;