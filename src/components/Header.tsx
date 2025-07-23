'use client';

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

interface HeaderProps {
  brandName?: string;
  navItems?: Array<{
    label: string;
    href: string;
    isDropdown?: boolean;
    dropdownItems?: Array<{
      label: string;
      href: string;
    }>;
  }>;
}

export default function Header({ 
  brandName = "AI WeBill365",
  navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Features", href: "#features" },
    { 
      label: "Services", 
      href: "#services", 
      isDropdown: true,
      dropdownItems: [
        { label: "Billing", href: "#billing" },
        { label: "Analytics", href: "#analytics" },
        { label: "Reports", href: "#reports" },
        { label: "Support", href: "#support" }
      ]
    }
  ]
}: HeaderProps) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/">
          <i className="bi bi-lightning-charge me-2"></i>
          {brandName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.isDropdown && item.dropdownItems ? (
                  <NavDropdown title={item.label} id={`nav-dropdown-${index}`}>
                    {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                      <NavDropdown.Item key={dropdownIndex} href={dropdownItem.href}>
                        {dropdownItem.label}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Link href={item.href}>{item.label}</Nav.Link>
                )}
              </div>
            ))}
          </Nav>
          <Nav>
            <Nav.Link href="/login">
              <i className="bi bi-box-arrow-in-right me-1"></i>
              Login
            </Nav.Link>
            <Nav.Link href="/signup">
              <i className="bi bi-person-plus me-1"></i>
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
} 