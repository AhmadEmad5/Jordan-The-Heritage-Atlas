import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "universes.art" },
      { protocol: "https", hostname: "dynamic-media-cdn.tripadvisor.com" },
    ],
  },
};

export default nextConfig;
