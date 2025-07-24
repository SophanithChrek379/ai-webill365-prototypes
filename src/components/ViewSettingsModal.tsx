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
          className="d-flex"
          type="checkbox"
          id={`column-${column.id}`}
          checked={column.visible}
          onChange={() => onToggle(column.id)}
        />
        <Form.Check.Label
          htmlFor={`column-${column.id}`}
          className="view-checkbox-label"
        >
          {column.label}
        </Form.Check.Label>
      </div>
      <div className="view-column-drag-handle" {...attributes} {...listeners}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6.5" cy="4.5" r="1.5" fill="#322F2F" />
          <circle cx="11.5" cy="4.5" r="1.5" fill="#322F2F" />
          <circle cx="6.5" cy="9.5" r="1.5" fill="#322F2F" />
          <circle cx="11.5" cy="9.5" r="1.5" fill="#322F2F" />
          <circle cx="6.5" cy="14.5" r="1.5" fill="#322F2F" />
          <circle cx="11.5" cy="14.5" r="1.5" fill="#322F2F" />
        </svg>
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
        <div className="d-flex border-bottom p-1">
          <div className="view-show-all w-100">
            <Form.Check
              className="d-flex"
              type="checkbox"
              id="show-all-columns"
              checked={allVisible}
              onChange={handleShowAllToggle}
            />
            <Form.Check.Label
              htmlFor="show-all-columns"
              className="view-checkbox-label"
            >
              Show All
            </Form.Check.Label>
          </div>
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
