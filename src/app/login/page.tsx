'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      // Handle login logic here
      console.log('Login attempt:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container fluid className="h-100 d-flex align-items-center justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5} xxl={4}>
            <Card className="login-card border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                
                {/* Logo Section */}
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
                  <h2 className="tagline mb-0">Simple. Smart. Secured.</h2>
                </div>

                {/* Login Form Component */}
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 