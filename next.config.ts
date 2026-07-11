import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp"],
  devIndicators: false,
  transpilePackages: ["@imgly/background-removal"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
