import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    tenant: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTenantSelector, setShowTenantSelector] = useState(false);

  // Mock tenant options for MSP users
  const tenantOptions = [
    { value: 'abc-corp', label: 'ABC Corporation', description: 'Primary tenant' },
    { value: 'xyz-ltd', label: 'XYZ Limited', description: 'Secondary tenant' },
    { value: 'tech-solutions', label: 'Tech Solutions Inc', description: 'Enterprise client' },
    { value: 'global-comm', label: 'Global Communications', description: 'Telecom provider' }
  ];

  // Mock credentials for authentication
  const mockCredentials = {
    admin: { email: 'admin@freeswitchui.com', password: 'admin123', role: 'Super Admin' },
    msp: { email: 'msp@provider.com', password: 'msp456', role: 'MSP Manager' },
    tenant: { email: 'user@abccorp.com', password: 'user789', role: 'Tenant Admin' }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (showTenantSelector && !formData.tenant) {
      newErrors.tenant = 'Please select a tenant';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      const isValidCredentials = Object.values(mockCredentials).some(
        cred => cred.email === formData.email && cred.password === formData.password
      );
      
      if (!isValidCredentials) {
        setErrors({
          general: `Invalid credentials. Try: admin@freeswitchui.com / admin123, msp@provider.com / msp456, or user@abccorp.com / user789`
        });
        setIsLoading(false);
        return;
      }
      
      // Successful login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      navigate('/dashboard');
      
    } catch (error) {
      setErrors({
        general: 'Connection failed. Please check your network and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here. For demo, use the provided mock credentials.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{errors.general}</p>
            </div>
          </div>
        )}

        {/* MSP Tenant Selector Toggle */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showTenantSelector}
              onChange={(e) => setShowTenantSelector(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">MSP Multi-Tenant Access</span>
          </label>
        </div>

        {/* Tenant Selection */}
        {showTenantSelector && (
          <Select
            label="Select Tenant"
            placeholder="Choose your tenant organization"
            options={tenantOptions}
            value={formData.tenant}
            onChange={(value) => handleInputChange('tenant', value)}
            error={errors.tenant}
            searchable
            className="mb-4"
          />
        )}

        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
          disabled={isLoading}
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={errors.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Forgot Password Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            disabled={isLoading}
          >
            Forgot your password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;