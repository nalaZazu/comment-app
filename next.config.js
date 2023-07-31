/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    images: {
      domain: ["https://fakestoreapi.com"],
    },
  },
};

module.exports = nextConfig;
