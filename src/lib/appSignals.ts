import { isAndroidApp, isIosApp } from "./twa";

// Two quiet signals for the admin panel, both about the family and never about a child: which kind of app a family
// syncs from (the web, the Android app or the iPhone and iPad app), and that a locked part was shown. Neither carries
// a name, a unit or an answer; the server keeps a time per app and a day count per kind, and deletes both with the family.

export type AppKind = "web" | "android" | "ios";
export const APP_HEADER = "x-gradelings-app";
export const PAYWALL_KINDS = ["locked-unit", "members-reports"] as const;
export type PaywallKind = (typeof PAYWALL_KINDS)[number];
export const isPaywallKind = (s: unknown): s is PaywallKind => typeof s === "string" && (PAYWALL_KINDS as readonly string[]).includes(s);

/** Which app this page is running in. */
export function appKind(): AppKind {
  if (typeof window === "undefined") return "web";
  return isIosApp() ? "ios" : isAndroidApp() ? "android" : "web";
}

const KEY = "gradelings.paywallSeen";
const DAY = 86_400_000;

/**
 * Says a locked part was shown to a signed-in grown-up's device, at most once a day for each kind on this device. Skipped
 * with no account, in automated browsers and when storage is blocked (we couldn't keep it to once a day).
 */
export function reportPaywallSeen(kind: PaywallKind, signedIn: boolean, now = Date.now()): void {
  if (!signedIn || typeof window === "undefined" || navigator.webdriver) return;
  const today = String(Math.floor(now / DAY));
  try {
    const seen = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Record<string, string>;
    if (seen[kind] === today) return;
    localStorage.setItem(KEY, JSON.stringify({ ...seen, [kind]: today }));
  } catch {
    return;
  }
  void fetch("/api/paywall/seen/", {
    method: "POST",
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind }),
    keepalive: true,
  }).catch(() => {});
}
