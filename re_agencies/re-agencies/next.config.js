// Import necessary environment variables or settings
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'], // Add external image host here
  },
  swcMinify: true,
};

// Export the Next.js configuration using ES module syntax
export default config;
