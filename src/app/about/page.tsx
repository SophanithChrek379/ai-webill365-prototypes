'use client';

import { Container, Row, Col, Card, ProgressBar, ListGroup, Badge } from 'react-bootstrap';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Lead Developer",
      skills: ["React", "TypeScript", "Next.js"],
      experience: "5+ years"
    },
    {
      name: "Jane Smith",
      role: "UI/UX Designer",
      skills: ["Bootstrap", "Figma", "Adobe XD"],
      experience: "3+ years"
    },
    {
      name: "Mike Johnson",
      role: "Backend Developer",
      skills: ["Node.js", "Python", "Database"],
      experience: "4+ years"
    }
  ];

  const technologies = [
    { name: "Next.js", progress: 90 },
    { name: "React", progress: 95 },
    { name: "TypeScript", progress: 85 },
    { name: "Bootstrap", progress: 88 },
    { name: "Node.js", progress: 75 }
  ];

  return (
    <>
      <Header />
      
      <Container className="py-5">
        {/* Hero Section */}
        <Row className="mb-5">
          <Col lg={8} md={12}>
            <h1 className="display-4 fw-bold mb-4">
              About AI WeBill365
              <Badge bg="success" className="ms-2">v2.0</Badge>
            </h1>
            <p className="lead mb-4">
              We are a team of passionate developers and designers dedicated to creating 
              innovative billing solutions powered by artificial intelligence.
            </p>
            <p className="text-muted">
              Our mission is to streamline business operations through intelligent automation, 
              providing cutting-edge tools that help companies grow and succeed in the digital age.
            </p>
          </Col>
          <Col lg={4} md={12} className="d-flex align-items-center justify-content-center">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '120px', height: '120px' }}>
                <i className="bi bi-people-fill text-primary fs-1"></i>
              </div>
              <h4>Our Team</h4>
              <p className="text-muted">Dedicated professionals</p>
            </div>
          </Col>
        </Row>

        {/* Technology Stack */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">
              <i className="bi bi-gear me-2"></i>
              Technology Expertise
            </h2>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fw-medium">{tech.name}</span>
                      <span className="text-muted">{tech.progress}%</span>
                    </div>
                    <ProgressBar 
                      now={tech.progress} 
                      variant="primary"
                      className="mb-3"
                    />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Team Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">
              <i className="bi bi-people me-2"></i>
              Meet Our Team
            </h2>
          </Col>
        </Row>
        <Row className="g-4 mb-5">
          {teamMembers.map((member, index) => (
            <Col lg={4} md={6} key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-person-circle text-primary fs-1"></i>
                  </div>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                  <p className="text-muted small mb-3">{member.experience} experience</p>
                  <div className="d-flex flex-wrap justify-content-center gap-1">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} bg="outline-secondary" className="text-dark">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Values Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">
              <i className="bi bi-heart me-2"></i>
              Our Values
            </h2>
            <Card className="border-0 bg-light">
              <Card.Body>
                <Row className="g-4">
                  <Col md={4}>
                    <div className="text-center">
                      <i className="bi bi-lightbulb text-warning fs-1 mb-3"></i>
                      <h5>Innovation</h5>
                      <p className="text-muted">Constantly pushing boundaries with cutting-edge technology</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <i className="bi bi-shield-check text-success fs-1 mb-3"></i>
                      <h5>Quality</h5>
                      <p className="text-muted">Delivering excellence in every line of code we write</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <i className="bi bi-people text-primary fs-1 mb-3"></i>
                      <h5>Collaboration</h5>
                      <p className="text-muted">Working together to achieve extraordinary results</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Section */}
        <Row>
          <Col>
            <Card className="border-primary">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">
                  <i className="bi bi-envelope me-2"></i>
                  Get In Touch
                </h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <i className="bi bi-geo-alt text-primary me-2"></i>
                        <strong>Address:</strong> 123 Tech Street, Silicon Valley, CA
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-telephone text-primary me-2"></i>
                        <strong>Phone:</strong> +1 (555) 123-4567
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-envelope text-primary me-2"></i>
                        <strong>Email:</strong> contact@awebill365.com
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <p className="text-muted">
                      Ready to transform your billing process? We&apos;d love to hear from you! 
                      Our team is always available to discuss your needs and explore how 
                      our AI-powered solutions can benefit your business.
                    </p>
                    <div className="d-grid">
                      <button className="btn btn-primary">
                        <i className="bi bi-chat-dots me-2"></i>
                        Start a Conversation
                      </button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
} 