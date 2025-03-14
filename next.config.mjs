/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://backend.opticalhut.in/api/:path*', // Adjust to match your Express server URL
      },
    ];
  },
};

export default nextConfig;
