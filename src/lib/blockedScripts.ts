// A school web filter or captive portal can answer a build-file request with its own HTML page (status 200;
// seen from the Palm Beach County and Miami-Dade school networks, November 2026). The browser runs the page as a
// script, which fails with "Unexpected token '<'", and the <script> element still fires "load", not "error".
// Turbopack only settles a chunk's import() when the chunk registers itself, so that import() never settles: a
// child would sit on a loading screen forever, and "Try again" would wait on the same stuck download.
//
// This module notices such a file (a SyntaxError from one of our own /_next/static/ scripts) and fails every
// download still waiting at that moment, so the app shows its friendly screen. Turbopack keeps the stuck download,
// so "Try again" after a blocked file reloads the page (`retryDownloads`) instead of asking again in place.

import { SITE_HOST } from "./brand";

/** The friendly screen's words when a filter blocked a file, rather than "connect to the internet". */
export const BLOCKED_TITLE = "This network blocked part of the app";
export const blockedText = () => `Try again. If it keeps happening, ask a grown-up or your teacher to let ${SITE_HOST} through the web filter.`;

type Waiter = (err: Error) => void;

const waiters = new Set<Waiter>();
let blocked = false;
let watching = false;

/** Is this window error one of our build files that arrived as an HTML page? */
export function isBlockedScript(e: { message?: string; filename?: string; error?: unknown }): boolean {
  const file = e.filename ?? "";
  if (!/\/_next\/static\//.test(file)) return false;
  try {
    if (typeof location !== "undefined" && new URL(file, location.href).origin !== location.origin) return false;
  } catch {
    return false;
  }
  const name = e.error instanceof Error ? e.error.name : "";
  const text = `${e.message ?? ""} ${e.error instanceof Error ? e.error.message : ""}`;
  return (name === "SyntaxError" || /SyntaxError/.test(text)) && /Unexpected token '<'|expected expression, got '<'/.test(text);
}

/** Called for every window error once `watchScripts` has run (exported for tests). */
export function noticeError(e: { message?: string; filename?: string; error?: unknown }) {
  if (!isBlockedScript(e)) return;
  blocked = true;
  const err = new Error(`A build file arrived as a web page: ${e.filename ?? ""}`);
  err.name = "BlockedScriptError";
  for (const fail of [...waiters]) fail(err);
  waiters.clear();
}

/** Starts listening (once per page). */
export function watchScripts() {
  if (watching || typeof window === "undefined") return;
  watching = true;
  window.addEventListener("error", (e) => noticeError(e), true);
}

/** Has a build file been blocked since this page loaded? */
export function scriptBlocked(): boolean {
  return blocked;
}

/**
 * The download, failed early if one of our build files is blocked while it waits. Which file belongs to which
 * download can't be told, so every waiting download fails; one that does arrive later still runs its own `then`.
 */
export function failIfBlocked<T>(download: Promise<T>): Promise<T> {
  watchScripts();
  return new Promise<T>((resolve, reject) => {
    const fail: Waiter = (err) => reject(err);
    waiters.add(fail);
    download.then(
      (v) => {
        waiters.delete(fail);
        resolve(v);
      },
      (err: unknown) => {
        waiters.delete(fail);
        reject(err);
      },
    );
  });
}

/** "Try again": a fresh page load once a file was blocked (the stuck download can't be restarted), else `retry`. */
export function retryDownloads(retry: () => void, reload: () => void = () => location.reload()) {
  if (blocked) reload();
  else retry();
}

/** Tests only. */
export function resetBlockedScripts() {
  blocked = false;
  waiters.clear();
}
