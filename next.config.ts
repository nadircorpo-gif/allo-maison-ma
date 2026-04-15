import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "bricool.ma" },
      { protocol: "https", hostname: "m3allem.com" },
      { protocol: "https", hostname: "avito.ma" },
    ],
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
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Anciennes URLs du site original (2017-2025) — preserver le jus SEO
      { source: "/cuisiniere/", destination: "/cuisiniere-casablanca", permanent: true },
      { source: "/cuisiniere", destination: "/cuisiniere-casablanca", permanent: true },
      { source: "/concierge/", destination: "/concierge-casablanca", permanent: true },
      { source: "/concierge", destination: "/concierge-casablanca", permanent: true },
      { source: "/nounou-ou-educatrice/", destination: "/nounou-casablanca", permanent: true },
      { source: "/nounou-ou-educatrice", destination: "/nounou-casablanca", permanent: true },
      { source: "/femme-de-menage-maroc-casablanca/", destination: "/femme-de-menage-casablanca", permanent: true },
      { source: "/femme-de-menage-maroc-casablanca", destination: "/femme-de-menage-casablanca", permanent: true },
      { source: "/femme-homme-menage-allo-maison/", destination: "/femme-de-menage-casablanca", permanent: true },
      { source: "/chauffeur-coursier-au-maroc-casablanca/", destination: "/services", permanent: true },
      { source: "/chauffeur-coursier-allo-maison/", destination: "/services", permanent: true },
      { source: "/infirmieres-et-garde-malade-au-maroc-casablanca/", destination: "/services", permanent: true },
      { source: "/infirmieres-garde-malade/", destination: "/services", permanent: true },
      { source: "/concierge-agent-de-securite-au-maroc/", destination: "/concierge-casablanca", permanent: true },
      { source: "/concierge-agent-de-securite/", destination: "/concierge-casablanca", permanent: true },
      { source: "/cuisinierere/", destination: "/cuisiniere-casablanca", permanent: true },
      { source: "/cuisiniere-au-maroc/", destination: "/cuisiniere-casablanca", permanent: true },
      { source: "/services-a-la-personne-maroc-casablanca/", destination: "/services", permanent: true },
      { source: "/engagement-charte/", destination: "/garantie", permanent: true },
      { source: "/contact-allo-maison/", destination: "/contact", permanent: true },
      { source: "/nos-processus/", destination: "/comment-ca-marche", permanent: true },
      { source: "/nos-processus", destination: "/comment-ca-marche", permanent: true },
      { source: "/entreprise-allo-maison-au-maroc/", destination: "/services", permanent: true },
      // Ancien blog WordPress
      { source: "/2020/10/21/bonjour-tout-le-monde/", destination: "/blog", permanent: true },
      { source: "/2020/10/21/bonjour-tout-le-monde", destination: "/blog", permanent: true },
      { source: "/author/:slug", destination: "/a-propos", permanent: true },
      // URLs encore indexees par Google (trouvees via GSC inspection 2026-04-13)
      { source: "/agent-de-securite/", destination: "/concierge-casablanca", permanent: true },
      { source: "/agent-de-securite", destination: "/concierge-casablanca", permanent: true },
      { source: "/coursier/", destination: "/services", permanent: true },
      { source: "/coursier", destination: "/services", permanent: true },
      { source: "/employe-polyvalente/", destination: "/femme-de-menage-casablanca", permanent: true },
      { source: "/employe-polyvalente", destination: "/femme-de-menage-casablanca", permanent: true },
      { source: "/femme-de-menage/", destination: "/femme-de-menage-casablanca", permanent: true },
      { source: "/femme-de-menage", destination: "/femme-de-menage-casablanca", permanent: true },
    ];
  },
};

export default nextConfig;
