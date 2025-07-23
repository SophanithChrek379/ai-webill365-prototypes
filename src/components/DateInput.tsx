'use client';

import React, { useState } from 'react';

interface DateInputProps {
  value?: string;
  placeholder?: string;
  required?: boolean;
  showTitle?: boolean;
  title?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  value = '',
  placeholder = '25 Apr 2024',
  required = true,
  showTitle = true,
  title = 'Date',
  onChange,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`date-input-container ${className}`}>
      {showTitle && (
        <div className="date-input-label">
          <span className="label-text">{title}</span>
          {required && (
            <svg className="required-asterisk" width="6" height="6" viewBox="0 0 6 6" fill="none">
              <path d="M3 0L3.5 2H5.5L4 3.5L4.5 5.5L3 4.5L1.5 5.5L2 3.5L0.5 2H2.5L3 0Z" fill="#bd1822"/>
            </svg>
          )}
        </div>
      )}
      
      <div className="date-input-field">
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          className="date-input"
        />
        <div className="calendar-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 2H4C3.45 2 3 2.45 3 3V13C3 13.55 3.45 14 4 14H12C12.55 14 13 13.55 13 13V3C13 2.45 12.55 2 12 2ZM11 4V6H5V4H11ZM5 12V8H11V12H5Z" fill="#171717"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DateInput; 