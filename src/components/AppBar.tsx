"use client";

import React, { useState } from "react";
import { Navbar, Nav, Badge, Image } from "react-bootstrap";
import UserProfileDropdown from "./UserProfileDropdown";

interface AppBarProps {
  className?: string;
}

const AppBar: React.FC<AppBarProps> = ({ className = "" }) => {
  const [notificationCount] = useState(99);

  const handleNotificationClick = () => {
    console.log("Notification clicked");
    // Here you would typically show a notification panel
  };

  const handleUserMenuClick = (action: string) => {
    console.log("User menu action:", action);
    switch (action) {
      case "profile":
        console.log("Profile page would open");
        break;
      case "settings":
        console.log("Settings page would open");
        break;
      case "logout":
        console.log("Logout would be triggered");
        break;
      default:
        break;
    }
  };

  // Custom menu items for the user profile dropdown
  const userProfileItems = [
    {
      id: "profile",
      label: "Krong Kampuchea",
      icon: "/assets/images/user-icon.svg",
      path: "#",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "/assets/images/setting-icon.svg",
      path: "#",
    },
    {
      id: "logout",
      label: "Logout",
      icon: "/assets/images/logout-icon.svg",
      path: "/",
    },
  ];

  return (
    <Navbar className={`app-bar ${className}`} expand="lg">
      <div className="app-bar-container">
        <div className="app-bar-content">
          <div className="app-bar-spacer"></div>

          <div className="app-bar-actions">
            <div className="notification-container">
              <div
                className="notification-icon"
                onClick={handleNotificationClick}
              >
                <Image
                  src="/assets/images/bell-icon.svg"
                  alt="Notifications"
                  width={24}
                  height={24}
                  className="notification-image"
                />
                {notificationCount > 0 && (
                  <Badge className="notification-badge">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </Badge>
                )}
              </div>
            </div>

            <div className="user-avatar">
              <UserProfileDropdown items={userProfileItems}>
                <Image
                  src="/assets/images/avatar/avatar-01.svg"
                  alt="User Avatar"
                  width={24}
                  height={24}
                  className="avatar-image"
                />
              </UserProfileDropdown>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default AppBar;
