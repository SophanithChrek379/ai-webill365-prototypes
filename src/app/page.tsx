'use client';

import { Container, Row, Col, Button, Alert, Badge } from 'react-bootstrap';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';

export default function Home() {
  const [showAlert, setShowAlert] = useState(true);

  const features = [
    {
      title: "Fast Processing",
      description: "Lightning-fast billing processing with real-time updates and instant notifications.",
      icon: "bi-lightning-charge",
      iconColor: "primary",
      buttonVariant: "outline-primary"
    },
    {
      title: "Secure & Reliable",
      description: "Enterprise-grade security with end-to-end encryption and compliance standards.",
      icon: "bi-shield-check",
      iconColor: "success",
      buttonVariant: "outline-success"
    },
    {
      title: "Analytics & Insights",
      description: "Powerful analytics dashboard with detailed reports and business insights.",
      icon: "bi-graph-up",
      iconColor: "info",
      buttonVariant: "outline-info"
    }
  ];

  const handleFeatureClick = (featureTitle: string) => {
    console.log(`Feature clicked: ${featureTitle}`);
    // Add your feature click logic here
  };

  return (
    <>
      <Header />
      
      <Container>
        {/* Welcome Alert */}
        {showAlert && (
          <Alert variant="info" dismissible onClose={() => setShowAlert(false)}>
            <Alert.Heading>
              <i className="bi bi-info-circle me-2"></i>
              Welcome to AI WeBill365!
            </Alert.Heading>
            <p>
              This is a Next.js application built with Bootstrap 5.3.3 and React Bootstrap components.
              The setup follows best practices for modern web development.
            </p>
          </Alert>
        )}

        {/* Hero Section */}
        <Row className="mb-5">
          <Col lg={8} md={12}>
            <h1 className="display-4 fw-bold">
              AI-Powered Billing Solution
              <Badge bg="primary" className="ms-2">v2.0</Badge>
            </h1>
            <p className="lead">
              Streamline your billing process with our intelligent automation platform.
              Built with Next.js, Bootstrap, and modern web technologies.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Button variant="primary" size="lg" className="me-md-2">
                <i className="bi bi-rocket-takeoff me-2"></i>
                Get Started
              </Button>
              <Button variant="outline-secondary" size="lg">
                <i className="bi bi-play-circle me-2"></i>
                Watch Demo
              </Button>
            </div>
          </Col>
          <Col lg={4} md={12} className="d-flex align-items-center justify-content-center">
            <div className="text-center">
              <div className="bg-light rounded p-4 shadow-sm">
                <i className="bi bi-speedometer2 text-primary fs-1 mb-3"></i>
                <h3>Quick Stats</h3>
                <p className="h2 text-primary">99.9%</p>
                <p className="text-muted">Uptime</p>
                <div className="row text-center">
                  <div className="col-6">
                    <p className="h5 text-success">10K+</p>
                    <small className="text-muted">Users</small>
                  </div>
                  <div className="col-6">
                    <p className="h5 text-info">50M+</p>
                    <small className="text-muted">Transactions</small>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">
              <i className="bi bi-star me-2"></i>
              Key Features
            </h2>
          </Col>
        </Row>
        <Row className="g-4 mb-5">
          {features.map((feature, index) => (
            <Col md={4} key={index}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                iconColor={feature.iconColor}
                buttonVariant={feature.buttonVariant}
                onButtonClick={() => handleFeatureClick(feature.title)}
              />
            </Col>
          ))}
        </Row>

        {/* Technology Stack */}
        <Row className="mb-5">
          <Col>
            <div className="bg-light rounded p-4 text-center">
              <h3>
                <i className="bi bi-gear me-2"></i>
                Built with Modern Technologies
              </h3>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                <Badge bg="dark" className="fs-6 px-3 py-2">
                  <i className="bi bi-lightning me-1"></i>
                  Next.js 15
                </Badge>
                <Badge bg="primary" className="fs-6 px-3 py-2">
                  <i className="bi bi-box me-1"></i>
                  React 19
                </Badge>
                <Badge bg="success" className="fs-6 px-3 py-2">
                  <i className="bi bi-filetype-ts me-1"></i>
                  TypeScript
                </Badge>
                <Badge bg="info" className="fs-6 px-3 py-2">
                  <i className="bi bi-bootstrap me-1"></i>
                  Bootstrap 5.3.3
                </Badge>
                <Badge bg="warning" className="fs-6 px-3 py-2">
                  <i className="bi bi-boxes me-1"></i>
                  React Bootstrap
                </Badge>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
