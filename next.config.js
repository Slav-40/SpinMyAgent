/** @type {import('next').NextConfig} */
const nextConfig = {
  // better-sqlite3 is a native Node.js module, must run only on server
  // Exclude it from client/edge bundles
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle native modules on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'better-sqlite3': false,
      };
    }
    return config;
  },
  // Ensure API routes use Node.js runtime (not Edge)
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3'],
  },
};

module.exports = nextConfig;
