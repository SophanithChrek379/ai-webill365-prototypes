'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Form, Button } from 'react-bootstrap';

interface LoginFormProps {
  onSubmit?: (formData: { username: string; password: string }) => void;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Login attempt:', formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      
      {/* Username/ID Field */}
      <Form.Group className="mb-3">
        <div className="input-group-custom">
          <div className="input-icon-wrapper">
            <Image
              src="/assets/images/user-icon.svg"
              alt="User Icon"
              width={24}
              height={24}
              className="input-icon"
            />
          </div>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="ID or Mobile Number"
            className="form-control-custom"
            required
            disabled={isLoading}
          />
        </div>
      </Form.Group>

      {/* Password Field */}
      <Form.Group className="mb-4">
        <div className="input-group-custom">
          <div className="input-icon-wrapper">
            <Image
              src="/assets/images/lock-icon.svg"
              alt="Lock Icon"
              width={24}
              height={24}
              className="input-icon"
            />
          </div>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="form-control-custom"
            required
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="link"
            className="password-toggle-btn p-0"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            <Image
              src={showPassword ? "/assets/images/eye-off-icon.svg" : "/assets/images/eye-icon.svg"}
              alt={showPassword ? "Hide Password" : "Show Password"}
              width={24}
              height={24}
            />
          </Button>
        </div>
      </Form.Group>

      {/* Login Button */}
      <Button
        type="submit"
        className="btn-login w-100 mb-4"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log in'}
      </Button>

      {/* Divider */}
      <div className="divider-container mb-4">
        <div className="divider-line"></div>
        <span className="divider-text px-3">Don't have an account?</span>
        <div className="divider-line"></div>
      </div>

      {/* Create Account Button */}
      <Link href="/signup" className="text-decoration-none">
        <Button
          variant="outline-secondary"
          className="btn-create-account w-100 mb-3"
          size="lg"
          disabled={isLoading}
        >
          Create an account for free
        </Button>
      </Link>

      {/* Reset Password */}
      <div className="text-end">
        <Link href="/reset-password" className="reset-link">
          Reset Password
        </Link>
      </div>
    </Form>
  );
} 