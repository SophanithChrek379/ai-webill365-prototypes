"use client";

import React, { useState } from "react";
import { Row, Col, Card, Badge, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import AppBar from "../../components/AppBar";
import Pagination from "../../components/Pagination";
import Input from "../../components/Input";
import WLDateRangePicker from "@/components/WLDateRangePicker";
import StatusDropdown, { StatusOption } from "../../components/StatusDropdown";
import CustomerDetailModal from "../../components/CustomerDetailModal";
import ViewSettingsModal, {
  ColumnOption,
} from "../../components/ViewSettingsModal";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { getImagePath } from "@/utils/assetUtils";

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

const getActionButtons = (
  status: string,
  subscriber: Record<string, unknown>,
  onView: () => void
) => {
  if (status === "Requested") {
    return (
      <div className="d-flex align-items-center gap-1">
        <button className="wl-btn-sm wl-btn-primary-text" onClick={onView}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M6 9.53918C2.77734 9.53918 0.521484 6.90466 0.521484 6.09094C0.521484 5.27319 2.77734 2.63867 6 2.63867C9.26294 2.63867 11.4785 5.27319 11.4785 6.09094C11.4785 6.90466 9.26697 9.53918 6 9.53918ZM6 8.30249C7.22058 8.30249 8.21155 7.31152 8.21155 6.09094C8.21155 4.87036 7.22058 3.87939 6 3.87939C4.77942 3.87939 3.78845 4.87036 3.78845 6.09094C3.78845 7.31152 4.77942 8.30249 6 8.30249ZM6 6.92078C5.54077 6.92078 5.17017 6.55017 5.17017 6.09094C5.17017 5.63171 5.54077 5.26111 6 5.26111C6.45923 5.26111 6.82983 5.63171 6.82983 6.09094C6.82983 6.55017 6.45923 6.92078 6 6.92078Z"
              fill="currentColor"
            />
          </svg>
          <span>View</span>
        </button>
        <button className="wl-btn-sm wl-btn-icon wl-btn-primary-outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M4.78125 11.4961C4.48828 11.4961 4.27148 11.373 4.06641 11.1211L1.03125 7.32422C0.884766 7.14258 0.820312 6.97266 0.820312 6.79688C0.820312 6.39258 1.11914 6.09961 1.5293 6.09961C1.78711 6.09961 1.96289 6.19336 2.13281 6.42188L4.75781 9.79102L9.84961 1.70508C10.0254 1.42969 10.1953 1.33008 10.4824 1.33008C10.8926 1.33008 11.1738 1.61133 11.1738 2.01562C11.1738 2.17383 11.127 2.33789 11.0039 2.52539L5.49609 11.1152C5.32617 11.3672 5.0918 11.4961 4.78125 11.4961Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button className="wl-btn-sm wl-btn-icon wl-btn-danger-outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M1.46412 10.804C1.21216 10.5579 1.21802 10.1243 1.46412 9.88404L5.06763 6.27466L1.46412 2.67115C1.21802 2.43091 1.21216 2.00318 1.46412 1.74537C1.71607 1.49341 2.14381 1.49927 2.3899 1.74537L5.99341 5.34888L9.59693 1.74537C9.84888 1.49927 10.2649 1.49927 10.5227 1.75123C10.7805 1.99732 10.7747 2.42506 10.5286 2.67115L6.92506 6.27466L10.5286 9.88404C10.7747 10.1301 10.7747 10.552 10.5227 10.804C10.2708 11.0618 9.84888 11.0559 9.59693 10.8098L5.99341 7.20631L2.3899 10.8098C2.14381 11.0559 1.72193 11.0559 1.46412 10.804Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    );
  }
  return (
    <button className="wl-btn-sm wl-btn-primary-text" onClick={onView}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M6 9.53918C2.77734 9.53918 0.521484 6.90466 0.521484 6.09094C0.521484 5.27319 2.77734 2.63867 6 2.63867C9.26294 2.63867 11.4785 5.27319 11.4785 6.09094C11.4785 6.90466 9.26697 9.53918 6 9.53918ZM6 8.30249C7.22058 8.30249 8.21155 7.31152 8.21155 6.09094C8.21155 4.87036 7.22058 3.87939 6 3.87939C4.77942 3.87939 3.78845 4.87036 3.78845 6.09094C3.78845 7.31152 4.77942 8.30249 6 8.30249ZM6 6.92078C5.54077 6.92078 5.17017 6.55017 5.17017 6.09094C5.17017 5.63171 5.54077 5.26111 6 5.26111C6.45923 5.26111 6.82983 5.63171 6.82983 6.09094C6.82983 6.55017 6.45923 6.92078 6 6.92078Z"
          fill="currentColor"
        />
      </svg>
      <span>View</span>
    </button>
  );
};

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [previewModal, setPreviewModal] = useState<{
    show: boolean;
    subscriber: Record<string, unknown> | null;
  }>({ show: false, subscriber: null });

  // Add client-side only state to prevent hydration issues
  const [isClient, setIsClient] = useState(false);

  // Default column configuration
  const defaultTableColumns: ColumnOption[] = [
    { id: "fullName", label: "Full Name", visible: true, order: 1 },
    { id: "taxId", label: "Tax ID", visible: true, order: 2 },
    { id: "mobileNo", label: "Mobile Number", visible: true, order: 3 },
    { id: "email", label: "Email", visible: true, order: 4 },
    { id: "userId", label: "User ID", visible: true, order: 5 },
    { id: "plan", label: "Plan", visible: true, order: 6 },
    {
      id: "subscriptionDate",
      label: "Subscription Date",
      visible: true,
      order: 7,
    },
    { id: "lastLogin", label: "Last login", visible: true, order: 8 },
    { id: "status", label: "Status", visible: true, order: 9 },
    { id: "actions", label: "Actions", visible: true, order: 10 },
  ];

  const defaultStatuses: StatusOption[] = [
    { id: "requested", label: "Requested", checked: false },
    { id: "approved", label: "Approved", checked: false },
    { id: "rejected", label: "Rejected", checked: false },
    { id: "inactive", label: "Inactive", checked: false },
  ];

  // Status filter state with localStorage persistence
  const [selectedStatuses, setSelectedStatuses] = useLocalStorage<
    StatusOption[]
  >("dashboard-status-filters", defaultStatuses);

  // View settings state with localStorage persistence
  const [showViewSettings, setShowViewSettings] = useState(false);
  const [tableColumns, setTableColumns] = useLocalStorage<ColumnOption[]>(
    "dashboard-table-columns",
    defaultTableColumns
  );

  // Set client-side flag on mount
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Bulk selection state
  const [selectedRows] = useState<Set<number>>(new Set());

  // Filter subscribers based on search term and selected statuses
  const filteredSubscribers = mockSubscribers.filter((subscriber) => {
    const matchesSearch =
      subscriber.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.taxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const selectedStatusIds = selectedStatuses
      .filter((status) => status.checked)
      .map((status) => status.id);

    const matchesStatus =
      selectedStatusIds.length === 0 ||
      selectedStatusIds.includes(subscriber.status.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubscribers = filteredSubscribers.slice(startIndex, endIndex);

  // Status dropdown handlers
  const handleStatusChange = (statuses: StatusOption[]) => {
    setSelectedStatuses(statuses);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleStatusReset = () => {
    const resetStatuses = selectedStatuses.map((status) => ({
      ...status,
      checked: false,
    }));
    setSelectedStatuses(resetStatuses);
  };

  const handleStatusSave = () => {
    // Status changes are already applied in handleStatusChange
    console.log("Status filter saved:", selectedStatuses);
  };

  const handleStatusCancel = () => {
    // Reset to previous state (this would be handled by the component internally)
    console.log("Status filter cancelled");
  };

  // View settings handlers
  const handleColumnsChange = (columns: ColumnOption[]) => {
    setTableColumns(columns);
  };

  const handleViewSettingsReset = () => {
    const resetColumns = tableColumns.map((column) => ({
      ...column,
      visible: true,
    }));
    setTableColumns(resetColumns);
  };

  const handleViewSettingsSave = () => {
    console.log("View settings saved:", tableColumns);
  };

  const handleViewSettingsCancel = () => {
    console.log("View settings cancelled");
  };

  // Bulk actions handlers
  // Customer detail modal handlers
  const handleApprove = (subscriber: Record<string, unknown>) => {
    console.log("Approving subscriber:", subscriber);
    // Here you would typically make an API call to approve the subscriber
    // For now, we'll just log the action
  };

  const handleReject = (subscriber: Record<string, unknown>) => {
    console.log("Rejecting subscriber:", subscriber);
    // Here you would typically make an API call to reject the subscriber
    // For now, we'll just log the action
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <AppBar />

        <div className="admin-content">
          <div className="wl-page-header">
            <div className="wl-header-content">
              <ol className="wl-breadcrumb">
                <li className="wl-breadcrumb-item wl-active">Dashboard</li>
              </ol>
            </div>
          </div>

          <Row className="g-3">
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

          <div className="activities-header mt-5">
            <h2 className="activities-title">Recent Activities</h2>
            <p className="activities-subtitle">
              Latest subscriber applications requiring review
            </p>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-2 align-items-center">
              <WLDateRangePicker />
              <StatusDropdown
                selectedStatuses={selectedStatuses}
                onStatusChange={handleStatusChange}
                onReset={handleStatusReset}
                onSave={handleStatusSave}
                onCancel={handleStatusCancel}
              />
            </div>

            <div className="d-flex gap-2 align-items-center">
              <button
                className="wl-btn-primary-outline"
                onClick={() => setShowViewSettings(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2.56055 14.3447C1.18945 14.3447 0.478516 13.6401 0.478516 12.2881V4.55664C0.478516 3.19824 1.18945 2.5 2.56055 2.5H13.4341C14.8052 2.5 15.5161 3.20459 15.5161 4.55664V12.2881C15.5161 13.6401 14.8052 14.3447 13.4341 14.3447H2.56055ZM2.63672 13.1006H5.09326V3.73779H2.63672C2.04639 3.73779 1.72266 4.04883 1.72266 4.66455V12.1802C1.72266 12.7959 2.04639 13.1006 2.63672 13.1006ZM6.31201 13.1006H9.68262V3.73779H6.31201V13.1006ZM13.3579 3.73779H10.9014V13.1006H13.3579C13.9419 13.1006 14.272 12.7959 14.272 12.1802V4.66455C14.272 4.04883 13.9419 3.73779 13.3579 3.73779Z"
                    fill="currentColor"
                  />
                </svg>
                View
              </button>
              <Input
                type="search"
                placeholder="Search name, tax id, email, user id"
                value={searchTerm}
                onChange={setSearchTerm}
                leadIcon={getImagePath("search-icon.svg")}
                clearButton={true}
                size="sm"
                className="search-input"
              />
            </div>
          </div>

          <div className="w-100 h-100 d-flex flex-column overflow-hidden">
            <>
              {!isClient ? (
                // Show loading state during SSR to prevent hydration mismatch
                // style={{ height: "200px" }}
                <div className="d-flex justify-content-center align-items-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      {tableColumns
                        .filter((column) => column.visible)
                        .sort((a, b) => a.order - b.order)
                        .map((column) => {
                          // You can manually add custom width classes here for each column
                          let customWidthClass = "";

                          // Example: Add your custom width classes here
                          switch (column.id) {
                            case "fullName":
                              customWidthClass = "wl-width-auto";
                              break;
                            case "taxId":
                              customWidthClass = "wl-width-250";
                              break;
                            case "mobileNo":
                              customWidthClass = "wl-width-140";
                              break;
                            case "email":
                              customWidthClass = "wl-width-250";
                              break;
                            case "userId":
                              customWidthClass = "wl-width-180";
                              break;
                            case "plan":
                              customWidthClass = "wl-width-100";
                              break;
                            case "subscriptionDate":
                              customWidthClass = "wl-width-180";
                              break;
                            case "lastLogin":
                              customWidthClass = "wl-width-300";
                              break;
                            case "status":
                              customWidthClass = "wl-width-100";
                              break;
                            case "actions":
                              customWidthClass = "wl-width-150";
                              break;
                            default:
                              customWidthClass = "";
                          }

                          return (
                            <th key={column.id} className={customWidthClass}>
                              {column.label.toUpperCase()}
                            </th>
                          );
                        })}
                    </tr>
                  </thead>
                  <tbody>
                    {currentSubscribers.map((subscriber) => (
                      <tr
                        key={subscriber.id}
                        className={`table-row-selectable ${
                          selectedRows.has(subscriber.id)
                            ? "table-row-selected"
                            : ""
                        }`}
                      >
                        {tableColumns
                          .filter((column) => column.visible)
                          .sort((a, b) => a.order - b.order)
                          .map((column) => {
                            // Apply the same custom width classes to table cells
                            let customWidthClass = "";

                            switch (column.id) {
                              case "fullName":
                                customWidthClass = "wl-width-300";
                                break;
                              case "taxId":
                                customWidthClass = "wl-width-200";
                                break;
                              case "mobileNo":
                                customWidthClass = "wl-width-140";
                                break;
                              case "email":
                                customWidthClass = "wl-width-250";
                                break;
                              case "userId":
                                customWidthClass = "wl-width-auto";
                                break;
                              case "plan":
                                customWidthClass = "wl-width-100";
                                break;
                              case "subscriptionDate":
                                customWidthClass = "wl-width-200";
                                break;
                              case "lastLogin":
                                customWidthClass = "wl-width-160";
                                break;
                              case "status":
                                customWidthClass = "wl-width-100";
                                break;
                              case "actions":
                                customWidthClass = "wl-width-150";
                                break;
                              default:
                                customWidthClass = "";
                            }

                            switch (column.id) {
                              case "fullName":
                                return (
                                  <td
                                    key={column.id}
                                    className={customWidthClass}
                                  >
                                    {subscriber.fullName}
                                  </td>
                                );
                              case "taxId":
                                return (
                                  <td
                                    key={column.id}
                                    className={customWidthClass}
                                  >
                                    {subscriber.taxId}
                                  </td>
                                );
                              case "mobileNo":
                                return (
                                  <td
                                    key={column.id}
                                    className={customWidthClass}
                                  >
                                    {subscriber.mobileNo}
                                  </td>
                                );
                              case "email":
                                return (
                                  <td
                                    key={column.id}
                                    className={customWidthClass}
                                  >
                                    {subscriber.email}
                                  </td>
                                );
                              case "userId":
                                return (
                                  <td
                                    key={column.id}
                                    className={customWidthClass}
                                  >
                                    {subscriber.userId}
                                  </td>
                                );
                              case "plan":
                                return (
                                  <td
                                    key={column.id}
                                    className={customWidthClass}
                                  >
                                    {subscriber.plan}
                                  </td>
                                );
                              case "subscriptionDate":
                                return (
                                  <td
                                    key={column.id}
                                    className={customWidthClass}
                                  >
                                    {subscriber.subscriptionDate}
                                  </td>
                                );
                              case "lastLogin":
                                return (
                                  <td
                                    key={column.id}
                                    className={customWidthClass}
                                  >
                                    {subscriber.lastLogin}
                                  </td>
                                );
                              case "status":
                                return (
                                  <td
                                    key={column.id}
                                    className={customWidthClass}
                                  >
                                    {getStatusBadge(subscriber.status)}
                                  </td>
                                );
                              case "actions":
                                return (
                                  <td
                                    key={column.id}
                                    className={customWidthClass}
                                  >
                                    {getActionButtons(
                                      subscriber.status,
                                      subscriber,
                                      () =>
                                        setPreviewModal({
                                          show: true,
                                          subscriber,
                                        })
                                    )}
                                  </td>
                                );
                              default:
                                return (
                                  <td
                                    key={column.id}
                                    className={customWidthClass}
                                  ></td>
                                );
                            }
                          })}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>

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

      {/* View Settings Modal */}
      <ViewSettingsModal
        show={showViewSettings}
        onHide={() => setShowViewSettings(false)}
        columns={tableColumns}
        onColumnsChange={handleColumnsChange}
        onReset={handleViewSettingsReset}
        onSave={handleViewSettingsSave}
        onCancel={handleViewSettingsCancel}
      />

      {/* Customer Detail Modal */}
      <CustomerDetailModal
        show={previewModal.show}
        onHide={() => setPreviewModal({ show: false, subscriber: null })}
        subscriber={previewModal.subscriber}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
