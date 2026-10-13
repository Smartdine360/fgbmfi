import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Gallery photographs uploaded through the admin panel are kept in Cloudinary.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    // Add the host of any remote photography here, e.g.
    // remotePatterns: [{ protocol: "https", hostname: "images.example.com" }],
  },
  cacheComponents: true,
  // Photographs uploaded through the admin panel are sent to a Server Action, which allows 1MB unless told otherwise.
  experimental: { serverActions: { bodySizeLimit: "8mb" } },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
