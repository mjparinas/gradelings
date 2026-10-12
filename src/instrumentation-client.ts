import { scrubEvent } from "@/lib/sentry-scrub";

// Browser error reporting. Off unless NEXT_PUBLIC_SENTRY_DSN is set. The library (about 180 KB)
// is only downloaded once something actually goes wrong, so pages that run cleanly never pay for
// it. Errors from before it has loaded are kept and sent once it is ready.
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
if (dsn && typeof window !== "undefined") {
  const pending: unknown[] = [];
  let loading = false;
  // "Script error." is a cross-origin error with no details, which Sentry would drop anyway.
  const onError = (e: ErrorEvent) => e.error != null && report(e.error);
  const onRejection = (e: PromiseRejectionEvent) => report(e.reason);
  function report(error: unknown) {
    pending.push(error);
    if (loading) return;
    loading = true;
    void import("@sentry/nextjs").then((Sentry) => {
      Sentry.init({
        dsn,
        environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV,
        tracesSampleRate: 0,
        // Only the error handlers: no replay, no profiling, no breadcrumbs of taps.
        integrations: (defaults) => defaults.filter((i) => ["GlobalHandlers", "Dedupe", "InboundFilters", "FunctionToString", "LinkedErrors"].includes(i.name)),
        beforeSend: scrubEvent,
      });
      // Sentry's own handlers take over from here.
      const early = pending.splice(0);
      stop();
      for (const err of early) Sentry.captureException(err);
    }, stop);
  }
  // Stop listening: Sentry's own handlers have taken over, or it couldn't load (offline or
  // blocked) and the reports are dropped rather than retried in a loop.
  function stop() {
    pending.length = 0;
    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onRejection);
  }
  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onRejection);
}
