import React from "react";
import { Dropdown } from "react-bootstrap";

export interface BulkAction {
  id: string;
  label: string;
  icon: string;
  variant: "primary" | "danger" | "warning" | "success";
  onClick: () => void;
}

export interface BulkActionsProps {
  selectedCount: number;
  totalCount: number;
  actions: BulkAction[];
  onSelectAll: () => void;
  onClearSelection: () => void;
  className?: string;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  totalCount,
  actions,
  onSelectAll,
  onClearSelection,
  className = "",
}) => {
  const hasSelection = selectedCount > 0;

  return (
    <div className={`bulk-actions ${className}`}>
      <div className="bulk-actions-info">
        <span className="wl-text-button-medium">
          {hasSelection
            ? `${selectedCount} of ${totalCount} selected`
            : `${totalCount} items`}
        </span>
        {hasSelection && (
          <button className="wl-btn-primary-text" onClick={onClearSelection}>
            Clear
          </button>
        )}
      </div>

      {hasSelection && (
        <div className="bulk-actions-buttons">
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="outline"
              className="wl-btn-primary-outline"
            >
              Actions ({selectedCount})
            </Dropdown.Toggle>

            <Dropdown.Menu className="bulk-actions-menu p-1 my-2">
              {actions.map((action) => (
                <Dropdown.Item
                  key={action.id}
                  onClick={action.onClick}
                  className={`bulk-action-item bulk-action-${action.variant}`}
                >
                  <i className={`bi ${action.icon} me-2`}></i>
                  {action.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}

      {!hasSelection && (
        <button className="wl-btn-primary" onClick={onSelectAll}>
          <i className="bi bi-check-square me-1"></i>
          Select All
        </button>
      )}
    </div>
  );
};

export default BulkActions;
