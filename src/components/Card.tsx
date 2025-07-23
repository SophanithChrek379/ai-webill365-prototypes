'use client';

import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  footer?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Card({ 
  title,
  value,
  footer,
  className = '',
  variant = 'default',
  size = 'md',
  onClick,
  children
}: CardProps) {
  const baseClasses = 'stat-card';
  const variantClasses = {
    default: 'stat-card-default',
    primary: 'stat-card-primary',
    success: 'stat-card-success',
    warning: 'stat-card-warning',
    danger: 'stat-card-danger'
  };
  const sizeClasses = {
    sm: 'stat-card-sm',
    md: 'stat-card-md',
    lg: 'stat-card-lg'
  };

  const cardClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={cardClasses}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="stat-card-content">
        {/* Header */}
        <div className="stat-card-header">
          <div className="stat-card-title">
            {title}
          </div>
        </div>

        {/* Value */}
        <div className="stat-card-value">
          {value}
        </div>

        {/* Footer */}
        {footer && (
          <div className="stat-card-footer">
            {footer}
          </div>
        )}

        {/* Custom Content */}
        {children && (
          <div className="stat-card-children">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-components for better composition
export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`stat-card-title ${className}`}>
      {children}
    </div>
  );
}

export function CardValue({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`stat-card-value ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`stat-card-footer ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`stat-card-children ${className}`}>
      {children}
    </div>
  );
} 