import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['bootstrap', 'bootstrap-icons'],
  },
  // Ensure Bootstrap assets are properly handled
  transpilePackages: ['bootstrap', 'bootstrap-icons'],
};

export default nextConfig;
