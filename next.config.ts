import { execSync } from "node:child_process";
import path from "node:path";
import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";
import { DEV_POLICY, HEADER_POLICY } from "./src/lib/csp.mjs";

const isDev = process.env.NODE_ENV === "development";

// Production has no 'unsafe-inline': each page's own policy is written into it after the build
// (scripts/csp-postbuild.mjs), and the header carries what a <meta> tag can't. See src/lib/csp.mjs.
const csp = isDev ? DEV_POLICY : HEADER_POLICY;

// Vercel builds through its own Next.js adapter (NEXT_ADAPTER_PATH), which copies prerendered pages
// out during `next build`, before the post-build script can tag them. When a platform adapter is
// set, ours wraps it and writes the tags first (scripts/csp-adapter.mjs). The original path is kept
// in CSP_INNER_ADAPTER, which also stops a second load of this file from wrapping our own adapter.
if (process.env.NEXT_ADAPTER_PATH && !process.env.CSP_INNER_ADAPTER) process.env.CSP_INNER_ADAPTER = process.env.NEXT_ADAPTER_PATH;
const adapter = process.env.CSP_INNER_ADAPTER ? { adapterPath: path.join(__dirname, "scripts/csp-adapter.mjs") } : {};

// The commit this build was made from, shown at the foot of the home page (src/lib/build.ts).
function buildSha() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA;
  try {
    return execSync("git rev-parse HEAD", { cwd: __dirname, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
}

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  // The app uses speech output only. Camera, microphone, location and payments aren't needed.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  ...adapter,
  async headers() {
    return [
      // The Inbox's email frame (/api/admin/inbox/view/) sets its own stricter policy and may be framed by the panel,
      // so it is left out here: a second CSP header would be combined with its own and forbid the frame.
      { source: "/((?!api/admin/inbox/view/).*)", headers: securityHeaders },
      { source: "/api/admin/inbox/view/", headers: securityHeaders.filter((h) => h.key !== "Content-Security-Policy" && h.key !== "X-Frame-Options") },
      // Unhashed static files: a day in the browser, a week stale-while-revalidate. Not sw.js, which must stay fresh.
      {
        source: "/:file(icon-192\\.png|icon-512\\.png|icon-maskable-512\\.png|apple-touch-icon\\.png|icon\\.svg)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      // Email images carry a version in their name (src/lib/emailImages.ts), so they never change in place.
      { source: "/email/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      // Mail apps load the email font from another origin, and browsers only use cross-origin fonts with CORS.
      { source: "/email/fonts/:file*", headers: [{ key: "Access-Control-Allow-Origin", value: "*" }] },
    ];
  },
  // Runs as a normal Next.js server (pages are still pre-rendered where possible)
  // so the sync, account and billing APIs can live alongside the site.
  trailingSlash: true,
  images: { unoptimized: true },
  // Vercel sets VERCEL=1 at build time. Its analytics script only exists there, so elsewhere
  // (local, CI, other hosts) we don't load it and avoid failed script requests.
  env: { NEXT_PUBLIC_ON_VERCEL: process.env.VERCEL ? "1" : "", NEXT_PUBLIC_BUILD_SHA: buildSha() },
  serverExternalPackages: ["@libsql/client", "libsql"],
  turbopack: {
    // Pin the project root so Turbopack never picks up a lockfile from a parent folder.
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Readable error reports: when the Sentry integration's variables are set at build time (on Vercel:
// SENTRY_AUTH_TOKEN, SENTRY_ORG and SENTRY_PROJECT), the build uploads its source maps to Sentry and then
// deletes them, so the site never serves them. Without the variables (local, CI, forks) the config is
// returned untouched and the build is exactly what it was. Nothing else of Sentry's build wrapping is
// used: no route manifest and no tunnel, so public pages stay light (src/instrumentation-client.ts
// loads the SDK only when something goes wrong).
const uploadSourceMaps = Boolean(process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT);

export default uploadSourceMaps
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      ...(process.env.SENTRY_API_BASE ? { sentryUrl: process.env.SENTRY_API_BASE } : {}),
      silent: !process.env.CI,
      telemetry: false,
      suppressOnRouterTransitionStartWarning: true,
      routeManifestInjection: false,
      sourcemaps: { deleteSourcemapsAfterUpload: true },
    })
  : nextConfig;
