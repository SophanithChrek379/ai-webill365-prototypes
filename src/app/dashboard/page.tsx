"use client";

import React, { useState } from "react";
import { Row, Col, Card, Badge, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import AppBar from "../../components/AppBar";
import Pagination from "../../components/Pagination";
import Input from "../../components/Input";
import Button from "../../components/Button";
import WLDateRangePicker from "@/components/WLDateRangePicker";

// Mock data for the dashboard
const mockSubscribers = [
  {
    id: 1,
    fullName: "Krong Kampuchea",
    taxId: "98765432100-(123)",
    mobileNo: "11-0999-8888",
    email: "Krongkampuchea@gmail.com",
    userId: "Krongkampuchea",
    plan: "Standard",
    subscriptionDate: "24-04-2020 11:33:00",
    lastLogin: "5 minute ago",
    status: "Approved",
  },
  {
    id: 2,
    fullName: "Kampuchea Wonders",
    taxId: "12345678901-(987)",
    mobileNo: "11-0999-8888",
    email: "KampucheaExplorer@gmail.com",
    userId: "KampucheaQuest",
    plan: "Basic",
    subscriptionDate: "24-04-2020 11:33:00",
    lastLogin: "1 months ago",
    status: "Approved",
  },
  {
    id: 3,
    fullName: "Kampuchea Discoveries",
    taxId: "12345678901-(987)",
    mobileNo: "11-0999-8888",
    email: "KampucheaJourney@gmail.com",
    userId: "KampucheaTales",
    plan: "Standard",
    subscriptionDate: "24-04-2020 11:33:00",
    lastLogin: "-",
    status: "Rejected",
  },
  {
    id: 4,
    fullName: "Kampuchea Adventures",
    taxId: "12345678901-(987)",
    mobileNo: "11-0999-8888",
    email: "KampucheaTravels@gmail.com",
    userId: "KampucheaChronicles",
    plan: "Standard",
    subscriptionDate: "24-04-2020 11:33:00",
    lastLogin: "-",
    status: "Requested",
  },
  {
    id: 5,
    fullName: "Kampuchea Adventures",
    taxId: "12345678901-(987)",
    mobileNo: "11-0999-8888",
    email: "KampucheaTravels@gmail.com",
    userId: "KampucheaChronicles",
    plan: "Standard",
    subscriptionDate: "24-04-2020 11:33:00",
    lastLogin: "-",
    status: "Requested",
  },
  {
    id: 6,
    fullName: "Kampuchea Escapades",
    taxId: "12345678901-(987)",
    mobileNo: "11-0999-8888",
    email: "KampucheaConnect@gmail.com",
    userId: "KampucheaDiaries",
    plan: "Basic",
    subscriptionDate: "24-04-2020 11:33:00",
    lastLogin: "2 hours ago",
    status: "Approved",
  },
  {
    id: 7,
    fullName: "Kampuchea Journeys",
    taxId: "12345678901-(987)",
    mobileNo: "11-0999-8888",
    email: "KampucheaConnect@gmail.com",
    userId: "KampucheaMemoirs",
    plan: "Basic",
    subscriptionDate: "24-04-2020 11:33:00",
    lastLogin: "24-04-2020 11:33:00",
    status: "Inactive",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Approved":
      return (
        <Badge bg="success" className="status-badge">
          Approved
        </Badge>
      );
    case "Rejected":
      return (
        <Badge bg="danger" className="status-badge">
          Rejected
        </Badge>
      );
    case "Requested":
      return (
        <Badge bg="primary" className="status-badge">
          Requested
        </Badge>
      );
    case "Inactive":
      return (
        <Badge bg="warning" className="status-badge">
          Inactive
        </Badge>
      );
    default:
      return (
        <Badge bg="secondary" className="status-badge">
          {status}
        </Badge>
      );
  }
};

const getActionButtons = (status: string) => {
  if (status === "Requested") {
    return (
      <div className="d-flex gap-1">
        <Button size="sm" variant="primary" outline className="action-btn">
          <i className="bi bi-eye"></i>
        </Button>
        <Button size="sm" variant="primary" outline className="action-btn">
          <i className="bi bi-check"></i>
        </Button>
        <Button size="sm" variant="danger" outline className="action-btn">
          <i className="bi bi-x"></i>
        </Button>
      </div>
    );
  }
  return (
    <Button size="sm" variant="primary" outline className="action-btn">
      <i className="bi bi-eye"></i>
    </Button>
  );
};

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const filteredSubscribers = mockSubscribers.filter(
    (subscriber) =>
      subscriber.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.taxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubscribers = filteredSubscribers.slice(startIndex, endIndex);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="admin-main">
        {/* App Bar */}
        <AppBar />

        {/* Dashboard Content */}
        <div className="admin-content">
          {/* Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
          </div>

          {/* Statistics Cards */}
          <Row className="stats-container g-3 mb-4">
            <Col md={4}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="stat-label">Total Subscribers</h6>
                      <h3 className="stat-value">6</h3>
                      <small className="stat-footer">2 New per day</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="stat-label">Requested subscribers</h6>
                      <h3 className="stat-value">2</h3>
                      <small className="stat-footer">5 New per day</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="stat-label">Inactive subscribers</h6>
                      <h3 className="stat-value">1</h3>
                      <small className="stat-footer">1 New this month</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Activities Section */}
          <div className="activities-section">
            <div className="activities-header">
              <h2 className="activities-title">Recent Activities</h2>
              <p className="activities-subtitle">
                Latest subscriber applications requiring review
              </p>
            </div>

            {/* Filters */}
            <div className="activities-filters">
              <div className="d-flex gap-3 align-items-center">
                <WLDateRangePicker />
                <Button variant="primary" outline size="sm">
                  <i className="bi bi-check2-square me-1"></i>
                  Status
                </Button>
              </div>

              <div className="d-flex gap-3 align-items-center">
                <Button
                  variant="primary"
                  outline
                  size="sm"
                  className="view-btn"
                >
                  <i className="bi bi-grid me-1"></i>
                  View
                </Button>
                <Input
                  type="search"
                  placeholder="Search name, tax id, email, user id"
                  value={searchTerm}
                  onChange={setSearchTerm}
                  leadIcon="/assets/images/search-icon.svg"
                  clearButton={true}
                  size="sm"
                  className="search-input"
                />
              </div>
            </div>

            {/* Activities Table */}
            <div className="activities-table">
              <Table responsive className="table-hover">
                <thead>
                  <tr>
                    <th>FULL NAME</th>
                    <th>TAX ID</th>
                    <th>MOBILE NO.</th>
                    <th>EMAIL</th>
                    <th>USER ID</th>
                    <th>PLAN</th>
                    <th>SUBSCRIPTION DATE</th>
                    <th>LAST LOGIN</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubscribers.map((subscriber) => (
                    <tr key={subscriber.id}>
                      <td>{subscriber.fullName}</td>
                      <td>{subscriber.taxId}</td>
                      <td>{subscriber.mobileNo}</td>
                      <td>{subscriber.email}</td>
                      <td>{subscriber.userId}</td>
                      <td>{subscriber.plan}</td>
                      <td>{subscriber.subscriptionDate}</td>
                      <td>{subscriber.lastLogin}</td>
                      <td>{getStatusBadge(subscriber.status)}</td>
                      <td>{getActionButtons(subscriber.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="pagination-container">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={itemsPerPage}
                totalItems={filteredSubscribers.length}
                onPageChange={setCurrentPage}
                onPageSizeChange={setItemsPerPage}
                pageSizeOptions={[5, 10, 20, 50]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
