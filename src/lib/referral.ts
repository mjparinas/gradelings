import { normalizeReferralCode } from "./plan";

// A friend's referral code travels from the invite link to the sign-up form through localStorage,
// so it survives the PIN screen in between. Storage can be blocked, so every access is guarded.

const KEY = "gradelings.referral";

export function saveReferralCode(raw: unknown): string | null {
  const code = normalizeReferralCode(raw);
  if (!code) return null;
  try {
    localStorage.setItem(KEY, code);
  } catch {
    // Private window or blocked storage: the code just isn't remembered.
  }
  return code;
}

export function savedReferralCode(): string | null {
  try {
    return normalizeReferralCode(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function clearReferralCode() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
}

/** The page a parent shares: opening it remembers the code, then leads to the sign-up form. */
export function inviteLink(origin: string, code: string): string {
  return `${origin}/account/invite/?ref=${encodeURIComponent(code)}`;
}
