import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "./Button";

export interface ColumnOption {
  id: string;
  label: string;
  visible: boolean;
  order: number;
}

export interface ViewSettingsModalProps {
  show: boolean;
  onHide: () => void;
  columns: ColumnOption[];
  onColumnsChange: (columns: ColumnOption[]) => void;
  onReset?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

// Sortable Column Item Component
const SortableColumnItem: React.FC<{
  column: ColumnOption;
  onToggle: (columnId: string) => void;
}> = ({ column, onToggle }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`view-column-option ${isDragging ? "dragging" : ""}`}
    >
      <div className="view-column-content">
        <Form.Check
          type="checkbox"
          id={`column-${column.id}`}
          checked={column.visible}
          onChange={() => onToggle(column.id)}
          className="view-checkbox"
        />
        <Form.Check.Label
          htmlFor={`column-${column.id}`}
          className="view-checkbox-label"
        >
          {column.label}
        </Form.Check.Label>
      </div>
      <div className="view-column-drag-handle" {...attributes} {...listeners}>
        <i className="bi bi-grip-vertical"></i>
      </div>
    </div>
  );
};

const ViewSettingsModal: React.FC<ViewSettingsModalProps> = ({
  show,
  onHide,
  columns,
  onColumnsChange,
  onReset,
  onSave,
  onCancel,
}) => {
  const [localColumns, setLocalColumns] = useState<ColumnOption[]>(columns);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Update local state when props change
  useEffect(() => {
    setLocalColumns(columns);
  }, [columns]);

  const handleColumnToggle = (columnId: string) => {
    const updatedColumns = localColumns.map((column) =>
      column.id === columnId ? { ...column, visible: !column.visible } : column
    );
    setLocalColumns(updatedColumns);
  };

  const handleShowAllToggle = () => {
    const allVisible = localColumns.every((column) => column.visible);
    const updatedColumns = localColumns.map((column) => ({
      ...column,
      visible: !allVisible,
    }));
    setLocalColumns(updatedColumns);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setLocalColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const reorderedItems = arrayMove(items, oldIndex, newIndex);

        // Update order numbers
        return reorderedItems.map((item, index) => ({
          ...item,
          order: index + 1,
        }));
      });
    }
  };

  const handleSave = () => {
    onColumnsChange(localColumns);
    onSave?.();
    onHide();
  };

  const handleCancel = () => {
    setLocalColumns(columns); // Reset to original state
    onCancel?.();
    onHide();
  };

  const handleReset = () => {
    const resetColumns = localColumns.map((column, index) => ({
      ...column,
      visible: true, // Show all columns by default
      order: index + 1,
    }));
    setLocalColumns(resetColumns);
    onReset?.();
  };

  const selectedCount = localColumns.filter((column) => column.visible).length;
  const allVisible = localColumns.every((column) => column.visible);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      centered
      className="view-settings-modal"
      backdrop="static"
    >
      <Modal.Body className="view-settings-modal-body">
        {/* Header */}
        <div className="view-settings-header">
          <div className="view-settings-title">View Settings</div>
          <div className="view-settings-actions">
            <Button
              variant="primary"
              size="sm"
              className="view-action-btn view-cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="white"
              size="sm"
              className="view-action-btn view-reset-btn"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="view-action-btn view-save-btn"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>

        {/* Show All Option */}
        <div className="view-show-all">
          <Form.Check
            type="checkbox"
            id="show-all-columns"
            checked={allVisible}
            onChange={handleShowAllToggle}
            className="view-checkbox"
          />
          <Form.Check.Label
            htmlFor="show-all-columns"
            className="view-checkbox-label"
          >
            Show All
          </Form.Check.Label>
        </div>

        {/* Column Options */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={localColumns.map((col) => col.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="view-columns-list">
              {localColumns.map((column) => (
                <SortableColumnItem
                  key={column.id}
                  column={column}
                  onToggle={handleColumnToggle}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Modal.Body>
    </Modal>
  );
};

export default ViewSettingsModal;
