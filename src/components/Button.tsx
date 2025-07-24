import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "danger" | "white";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  filled?: boolean;
  outline?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  filled = false,
  outline = false,
  className = "",
  onClick,
  type = "button",
  icon,
  iconPosition = "start",
}) => {
  // Base classes
  const baseClasses = "btn";

  // Size classes
  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  // Variant-specific classes
  const getVariantClasses = () => {
    if (disabled) {
      return "disabled";
    }

    if (variant === "primary") {
      if (filled) {
        return "btn-primary";
      } else if (outline) {
        return "btn-primary btn-outline";
      } else {
        return "btn-primary btn-text";
      }
    }

    if (variant === "danger") {
      if (filled) {
        return "btn-danger";
      } else if (outline) {
        return "btn-danger btn-outline";
      } else {
        return "btn-danger btn-text";
      }
    }

    if (variant === "white") {
      if (filled) {
        return "btn-white";
      } else if (outline) {
        return "btn-white btn-outline";
      } else {
        return "btn-white btn-text";
      }
    }

    return "btn-primary";
  };

  const buttonClasses = [
    baseClasses,
    sizeClasses[size],
    getVariantClasses(),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Icon rendering
  const renderIcon = () => {
    if (!icon) return null;

    const iconSize = {
      sm: "16px",
      md: "18px",
      lg: "24px",
    };

    return (
      <span
        className="d-inline-flex align-items-center"
        style={{ width: iconSize[size], height: iconSize[size] }}
      >
        {icon}
      </span>
    );
  };

  // Content rendering
  const renderContent = () => {
    const iconElement = renderIcon();

    if (!iconElement) {
      return children;
    }

    if (iconPosition === "end") {
      return (
        <>
          {children}
          {iconElement}
        </>
      );
    }

    return (
      <>
        {iconElement}
        {children}
      </>
    );
  };

  return (
    <BootstrapButton
      variant={disabled ? "light" : variant}
      size={size === "md" ? undefined : size}
      disabled={disabled}
      className={buttonClasses}
      onClick={onClick}
      type={type}
    >
      {renderContent()}
    </BootstrapButton>
  );
};

export default Button;
