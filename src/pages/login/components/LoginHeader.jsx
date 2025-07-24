import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <Icon name="Phone" size={32} color="white" />
        </div>
      </div>
      
      {/* Title and Description */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        FreeSwitchUI Pro
      </h1>
      <p className="text-gray-600 text-sm mb-4">
        Enterprise Telephony Management Platform
      </p>
      
      {/* Welcome Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <h3 className="text-sm font-medium text-blue-900 mb-1">
              Welcome to FreeSwitchUI Pro
            </h3>
            <p className="text-xs text-blue-800">
              Secure access to your telecommunications infrastructure management platform. 
              Sign in with your administrator credentials to continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;