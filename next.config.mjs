/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "docs.aarnalaw.com",
      },
      {
        protocol: "https",
        hostname: "aarnalaw.com",
      },
      {
        protocol: "https",
        hostname: "www.aarnalaw.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:slug',
        destination: '/insights/:slug',
        permanent: true, // Set to true for a 308 permanent redirect; false for a 307 temporary redirect
      },
    ];
  },
};

export default nextConfig;
