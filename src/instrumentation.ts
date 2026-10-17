import * as Sentry from "@sentry/nextjs";
import { scrubEvent, scrubTransaction } from "@/lib/sentry-scrub";
import { traceRate, traceScale } from "@/lib/sentry-traces";

// Server-side error reporting and request timing. Off unless SENTRY_DSN (or, failing that, the browser's
// NEXT_PUBLIC_SENTRY_DSN, which Vercel's Sentry integration sets) is set. A sample of API requests is
// timed (lib/sentry-traces.ts; SENTRY_TRACES_SCALE=0 turns it off) so slow routes and slow database
// calls show up. No session replay, no profiling and no personal information (lib/sentry-scrub.ts).
export async function register() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn || process.env.NEXT_RUNTIME !== "nodejs") return;
  const scale = traceScale(process.env.SENTRY_TRACES_SCALE);
  Sentry.init({
    dsn,
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
    tracesSampler: ({ name, inheritOrSampleWith }) => inheritOrSampleWith(traceRate(name, scale)),
    beforeSend: scrubEvent,
    beforeSendTransaction: scrubTransaction,
  });
}

export const onRequestError = Sentry.captureRequestError;
