import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  productionBrowserSourceMaps: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Project uploads live on Cloudflare R2's public bucket domain; let next/image resize them.
    remotePatterns: [{ protocol: 'https', hostname: '**.r2.dev' }],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
