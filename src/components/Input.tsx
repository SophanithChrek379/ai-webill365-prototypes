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
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleFocus = () => {
    onFocus?.();
  };

  const handleBlur = () => {
    onBlur?.();
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.('');
  };

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <label>
            {label}
            {required && <span style={{ color: '#bd1822', marginLeft: 2 }}>*</span>}
          </label>
          {showCharacterCount && maxLength && (
            <span>
              {inputValue.length}/{maxLength}
            </span>
          )}
        </div>
      )}

      {/* Input Field */}
      <InputGroup size={size === 'md' ? undefined : size}>
        {/* Lead Icon */}
        {leadIcon && (
          <InputGroup.Text>
            <Image
              src={leadIcon}
              alt=""
              width={16}
              height={16}
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
          isInvalid={!!error}
          className={inputClassName}
        />

        {/* Trail Icon or Clear Button */}
        {(trailIcon || (clearButton && inputValue)) && (
          <InputGroup.Text>
            {clearButton && inputValue ? (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear input"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Image
                  src="/assets/images/close-icon.svg"
                  alt="Clear"
                  width={16}
                  height={16}
                />
              </button>
            ) : trailIcon ? (
              <Image
                src={trailIcon}
                alt=""
                width={16}
                height={16}
              />
            ) : null}
          </InputGroup.Text>
        )}
      </InputGroup>

      {/* Error or Hint Text */}
      {(error || hint) && (
        <div>
          {error || hint}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 