'use client';

import { Container, Row, Col, Card as BootstrapCard } from 'react-bootstrap';
import Sidebar from '@/components/Sidebar';
import AppBar from '@/components/AppBar';
import Card from '@/components/Card';

export default function AdminDashboard() {
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

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <AppBar
          notificationCount={5}
          userAvatar="/assets/images/avatar/avatar-01.svg"
          userName="Admin User"
          onNotificationClick={handleNotificationClick}
          onUserMenuClick={handleUserMenuClick}
        />
        <div className="admin-content">
          <Container fluid>
            <Row>
              <Col>
                <h1 className="mb-4">Dashboard</h1>
                
                {/* Stats Cards */}
                <Row className="mb-4">
                  <Col md={3}>
                    <Card
                      title="Total Users"
                      value="1,234"
                      footer="+12% from last month"
                      variant="primary"
                    />
                  </Col>
                  <Col md={3}>
                    <Card
                      title="Active Subscriptions"
                      value="892"
                      footer="+5% from last month"
                      variant="success"
                    />
                  </Col>
                  <Col md={3}>
                    <Card
                      title="Revenue"
                      value="$45,678"
                      footer="+8.5% from last month"
                      variant="default"
                    />
                  </Col>
                  <Col md={3}>
                    <Card
                      title="Pending Orders"
                      value="23"
                      footer="5 urgent"
                      variant="warning"
                    />
                  </Col>
                </Row>

                {/* Welcome Card */}
                <BootstrapCard>
                  <BootstrapCard.Body>
                    <BootstrapCard.Title>Welcome to WeBill365 Admin</BootstrapCard.Title>
                    <BootstrapCard.Text>
                      This is the admin dashboard page. The sidebar, AppBar, and Card components are working correctly with full functionality.
                    </BootstrapCard.Text>
                  </BootstrapCard.Body>
                </BootstrapCard>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
} 