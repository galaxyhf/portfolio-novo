import type { NextConfig } from "next";

const storageUrl = process.env.NEON_STORAGE_PUBLIC_URL ?? process.env.AWS_ENDPOINT_URL_S3;
const storageHostname = storageUrl ? new URL(storageUrl).hostname : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: storageHostname ?? "*.neon.tech",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
