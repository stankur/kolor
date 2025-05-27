import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'res.cloudinary.com',
      'specials-images.forbesimg.com'
    ],
  },
};

export default nextConfig;
