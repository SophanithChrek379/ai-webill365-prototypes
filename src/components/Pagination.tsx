"use client";

import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const paginationText = `${startItem}-${endItem} of ${totalItems}`;

  const handleFirstPage = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination-content">
        {/* Page rows section */}
        <div className="page-rows-section">
          <span className="page-rows-label">Page rows</span>
          <Dropdown
            show={showDropdown}
            onToggle={(isOpen) => setShowDropdown(isOpen)}
            className="page-size-dropdown"
          >
            <Dropdown.Toggle variant="light" className="page-size-toggle">
              <span>{pageSize}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="page-size-menu">
              {pageSizeOptions.map((option) => (
                <Dropdown.Item
                  key={option}
                  onClick={() => {
                    onPageSizeChange(option);
                    setShowDropdown(false);
                  }}
                  className={pageSize === option ? "active" : ""}
                >
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Pagination info */}
        <div className="pagination-info">
          <span>{paginationText}</span>
        </div>

        {/* Navigation buttons */}
        <div className="navigation-buttons">
          {/* First page button */}
          <button
            className={`nav-button ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            title="First page"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="#171717"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 12L2 8L6 4"
                stroke="#171717"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Previous page button */}
          <button
            className={`nav-button ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="#171717"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Next page button */}
          <button
            className={`nav-button ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="#171717"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Last page button */}
          <button
            className={`nav-button ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            title="Last page"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="#171717"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 4L6 8L2 12"
                stroke="#171717"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
