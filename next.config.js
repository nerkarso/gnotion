/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: '*' }],
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
