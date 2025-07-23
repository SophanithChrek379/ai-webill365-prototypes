'use client';

import React, { useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import Image from 'next/image';

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
  pageSizeOptions = [10, 20, 50, 100]
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
              <div className="dropdown-arrow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="page-size-menu">
              {pageSizeOptions.map((option) => (
                <Dropdown.Item
                  key={option}
                  onClick={() => {
                    onPageSizeChange(option);
                    setShowDropdown(false);
                  }}
                  className={pageSize === option ? 'active' : ''}
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
            className={`nav-button ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            title="First page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12L2 8L6 4" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Previous page button */}
          <button
            className={`nav-button ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Next page button */}
          <button
            className={`nav-button ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L10 8L6 12" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Last page button */}
          <button
            className={`nav-button ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            title="Last page"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L10 8L6 12" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 4L6 8L2 12" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .pagination-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0;
          font-family: 'Inter', sans-serif;
        }

        .pagination-content {
          display: flex;
          align-items: center;
          gap: 35px;
          width: 100%;
        }

        .page-rows-section {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-shrink: 0;
        }

        .page-rows-label {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          color: #171717;
          white-space: nowrap;
        }

        .page-size-dropdown {
          flex-shrink: 0;
        }

        .page-size-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 64px;
          height: 32px;
          padding: 8px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.17);
          border-radius: 6px;
          box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.08);
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          color: #171717;
        }

        .page-size-toggle:hover,
        .page-size-toggle:focus {
          background: #ffffff;
          border-color: rgba(0, 0, 0, 0.17);
          box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.08);
        }

        .dropdown-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
          margin-left: 8px;
        }

        .page-size-menu {
          min-width: 64px;
          padding: 4px 0;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.17);
          border-radius: 6px;
          box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
        }

        .page-size-menu .dropdown-item {
          padding: 8px 12px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          color: #171717;
          background: transparent;
          border: none;
        }

        .page-size-menu .dropdown-item:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .page-size-menu .dropdown-item.active {
          background: rgba(0, 0, 0, 0.1);
          color: #171717;
        }

        .pagination-info {
          display: flex;
          align-items: center;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          color: #171717;
          white-space: nowrap;
        }

        .navigation-buttons {
          display: flex;
          align-items: center;
          gap: 36px;
          min-height: 32px;
        }

        .nav-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .nav-button:hover:not(.disabled) {
          opacity: 0.7;
        }

        .nav-button.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .nav-button svg {
          width: 16px;
          height: 16px;
        }

        @media (max-width: 768px) {
          .pagination-content {
            gap: 20px;
            flex-wrap: wrap;
          }

          .page-rows-section {
            gap: 10px;
          }

          .navigation-buttons {
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Pagination; 