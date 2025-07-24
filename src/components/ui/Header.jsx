import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Tooltip from './Tooltip';
import useClickOutside from '../../hooks/useClickOutside';

const Header = ({ onSidebarToggle, sidebarCollapsed }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  // Click outside handlers using the custom hook
  const notificationsRef = useClickOutside(
    () => setNotificationsOpen(false),
    notificationsOpen
  );
  
  const userMenuRef = useClickOutside(
    () => setUserMenuOpen(false),
    userMenuOpen
  );

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Server Status',
      message: 'FreeSWITCH server fs-01 is running normally',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Call Volume',
      message: 'Tenant ABC Corp experiencing 85% capacity',
      time: '5 min ago',
      read: false
    },
    {
      id: 3,
      type: 'error',
      title: 'Connection Failed',
      message: 'Unable to connect to extension 1001',
      time: '12 min ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getPageTitle = () => {
    const pathMap = {
      '/dashboard': 'Dashboard',
      '/tenant-management': 'Tenant Management',
      '/call-management': 'Call Management',
      '/extension-management': 'Extension Management',
      '/ai-services-dashboard': 'AI Services',
      '/billing-dashboard': 'Billing',
      '/call-detail-records-cdr': 'Call Records',
      '/free-s-witch-server-management': 'Server Management'
    };
    return pathMap[location.pathname] || 'FreeSwitchUI Pro';
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-sm border-b border-border z-1000 glass-effect">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo and Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <Tooltip content="Toggle sidebar" position="bottom">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              className="smooth-hover user-friendly-focus"
            >
              <Icon name={sidebarCollapsed ? "PanelLeftOpen" : "PanelLeftClose"} size={20} />
            </Button>
          </Tooltip>
          
          <Link to="/dashboard" className="flex items-center space-x-3 smooth-hover">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Phone" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-foreground">FreeSwitchUI Pro</h1>
              <p className="text-xs text-muted-foreground">{getPageTitle()}</p>
            </div>
          </Link>
        </div>

        {/* Center Section - Search (on larger screens) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tenants, extensions, or calls..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent smooth-hover"
            />
          </div>
        </div>

        {/* Right Section - Actions and User Menu */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Tooltip content="System health status" position="bottom">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 text-success rounded-full text-xs font-medium">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
                <span>All Systems Operational</span>
              </div>
            </Tooltip>
          </div>

          {/* Tenant Selector */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg smooth-hover">
            <Icon name="Building2" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">ABC Corp</span>
            <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <Tooltip content="View notifications" position="bottom">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative smooth-hover user-friendly-focus"
              >
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center animate-bounce-gentle">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </Tooltip>

            {notificationsOpen && (
              <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-lg z-1001 animate-fade-in">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                      Mark all read
                    </Button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border hover:bg-muted/50 cursor-pointer smooth-hover ${
                          !notification.read ? 'bg-accent/5 border-l-4 border-l-accent' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon
                            name={getNotificationIcon(notification.type)}
                            size={16}
                            className={getNotificationColor(notification.type)}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full text-center">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <Tooltip content="Account menu" position="bottom">
              <Button
                variant="ghost"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 smooth-hover user-friendly-focus"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@company.com</p>
                </div>
                <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
              </Button>
            </Tooltip>

            {userMenuOpen && (
              <div className="absolute right-0 top-12 w-56 bg-popover border border-border rounded-lg shadow-lg z-1001 animate-fade-in">
                <div className="p-2">
                  <Button variant="ghost" className="w-full justify-start smooth-hover">
                    <Icon name="User" size={16} className="mr-2" />
                    Profile Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start smooth-hover">
                    <Icon name="Settings" size={16} className="mr-2" />
                    System Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start smooth-hover">
                    <Icon name="Palette" size={16} className="mr-2" />
                    Theme Preferences
                  </Button>
                  <Button variant="ghost" className="w-full justify-start smooth-hover">
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Help & Support
                  </Button>
                  <div className="border-t border-border my-2"></div>
                  <Button variant="ghost" className="w-full justify-start text-error hover:text-error smooth-hover">
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;