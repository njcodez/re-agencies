// Import necessary environment variables or settings
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "w7.pngwing.com"],
    // Add external image host here
  },
  swcMinify: true,
  webpack(config, { isServer }) {
    // Customize Webpack configuration
    if (!isServer) {
      // This will modify the stats settings for client-side builds
      config.stats = {
        all: false,
        errors: true,
        warnings: false,
      };
    }
    return config;
  },
};

export default config;
