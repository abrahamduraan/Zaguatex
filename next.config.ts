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
  swcMinify: true,                    // minificador SWC activado
  productionBrowserSourceMaps: false, // evita errores de source map
};

export default nextConfig;
