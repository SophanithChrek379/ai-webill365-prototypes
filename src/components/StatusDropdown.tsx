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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update local state when props change
  useEffect(() => {
    setLocalStatuses(selectedStatuses);
  }, [selectedStatuses]);

  // Close dropdown when clicking outside
  useEffect(() => {
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
  }, []);

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

  return (
    <div ref={dropdownRef} className={`status-dropdown ${className}`}>
      <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
        <Dropdown.Toggle
          as={Button}
          className="status-dropdown-toggle d-flex align-items-center gap-2"
        >
          <Form.Check id="status-dropdown-toggle-id" />
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
