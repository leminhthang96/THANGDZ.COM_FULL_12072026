import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/admin' : undefined,
};

export default nextConfig;
