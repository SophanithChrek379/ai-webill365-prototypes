"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSubmit?: (formData: { username: string; password: string }) => void;
  isLoading?: boolean;
  isAdmin?: boolean;
}

export default function LoginForm({
  onSubmit,
  isLoading = false,
  isAdmin = false,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
      router.push("/dashboard");
    } else {
      console.log("Login attempt:", formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
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

      <Form.Group className="mb-3">
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
              src={
                showPassword
                  ? "/assets/images/eye-off-icon.svg"
                  : "/assets/images/eye-icon.svg"
              }
              alt={showPassword ? "Hide Password" : "Show Password"}
              width={24}
              height={24}
            />
          </Button>
        </div>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Check
          type="checkbox"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleInputChange}
          label="Remember Me"
          className="remember-me-checkbox"
          disabled={isLoading}
        />
      </Form.Group>

      <Button
        type="submit"
        className="btn-login w-100 mb-4"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
    </Form>
  );
}
