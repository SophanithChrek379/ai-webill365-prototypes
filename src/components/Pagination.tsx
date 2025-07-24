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
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M11.8896 13.3213C11.8896 13.4489 11.86 13.5628 11.8008 13.6631C11.7461 13.7679 11.6663 13.8499 11.5615 13.9092C11.4567 13.9684 11.3428 13.998 11.2197 13.998C11.1286 13.998 11.042 13.9821 10.96 13.9502C10.8825 13.9183 10.8073 13.8682 10.7344 13.7998L5.62793 8.83691C5.47754 8.69108 5.40234 8.52246 5.40234 8.33105C5.40234 8.23079 5.42057 8.13965 5.45703 8.05762C5.49349 7.97103 5.54818 7.89355 5.62109 7.8252L10.7412 2.8623C10.8141 2.7985 10.8893 2.75065 10.9668 2.71875C11.0443 2.68229 11.1286 2.66406 11.2197 2.66406C11.3473 2.66406 11.4613 2.69368 11.5615 2.75293C11.6663 2.81217 11.7484 2.89421 11.8076 2.99902C11.8669 3.09928 11.8965 3.21322 11.8965 3.34082C11.8965 3.43652 11.8783 3.52539 11.8418 3.60742C11.8053 3.68945 11.7552 3.76237 11.6914 3.82617L6.63965 8.72754V7.93457L11.6914 12.8359C11.7552 12.9043 11.8031 12.9772 11.835 13.0547C11.8714 13.1367 11.8896 13.2256 11.8896 13.3213ZM5.42285 13.3555C5.42285 13.5423 5.35905 13.695 5.23145 13.8135C5.1084 13.9365 4.95117 13.998 4.75977 13.998C4.57292 13.998 4.41569 13.9365 4.28809 13.8135C4.16504 13.695 4.10352 13.5423 4.10352 13.3555V3.32031C4.10352 3.12891 4.16504 2.97168 4.28809 2.84863C4.41569 2.72559 4.57292 2.66406 4.75977 2.66406C4.95117 2.66406 5.1084 2.72559 5.23145 2.84863C5.35905 2.97168 5.42285 3.12891 5.42285 3.32031V13.3555Z"
                fill="currentColor"
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
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.99023 7.9987C3.99023 8.11589 4.01194 8.22439 4.05534 8.32422C4.09874 8.42405 4.16819 8.51953 4.26367 8.61068L9.0293 13.2786C9.17687 13.4262 9.35916 13.5 9.57617 13.5C9.72374 13.5 9.85612 13.4653 9.97331 13.3958C10.0905 13.3264 10.1838 13.2309 10.2533 13.1094C10.327 12.9922 10.3639 12.862 10.3639 12.7188C10.3639 12.5061 10.2815 12.3173 10.1165 12.1523L5.85221 7.9987L10.1165 3.84505C10.2815 3.68012 10.3639 3.49132 10.3639 3.27865C10.3639 3.13108 10.327 2.9987 10.2533 2.88151C10.1838 2.76432 10.0905 2.67318 9.97331 2.60807C9.85612 2.53863 9.72374 2.50391 9.57617 2.50391C9.35916 2.50391 9.17687 2.57769 9.0293 2.72526L4.26367 7.38672C4.16819 7.47786 4.09874 7.57335 4.05534 7.67318C4.01194 7.773 3.99023 7.88151 3.99023 7.9987Z"
                fill="currentColor"
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
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M12.0039 7.9987C12.0039 7.88151 11.9822 7.773 11.9388 7.67318C11.8954 7.57335 11.826 7.47786 11.7305 7.38672L6.96484 2.72526C6.81727 2.57769 6.63715 2.50391 6.42448 2.50391C6.27691 2.50391 6.14236 2.53863 6.02083 2.60807C5.90365 2.67318 5.81033 2.76432 5.74089 2.88151C5.67144 2.9987 5.63672 3.13108 5.63672 3.27865C5.63672 3.49132 5.71701 3.68012 5.8776 3.84505L10.1419 7.9987L5.8776 12.1523C5.71701 12.3173 5.63672 12.5061 5.63672 12.7188C5.63672 12.862 5.67144 12.9922 5.74089 13.1094C5.81033 13.2309 5.90365 13.3264 6.02083 13.3958C6.14236 13.4653 6.27691 13.5 6.42448 13.5C6.63715 13.5 6.81727 13.4262 6.96484 13.2786L11.7305 8.61068C11.8303 8.51953 11.8997 8.42405 11.9388 8.32422C11.9822 8.22439 12.0039 8.11589 12.0039 7.9987Z"
                fill="currentColor"
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
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4.11035 2.67871C4.11035 2.55111 4.13998 2.43717 4.19922 2.33691C4.25391 2.2321 4.33366 2.15006 4.43848 2.09082C4.5433 2.03157 4.65723 2.00195 4.78027 2.00195C4.87142 2.00195 4.95801 2.0179 5.04004 2.0498C5.11751 2.08171 5.19271 2.13184 5.26563 2.20019L10.3721 7.16309C10.5225 7.30892 10.5977 7.47754 10.5977 7.66895C10.5977 7.76921 10.5794 7.86035 10.543 7.94238C10.5065 8.02897 10.4518 8.10645 10.3789 8.1748L5.25879 13.1377C5.18587 13.2015 5.11068 13.2493 5.0332 13.2812C4.95573 13.3177 4.87142 13.3359 4.78027 13.3359C4.65267 13.3359 4.53874 13.3063 4.43848 13.2471C4.33366 13.1878 4.25163 13.1058 4.19238 13.001C4.13314 12.9007 4.10352 12.7868 4.10352 12.6592C4.10352 12.5635 4.12174 12.4746 4.1582 12.3926C4.19466 12.3105 4.24479 12.2376 4.30859 12.1738L9.36035 7.27246L9.36035 8.06543L4.30859 3.16406C4.24479 3.0957 4.19694 3.02279 4.16504 2.94531C4.12858 2.86328 4.11035 2.77441 4.11035 2.67871ZM10.5771 2.64453C10.5771 2.45768 10.641 2.30501 10.7686 2.18652C10.8916 2.06348 11.0488 2.00195 11.2402 2.00195C11.4271 2.00195 11.5843 2.06348 11.7119 2.18652C11.835 2.30501 11.8965 2.45768 11.8965 2.64453L11.8965 12.6797C11.8965 12.8711 11.835 13.0283 11.7119 13.1514C11.5843 13.2744 11.4271 13.3359 11.2402 13.3359C11.0488 13.3359 10.8916 13.2744 10.7686 13.1514C10.641 13.0283 10.5771 12.8711 10.5771 12.6797L10.5771 2.64453Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
