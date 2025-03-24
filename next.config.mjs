/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001", 
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "backend.opticalhut.in",
        pathname: "/api/**",
      },
    ],
  },
 
};

export default nextConfig;
