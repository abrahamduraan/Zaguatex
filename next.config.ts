import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
  experimental: {
    turbo: false, // ⚡ Desactiva Turbopack en desarrollo para evitar errores de source map
  },
};

export default nextConfig;
