'use client';

import React, { useState } from 'react';
import { Navbar, Nav, Badge, Dropdown, Image } from 'react-bootstrap';

interface AppBarProps {
  className?: string;
}

const AppBar: React.FC<AppBarProps> = ({ className = '' }) => {
  const [notificationCount] = useState(99);

  const handleNotificationClick = () => {
    console.log('Notification clicked');
    // Here you would typically show a notification panel
  };

  const handleUserMenuClick = (action: string) => {
    console.log('User menu action:', action);
    switch (action) {
      case 'profile':
        console.log('Profile page would open');
        break;
      case 'settings':
        console.log('Settings page would open');
        break;
      case 'logout':
        console.log('Logout would be triggered');
        break;
      default:
        break;
    }
  };

  return (
    <Navbar className={`app-bar ${className}`} expand="lg">
      <div className="app-bar-container">
        <div className="app-bar-content">
          <div className="app-bar-spacer"></div>
          
          <div className="app-bar-actions">
            <div className="notification-container">
              <div className="notification-icon" onClick={handleNotificationClick}>
                <Image
                  src="/assets/images/help-icon.svg"
                  alt="Notifications"
                  width={24}
                  height={24}
                  className="notification-image"
                />
                {notificationCount > 0 && (
                  <Badge className="notification-badge">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="user-avatar">
              <Image
                src="/assets/images/avatar/avatar-01.svg"
                alt="User Avatar"
                width={24}
                height={24}
                className="avatar-image"
              />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default AppBar; 