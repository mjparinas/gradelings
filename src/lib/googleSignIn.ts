// "Continue with Google": what the browser and the server both need to know. No secrets and no server code here.

/** Where a Google sign-in lands. Only these two, so the sign-in link can never send someone to another site. */
export const GOOGLE_RETURNS = { parents: "/parents/", teachers: "/teachers/" } as const;
export type GoogleFrom = keyof typeof GOOGLE_RETURNS;

/** Why a Google sign-in didn't work, as the code carried back in the address (`?google_error=`). */
export const GOOGLE_ERRORS = {
  cancelled: "Google sign-in was cancelled. You can try again, or use your email and password.",
  failed: "We couldn't finish signing you in with Google. Please try again, or use your email and password.",
  admin: "This account signs in with its email and password.",
  paused: "New accounts are paused for a little while. Please try again later.",
  other_google: "That email is already linked to a different Google account. Sign in with your email and password instead.",
  off: "Google sign-in isn't available right now. Please use your email and password.",
  slow: "Too many attempts. Try again in a few minutes.",
} as const;
export type GoogleError = keyof typeof GOOGLE_ERRORS;

export const isGoogleError = (code: string | null): code is GoogleError => code != null && Object.hasOwn(GOOGLE_ERRORS, code);

/** The link behind the button. A new account keeps the trial this device already started and the friend's invite code. */
export function googleStartUrl(from: GoogleFrom, extras: { trialEndsAt?: number; referral?: string } = {}): string {
  const params = new URLSearchParams({ from });
  if (extras.trialEndsAt) params.set("trial", String(Math.round(extras.trialEndsAt)));
  if (extras.referral) params.set("ref", extras.referral);
  return `/api/auth/google/?${params}`;
}

/** Where the server sends the browser after a Google sign-in: back to the page it came from, with the result in the address. */
export function googleReturnUrl(from: GoogleFrom, result: { error?: string }): string {
  const base = GOOGLE_RETURNS[from];
  // The parent area routes by the part after #, so its address keeps the query before it.
  if (result.error) return `${base}?google_error=${encodeURIComponent(result.error)}${from === "parents" ? "#/account" : ""}`;
  return from === "parents" ? `${base}?google=1#/account` : base;
}
