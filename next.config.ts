import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  tailwindcss: {
    config: "./tailwind.config.ts",
  },
};

export default nextConfig;
