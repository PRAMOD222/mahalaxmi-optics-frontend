const nextConfig = {
  images: {
    domains: ["localhost", "backend.opticalhut.in"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "https",
        hostname: "backend.opticalhut.in",
      },
    ],
  },
};

export default nextConfig;

