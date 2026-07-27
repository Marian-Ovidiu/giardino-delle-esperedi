import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Modern formats first; Next negotiates per Accept header.
    formats: ["image/avif", "image/webp"],
    // Matches the breakpoints the layout actually uses.
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [16, 32, 64, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
