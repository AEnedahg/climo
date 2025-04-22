import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.weatherapi.com"],
  },
  tailwindcss: {
    config: "./tailwind.config.ts",
  },
};

export default nextConfig;
