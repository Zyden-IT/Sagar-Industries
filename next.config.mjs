/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  reactStrictMode: true,

  devIndicators: {
    buildActivity: false,
  },

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      { source: "/page-not-found", destination: "/404" },
      { source: "/about", destination: "/about/About" },
      { source: "/products", destination: "/products/Products" },
      { source: "/solutions", destination: "/solutions/Solutions" },
      { source: "/contact", destination: "/contact/Contact" },
    ];
  },

  // The old Industries / Smart Tools / Knowledge pages were merged into
  // /solutions — keep old links and bookmarks working.
  async redirects() {
    return [
      { source: "/industries", destination: "/solutions", permanent: false },
      { source: "/smartTools", destination: "/solutions", permanent: false },
      { source: "/knowledge", destination: "/solutions", permanent: false },
    ];
  },
};

export default nextConfig;
