/* eslint-disable @typescript-eslint/no-require-imports */
import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chatvote.fr",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "dev.chatvote.fr",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  webpack: (config: { resolve: { alias: { [key: string]: boolean } } }) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
