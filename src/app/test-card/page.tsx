'use client';

import { useState } from 'react';
import { Container, Row, Col, Card as BootstrapCard, Button } from 'react-bootstrap';
import Card, { CardTitle, CardValue, CardFooter, CardContent } from '@/components/Card';

export default function TestCardPage() {
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  const handleCardClick = (cardName: string) => {
    setClickedCard(cardName);
    console.log(`Card clicked: ${cardName}`);
  };

  const stats = [
    { title: 'Total Subscribers', value: '6', footer: '2 New per day', variant: 'default' as const },
    { title: 'Active Users', value: '1,234', footer: '+12% from last month', variant: 'success' as const },
    { title: 'Revenue', value: '$45,678', footer: '+8.5% from last month', variant: 'primary' as const },
    { title: 'Pending Orders', value: '23', footer: '5 urgent', variant: 'warning' as const },
    { title: 'Failed Transactions', value: '3', footer: '-2 from yesterday', variant: 'danger' as const },
    { title: 'Conversion Rate', value: '2.4%', footer: '+0.3% from last week', variant: 'default' as const },
  ];

  return (
    <div className="test-card-page">
      <Container className="mt-4">
        <Row>
          <Col>
            <h1 className="mb-4">Card Component Test</h1>
            
            {/* Basic Usage */}
            <BootstrapCard className="mb-4">
              <BootstrapCard.Header>
                <h5>Basic Card Usage</h5>
              </BootstrapCard.Header>
              <BootstrapCard.Body>
                <Row>
                  <Col md={4}>
                    <Card
                      title="Total Subscribers"
                      value="6"
                      footer="2 New per day"
                      onClick={() => handleCardClick('Basic Card')}
                    />
                  </Col>
                  <Col md={4}>
                    <Card
                      title="Active Users"
                      value="1,234"
                      footer="+12% from last month"
                      variant="success"
                      onClick={() => handleCardClick('Success Card')}
                    />
                  </Col>
                  <Col md={4}>
                    <Card
                      title="Revenue"
                      value="$45,678"
                      footer="+8.5% from last month"
                      variant="primary"
                      onClick={() => handleCardClick('Primary Card')}
                    />
                  </Col>
                </Row>
              </BootstrapCard.Body>
            </BootstrapCard>

            {/* Different Sizes */}
            <BootstrapCard className="mb-4">
              <BootstrapCard.Header>
                <h5>Card Sizes</h5>
              </BootstrapCard.Header>
              <BootstrapCard.Body>
                <Row>
                  <Col md={4}>
                    <Card
                      title="Small Card"
                      value="42"
                      footer="Small size"
                      size="sm"
                      onClick={() => handleCardClick('Small Card')}
                    />
                  </Col>
                  <Col md={4}>
                    <Card
                      title="Medium Card"
                      value="156"
                      footer="Medium size (default)"
                      size="md"
                      onClick={() => handleCardClick('Medium Card')}
                    />
                  </Col>
                  <Col md={4}>
                    <Card
                      title="Large Card"
                      value="892"
                      footer="Large size"
                      size="lg"
                      onClick={() => handleCardClick('Large Card')}
                    />
                  </Col>
                </Row>
              </BootstrapCard.Body>
            </BootstrapCard>

            {/* All Variants */}
            <BootstrapCard className="mb-4">
              <BootstrapCard.Header>
                <h5>All Card Variants</h5>
              </BootstrapCard.Header>
              <BootstrapCard.Body>
                <Row>
                  {stats.map((stat, index) => (
                    <Col md={4} key={index} className="mb-3">
                      <Card
                        title={stat.title}
                        value={stat.value}
                        footer={stat.footer}
                        variant={stat.variant}
                        onClick={() => handleCardClick(`${stat.variant} Card`)}
                      />
                    </Col>
                  ))}
                </Row>
              </BootstrapCard.Body>
            </BootstrapCard>

            {/* Custom Content */}
            <BootstrapCard className="mb-4">
              <BootstrapCard.Header>
                <h5>Custom Content with Sub-components</h5>
              </BootstrapCard.Header>
              <BootstrapCard.Body>
                <Row>
                  <Col md={6}>
                    <Card
                      title="Custom Layout"
                      value="Custom"
                      variant="primary"
                    >
                      <CardContent>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <span className="text-muted">Progress:</span>
                          <div className="progress" style={{ width: '60%', height: '8px' }}>
                            <div 
                              className="progress-bar bg-primary" 
                              style={{ width: '75%' }}
                            ></div>
                          </div>
                          <span className="text-muted ms-2">75%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card
                      title="With Icons"
                      value="Icon Card"
                      variant="success"
                    >
                      <CardContent>
                        <div className="d-flex align-items-center mt-2">
                          <span className="text-success me-2">✓</span>
                          <span className="text-muted">Status: Active</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Col>
                </Row>
              </BootstrapCard.Body>
            </BootstrapCard>

            {/* Interactive Demo */}
            <BootstrapCard className="mb-4">
              <BootstrapCard.Header>
                <h5>Interactive Demo</h5>
              </BootstrapCard.Header>
              <BootstrapCard.Body>
                <div className="mb-3">
                  <p className="text-muted">
                    Click on any card above to see the interaction. Last clicked: 
                    <strong className="text-primary ms-2">
                      {clickedCard || 'None'}
                    </strong>
                  </p>
                </div>
                <Row>
                  <Col md={6}>
                    <Card
                      title="Clickable Card"
                      value="Click me!"
                      footer="This card is clickable"
                      variant="warning"
                      onClick={() => handleCardClick('Interactive Card')}
                    />
                  </Col>
                  <Col md={6}>
                    <Card
                      title="Non-clickable Card"
                      value="Static"
                      footer="This card is not clickable"
                      variant="default"
                    />
                  </Col>
                </Row>
              </BootstrapCard.Body>
            </BootstrapCard>

            {/* Card Features */}
            <BootstrapCard>
              <BootstrapCard.Header>
                <h5>Card Component Features</h5>
              </BootstrapCard.Header>
              <BootstrapCard.Body>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <strong>Typography:</strong> Inter font family with proper weights and letter spacing
                  </li>
                  <li className="mb-2">
                    <strong>Variants:</strong> Default, Primary, Success, Warning, and Danger
                  </li>
                  <li className="mb-2">
                    <strong>Sizes:</strong> Small, Medium (default), and Large
                  </li>
                  <li className="mb-2">
                    <strong>Interactive:</strong> Optional click handlers with hover effects
                  </li>
                  <li className="mb-2">
                    <strong>Responsive:</strong> Adapts to different screen sizes
                  </li>
                  <li className="mb-2">
                    <strong>Accessibility:</strong> Proper ARIA roles and keyboard navigation
                  </li>
                  <li className="mb-2">
                    <strong>Composable:</strong> Sub-components for custom layouts
                  </li>
                </ul>
              </BootstrapCard.Body>
            </BootstrapCard>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 