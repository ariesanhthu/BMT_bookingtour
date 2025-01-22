/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com',  'plus.unsplash.com', 'files.edgestore.dev'],
  },
};

module.exports = nextConfig;
