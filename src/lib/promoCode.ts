// The sale code a visitor saw in the banner (src/components/site/PromoBanner.tsx), kept on this device until
// the sale ends so the parent area's "Have a code?" box is already filled in. Storage can be blocked or
// cleared at any time, so every read and write is allowed to fail.

const KEY = "grademap.promo.code";

export function rememberPromoCode(code: string, until: number): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ code, until }));
  } catch {
    // Storage blocked: the visitor can still type the code.
  }
}

/** The remembered code, or "" when there is none or its sale has ended. */
export function savedPromoCode(now = Date.now()): string {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY) ?? "null") as { code?: unknown; until?: unknown } | null;
    if (v && typeof v.code === "string" && typeof v.until === "number" && v.until > now) return v.code;
  } catch {
    // Nothing usable saved.
  }
  return "";
}
