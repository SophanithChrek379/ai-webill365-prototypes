"use client";

import React, { useState } from "react";
import { Row, Col, Card, Badge, Table, Form, Modal } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import AppBar from "../../components/AppBar";
import Pagination from "../../components/Pagination";
import Input from "../../components/Input";
import Button from "../../components/Button";
import WLDateRangePicker from "@/components/WLDateRangePicker";
import StatusDropdown, { StatusOption } from "../../components/StatusDropdown";
import CustomerDetailModal from "../../components/CustomerDetailModal";
import ViewSettingsModal, {
  ColumnOption,
} from "../../components/ViewSettingsModal";
import BulkActions, { BulkAction } from "../../components/BulkActions";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { exportToCSV, formatDateForExport } from "../../utils/exportUtils";

// Mock data for the subscribers
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
    lastLogin: "24-04-2020 11:33:00",
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
    lastLogin: "-",
    status: "Requested",
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
    status: "Requested",
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
    lastLogin: "1 month ago",
    status: "Inactive",
  },
  {
    id: 5,
    fullName: "Kampuchea Escapades",
    taxId: "98765432100-(123)",
    mobileNo: "11-0999-8888",
    email: "KampucheaConnect@gmail.com",
    userId: "KampucheaDiaries",
    plan: "Basic",
    subscriptionDate: "24-04-2020 11:33:00",
    lastLogin: "-",
    status: "Rejected",
  },
  {
    id: 6,
    fullName: "Kampuchea Journeys",
    taxId: "98765432100-(123)",
    mobileNo: "11-0999-8888",
    email: "KampucheaConnect@gmail.com",
    userId: "KampucheaMemoirs",
    plan: "Standard",
    subscriptionDate: "24-04-2020 11:33:00",
    lastLogin: "5 minute ago",
    status: "Approved",
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
  subscriber: any,
  onView: () => void
) => {
  if (status === "Requested") {
    return (
      <div className="d-flex gap-1">
        <Button
          size="sm"
          variant="primary"
          outline
          className="action-btn"
          onClick={onView}
        >
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
    <Button
      size="sm"
      variant="primary"
      outline
      className="action-btn"
      onClick={onView}
    >
      <i className="bi bi-eye"></i>
    </Button>
  );
};

export default function SubscribersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [previewModal, setPreviewModal] = useState<{
    show: boolean;
    subscriber: any | null;
  }>({ show: false, subscriber: null });

  // Status filter state with localStorage persistence
  const [selectedStatuses, setSelectedStatuses] = useLocalStorage<
    StatusOption[]
  >("subscribers-status-filters", [
    { id: "requested", label: "Requested", checked: false },
    { id: "approved", label: "Approved", checked: false },
    { id: "rejected", label: "Rejected", checked: false },
    { id: "inactive", label: "Inactive", checked: false },
  ]);

  // View settings state with localStorage persistence
  const [showViewSettings, setShowViewSettings] = useState(false);
  const [tableColumns, setTableColumns] = useLocalStorage<ColumnOption[]>(
    "subscribers-table-columns",
    [
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
    ]
  );

  // Bulk selection state
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

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
  const handleRowSelection = (subscriberId: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(subscriberId)) {
      newSelectedRows.delete(subscriberId);
    } else {
      newSelectedRows.add(subscriberId);
    }
    setSelectedRows(newSelectedRows);
  };

  // Customer detail modal handlers
  const handleApprove = (subscriber: any) => {
    console.log("Approving subscriber:", subscriber);
    // Here you would typically make an API call to approve the subscriber
    // For now, we'll just log the action
  };

  const handleReject = (subscriber: any) => {
    console.log("Rejecting subscriber:", subscriber);
    // Here you would typically make an API call to reject the subscriber
    // For now, we'll just log the action
  };

  const handleSelectAll = () => {
    const allIds = new Set(
      currentSubscribers.map((subscriber) => subscriber.id)
    );
    setSelectedRows(allIds);
  };

  const handleClearSelection = () => {
    setSelectedRows(new Set());
  };

  const handleBulkAction = (action: BulkAction) => {
    const selectedSubscribers = currentSubscribers.filter((subscriber) =>
      selectedRows.has(subscriber.id)
    );

    switch (action.id) {
      case "approve":
        console.log("Bulk approve:", selectedSubscribers);
        // Here you would typically make an API call
        break;
      case "reject":
        console.log("Bulk reject:", selectedSubscribers);
        break;
      case "export":
        console.log("Bulk export:", selectedSubscribers);
        // Prepare data for export
        const exportData = selectedSubscribers.map((subscriber) => ({
          "Full Name": subscriber.fullName,
          "Tax ID": subscriber.taxId,
          "Mobile Number": subscriber.mobileNo,
          Email: subscriber.email,
          "User ID": subscriber.userId,
          Plan: subscriber.plan,
          "Subscription Date": formatDateForExport(subscriber.subscriptionDate),
          "Last Login": subscriber.lastLogin,
          Status: subscriber.status,
        }));
        exportToCSV(
          exportData,
          `subscribers-export-${new Date().toISOString().split("T")[0]}.csv`
        );
        break;
      case "delete":
        console.log("Bulk delete:", selectedSubscribers);
        break;
      default:
        console.log("Unknown bulk action:", action.id);
    }

    // Clear selection after action
    setSelectedRows(new Set());
  };

  // Bulk actions configuration
  const bulkActions: BulkAction[] = [
    {
      id: "approve",
      label: "Approve Selected",
      icon: "bi-check-circle",
      variant: "success",
      onClick: () =>
        handleBulkAction({
          id: "approve",
          label: "",
          icon: "",
          variant: "success",
          onClick: () => {},
        }),
    },
    {
      id: "reject",
      label: "Reject Selected",
      icon: "bi-x-circle",
      variant: "danger",
      onClick: () =>
        handleBulkAction({
          id: "reject",
          label: "",
          icon: "",
          variant: "danger",
          onClick: () => {},
        }),
    },
    {
      id: "export",
      label: "Export Selected",
      icon: "bi-download",
      variant: "primary",
      onClick: () =>
        handleBulkAction({
          id: "export",
          label: "",
          icon: "",
          variant: "primary",
          onClick: () => {},
        }),
    },
    {
      id: "delete",
      label: "Delete Selected",
      icon: "bi-trash",
      variant: "danger",
      onClick: () =>
        handleBulkAction({
          id: "delete",
          label: "",
          icon: "",
          variant: "danger",
          onClick: () => {},
        }),
    },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="admin-main">
        {/* App Bar */}
        <AppBar />

        {/* Subscribers Content */}
        <div className="admin-content">
          {/* Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Subscribers</h1>
          </div>

          {/* Statistics Cards */}
          <Row className="stats-container g-3 mb-4">
            <Col md={4}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="stat-label">Pending subscribers</h6>
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
                      <h6 className="stat-label">Total Inactive</h6>
                      <h3 className="stat-value">1</h3>
                      <small className="stat-footer">1 New this month</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Activities Section */}
          <div className="d-flex flex-column mt-5">
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
                <StatusDropdown
                  selectedStatuses={selectedStatuses}
                  onStatusChange={handleStatusChange}
                  onReset={handleStatusReset}
                  onSave={handleStatusSave}
                  onCancel={handleStatusCancel}
                />
              </div>

              <div className="d-flex gap-3 align-items-center">
                <Button
                  variant="primary"
                  outline
                  size="sm"
                  className="view-btn"
                  onClick={() => setShowViewSettings(true)}
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

            {/* Bulk Actions */}
            {selectedRows.size > 0 && (
              <BulkActions
                selectedCount={selectedRows.size}
                totalCount={currentSubscribers.length}
                actions={bulkActions}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
              />
            )}

            {/* Activities Table */}
            <div className="activities-table">
              <Table responsive className="table-hover">
                <thead>
                  <tr>
                    <th className="table-checkbox-cell">
                      <Form.Check
                        type="checkbox"
                        checked={
                          selectedRows.size === currentSubscribers.length &&
                          currentSubscribers.length > 0
                        }
                        onChange={handleSelectAll}
                        className="table-checkbox"
                      />
                    </th>
                    {tableColumns
                      .filter((column) => column.visible)
                      .sort((a, b) => a.order - b.order)
                      .map((column) => (
                        <th key={column.id}>{column.label.toUpperCase()}</th>
                      ))}
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
                      <td className="table-checkbox-cell">
                        <Form.Check
                          type="checkbox"
                          checked={selectedRows.has(subscriber.id)}
                          onChange={() => handleRowSelection(subscriber.id)}
                          className="table-checkbox"
                        />
                      </td>
                      {tableColumns
                        .filter((column) => column.visible)
                        .sort((a, b) => a.order - b.order)
                        .map((column) => {
                          switch (column.id) {
                            case "fullName":
                              return (
                                <td key={column.id}>{subscriber.fullName}</td>
                              );
                            case "taxId":
                              return (
                                <td key={column.id}>{subscriber.taxId}</td>
                              );
                            case "mobileNo":
                              return (
                                <td key={column.id}>{subscriber.mobileNo}</td>
                              );
                            case "email":
                              return (
                                <td key={column.id}>{subscriber.email}</td>
                              );
                            case "userId":
                              return (
                                <td key={column.id}>{subscriber.userId}</td>
                              );
                            case "plan":
                              return <td key={column.id}>{subscriber.plan}</td>;
                            case "subscriptionDate":
                              return (
                                <td key={column.id}>
                                  {subscriber.subscriptionDate}
                                </td>
                              );
                            case "lastLogin":
                              return (
                                <td key={column.id}>{subscriber.lastLogin}</td>
                              );
                            case "status":
                              return (
                                <td key={column.id}>
                                  {getStatusBadge(subscriber.status)}
                                </td>
                              );
                            case "actions":
                              return (
                                <td key={column.id}>
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
                              return <td key={column.id}></td>;
                          }
                        })}
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