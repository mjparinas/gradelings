import type { ErrorEvent } from "@sentry/nextjs";

// Browser errors that say nothing about our code, and errors that would otherwise arrive as dozens
// of separate issues.

/**
 * Errors from scripts other apps put in the page (Zalo's in-app browser, zaloJSV2), and a device
 * whose storage is full: the browser cannot write to IndexedDB or localStorage, which nothing we
 * ship can fix. The app keeps working from memory and syncs again once there is room.
 */
export const IGNORE_ERRORS = [/\bzaloJSV2\b/, /QuotaExceededError/, /Encountered disk full/, /FILE_ERROR_NO_SPACE/];

/**
 * A build file that came back as an HTML page (a school web filter or captive portal answering a
 * script request) fails with "Unexpected token '<'" once per file, and each file name made its own
 * issue. Group them all as one.
 */
export function groupEvent(event: ErrorEvent): ErrorEvent {
  const ex = event.exception?.values?.[0];
  if (ex?.type === "SyntaxError" && /Unexpected token '<'|expected expression, got '<'/.test(ex.value ?? "")) {
    event.fingerprint = ["script-served-as-html"];
  }
  return event;
}
