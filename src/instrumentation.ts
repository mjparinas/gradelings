import * as Sentry from "@sentry/nextjs";
import { scrubEvent } from "@/lib/sentry-scrub";

// Server-side error reporting. Off unless SENTRY_DSN (or, failing that, the browser's
// NEXT_PUBLIC_SENTRY_DSN, which Vercel's Sentry integration sets) is set. Errors only: no performance
// tracing, no session replay, and no personal information (see lib/sentry-scrub.ts).
export async function register() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn || process.env.NEXT_RUNTIME !== "nodejs") return;
  Sentry.init({
    dsn,
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
    tracesSampleRate: 0,
    beforeSend: scrubEvent,
  });
}

export const onRequestError = Sentry.captureRequestError;
