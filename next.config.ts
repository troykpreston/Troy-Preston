import type { NextConfig } from "next";

const config: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};

export default config;
