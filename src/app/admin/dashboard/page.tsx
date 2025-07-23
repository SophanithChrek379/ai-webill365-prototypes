'use client';

import { Container, Row, Col, Card as BootstrapCard } from 'react-bootstrap';
import Sidebar from '@/components/Sidebar';
import AppBar from '@/components/AppBar';
import Card from '@/components/Card';
import Table, { StatusCell, ActionCell, DateCell, TimeAgoCell } from '@/components/Table';

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

                <Table
                      columns={[
                        {
                          key: 'fullName',
                          title: 'Full Name',
                          width: '200px',
                          sortable: true
                        },
                        {
                          key: 'email',
                          title: 'Email',
                          width: '240px',
                          sortable: true
                        },
                        {
                          key: 'plan',
                          title: 'Plan',
                          width: '112px',
                          sortable: true
                        },
                        {
                          key: 'subscriptionDate',
                          title: 'Subscription Date',
                          sortable: true,
                          render: (value: string) => <DateCell date={value} />
                        },
                        {
                          key: 'status',
                          title: 'Status',
                          sortable: true,
                          render: (value: string) => <StatusCell status={value} />
                        },
                        {
                          key: 'actions',
                          title: '',
                          width: '80px',
                          sortable: false,
                          render: (value: any, row: any) => (
                            <ActionCell
                              actions={['view']}
                              onActionClick={(action, row) => console.log(`${action} clicked for ${row.fullName}`)}
                              row={row}
                            />
                          )
                        }
                      ]}
                      data={[
                        {
                          id: '1',
                          fullName: 'Krong Kampuchea',
                          email: 'Krongkampuchea@gmail.com',
                          plan: 'Standard',
                          subscriptionDate: '2020-04-24T11:33:00',
                          status: 'Approved'
                        },
                        {
                          id: '2',
                          fullName: 'Kampuchea Wonders',
                          email: 'KampucheaExplorer@gmail.com',
                          plan: 'Basic',
                          subscriptionDate: '2020-04-24T11:33:00',
                          status: 'Approved'
                        },
                        {
                          id: '3',
                          fullName: 'Kampuchea Discoveries',
                          email: 'KampucheaJourney@gmail.com',
                          plan: 'Standard',
                          subscriptionDate: '2020-04-24T11:33:00',
                          status: 'Rejected'
                        }
                      ]}
                      onSort={(key, direction) => console.log(`Sorting by ${key} in ${direction} order`)}
                      onRowClick={(row) => console.log('Row clicked:', row)}
                    />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
} 