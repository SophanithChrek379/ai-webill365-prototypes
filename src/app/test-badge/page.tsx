'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import Badge from '@/components/Badge';

export default function TestBadgePage() {
  return (
    <div className="test-badge-page">
      <Container>
        <Row>
          <Col>
            <h1 className="mb-4">Badge Component Test</h1>
            
            <Card className="mb-4">
              <Card.Header>
                <h5>Badge Variants</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="light">Light</Badge>
                  <Badge variant="dark">Dark</Badge>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Badge Sizes</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  <Badge size="sm" variant="danger">Small</Badge>
                  <Badge size="md" variant="danger">Medium</Badge>
                  <Badge size="lg" variant="danger">Large</Badge>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Badge with Numbers</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  <Badge variant="danger">1</Badge>
                  <Badge variant="danger">5</Badge>
                  <Badge variant="danger">99+</Badge>
                  <Badge variant="danger">999</Badge>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Badge Options</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  <Badge variant="danger" showBorder={true}>With Border</Badge>
                  <Badge variant="danger" showBorder={false}>No Border</Badge>
                  <Badge variant="danger" uppercase={true}>UPPERCASE</Badge>
                  <Badge variant="danger" uppercase={false}>lowercase</Badge>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Badge in Context</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-4 align-items-center">
                  <div className="position-relative">
                    <span className="me-2">Notifications</span>
                    <Badge variant="danger" className="notification">5</Badge>
                  </div>
                  <div className="position-relative">
                    <span className="me-2">Messages</span>
                    <Badge variant="primary" className="notification">12</Badge>
                  </div>
                  <div className="position-relative">
                    <span className="me-2">Updates</span>
                    <Badge variant="success" className="notification">3</Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h5>Custom Badge Examples</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  <Badge variant="danger" className="counter">1</Badge>
                  <Badge variant="primary" className="counter">5</Badge>
                  <Badge variant="success" className="counter">10</Badge>
                  <Badge variant="warning" className="counter">25</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 