"use client";

/**
 * Asks the service worker to keep every build file this page has loaded, including
 * grade content downloaded on demand before the worker took control of the page
 * (the very first visit). Safe to call often; the worker skips files it already has.
 */
export function cacheLoadedScripts() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator) || !navigator.serviceWorker.controller) return;
  const urls = performance
    .getEntriesByType("resource")
    .map((e) => e.name)
    .filter((u) => u.startsWith(`${location.origin}/_next/static/`));
  if (urls.length) navigator.serviceWorker.controller.postMessage({ type: "cache-urls", urls });
}

const RELOAD_KEY = "gradelings:reloaded-for-build";

/** Turbopack/Next chunk mismatches after a deploy (or a known Turbopack race on dynamic import). */
export function isStaleBuildError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err ?? "");
  return (
    /module factory is not available/i.test(msg) ||
    /ChunkLoadError/i.test(msg) ||
    /Loading chunk .+ failed/i.test(msg) ||
    /Failed to fetch dynamically imported module/i.test(msg) ||
    /error loading dynamically imported module/i.test(msg)
  );
}

/** Clears the one-shot reload guard after a healthy load, so a later deploy can recover again. */
export function clearStaleBuildReloadFlag() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(RELOAD_KEY);
  } catch {
    // Private mode can throw.
  }
}

/**
 * Reloads once per tab session when the running JS and the chunks on the network
 * no longer match (new deploy while a tab stayed open). Returns true if a reload
 * was started. Retrying the failed import without a reload cannot help: Turbopack
 * keeps the failed module in its cache until the page is refreshed.
 */
export function reloadForNewBuild(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem(RELOAD_KEY)) return false;
    sessionStorage.setItem(RELOAD_KEY, "1");
  } catch {
    // If sessionStorage is blocked, still try one reload.
  }
  window.location.reload();
  return true;
}

/** When a new worker takes over a page that already had one, reload to avoid mixed deploys. */
export function onServiceWorkerControllerChange(hadController: boolean) {
  if (hadController) reloadForNewBuild();
  else cacheLoadedScripts();
}

/** Recovers from stale-chunk errors with a one-shot reload. */
export function watchStaleBuildErrors() {
  if (typeof window === "undefined") return;
  const maybeReload = (err: unknown) => {
    if (isStaleBuildError(err)) reloadForNewBuild();
  };
  window.addEventListener("unhandledrejection", (event) => maybeReload(event.reason));
  window.addEventListener("error", (event) => maybeReload(event.error ?? event.message));
}
