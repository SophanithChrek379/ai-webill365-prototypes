'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Form, Button, Row, Col } from 'react-bootstrap';

interface SignupFormProps {
  onSubmit?: (formData: any) => void;
  isLoading?: boolean;
}

export default function SignupForm({ onSubmit, isLoading = false }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    taxId: '',
    fullName: '',
    countryCode: '+855',
    mobile: '',
    otp: ['', '', '', '', '', ''],
    email: '',
    userId: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData(prev => ({
        ...prev,
        otp: newOtp
      }));

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Signup attempt:', formData);
    }
  };

  const handleSendOtp = () => {
    // Handle OTP sending logic
    console.log('Sending OTP to:', formData.mobile);
  };

  const isFormValid = () => {
    return (
      formData.taxId &&
      formData.fullName &&
      formData.mobile &&
      formData.otp.every(digit => digit !== '') &&
      formData.email &&
      formData.userId &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      formData.agreeToTerms
    );
  };

  return (
    <Form onSubmit={handleSubmit} className="signup-form">
      
      {/* Tax ID Field */}
      <Form.Group className="mb-3">
        <Form.Label className="form-label">Tax ID</Form.Label>
        <div className="input-group-custom">
          <Form.Control
            type="text"
            name="taxId"
            value={formData.taxId}
            onChange={handleInputChange}
            placeholder="000000000-(000)"
            className="form-control-custom"
            disabled={isLoading}
          />
        </div>
      </Form.Group>

      {/* Full Name Field */}
      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          Full Name
          <span className="required-asterisk">*</span>
        </Form.Label>
        <div className="input-group-custom">
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="form-control-custom"
            required
            disabled={isLoading}
          />
        </div>
      </Form.Group>

      {/* Mobile Field with Country Code */}
      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          Mobile
          <span className="required-asterisk">*</span>
        </Form.Label>
        <Row className="g-2">
          <Col xs={4} sm={3}>
            <div className="input-group-custom">
              <Form.Select
                name="countryCode"
                value={formData.countryCode}
                onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                className="form-select-custom"
                disabled={isLoading}
              >
                <option value="+855">+855</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+81">+81</option>
              </Form.Select>
            </div>
          </Col>
          <Col xs={8} sm={9}>
            <div className="input-group-custom">
              <Form.Control
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="00-0000-0000"
                className="form-control-custom"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="link"
                className="send-otp-btn"
                onClick={handleSendOtp}
                disabled={isLoading || !formData.mobile}
              >
                Send OTP
              </Button>
            </div>
          </Col>
        </Row>
      </Form.Group>

      {/* OTP Field */}
      <Form.Group className="mb-3">
        <Form.Label className="form-label">
          OTP
          <span className="required-asterisk">*</span>
        </Form.Label>
        <div className="otp-container">
          {formData.otp.map((digit, index) => (
            <Form.Control
              key={index}
              type="text"
              name={`otp-${index}`}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="otp-input"
              maxLength={1}
              required
              disabled={isLoading}
            />
          ))}
        </div>
      </Form.Group>

      {/* Email Field */}
      <Form.Group className="mb-3">
        <Form.Label className="form-label">Email address</Form.Label>
        <div className="input-group-custom">
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@mail.com"
            className="form-control-custom"
            required
            disabled={isLoading}
          />
        </div>
      </Form.Group>

      {/* User ID Field */}
      <Form.Group className="mb-3">
        <Form.Label className="form-label">User ID</Form.Label>
        <div className="input-group-custom">
          <Form.Control
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            placeholder="Enter User ID"
            className="form-control-custom"
            required
            disabled={isLoading}
          />
        </div>
      </Form.Group>

      {/* Password Fields */}
      <Row className="g-3 mb-3">
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label className="form-label">
              Password
              <span className="required-asterisk">*</span>
            </Form.Label>
            <div className="input-group-custom">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="form-control-custom"
                required
                disabled={isLoading}
              />
            </div>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label className="form-label">
              Confirm Password
              <span className="required-asterisk">*</span>
            </Form.Label>
            <div className="input-group-custom">
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className="form-control-custom"
                required
                disabled={isLoading}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      {/* Password Toggle */}
      <div className="password-toggle-container mb-3">
        <Button
          type="button"
          variant="link"
          className="password-toggle-btn p-0"
          onClick={() => {
            setShowPassword(!showPassword);
            setShowConfirmPassword(!showConfirmPassword);
          }}
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

      {/* Password Requirements */}
      <div className="password-requirements mb-4">
        <p className="text-muted small">
          Use 8 or more characters with a mix of letters, numbers, and symbols
        </p>
      </div>

      {/* Terms and Conditions */}
      <Form.Group className="mb-4">
        <Form.Check
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
          label={
            <span className="terms-text">
              I agree to the{' '}
              <Link href="/terms" className="terms-link">Terms & Condition</Link>
              {' '}and{' '}
              <Link href="/privacy" className="terms-link">Privacy Policy</Link>
              {' '}and Power of attorney Using Service WeBill365 Software
            </span>
          }
          className="terms-checkbox"
          disabled={isLoading}
        />
      </Form.Group>

      {/* Action Buttons */}
      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-between align-items-center">
        <Link href="/login" className="text-decoration-none">
          <Button
            variant="link"
            className="btn-signin-instead p-0"
            disabled={isLoading}
          >
            Sign in instead
          </Button>
        </Link>
        <Button
          type="submit"
          className="btn-confirm-signup"
          size="lg"
          disabled={isLoading || !isFormValid()}
        >
          {isLoading ? 'Creating Account...' : 'Create'}
        </Button>
      </div>
    </Form>
  );
} 