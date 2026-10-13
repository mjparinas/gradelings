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

// A signed-in parent's own code, remembered on this device so the Share buttons on public pages
// can add it to the links they share (`?ref=`) without a network call. Cleared on sign-out.
const MINE = "gradelings.myInvite";

export function rememberMyInvite(raw: unknown) {
  const code = normalizeReferralCode(raw);
  if (!code) return;
  try {
    localStorage.setItem(MINE, code);
  } catch {
    // Blocked storage: shared links just go without the code.
  }
}

export function myInviteCode(): string | null {
  try {
    return normalizeReferralCode(localStorage.getItem(MINE));
  } catch {
    return null;
  }
}

export function forgetMyInvite() {
  try {
    localStorage.removeItem(MINE);
  } catch {
    // Nothing to forget.
  }
}

/** A page link to share, carrying the parent's invite code when they have one on this device. */
export function shareLink(origin: string, path: string, code = myInviteCode()): string {
  const url = new URL(path, origin);
  if (code) url.searchParams.set("ref", code);
  return url.toString();
}
