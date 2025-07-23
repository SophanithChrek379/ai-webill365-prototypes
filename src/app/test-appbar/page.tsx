'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AppBar from '@/components/AppBar';

export default function TestAppBarPage() {
  const [notificationCount, setNotificationCount] = useState(5);
  const [currentAvatar, setCurrentAvatar] = useState('/assets/images/avatar/avatar-01.svg');

  const handleNotificationClick = () => {
    console.log('Notification clicked');
    // Here you would typically show a notification panel
    alert('Notification panel would open here');
  };

  const handleUserMenuClick = (action: string) => {
    console.log('User menu action:', action);
    switch (action) {
      case 'profile':
        alert('Profile page would open');
        break;
      case 'settings':
        alert('Settings page would open');
        break;
      case 'logout':
        alert('Logout would be triggered');
        break;
      default:
        break;
    }
  };

  const avatars = [
    '/assets/images/avatar/avatar-01.svg',
    '/assets/images/avatar/avatar-02.svg',
    '/assets/images/avatar/avatar-03.svg',
    '/assets/images/avatar/avatar-04.svg',
    '/assets/images/avatar/avatar-05.svg',
  ];

  return (
    <div className="test-appbar-page">
      {/* AppBar */}
      <AppBar
        notificationCount={notificationCount}
        userAvatar={currentAvatar}
        userName="John Doe"
        onNotificationClick={handleNotificationClick}
        onUserMenuClick={handleUserMenuClick}
      />

      {/* Test Content */}
      <Container className="mt-4">
        <Row>
          <Col>
            <h1 className="mb-4">AppBar Component Test</h1>
            
            <Card className="mb-4">
              <Card.Header>
                <h5>Notification Count Controls</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  <Button 
                    variant="outline-primary"
                    onClick={() => setNotificationCount(0)}
                  >
                    No Notifications
                  </Button>
                  <Button 
                    variant="outline-primary"
                    onClick={() => setNotificationCount(1)}
                  >
                    1 Notification
                  </Button>
                  <Button 
                    variant="outline-primary"
                    onClick={() => setNotificationCount(5)}
                  >
                    5 Notifications
                  </Button>
                  <Button 
                    variant="outline-primary"
                    onClick={() => setNotificationCount(99)}
                  >
                    99 Notifications
                  </Button>
                  <Button 
                    variant="outline-primary"
                    onClick={() => setNotificationCount(1000)}
                  >
                    1000+ Notifications
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Avatar Selection</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  {avatars.map((avatar, index) => (
                    <Button
                      key={index}
                      variant="outline-secondary"
                      onClick={() => setCurrentAvatar(avatar)}
                      className="avatar-button"
                    >
                      <img 
                        src={avatar} 
                        alt={`Avatar ${index + 1}`}
                        width={24}
                        height={24}
                        className="me-2"
                      />
                      Avatar {index + 1}
                    </Button>
                  ))}
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h5>AppBar Features</h5>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <strong>Notification Icon:</strong> Click the bell icon to trigger notification action
                  </li>
                  <li className="mb-2">
                    <strong>Notification Badge:</strong> Shows count with red badge (99+ for large numbers)
                  </li>
                  <li className="mb-2">
                    <strong>User Avatar:</strong> Click to open dropdown menu
                  </li>
                  <li className="mb-2">
                    <strong>User Menu:</strong> Profile, Settings, and Logout options
                  </li>
                  <li className="mb-2">
                    <strong>Responsive:</strong> Adapts to different screen sizes
                  </li>
                  <li className="mb-2">
                    <strong>Sticky:</strong> Stays at top when scrolling
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 