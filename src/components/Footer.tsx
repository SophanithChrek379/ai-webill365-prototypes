'use client';

import { Container, Row, Col } from 'react-bootstrap';

interface FooterProps {
  companyName?: string;
  description?: string;
  socialLinks?: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
  quickLinks?: Array<{
    label: string;
    url: string;
  }>;
}

export default function Footer({
  companyName = "AI WeBill365",
  description = "Next-generation billing solution powered by artificial intelligence.",
  socialLinks = [
    { name: "Twitter", url: "#", icon: "bi-twitter" },
    { name: "LinkedIn", url: "#", icon: "bi-linkedin" },
    { name: "GitHub", url: "#", icon: "bi-github" },
    { name: "Email", url: "mailto:contact@awebill365.com", icon: "bi-envelope" }
  ],
  quickLinks = [
    { label: "Privacy Policy", url: "#privacy" },
    { label: "Terms of Service", url: "#terms" },
    { label: "Support", url: "#support" },
    { label: "Contact", url: "#contact" }
  ]
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="g-4">
          <Col lg={4} md={6}>
            <h5>
              <i className="bi bi-lightning-charge me-2"></i>
              {companyName}
            </h5>
            <p className="text-muted">
              {description}
            </p>
            <div className="d-flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-muted text-decoration-none"
                  title={social.name}
                >
                  <i className={`${social.icon} fs-5`}></i>
                </a>
              ))}
            </div>
          </Col>
          <Col lg={4} md={6}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <a href={link.url} className="text-muted text-decoration-none">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          <Col lg={4} md={12}>
            <h6>Newsletter</h6>
            <p className="text-muted small">
              Stay updated with our latest features and announcements.
            </p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <button className="btn btn-outline-light" type="button">
                Subscribe
              </button>
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col md={6}>
            <p className="text-muted mb-0 small">
              © {currentYear} {companyName}. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="text-muted mb-0 small">
              Built with Next.js, Bootstrap, and ❤️
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
} 