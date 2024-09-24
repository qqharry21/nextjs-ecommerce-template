/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [{ hostname: 'cdn.dummyjson.com' }],
  },
};

export default nextConfig;
