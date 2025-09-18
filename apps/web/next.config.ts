import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [{ source: "/api/:path*", destination: "http://localhost:4000/:path*" }];
    }
    return [];
  },
};

export default nextConfig;
