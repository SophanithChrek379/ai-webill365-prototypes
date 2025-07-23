'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import Badge from './Badge';

interface AppBarProps {
  className?: string;
  notificationCount?: number;
  userAvatar?: string;
  userName?: string;
  onNotificationClick?: () => void;
  onUserMenuClick?: (action: string) => void;
}

export default function AppBar({ 
  className = '',
  notificationCount = 0,
  userAvatar = '/assets/images/avatar/avatar-default.svg',
  userName = 'User',
  onNotificationClick,
  onUserMenuClick
}: AppBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (onNotificationClick) {
      onNotificationClick();
    }
  };

  const handleUserMenuAction = (action: string) => {
    if (onUserMenuClick) {
      onUserMenuClick(action);
    }
  };

  const formatNotificationCount = (count: number) => {
    if (count > 999) return '999+';
    return count.toString();
  };

  return (
    <Navbar 
      className={`app-bar ${className}`}
      expand="lg"
    >
      <div className="app-bar-container">
        {/* Left side - can be used for breadcrumbs or title */}
        <div className="app-bar-left">
          {/* Add breadcrumbs or page title here if needed */}
        </div>

        {/* Right side - notifications and user menu */}
        <div className="app-bar-right">
          {/* Notification Icon with Badge */}
          <div className="notification-container">
            <button 
              className="notification-button"
              onClick={handleNotificationClick}
              aria-label="Notifications"
            >
                             <Image
                 src="/assets/images/help-icon.svg"
                 alt="Notifications"
                 width={24}
                 height={24}
                 className="notification-icon"
               />
              {notificationCount > 0 && (
                <div className="notification-badge">
                  <Badge 
                    variant="danger" 
                    size="sm"
                    showBorder={true}
                    uppercase={true}
                  >
                    {formatNotificationCount(notificationCount)}
                  </Badge>
                </div>
              )}
            </button>
          </div>

          {/* User Avatar */}
          <div className="user-container">
            <Dropdown>
              <Dropdown.Toggle 
                variant="link" 
                className="user-avatar-button"
                id="user-dropdown"
              >
                <Image
                  src={userAvatar}
                  alt={userName}
                  width={24}
                  height={24}
                  className="user-avatar"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="user-dropdown-menu dropdown-menu-end">
                <Dropdown.Item 
                  onClick={() => handleUserMenuAction('profile')}
                  className="user-dropdown-item"
                >
                  <div className="dropdown-item-content">
                    <Image
                      src="/assets/images/user-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="dropdown-item-icon"
                    />
                    <span>Profile</span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => handleUserMenuAction('settings')}
                  className="user-dropdown-item"
                >
                  <div className="dropdown-item-content">
                    <Image
                      src="/assets/images/filter-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="dropdown-item-icon"
                    />
                    <span>Settings</span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item 
                  onClick={() => handleUserMenuAction('logout')}
                  className="user-dropdown-item logout-item"
                >
                  <div className="dropdown-item-content">
                    <Image
                      src="/assets/images/arrow-left-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="dropdown-item-icon"
                    />
                    <span>Logout</span>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </Navbar>
  );
} 