import React, { useState } from 'react';
import { X, CheckCircle, Server, Users, Phone, CreditCard } from 'lucide-react';
import Button from './Button';
import Input from './Input';

const QuickSetupModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [setupData, setSetupData] = useState({
    tenantName: '',
    serverConfig: '',
    extensionCount: '10',
    billingPlan: 'basic'
  });

  if (!isOpen) return null;

  const steps = [
    {
      id: 1,
      title: 'Tenant Setup',
      icon: Server,
      description: 'Configure your primary tenant'
    },
    {
      id: 2,
      title: 'Extensions',
      icon: Users,
      description: 'Set up user extensions'
    },
    {
      id: 3,
      title: 'Server Config',
      icon: Phone,
      description: 'Configure FreeSWITCH server'
    },
    {
      id: 4,
      title: 'Billing',
      icon: CreditCard,
      description: 'Choose billing plan'
    }
  ];

  const handleInputChange = (field, value) => {
    setSetupData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Handle setup completion
    console.log('Setup completed:', setupData);
    onClose();
    setCurrentStep(1);
    setSetupData({
      tenantName: '',
      serverConfig: '',
      extensionCount: '10',
      billingPlan: 'basic'
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tenant Name
              </label>
              <Input
                type="text"
                placeholder="Enter tenant name"
                value={setupData.tenantName}
                onChange={(e) => handleInputChange('tenantName', e.target.value)}
                className="w-full"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              This will be your primary tenant for the VoIP system.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Number of Extensions
              </label>
              <Input
                type="number"
                min="1"
                max="1000"
                value={setupData.extensionCount}
                onChange={(e) => handleInputChange('extensionCount', e.target.value)}
                className="w-full"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Extensions will be automatically generated based on this number.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Server Configuration
              </label>
              <Input
                type="text"
                placeholder="server.example.com:5060"
                value={setupData.serverConfig}
                onChange={(e) => handleInputChange('serverConfig', e.target.value)}
                className="w-full"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your FreeSWITCH server hostname and port.
            </p>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Billing Plan
              </label>
              <select
                value={setupData.billingPlan}
                onChange={(e) => handleInputChange('billingPlan', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="basic">Basic - $0.01/min</option>
                <option value="premium">Premium - $0.005/min</option>
                <option value="enterprise">Enterprise - Custom</option>
              </select>
            </div>
            <p className="text-sm text-muted-foreground">
              You can change this later in the billing dashboard.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Quick Setup</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <X size={16} />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted
                        ? 'bg-success text-success-foreground'
                        : isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={16} />
                    ) : (
                      <StepIcon size={16} />
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`absolute h-px w-full top-4 left-1/2 ${
                      isCompleted ? 'bg-success' : 'bg-border'
                    }`} style={{ zIndex: -1 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-foreground mb-2">
              {steps[currentStep - 1]?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentStep} of {steps.length}
          </span>
          {currentStep === steps.length ? (
            <Button onClick={handleComplete}>
              Complete Setup
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickSetupModal;