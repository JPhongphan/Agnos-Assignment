import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/patient",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
