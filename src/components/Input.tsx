'use client';

import React, { useState, forwardRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Image from 'next/image';

interface InputProps {
  // Basic props
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  
  // Label and validation
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  
  // Icons
  leadIcon?: string;
  trailIcon?: string;
  clearButton?: boolean;
  
  // Configuration
  type?: 'text' | 'password' | 'email' | 'number' | 'search';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  
  // Character count
  showCharacterCount?: boolean;
  maxLength?: number;
  
  // Styling
  className?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  value = '',
  placeholder = 'Placeholder',
  onChange,
  onFocus,
  onBlur,
  label,
  required = false,
  error,
  hint,
  leadIcon,
  trailIcon,
  clearButton = false,
  type = 'text',
  size = 'md',
  disabled = false,
  readOnly = false,
  showCharacterCount = false,
  maxLength,
  className = '',
  inputClassName = ''
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.('');
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-sm';
      case 'lg':
        return 'px-4 py-3 text-lg';
      default:
        return 'px-3 py-2 text-base';
    }
  };

  const getInputStateClasses = () => {
    let classes = 'input-field';
    
    if (error) {
      classes += ' input-error';
    } else if (isFocused) {
      classes += ' input-focus';
    } else if (disabled) {
      classes += ' input-disabled';
    }
    
    return classes;
  };

  return (
    <div className={`input-container ${className}`}>
      {/* Label */}
      {label && (
        <div className="input-label-container">
          <label className="input-label">
            {label}
            {required && <span className="required-asterisk">*</span>}
          </label>
          {showCharacterCount && maxLength && (
            <span className="character-count">
              {inputValue.length}/{maxLength}
            </span>
          )}
        </div>
      )}

      {/* Input Field */}
      <div className={`input-wrapper ${getInputStateClasses()}`}>
        <InputGroup size={size === 'md' ? undefined : size}>
          {/* Lead Icon */}
          {leadIcon && (
            <InputGroup.Text className="input-icon lead-icon">
              <Image
                src={leadIcon}
                alt=""
                width={16}
                height={16}
                className="icon-image"
              />
            </InputGroup.Text>
          )}

          {/* Input */}
          <Form.Control
            ref={ref}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            className={`input-control ${inputClassName}`}
          />

          {/* Trail Icon or Clear Button */}
          {(trailIcon || (clearButton && inputValue)) && (
            <InputGroup.Text className="input-icon trail-icon">
              {clearButton && inputValue ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="clear-button"
                  aria-label="Clear input"
                >
                  <Image
                    src="/assets/images/close-icon.svg"
                    alt="Clear"
                    width={16}
                    height={16}
                    className="icon-image"
                  />
                </button>
              ) : trailIcon ? (
                <Image
                  src={trailIcon}
                  alt=""
                  width={16}
                  height={16}
                  className="icon-image"
                />
              ) : null}
            </InputGroup.Text>
          )}
        </InputGroup>
      </div>

      {/* Error or Hint Text */}
      {(error || hint) && (
        <div className={`input-message ${error ? 'error' : 'hint'}`}>
          {error || hint}
        </div>
      )}

      <style jsx>{`
        .input-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          font-family: 'Inter', sans-serif;
        }

        .input-label-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .input-label {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          color: #171717;
          white-space: nowrap;
        }

        .required-asterisk {
          color: #bd1822;
          margin-left: 2px;
        }

        .character-count {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          color: #737373;
          white-space: nowrap;
        }

        .input-wrapper {
          position: relative;
          width: 100%;
        }

        .input-field {
          background-color: #ffffff;
          border: 1px solid #d4d4d4;
          border-radius: 6px;
          box-shadow: 0px 0px 0px 1px #d4d4d4;
          transition: all 0.2s ease;
        }

        .input-field.input-focus {
          border-color: #3e60ff;
          box-shadow: 0px 0px 0px 1px #3e60ff, 0px 0px 0px 4px rgba(62, 96, 255, 0.1);
        }

        .input-field.input-error {
          border-color: #dc3545;
          box-shadow: 0px 0px 0px 1px #dc3545;
        }

        .input-field.input-disabled {
          background-color: #f8f9fa;
          border-color: #e9ecef;
          color: #6c757d;
          cursor: not-allowed;
        }

        .input-control {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          color: #171717;
          border: none;
          background: transparent;
          padding: 8px 12px;
        }

        .input-control:focus {
          box-shadow: none;
          border: none;
          background: transparent;
        }

        .input-control::placeholder {
          color: #737373;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
        }

        .input-control:disabled {
          background: transparent;
          color: #6c757d;
        }

        .input-icon {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }

        .lead-icon {
          border-right: none;
        }

        .trail-icon {
          border-left: none;
        }

        .clear-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
        }

        .clear-button:hover {
          opacity: 0.7;
        }

        .icon-image {
          width: 16px;
          height: 16px;
        }

        .input-message {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 14px;
          margin-top: 4px;
        }

        .input-message.error {
          color: #dc3545;
        }

        .input-message.hint {
          color: #737373;
        }

        /* Size variations */
        .input-container.size-sm .input-control {
          padding: 6px 10px;
          font-size: 12px;
        }

        .input-container.size-lg .input-control {
          padding: 12px 16px;
          font-size: 16px;
        }

        /* Search specific styles */
        .input-container.search .input-field {
          border-radius: 20px;
        }

        @media (max-width: 768px) {
          .input-label-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 