/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: ['images.unsplash.com',  'plus.unsplash.com', 'files.edgestore.dev'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
        pathname: '**',
      },
    ],
  },
  // bản thử nghiệm
  // experimental: {
  //   ppr: 'incremental',
  // },
};
module.exports = nextConfig;
