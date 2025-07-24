import React from 'react';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import SystemStatus from './components/SystemStatus';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login - FreeSwitchUI Pro | Enterprise Telephony Management</title>
        <meta name="description" content="Secure login to FreeSwitchUI Pro - Enterprise-grade React web application for FreeSWitch telephony system management with multi-tenant architecture." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative min-h-screen flex">
          {/* Left Side - Branding and Info */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 flex-col justify-between">
            <div>
              <div className="text-white mb-8">
                <h1 className="text-4xl font-bold mb-4">FreeSwitchUI Pro</h1>
                <p className="text-xl text-blue-100 mb-6">
                  Enterprise Telephony Management Platform
                </p>
                <p className="text-blue-200 leading-relaxed">
                  Comprehensive web-based interface for managing FreeSWitch telephony 
                  infrastructure across multiple tenants with AI-powered communication features.
                </p>
              </div>
              
              {/* Feature Highlights */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-blue-100">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span>Multi-tenant architecture with role-based access</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-100">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span>Real-time call management and monitoring</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-100">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span>AI-powered speech analytics and automation</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-100">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span>Enterprise-grade security and compliance</span>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="text-blue-200 text-sm">
              <p>&copy; {new Date().getFullYear()} FreeSwitchUI Pro. All rights reserved.</p>
              <p className="mt-1">Trusted by telecommunications providers worldwide.</p>
            </div>
          </div>
          
          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {/* Login Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <LoginHeader />
                <LoginForm />
                <SecurityBadges />
              </div>
              
              {/* System Status */}
              <SystemStatus />
              
              {/* Mobile Branding */}
              <div className="lg:hidden mt-8 text-center">
                <p className="text-sm text-gray-600">
                  &copy; {new Date().getFullYear()} FreeSwitchUI Pro. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </>
  );
};

export default Login;