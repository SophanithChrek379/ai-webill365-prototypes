'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleBackClick = () => {
    // Handle back navigation
    window.history.back();
  };

  const handleGoToLogin = () => {
    // Navigate to login page
    window.location.href = '/login';
  };

  const handleUpdateEmail = () => {
    // Handle email update logic
    console.log('Update email clicked');
  };

  const handleContactSupport = () => {
    // Handle contact support logic
    console.log('Contact support clicked');
  };

  return (
    <div className="verify-page">
      <Container fluid className="h-100 d-flex align-items-center justify-content-center px-3">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={11} md={10} lg={9} xl={8} xxl={7} className="d-flex justify-content-center">
            <Card className="verify-card border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                
                {/* Header Section */}
                <div className="text-center mb-4 mb-md-5">
                  <div className="logo-container mb-3">
                    <Image
                      src="/assets/images/project-logo.svg"
                      alt="WeBill365 Logo"
                      width={184}
                      height={32}
                      priority
                      className="img-fluid"
                    />
                  </div>
                  <h1 className="verify-title mb-0">Create WeBill365 Account for free</h1>
                </div>

                {/* Main Content */}
                <div className="verify-content text-center mb-4 mb-md-5">
                  
                  {/* Icon Container */}
                  <div className="verify-icon-container mb-4">
                    <div className="verify-icon-wrapper">
                      <div className="verify-icon">
                        <Image
                          src="/assets/images/check-icon.svg"
                          alt="Verification Icon"
                          width={50}
                          height={50}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status Message */}
                  <div className="verify-message">
                    <h2 className="verify-status mb-3">Pending for admin approval</h2>
                    <p className="verify-description">
                      After your account is approved by the admin, you can log in with your username and password. We're excited for you to get started!
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-between align-items-center mb-4">
                  <Button
                    variant="outline-secondary"
                    className="btn-back"
                    onClick={handleBackClick}
                    disabled={isLoading}
                  >
                    <Image
                      src="/assets/images/arrow-left-icon.svg"
                      alt="Back Arrow"
                      width={24}
                      height={24}
                      className="me-2"
                    />
                    Back
                  </Button>
                  <Link href="/login" className="text-decoration-none">
                    <Button
                      className="btn-go-to-login"
                      size="lg"
                      onClick={handleGoToLogin}
                      disabled={isLoading}
                    >
                      Go to Login
                    </Button>
                  </Link>
                </div>

                {/* Help Links */}
                <div className="verify-help-links text-center">
                  <div className="help-link mb-2">
                    <span className="help-text">Wrong email? </span>
                    <button
                      type="button"
                      className="help-link-btn"
                      onClick={handleUpdateEmail}
                      disabled={isLoading}
                    >
                      Update email
                    </button>
                  </div>
                  <div className="help-link">
                    <span className="help-text">Still not seeing it? </span>
                    <button
                      type="button"
                      className="help-link-btn"
                      onClick={handleContactSupport}
                      disabled={isLoading}
                    >
                      Contact Support
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 