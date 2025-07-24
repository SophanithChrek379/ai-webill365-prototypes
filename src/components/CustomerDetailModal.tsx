import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface CustomerDetailModalProps {
  show: boolean;
  onHide: () => void;
  subscriber: Record<string, unknown> | null;
  onApprove?: (subscriber: Record<string, unknown>) => void;
  onReject?: (subscriber: Record<string, unknown>) => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  show,
  onHide,
  subscriber,
  onApprove,
  onReject,
}) => {
  const handleApprove = () => {
    if (onApprove && subscriber) {
      onApprove(subscriber);
    }
    onHide();
  };

  const handleReject = () => {
    if (onReject && subscriber) {
      onReject(subscriber);
    }
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      className="customer-detail-modal"
      dialogClassName="customer-detail-modal-dialog"
    >
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="fw-semibold fs-5">Customer Detail</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="px-4">
        {subscriber && (
          <div className="d-flex flex-column gap-4">
            {/* Full Name */}
            <div>
              <Form.Label className="fw-medium mb-2">Full Name</Form.Label>
              <Form.Control
                type="text"
                value={String(subscriber.fullName || '')}
                readOnly
                className="customer-detail-input"
              />
            </div>

            {/* Tax ID */}
            <div>
              <Form.Label className="fw-medium mb-2">Tax ID</Form.Label>
              <Form.Control
                type="text"
                value={String(subscriber.taxId || '')}
                readOnly
                className="customer-detail-input"
              />
            </div>

            {/* Plan */}
            <div>
              <Form.Label className="fw-medium mb-2">Plan</Form.Label>
              <Form.Select
                value={String(subscriber.plan || '')}
                disabled
                className="customer-detail-select"
              >
                <option value={String(subscriber.plan || '')}>{String(subscriber.plan || '')}</option>
              </Form.Select>
            </div>

            {/* Mobile Number */}
            <div>
              <Form.Label className="fw-medium mb-2">Mobile no.</Form.Label>
              <div className="d-flex gap-1">
                <Form.Select
                  value="+81"
                  disabled
                  className="customer-detail-select country-code"
                >
                  <option value="+81">+81</option>
                </Form.Select>
                <Form.Control
                  type="text"
                  value={String(subscriber.mobileNo || '')}
                  readOnly
                  className="customer-detail-input flex-grow-1"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Form.Label className="fw-medium mb-2">Email</Form.Label>
              <Form.Control
                type="email"
                value={String(subscriber.email || '')}
                readOnly
                className="customer-detail-input"
              />
            </div>

            {/* User ID */}
            <div>
              <Form.Label className="fw-medium mb-2">User ID</Form.Label>
              <Form.Control
                type="text"
                value={String(subscriber.userId || '')}
                readOnly
                className="customer-detail-input"
              />
            </div>
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="link"
          onClick={onHide}
          className="customer-detail-btn-close"
        >
          Close
        </Button>
        <Button
          variant="outline-danger"
          onClick={handleReject}
          className="customer-detail-btn-reject"
        >
          Reject
        </Button>
        <Button
          variant="primary"
          onClick={handleApprove}
          className="customer-detail-btn-approve"
        >
          Approve
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerDetailModal; 