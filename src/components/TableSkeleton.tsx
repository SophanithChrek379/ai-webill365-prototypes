import React from "react";
import Skeleton from "./Skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showCheckbox?: boolean;
  className?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 8,
  showCheckbox = false,
  className = "",
}) => {
  return (
    <div className={`table-skeleton ${className}`}>
      {/* Table Header Skeleton */}
      <div className="table-skeleton-header">
        <div className="table-skeleton-row">
          {showCheckbox && (
            <div className="table-skeleton-cell wl-width-44">
              <Skeleton className="skeleton-checkbox" width={16} height={16} />
            </div>
          )}
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="table-skeleton-cell">
              <Skeleton className="skeleton-text" height={16} />
            </div>
          ))}
        </div>
      </div>

      {/* Table Body Skeleton */}
      <div className="table-skeleton-body">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="table-skeleton-row">
            {showCheckbox && (
              <div className="table-skeleton-cell wl-width-44">
                <Skeleton
                  className="skeleton-checkbox"
                  width={16}
                  height={16}
                />
              </div>
            )}
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="table-skeleton-cell">
                <Skeleton className="skeleton-text" height={20} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
