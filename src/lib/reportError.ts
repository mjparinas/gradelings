/**
 * Tells error reporting about a problem the app handled itself (swallowed so nothing crashes).
 * It raises the same window "error" event an uncaught error would, so the lazy Sentry loader in
 * `instrumentation-client.ts` picks it up with no extra imports here. Never throws.
 */
export function reportHandled(error: unknown): void {
  try {
    if (typeof window === "undefined" || error == null) return;
    window.dispatchEvent(new ErrorEvent("error", { error, message: error instanceof Error ? error.message : String(error) }));
  } catch {
    // reporting must never be the thing that fails
  }
}
