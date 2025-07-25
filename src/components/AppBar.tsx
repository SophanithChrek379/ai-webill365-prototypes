"use client";

import React, { useState } from "react";
import { Navbar, Badge, Image } from "react-bootstrap";
import UserProfileDropdown from "./UserProfileDropdown";
import {
  getImagePath,
  getAvatarPath,
  getIconAssetPath,
} from "@/utils/assetUtils";

interface AppBarProps {
  className?: string;
}

const AppBar: React.FC<AppBarProps> = ({ className = "" }) => {
  const [notificationCount] = useState(99);

  const handleNotificationClick = () => {
    console.log("Notification clicked");
    // Here you would typically show a notification panel
  };

  // Custom menu items for the user profile dropdown
  const userProfileItems = [
    {
      id: "profile",
      label: "Krong Kampuchea",
      icon: getIconAssetPath("/assets/images/user-icon.svg"),
      path: "#",
    },
    {
      id: "settings",
      label: "Settings",
      icon: getIconAssetPath("/assets/images/setting-icon.svg"),
      path: "#",
    },
    {
      id: "logout",
      label: "Logout",
      icon: getIconAssetPath("/assets/images/logout-icon.svg"),
      path: "/",
    },
  ];

  return (
    <Navbar className={`wl-page-header ${className}`} expand="lg">
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
                  src={getImagePath("bell-icon.svg")}
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
                  src={getAvatarPath("avatar-01.svg")}
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
