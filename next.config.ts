import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/ai-webill365-prototypes" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: isProduction ? "https://sophanithchrek379.github.io" + basePath : "",
  images: {
    unoptimized: true,
  },
  // Ensure Bootstrap assets are properly handled
  transpilePackages: ["bootstrap", "bootstrap-icons"],
  // Ensure proper asset handling for static export
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Ensure static assets are properly handled
  experimental: {
    optimizePackageImports: ['bootstrap', 'bootstrap-icons'],
  },
  // Force HTTPS for all external resources
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "upgrade-insecure-requests"
          },
        ],
      },
    ];
  },
};

export default nextConfig;
