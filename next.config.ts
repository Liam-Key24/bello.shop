import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
    // ...existing code...
    // ...existing config...
    images: {
      domains: ["cdn.shopify.com"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.shopify.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
  };


export default nextConfig;
