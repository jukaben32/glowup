import type { NextConfig } from "next";

const serverActionOrigins = process.env.SERVER_ACTIONS_ALLOWED_ORIGINS?.split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      // Comma-separated hostnames (no protocol), e.g. "myapp.vercel.app,www.salon.com"
      // If unset, Next uses safe defaults for Server Actions (avoid "*" in production).
      ...(serverActionOrigins?.length
        ? { allowedOrigins: serverActionOrigins }
        : {}),
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
