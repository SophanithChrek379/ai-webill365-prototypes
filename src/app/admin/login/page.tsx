'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import LoginForm from '@/components/LoginForm';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>({
    code: 'en',
    name: 'English',
    flag: '/assets/flag/united-kingdom-flag-icon.svg',
    nativeName: 'English'
  });

  const languages: LanguageOption[] = [
    {
      code: 'en',
      name: 'English',
      flag: '/assets/flag/united-kingdom-flag-icon.svg',
      nativeName: 'English'
    },
    {
      code: 'km',
      name: 'Khmer',
      flag: '/assets/flag/cambodia-flag-icon.svg',
      nativeName: 'ខ្មែរ'
    },
    {
      code: 'ko',
      name: 'Korean',
      flag: '/assets/flag/south-korean-flag-icon.svg',
      nativeName: '한국어'
    },
    {
      code: 'zh',
      name: 'Chinese',
      flag: '/assets/flag/china-flag-icon.svg',
      nativeName: '中文'
    }
  ];

  const handleLanguageChange = (language: LanguageOption) => {
    setSelectedLanguage(language);
    // Here you can add logic to change the application language
    console.log('Language changed to:', language);
    
    // Example: You could dispatch a language change action here
    // dispatch(changeLanguage(language.code));
    
    // Example: You could update localStorage
    // localStorage.setItem('preferredLanguage', language.code);
  };

  const handleLogin = async (formData: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      // Handle admin login logic here
      console.log('Admin login attempt:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Admin login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <Container fluid className="h-100 d-flex flex-column">
        {/* Header with Language Selector */}
        <Row className="flex-grow-0 py-4">
          <Col className="d-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle 
                variant="light" 
                className="language-dropdown border rounded"
                id="language-dropdown"
              >
                <div className="d-flex align-items-center gap-2">
                  <Image
                    src={selectedLanguage.flag}
                    alt={selectedLanguage.name}
                    width={16}
                    height={16}
                  />
                  <span>{selectedLanguage.nativeName}</span>
                  <Image
                    src="/assets/images/arrow-down.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="ms-1"
                  />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="language-dropdown-menu">
                {languages.map((language) => (
                  <Dropdown.Item 
                    key={language.code}
                    onClick={() => handleLanguageChange(language)}
                    className="language-dropdown-item"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <Image
                        src={language.flag}
                        alt={language.name}
                        width={16}
                        height={16}
                      />
                      <span>{language.nativeName}</span>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Main Content */}
        <Row className="flex-grow-1 d-flex align-items-center justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5} xxl={4}>
            <div className="admin-login-container">
              
              {/* Logo Section */}
              <div className="text-center mb-5">
                <div className="logo-container mb-3">
                  <Image
                    src="/assets/images/project-logo.svg"
                    alt="WeBill365 Logo"
                    width={260}
                    height={45}
                    priority
                    className="img-fluid"
                  />
                </div>
                <h2 className="admin-tagline mb-0">Simple. Smart. Secured.</h2>
              </div>

              {/* Login Form Component */}
              <LoginForm onSubmit={handleLogin} isLoading={isLoading} isAdmin={true} />

            </div>
          </Col>
        </Row>

        {/* Footer Links */}
        <Row className="flex-grow-0 py-4">
          <Col className="d-flex justify-content-center">
            <div className="admin-footer-links">
              <Button variant="link" className="footer-link">
                <Image
                  src="/assets/images/arrow-left-icon.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="me-1"
                />
                Forgot Password
              </Button>
              <Button variant="link" className="footer-link">
                <Image
                  src="/assets/images/help-icon.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="me-1"
                />
                Help Center
              </Button>
              <Button variant="link" className="footer-link">
                <Image
                  src="/assets/images/privacy-icon.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="me-1"
                />
                Privacy Policy
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 