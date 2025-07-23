'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (formData: any) => {
    setIsLoading(true);
    try {
      // Handle signup logic here
      console.log('Signup attempt:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Container fluid className="h-100 d-flex align-items-center justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={11} md={10} lg={8} xl={7} xxl={6}>
            <Card className="signup-card border-0 shadow-sm">
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
                  <h1 className="signup-title mb-0">Create WeBill365 Account for free</h1>
                </div>

                {/* Signup Form Component */}
                <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 