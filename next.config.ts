import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure Bootstrap assets are properly handled
  transpilePackages: ["bootstrap", "bootstrap-icons"],
};

export default nextConfig;
