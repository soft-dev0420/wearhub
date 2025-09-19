import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [{ source: "/api/:path*", destination: "http://localhost:4000/:path*" }];
    }
    return [];
  },
  images: {
    domains: [
      "picsum.photos",
      "images.unsplash.com",
      "cdn.freebiesupply.com",
      "pngimg.com",
      "www.pngplay.com",
      "static-00.iconduck.com",
    ],
  },
};

export default nextConfig;
