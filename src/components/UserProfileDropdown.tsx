import React from "react";
import { Dropdown, DropdownMenu, DropdownItem } from "react-bootstrap";

interface UserProfileMenuItem {
  id: string;
  label: string;
  icon: string;
  onClick?: () => void;
}

interface UserProfileDropdownProps {
  items?: UserProfileMenuItem[];
  show?: boolean;
  onHide?: () => void;
  className?: string;
  children?: React.ReactNode; // For the trigger element
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ 
  items = [], 
  show, 
  onHide, 
  className = "", 
  children 
}) => {
  // Default menu items if none provided
  const defaultItems: UserProfileMenuItem[] = [
    {
      id: "profile",
      label: "Profile",
      icon: "/assets/images/user-icon.svg",
      onClick: () => {
        console.log("Profile clicked");
        onHide?.();
      },
    },
    {
      id: "settings",
      label: "Settings",
      icon: "/assets/images/user-icon.svg",
      onClick: () => {
        console.log("Settings clicked");
        onHide?.();
      },
    },
    {
      id: "logout",
      label: "Logout",
      icon: "/assets/images/user-icon.svg",
      onClick: () => {
        console.log("Logout clicked");
        onHide?.();
      },
    },
  ];

  const menuItems = items.length > 0 ? items : defaultItems;

  return (
    <Dropdown show={show} onToggle={onHide} className={className} align="end">
      <Dropdown.Toggle as="div" className="user-profile-toggle">
        {children}
      </Dropdown.Toggle>
      <DropdownMenu className="user-profile-dropdown">
        {menuItems.map((item) => (
          <DropdownItem
            key={item.id}
            className="user-profile-item"
            onClick={item.onClick}
          >
            <div className="user-profile-item-content">
              <div className="user-profile-item-icon">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="user-profile-icon"
                />
              </div>
              <span className="user-profile-item-label">{item.label}</span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserProfileDropdown; 