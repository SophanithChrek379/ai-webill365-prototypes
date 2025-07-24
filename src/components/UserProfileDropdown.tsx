import React from "react";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserProfileMenuItem {
  id: string;
  label: string;
  icon: string;
  onClick?: () => void;
  path?: string; // Navigation path
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
  children,
}) => {
  const router = useRouter();

  // Default menu items if none provided
  const defaultItems: UserProfileMenuItem[] = [
    {
      id: "profile",
      label: "Profile",
      icon: "/assets/images/user-icon.svg",
      path: "/profile",
      onClick: () => {
        console.log("Profile clicked");
        router.push("/profile");
        onHide?.();
      },
    },
    {
      id: "settings",
      label: "Settings",
      icon: "/assets/images/user-icon.svg",
      path: "/settings",
      onClick: () => {
        console.log("Settings clicked");
        router.push("/settings");
        onHide?.();
      },
    },
    {
      id: "logout",
      label: "Logout",
      icon: "/assets/images/user-icon.svg",
      path: "/login",
      onClick: () => {
        console.log("Logout clicked");
        // You can add logout logic here (clear tokens, etc.)
        router.push("/login");
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
      <Dropdown.Menu className="user-profile-dropdown">
        {menuItems.map((item) => (
          <Dropdown.Item
            key={item.id}
            className="user-profile-item"
            onClick={() => {
              console.log(`Clicked on ${item.label} with path: ${item.path}`);
              if (item.onClick) {
                item.onClick();
              } else if (item.path) {
                console.log(`Navigating to: ${item.path}`);
                router.push(item.path);
                onHide?.();
              }
            }}
          >
            <div className="user-profile-item-content">
              <div className="user-profile-item-icon">
                <Image
                  width={16}
                  height={16}
                  src={item.icon}
                  alt={item.label}
                  className="user-profile-icon"
                />
              </div>
              <span className="user-profile-item-label">{item.label}</span>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfileDropdown;
