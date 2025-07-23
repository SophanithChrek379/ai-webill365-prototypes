'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showBorder?: boolean;
  uppercase?: boolean;
}

export default function Badge({ 
  children, 
  variant = 'danger', 
  size = 'md',
  className = '',
  showBorder = true,
  uppercase = true
}: BadgeProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white';
      case 'secondary':
        return 'bg-secondary text-white';
      case 'success':
        return 'bg-success text-white';
      case 'danger':
        return 'bg-danger text-white';
      case 'warning':
        return 'bg-warning text-dark';
      case 'info':
        return 'bg-info text-white';
      case 'light':
        return 'bg-light text-dark';
      case 'dark':
        return 'bg-dark text-white';
      default:
        return 'bg-danger text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-1 py-0-5 text-xs';
      case 'md':
        return 'px-2 py-1 text-sm';
      case 'lg':
        return 'px-3 py-1-5 text-base';
      default:
        return 'px-2 py-1 text-sm';
    }
  };

  const getBorderClasses = () => {
    if (!showBorder) return '';
    return 'border-2 border-white';
  };

  const getTextClasses = () => {
    return uppercase ? 'uppercase' : '';
  };

  return (
    <div
      className={`
        badge-component
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${getBorderClasses()}
        ${getTextClasses()}
        ${className}
      `.trim()}
    >
      <span className="badge-text">
        {children}
      </span>
    </div>
  );
} 