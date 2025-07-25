"use client";

import React from "react";
import { Nav } from "react-bootstrap";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { getImagePath, getIconAssetPath } from "@/utils/assetUtils";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: getIconAssetPath("/assets/images/dashboard-icon.svg"),
      path: "/dashboard",
    },
    {
      id: "subscribers",
      label: "Subscribers",
      icon: getIconAssetPath("/assets/images/subscriber-icon.svg"),
      path: "/subscribers",
    },
    {
      id: "logs",
      label: "Logs",
      icon: getIconAssetPath("/assets/images/log-icon.svg"),
      path: "/logs",
    },
  ];

  const handleItemClick = (path: string) => {
    if (path !== "#") {
      router.push(path);
    }
  };

  const isActive = (path: string) => {
    // Handle root path for dashboard
    if (
      path === "/dashboard" &&
      (pathname === "/" || pathname === "/dashboard")
    ) {
      return true;
    }
    // Check if current pathname starts with the menu path (for nested routes)
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand w-100 d-flex justify-content-between align-content-center">
          <div className="d-inline-flex align-items-center gap-1">
            <button className="wl-btn-icon wl-btn-sm wl-btn-primar-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M2.65333 13C2.47145 13 2.3159 12.9314 2.18667 12.7941C2.06222 12.6517 2 12.484 2 12.2908C2 12.1026 2.06222 11.9399 2.18667 11.8027C2.3159 11.6603 2.47145 11.5891 2.65333 11.5891H15.3467C15.5285 11.5891 15.6817 11.6578 15.8062 11.795C15.9354 11.9323 16 12.0976 16 12.2908C16 12.484 15.9354 12.6517 15.8062 12.7941C15.6817 12.9314 15.5285 13 15.3467 13H2.65333ZM2.65333 9.69781C2.47145 9.69781 2.3159 9.62917 2.18667 9.4919C2.06222 9.35462 2 9.18939 2 8.99619C2 8.80299 2.06222 8.63775 2.18667 8.50048C2.3159 8.3632 2.47145 8.29457 2.65333 8.29457H15.3467C15.5285 8.29457 15.6817 8.3632 15.8062 8.50048C15.9354 8.63267 16 8.7979 16 8.99619C16 9.18939 15.9354 9.35462 15.8062 9.4919C15.6817 9.62917 15.5285 9.69781 15.3467 9.69781H2.65333ZM2.65333 6.41087C2.47145 6.41087 2.3159 6.33969 2.18667 6.19733C2.06222 6.05497 2 5.88974 2 5.70162C2 5.5135 2.06222 5.35081 2.18667 5.21354C2.3159 5.07118 2.47145 5 2.65333 5H15.3467C15.5285 5 15.6817 5.06864 15.8062 5.20591C15.9354 5.34318 16 5.50842 16 5.70162C16 5.89482 15.9354 6.0626 15.8062 6.20496C15.6817 6.34223 15.5285 6.41087 15.3467 6.41087H2.65333Z"
                  fill="#171717"
                />
              </svg>
            </button>
            <div className="brand-logo">
              <Image
                src={getImagePath("project-logo.svg")}
                alt="WeBill365"
                width={93}
                height={16}
                className="brand-image"
              />
            </div>
          </div>
          <span className="wl-badge-guide wl-badge-guide-valid wl-badge-guide-sm wl-badge-guide-rounded">
            Admin
          </span>
        </div>
      </div>

      <div className="sidebar-menu">
        <Nav className="flex-column">
          {menuItems.map((item) => (
            <Nav.Item key={item.id}>
              <Nav.Link
                className={`sidebar-item ${
                  isActive(item.path) ? "active" : ""
                }`}
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
              src={getImagePath("layer-icon.svg")}
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
