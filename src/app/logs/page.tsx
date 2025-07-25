"use client";

import { Row, Col, Card } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import AppBar from "../../components/AppBar";

export default function LogsPage() {

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
            <h1 className="dashboard-title">Logs</h1>
          </div>

          {/* Statistics Cards */}
          <Row className="stats-container g-3 mb-4">
            <Col md={4}>
              <Card className="wl-card">
                <Card.Body className="w-100 p-0">
                  <div className="wl-w-100 wl-d-flex wl-flex-column">
                    <div className="wl-w-100 wl-d-flex wl-justify-content-between wl-align-items-center">
                      <div className="wl-d-inline-flex wl-align-items-center wl-gap-1">
                        <span className="wl-text-body-small wl-fg-title">
                          Total Subscribers
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="wl-card-description">6</span>
                      <div className="d-inline-flex align-items-center wl-gap-1 mt-2">
                        <span className="wl-text-caption">2</span>
                        <span className="wl-text-caption">New per day</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="wl-card">
                <Card.Body className="w-100 p-0">
                  <div className="wl-w-100 wl-d-flex wl-flex-column">
                    <div className="wl-w-100 wl-d-flex wl-justify-content-between wl-align-items-center">
                      <div className="wl-d-inline-flex wl-align-items-center wl-gap-1">
                        <span className="wl-text-body-small wl-fg-title">
                          Requested subscribers
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="wl-card-description">6</span>
                      <div className="d-inline-flex align-items-center wl-gap-1 mt-2">
                        <span className="wl-text-caption">5</span>
                        <span className="wl-text-caption">New per day</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="wl-card">
                <Card.Body className="w-100 p-0">
                  <div className="wl-w-100 wl-d-flex wl-flex-column">
                    <div className="wl-w-100 wl-d-flex wl-justify-content-between wl-align-items-center">
                      <div className="wl-d-inline-flex wl-align-items-center wl-gap-1">
                        <span className="wl-text-body-small wl-fg-title">
                          Inactive subscribers
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <span className="wl-card-description">1</span>
                      <div className="d-inline-flex align-items-center wl-gap-1 mt-2">
                        <span className="wl-text-caption">1</span>
                        <span className="wl-text-caption">New this month</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </div>
      </div>

    </div>
  );
}
