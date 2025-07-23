'use client';

import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Image from 'next/image';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '/assets/images/dashboard-icon.svg',
      isActive: true
    },
    {
      id: 'subscribers',
      label: 'Subscribers',
      icon: '/assets/images/user-icon.svg'
    },
    {
      id: 'logs',
      label: 'Logs',
      icon: '/assets/images/log-icon.svg'
    }
  ];

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    // Here you would typically navigate to the corresponding page
    console.log(`Navigating to ${itemId}`);
  };

  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <Image
              src="/assets/images/project-logo.svg"
              alt="WeBill365"
              width={93}
              height={16}
              className="brand-image"
            />
          </div>
          <div className="admin-badge">
            <span className="admin-text">Admin</span>
          </div>
        </div>
      </div>

      <div className="sidebar-menu">
        <Nav className="flex-column">
          {menuItems.map((item) => (
            <Nav.Item key={item.id}>
              <Nav.Link
                className={`sidebar-item ${item.isActive ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                <div className="sidebar-item-content">
                  <div className="sidebar-icon">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={18}
                      height={18}
                      className="icon-image"
                    />
                  </div>
                  <span className="sidebar-label">{item.label}</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>

      <div className="sidebar-footer">
        <div className="footer-item">
          <div className="footer-icon">
            <Image
              src="/assets/images/layer-icon.svg"
              alt="Version"
              width={18}
              height={18}
              className="icon-image"
            />
          </div>
          <span className="footer-text">WeBill365 3.1.0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 