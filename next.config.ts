import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Routes from the earlier corporate-introduction site, kept for old links.
  async redirects() {
    return [
      { source: "/capabilities", destination: "/services", permanent: true },
      { source: "/thinking", destination: "/approach", permanent: true },
      { source: "/partnerships", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
