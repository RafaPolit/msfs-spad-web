/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    spadIP: process.env.SPAD_IP || "http://192.168.0.1",
    spadPORT: process.env.SPAD_PORT || "28001",
    spadApiKey: process.env.SPAD_APIKEY || "",
  },
  experimental: {
    images: {
      unoptimized: true,
      allowFutureImage: true,
    },
    newNextLinkBehavior: true,
  },
};

module.exports = nextConfig;
