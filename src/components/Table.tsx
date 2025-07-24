"use client";

import React, { useState } from "react";
import Image from "next/image";
import Badge from "./Badge";

interface TableColumn {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  className?: string;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  onRowClick?: (row: Record<string, unknown>) => void;
  onActionClick?: (action: string, row: Record<string, unknown>) => void;
  sortable?: boolean;
  selectable?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (selectedRows: string[]) => void;
}

interface TableHeaderProps {
  column: TableColumn;
  sortDirection?: "asc" | "desc";
  onSort?: (key: string) => void;
  sortable?: boolean;
}

function TableHeader({
  column,
  sortDirection,
  onSort,
  sortable,
}: TableHeaderProps) {
  const handleSort = () => {
    if (sortable && column.sortable !== false && onSort) {
      onSort(column.key);
    }
  };

  return (
    <div
      className={`table-header-cell ${
        column.sortable !== false && sortable ? "sortable" : ""
      }`}
      style={{ width: column.width }}
      onClick={handleSort}
    >
      <div className="table-header-content">
        <span className="table-header-title">{column.title}</span>
        {column.sortable !== false && sortable && (
          <div className="table-sort-icon">
            <Image
              src="/assets/images/arrow-down.svg"
              alt="Sort"
              width={16}
              height={16}
              className={`sort-icon ${
                sortDirection ? `sort-${sortDirection}` : ""
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Table({
  columns,
  data,
  className = "",
  onSort,
  onRowClick,
  onActionClick,
  sortable = true,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
}: TableProps) {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    const newDirection =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDirection(newDirection);

    if (onSort) {
      onSort(key, newDirection);
    }
  };

  const handleRowClick = (row: Record<string, unknown>) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };



  const handleSelectionChange = (rowId: string, checked: boolean) => {
    if (onSelectionChange) {
      const newSelection = checked
        ? [...selectedRows, rowId]
        : selectedRows.filter((id) => id !== rowId);
      onSelectionChange(newSelection);
    }
  };

  return (
    <div className={`data-table ${className}`}>
      <div className="table-container">
        {/* Table Header */}
        <div className="table-header">
          {selectable && (
            <div className="table-header-cell checkbox-cell">
              <input
                type="checkbox"
                checked={selectedRows.length === data.length && data.length > 0}
                onChange={(e) => {
                  if (onSelectionChange) {
                    const newSelection = e.target.checked
                      ? data.map((row) => String(row.id || row.key || ""))
                      : [];
                    onSelectionChange(newSelection);
                  }
                }}
                className="table-checkbox"
              />
            </div>
          )}
          {columns.map((column) => (
            <TableHeader
              key={column.key}
              column={column}
              sortDirection={sortKey === column.key ? sortDirection : undefined}
              onSort={handleSort}
              sortable={sortable}
            />
          ))}
        </div>

        {/* Table Body */}
        <div className="table-body">
          {data.map((row, rowIndex) => (
            <div
              key={String(row.id || row.key || rowIndex)}
              className={`table-row ${onRowClick ? "clickable" : ""} ${
                selectedRows.includes(String(row.id || row.key || ""))
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleRowClick(row)}
            >
              {selectable && (
                <div className="table-cell checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(
                      String(row.id || row.key || "")
                    )}
                    onChange={(e) =>
                      handleSelectionChange(
                        String(row.id || row.key || ""),
                        e.target.checked
                      )
                    }
                    className="table-checkbox"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              {columns.map((column) => (
                <div
                  key={column.key}
                  className={`table-cell ${
                    column.align ? `align-${column.align}` : ""
                  }`}
                  style={{ width: column.width }}
                >
                  {column.render ? (
                    column.render(row[column.key], row)
                  ) : (
                    <span className="table-cell-text">
                      {String(row[column.key] || "")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Pre-built cell renderers
export function StatusCell({ status }: { status: string }) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return { variant: "success" as const, text: "Approved" };
      case "rejected":
        return { variant: "danger" as const, text: "Rejected" };
      case "requested":
        return { variant: "primary" as const, text: "Requested" };
      case "inactive":
        return { variant: "danger" as const, text: "Inactive" };
      default:
        return { variant: "secondary" as const, text: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} size="sm" showBorder={true}>
      {config.text}
    </Badge>
  );
}

export function ActionCell({
  actions,
  onActionClick,
  row,
}: {
  actions: string[];
  onActionClick: (action: string, row: Record<string, unknown>) => void;
  row: Record<string, unknown>;
}) {
  const getActionIcon = (action: string) => {
    switch (action) {
      case "view":
        return "/assets/images/eye-icon.svg";
      case "edit":
        return "/assets/images/filter-icon.svg";
      case "delete":
        return "/assets/images/arrow-left-icon.svg";
      case "approve":
        return "/assets/images/check-icon.svg";
      case "reject":
        return "/assets/images/arrow-left-icon.svg";
      default:
        return "/assets/images/eye-icon.svg";
    }
  };

  return (
    <div className="action-buttons">
      {actions.map((action) => (
        <button
          key={action}
          className={`action-button action-${action}`}
          onClick={() => onActionClick(action, row)}
          title={action.charAt(0).toUpperCase() + action.slice(1)}
        >
          <Image
            src={getActionIcon(action)}
            alt={action}
            width={12}
            height={12}
            className="action-icon"
          />
          {action === "view" && <span className="action-text">View</span>}
        </button>
      ))}
    </div>
  );
}

export function DateCell({ date }: { date: string }) {
  return (
    <span className="table-cell-text">
      {new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </span>
  );
}

export function TimeAgoCell({ date }: { date: string }) {
  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMinutes = Math.floor(
      (now.getTime() - past.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12)
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  };

  return (
    <span className="table-cell-text">
      {date === "-" ? "-" : getTimeAgo(date)}
    </span>
  );
}
