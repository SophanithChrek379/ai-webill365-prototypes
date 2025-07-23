'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Accordion } from 'react-bootstrap';
import Badge from './Badge';


interface SidebarItem {
  id: string;
  title: string;
  icon: string;
  href?: string;
  children?: SidebarItem[];
  isActive?: boolean;
}

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const [activeItem, setActiveItem] = useState<string>('dashboard');

  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '/assets/images/dashboard-icon.svg',
      href: '/admin/dashboard',
      isActive: true
    },
    {
      id: 'subscribers',
      title: 'Subscribers',
      icon: '/assets/images/layer-icon.svg',
      href: '/admin/subscribers'
    },
    {
      id: 'logs',
      title: 'Logs',
      icon: '/assets/images/log-icon.svg',
      href: '/admin/logs'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '/assets/images/filter-icon.svg',
      children: [
        {
          id: 'general',
          title: 'General',
          icon: '/assets/images/check-icon.svg',
          href: '/admin/settings/general'
        },
        {
          id: 'security',
          title: 'Security',
          icon: '/assets/images/lock-icon.svg',
          href: '/admin/settings/security'
        }
      ]
    }
  ];

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    // Here you can add navigation logic
    console.log('Navigating to:', itemId);
  };

  const renderMenuItem = (item: SidebarItem) => {
    if (item.children && item.children.length > 0) {
      return (
        <Accordion.Item 
          key={item.id} 
          eventKey={item.id}
          className="sidebar-accordion-item"
        >
          <Accordion.Header 
            className={`sidebar-accordion-header ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            <div className="sidebar-item-content">
              <div className="sidebar-item-icon">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={18}
                  height={18}
                />
              </div>
              <span className="sidebar-item-title">{item.title}</span>
            </div>
          </Accordion.Header>
          
          <Accordion.Body className="sidebar-accordion-body">
            <div className="sidebar-subnav">
              {item.children.map((child) => (
                <div 
                  key={child.id}
                  className={`sidebar-subnav-item ${activeItem === child.id ? 'active' : ''}`}
                  onClick={() => handleItemClick(child.id)}
                >
                  <div className="sidebar-item-content">
                    <div className="sidebar-item-icon">
                      <Image
                        src={child.icon}
                        alt={child.title}
                        width={18}
                        height={18}
                      />
                    </div>
                    <span className="sidebar-item-title">{child.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      );
    }

    return (
      <div 
        key={item.id}
        className={`sidebar-menu-item ${activeItem === item.id ? 'active' : ''}`}
        onClick={() => handleItemClick(item.id)}
      >
        <div className="sidebar-item-content">
          <div className="sidebar-item-icon">
            <Image
              src={item.icon}
              alt={item.title}
              width={18}
              height={18}
            />
          </div>
          <span className="sidebar-item-title">{item.title}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`sidebar ${className}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <div className="sidebar-logo">
            <Image
              src="/assets/images/project-logo.svg"
              alt="WeBill365"
              width={93}
              height={16}
              className="img-fluid"
            />
          </div>
          <Badge variant="primary" size="sm" showBorder={true} uppercase={true}>
            Admin
          </Badge>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="sidebar-nav">
        <Accordion 
          activeKey={activeItem} 
          onSelect={(key) => setActiveItem(key as string)}
          className="sidebar-accordion"
        >
          <div className="sidebar-menu">
            {sidebarItems.map(renderMenuItem)}
          </div>
        </Accordion>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-content">
          <div className="sidebar-footer-icon">
            <Image
              src="/assets/images/sidebar-icon.svg"
              alt=""
              width={18}
              height={18}
            />
          </div>
          <span className="sidebar-footer-text">WeBill365 3.1.0</span>
        </div>
      </div>
    </div>
  );
} 