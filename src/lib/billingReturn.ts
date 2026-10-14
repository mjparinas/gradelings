// The parent PIN gate relocks on every full page load. Going to Stripe (checkout or the billing portal) and
// back is a full page load, but the parent has only just typed the PIN, so the trip back skips the gate once.
// The pass is kept in sessionStorage (this tab only), lasts BILLING_PASS_MS and is used up on return.

const KEY = "grademap.billing-pass";
/** How long after leaving for Stripe the way back skips the PIN. */
export const BILLING_PASS_MS = 30 * 60_000;

function storage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Called just before the page leaves for Stripe. */
export function grantBillingPass(now = Date.now()) {
  try {
    storage()?.setItem(KEY, String(now));
  } catch {
    // Private mode or full storage: the parent types the PIN again on return, as before.
  }
}

let taken: boolean | undefined;

/**
 * True when this page load is the way back from Stripe, opened soon enough after leaving. The pass is used up by the
 * first call; later calls in the same page load give the same answer, so a render that runs twice agrees with itself.
 */
export function takeBillingPass(hash: string, now = Date.now()): boolean {
  if (taken !== undefined) return taken;
  const s = storage();
  if (!s) return false;
  let at: number;
  try {
    at = Number(s.getItem(KEY));
    s.removeItem(KEY);
  } catch {
    return false;
  }
  taken = hash.startsWith("#/subscription") && at > 0 && now >= at && now - at <= BILLING_PASS_MS;
  return taken;
}
