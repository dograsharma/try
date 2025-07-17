import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds for this demo
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds for this demo
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
