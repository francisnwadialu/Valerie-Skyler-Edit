import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

// Next dev only serves its assets/HMR to origins listed here. Cloud preview
// hostnames change between sessions, so they come from the environment instead
// of being hard-coded: `NEXT_ALLOWED_DEV_ORIGINS=host-a,host-b npm run dev`.
const allowedDevOrigins = (process.env.NEXT_ALLOWED_DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim().replace(/^https?:\/\//, "").replace(/\/$/, ""))
  .filter(Boolean);

// Static export: `npm run build` writes the whole site to ./out, which Cloudflare
// serves as-is (see wrangler.jsonc). Sanity content is read at build time, so a
// content change needs a rebuild/redeploy. Route redirects live in
// public/_redirects (Cloudflare format) because an export cannot serve them; the
// list below keeps them working in `next dev`.
const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins,
  turbopack: {
    // Second guard for the dev-only copy markup overlay: in production builds the
    // overlay module resolves to a component that returns null, so neither it nor
    // its dependencies are bundled. (The first guard is the NODE_ENV check in
    // src/app/layout.tsx.) Development resolves the real component.
    resolveAlias: isProduction
      ? {
          "@/components/dev/annotator":
            "./src/components/dev/annotator-disabled.tsx",
        }
      : {},
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/start-here", destination: "/", permanent: false },
      { source: "/collections", destination: "/music", permanent: false },
      {
        source: "/collections/:slug",
        destination: "/music/:slug",
        permanent: false,
      },
      { source: "/work", destination: "/music", permanent: false },
      { source: "/work/:slug", destination: "/music/:slug", permanent: false },
      { source: "/services", destination: "/shows", permanent: false },
      { source: "/services/:slug", destination: "/shows/:slug", permanent: false },
      { source: "/studio", destination: "/cast", permanent: false },
      { source: "/journal", destination: "/articles", permanent: false },
      {
        source: "/journal/:slug",
        destination: "/articles/:slug",
        permanent: false,
      },
      { source: "/discography", destination: "/music", permanent: false },
      { source: "/discography/:slug", destination: "/music/:slug", permanent: false },
      { source: "/pricing", destination: "/sign-up", permanent: false },
      { source: "/legal/cookies", destination: "/legal/privacy", permanent: false },
      { source: "/legal/terms", destination: "/legal/privacy", permanent: false },
    ];
  },
};

export default nextConfig;
