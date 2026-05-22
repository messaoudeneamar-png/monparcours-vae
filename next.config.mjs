/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@mistralai/mistralai"],
  },
};

export default nextConfig;
