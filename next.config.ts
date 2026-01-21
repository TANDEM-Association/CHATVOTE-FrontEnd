import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Disable static page generation during Docker build to avoid Firebase connection issues
  ...(process.env.IS_BUILD_TIME === 'true' && {
    experimental: {
      // @ts-ignore
      isrMemoryCacheSize: 0,
    },
  }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wahl.chat',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'dev.wahl.chat',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  webpack: (config: { resolve: { alias: { [key: string]: boolean } } }) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
