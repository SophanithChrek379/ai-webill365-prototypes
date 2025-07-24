import React from "react";
import { Dropdown } from "react-bootstrap";
import Button from "./Button";

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
  const isAllSelected = selectedCount === totalCount;
  const hasSelection = selectedCount > 0;

  return (
    <div className={`bulk-actions ${className}`}>
      <div className="bulk-actions-info">
        <span className="bulk-selection-text">
          {hasSelection
            ? `${selectedCount} of ${totalCount} selected`
            : `${totalCount} items`}
        </span>
        {hasSelection && (
          <Button
            variant="primary"
            size="sm"
            className="bulk-clear-btn"
            onClick={onClearSelection}
          >
            Clear
          </Button>
        )}
      </div>

      {hasSelection && (
        <div className="bulk-actions-buttons">
          <Dropdown>
            <Dropdown.Toggle
              as={Button}
              variant="primary"
              size="sm"
              className="bulk-actions-dropdown"
            >
              <i className="bi bi-three-dots me-1"></i>
              Actions ({selectedCount})
            </Dropdown.Toggle>

            <Dropdown.Menu className="bulk-actions-menu">
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
        <Button
          variant="primary"
          outline
          size="sm"
          className="bulk-select-all-btn"
          onClick={onSelectAll}
        >
          <i className="bi bi-check-square me-1"></i>
          Select All
        </Button>
      )}
    </div>
  );
};

export default BulkActions;
