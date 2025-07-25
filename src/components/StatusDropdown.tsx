import React, { useState, useRef, useEffect } from "react";
import { Dropdown, Form } from "react-bootstrap";
import Button from "./Button";

export interface StatusOption {
  id: string;
  label: string;
  checked: boolean;
}

export interface StatusDropdownProps {
  selectedStatuses: StatusOption[];
  onStatusChange: (statuses: StatusOption[]) => void;
  onReset?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  className?: string;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  selectedStatuses,
  onStatusChange,
  onReset,
  onSave,
  onCancel,
  className = "",
}) => {
  const [show, setShow] = useState(false);
  const [localStatuses, setLocalStatuses] =
    useState<StatusOption[]>(selectedStatuses);
  const [isClient, setIsClient] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Set client-side flag on mount to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update local state when props change
  useEffect(() => {
    setLocalStatuses(selectedStatuses);
  }, [selectedStatuses]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isClient) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClient]);

  const handleStatusToggle = (statusId: string) => {
    const updatedStatuses = localStatuses.map((status) =>
      status.id === statusId ? { ...status, checked: !status.checked } : status
    );
    setLocalStatuses(updatedStatuses);
  };

  const handleShowAllToggle = () => {
    const allChecked = localStatuses.every((status) => status.checked);
    const updatedStatuses = localStatuses.map((status) => ({
      ...status,
      checked: !allChecked,
    }));
    setLocalStatuses(updatedStatuses);
  };

  const handleSave = () => {
    onStatusChange(localStatuses);
    onSave?.();
    setShow(false);
  };

  const handleCancel = () => {
    setLocalStatuses(selectedStatuses); // Reset to original state
    onCancel?.();
    setShow(false);
  };

  const handleReset = () => {
    const resetStatuses = localStatuses.map((status) => ({
      ...status,
      checked: false,
    }));
    setLocalStatuses(resetStatuses);
    onReset?.();
  };

  const selectedCount = localStatuses.filter((status) => status.checked).length;
  const allChecked = localStatuses.every((status) => status.checked);

  // Don't render dropdown until client-side to prevent hydration issues
  if (!isClient) {
    return (
      <div ref={dropdownRef} className={`status-dropdown ${className}`}>
        <Button className="status-dropdown-toggle d-flex align-items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2.09033 5.80176C1.72217 5.80176 1.43018 5.49072 1.43018 5.12891C1.43018 4.76074 1.72217 4.45605 2.09033 4.45605H13.9097C14.2778 4.45605 14.5698 4.76074 14.5698 5.12891C14.5698 5.49707 14.2778 5.80176 13.9097 5.80176H2.09033ZM3.38525 9.08984C3.02344 9.08984 2.7251 8.77881 2.7251 8.41699C2.7251 8.04883 3.01709 7.74414 3.38525 7.74414H12.6338C13.002 7.74414 13.2939 8.04248 13.2939 8.41699C13.2939 8.77881 13.002 9.08984 12.6338 9.08984H3.38525ZM4.66113 12.3716C4.29932 12.3716 4.00098 12.0605 4.00098 11.7051C4.00098 11.3369 4.29297 11.0322 4.66113 11.0322H11.3579C11.7261 11.0322 12.0181 11.3306 12.0181 11.7051C12.0181 12.0669 11.7261 12.3716 11.3579 12.3716H4.66113Z"
              fill="currentColor"
            />
          </svg>
          Status {selectedCount > 0 && `(${selectedCount})`}
        </Button>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`status-dropdown ${className}`}>
      <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
        <Dropdown.Toggle
          as={Button}
          className="status-dropdown-toggle d-flex align-items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2.09033 5.80176C1.72217 5.80176 1.43018 5.49072 1.43018 5.12891C1.43018 4.76074 1.72217 4.45605 2.09033 4.45605H13.9097C14.2778 4.45605 14.5698 4.76074 14.5698 5.12891C14.5698 5.49707 14.2778 5.80176 13.9097 5.80176H2.09033ZM3.38525 9.08984C3.02344 9.08984 2.7251 8.77881 2.7251 8.41699C2.7251 8.04883 3.01709 7.74414 3.38525 7.74414H12.6338C13.002 7.74414 13.2939 8.04248 13.2939 8.41699C13.2939 8.77881 13.002 9.08984 12.6338 9.08984H3.38525ZM4.66113 12.3716C4.29932 12.3716 4.00098 12.0605 4.00098 11.7051C4.00098 11.3369 4.29297 11.0322 4.66113 11.0322H11.3579C11.7261 11.0322 12.0181 11.3306 12.0181 11.7051C12.0181 12.0669 11.7261 12.3716 11.3579 12.3716H4.66113Z"
              fill="currentColor"
            />
          </svg>
          Status {selectedCount > 0 && `(${selectedCount})`}
        </Dropdown.Toggle>

        <Dropdown.Menu className="status-dropdown-menu">
          {/* Header */}
          <div className="status-dropdown-header">
            <div className="status-dropdown-title">Status</div>
            <div className="status-dropdown-actions">
              <button className="wl-btn-primary-text" onClick={handleCancel}>
                Cancel
              </button>
              <button className="wl-btn-primary-outline" onClick={handleReset}>
                Reset
              </button>
              <button className="wl-btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>

          {/* Show All Option */}
          <div className="d-flex p-1 border-bottom">
            <div className="status-show-all w-100">
              <Form.Check
                type="checkbox"
                id="show-all-status"
                checked={allChecked}
                onChange={handleShowAllToggle}
              />
              <Form.Check.Label
                htmlFor="show-all-status"
                className="status-checkbox-label"
              >
                Show All
              </Form.Check.Label>
            </div>
          </div>

          {/* Status Options */}
          <div className="status-options">
            {localStatuses.map((status) => (
              <div key={status.id} className="status-option">
                <Form.Check
                  type="checkbox"
                  id={`status-${status.id}`}
                  checked={status.checked}
                  onChange={() => handleStatusToggle(status.id)}
                />
                <Form.Check.Label
                  htmlFor={`status-${status.id}`}
                  className="status-checkbox-label"
                >
                  {status.label}
                </Form.Check.Label>
              </div>
            ))}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default StatusDropdown;
