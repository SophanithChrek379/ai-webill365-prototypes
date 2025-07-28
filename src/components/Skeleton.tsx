import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  width = "100%",
  height = "100%",
  rounded = true,
}) => {
  return (
    <div
      className={`skeleton-loader ${rounded ? "rounded-3" : ""} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
};

export default Skeleton;
