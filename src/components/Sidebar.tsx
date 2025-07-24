'use client';

import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '/assets/images/dashboard-icon.svg',
      path: '/dashboard'
    },
    {
      id: 'subscribers',
      label: 'Subscribers',
      icon: '/assets/images/user-icon.svg',
      path: '/subscribers'
    },
    {
      id: 'logs',
      label: 'Logs',
      icon: '/assets/images/log-icon.svg',
      path: '#'
    }
  ];

  const handleItemClick = (path: string) => {
    router.push(path);
  };

  const isActive = (path: string) => {
    return pathname === path;
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
                className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => handleItemClick(item.path)}
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