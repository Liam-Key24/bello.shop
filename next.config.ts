import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
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

=======

};
>>>>>>> cb9934181149c94b2473164d18cb78c6ba4dd622

export default nextConfig;
