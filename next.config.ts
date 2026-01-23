import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/zaguatex', // si tu app corre en subcarpeta
  swcMinify: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
};

export default nextConfig;