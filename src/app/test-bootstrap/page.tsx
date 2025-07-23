'use client';

import { useState } from 'react';
import { Container, Row, Col, Button, Alert, Modal, Form, Navbar, Nav, Dropdown } from 'react-bootstrap';

export default function TestBootstrapPage() {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="test-bootstrap-page">
      {/* Navbar Test */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Bootstrap Test</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  Dropdown
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <h1 className="text-primary mb-4">Bootstrap Test Page</h1>
            
            {/* Alert Test */}
            {showAlert && (
              <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
                <Alert.Heading>Bootstrap is working!</Alert.Heading>
                <p>
                  This alert shows that Bootstrap CSS and JavaScript are properly loaded.
                </p>
              </Alert>
            )}

            {/* Button Tests */}
            <div className="mb-4">
              <h3>Button Tests</h3>
              <Button variant="primary" className="me-2">Primary</Button>
              <Button variant="secondary" className="me-2">Secondary</Button>
              <Button variant="success" className="me-2">Success</Button>
              <Button variant="danger" className="me-2">Danger</Button>
              <Button variant="warning" className="me-2">Warning</Button>
              <Button variant="info" className="me-2">Info</Button>
              <Button variant="light" className="me-2">Light</Button>
              <Button variant="dark" className="me-2">Dark</Button>
            </div>

            {/* Form Test */}
            <div className="mb-4">
              <h3>Form Test</h3>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>

            {/* Modal Test */}
            <div className="mb-4">
              <h3>Modal Test</h3>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Launch demo modal
              </Button>

              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => setShowModal(false)}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>

            {/* Grid Test */}
            <div className="mb-4">
              <h3>Grid Test</h3>
              <Row>
                <Col xs={12} sm={6} md={4} lg={3}>
                  <div className="p-3 bg-primary text-white rounded">Col 1</div>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3}>
                  <div className="p-3 bg-secondary text-white rounded">Col 2</div>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3}>
                  <div className="p-3 bg-success text-white rounded">Col 3</div>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3}>
                  <div className="p-3 bg-danger text-white rounded">Col 4</div>
                </Col>
              </Row>
            </div>

            {/* Utility Classes Test */}
            <div className="mb-4">
              <h3>Utility Classes Test</h3>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary">Primary</span>
                <span className="badge bg-secondary">Secondary</span>
                <span className="badge bg-success">Success</span>
                <span className="badge bg-danger">Danger</span>
                <span className="badge bg-warning text-dark">Warning</span>
                <span className="badge bg-info text-dark">Info</span>
                <span className="badge bg-light text-dark">Light</span>
                <span className="badge bg-dark">Dark</span>
              </div>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  );
} 