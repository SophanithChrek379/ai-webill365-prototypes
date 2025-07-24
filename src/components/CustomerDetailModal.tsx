import React from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";

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
        <Modal.Title className="wl-text-title-medium wl-fg-title">
          Customer Detail
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-3">
        {subscriber && (
          <div className="d-flex flex-column gap-3">
            {/* Full Name */}
            <div className="d-flex flex-column">
              <Form.Label className="mb-2 wl-text-button-small">
                Full Name
              </Form.Label>
              <Form.Control
                type="text"
                value={String(subscriber.fullName || "")}
                readOnly
                className="customer-detail-input"
              />
            </div>

            {/* Tax ID */}
            <div className="d-flex flex-column">
              <Form.Label className="mb-2 wl-text-button-small">
                Tax ID
              </Form.Label>
              <Form.Control
                type="text"
                value={String(subscriber.taxId || "")}
                readOnly
                className="customer-detail-input"
              />
            </div>

            {/* Plan */}
            <div className="d-flex flex-column">
              <Form.Label className="mb-2 wl-text-button-small">
                Plan
              </Form.Label>
              <Form.Select value={String(subscriber.plan || "")} disabled>
                <option value={String(subscriber.plan || "")}>
                  {String(subscriber.plan || "")}
                </option>
              </Form.Select>
            </div>

            {/* Mobile Number */}
            <div className="d-flex flex-column">
              <Form.Label className="mb-2 wl-text-button-small">
                Mobile no.
              </Form.Label>
              <Row>
                <Col md={3} className="pe-1">
                  <Form.Select value="+81" disabled className="country-code">
                    <option value="+81">+81</option>
                  </Form.Select>
                </Col>
                <Col md={9} className="ps-1">
                  <Form.Control
                    type="text"
                    value={String(subscriber.mobileNo || "")}
                    readOnly
                    className="customer-detail-input flex-grow-1"
                  />
                </Col>
              </Row>
            </div>

            {/* Email */}
            <div className="d-flex flex-column">
              <Form.Label className="mb-2 wl-text-button-small">
                Email
              </Form.Label>
              <Form.Control
                type="email"
                value={String(subscriber.email || "")}
                readOnly
                className="customer-detail-input"
              />
            </div>

            {/* User ID */}
            <div className="d-flex flex-column">
              <Form.Label className="mb-2 wl-text-button-small">
                User ID
              </Form.Label>
              <Form.Control
                type="text"
                value={String(subscriber.userId || "")}
                readOnly
                className="customer-detail-input"
              />
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-0 p-3">
        <button onClick={onHide} className="wl-btn-primary-text">
          Close
        </button>
        <button onClick={handleReject} className="wl-btn-danger-outline">
          Reject
        </button>
        <button onClick={handleApprove} className="wl-btn-primary">
          Approve
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerDetailModal;
