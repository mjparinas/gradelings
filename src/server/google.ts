import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { GOOGLE_RETURNS, type GoogleError, type GoogleFrom } from "@/lib/googleSignIn";
import { TRIAL_DAYS, normalizeReferralCode } from "@/lib/plan";
import { adminEmails } from "./admin";
import { appOrigin, newId } from "./auth";
import { batch, query, run } from "./db";
import { isFlagOn } from "./flags";
import { referrerFor, rewardReferrer } from "./referral";

// "Continue with Google": the OpenID Connect authorization-code flow with PKCE, over plain HTTPS with no SDK
// and no Google script on our pages (so the content security policy is untouched). The browser leaves for
// Google at /api/auth/google/ and comes back to /api/auth/google/callback/, which makes an ordinary session.
//
// Only Google's verified email counts. A Google sign-in joins the account that has the same email; admin
// accounts are never reachable this way (they sign in with email and password, and a separate change adds 2FA).

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const ISSUERS = new Set(["https://accounts.google.com", "accounts.google.com"]);
/** How long a sign-in may take between leaving for Google and coming back. */
export const GOOGLE_STATE_SECONDS = 600;

export const googleStateCookie = process.env.NODE_ENV === "production" ? "__Host-gm_google" : "gm_google";

export function googleConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID?.trim() && process.env.GOOGLE_CLIENT_SECRET?.trim());
}

/** Whether the button should show: Google is set up and the owner hasn't switched it off in the admin panel. */
export async function googleAvailable(): Promise<boolean> {
  return googleConfigured() && (await isFlagOn("google-sign-in", null));
}

/** The exact address to register with Google as the authorized redirect URI. */
export function googleRedirectUri(req: Request): string {
  return `${appOrigin(req)}/api/auth/google/callback/`;
}

const b64 = (b: Buffer) => b.toString("base64url");

/** What we keep, in a short-lived HttpOnly cookie, between leaving for Google and coming back. */
export interface GoogleState {
  state: string;
  verifier: string;
  nonce: string;
  from: GoogleFrom;
  /** A new account keeps the trial this device already started and the friend's invite code (as on the sign-up form). */
  trialEndsAt?: number;
  referral?: string;
}

export function newGoogleState(from: GoogleFrom, extras: { trialEndsAt?: number; referral?: string }): GoogleState {
  return { state: b64(randomBytes(24)), verifier: b64(randomBytes(48)), nonce: b64(randomBytes(24)), from, ...extras };
}

export function encodeGoogleState(s: GoogleState): string {
  return Buffer.from(JSON.stringify(s)).toString("base64url");
}

export function decodeGoogleState(raw: string | undefined): GoogleState | null {
  if (!raw || raw.length > 1000) return null;
  try {
    const s = JSON.parse(Buffer.from(raw, "base64url").toString()) as Partial<GoogleState>;
    if (typeof s.state !== "string" || typeof s.verifier !== "string" || typeof s.nonce !== "string" || !(s.from! in GOOGLE_RETURNS)) return null;
    return {
      state: s.state,
      verifier: s.verifier,
      nonce: s.nonce,
      from: s.from!,
      trialEndsAt: typeof s.trialEndsAt === "number" ? s.trialEndsAt : undefined,
      referral: typeof s.referral === "string" ? s.referral : undefined,
    };
  } catch {
    return null;
  }
}

export function stateCookie(value: string, maxAge: number): string {
  return `${googleStateCookie}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}

export function googleAuthUrl(req: Request, s: GoogleState): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!.trim(),
    redirect_uri: googleRedirectUri(req),
    response_type: "code",
    scope: "openid email",
    state: s.state,
    nonce: s.nonce,
    code_challenge: createHash("sha256").update(s.verifier).digest("base64url"),
    code_challenge_method: "S256",
    // Always offer the account chooser, so a shared device never signs in as whoever was last signed in to Google.
    prompt: "select_account",
  });
  return `${AUTH_URL}?${params}`;
}

export interface GoogleProfile {
  /** Google's permanent id for the person; the email can change, this can't. */
  sub: string;
  email: string;
}

/**
 * Trades the code for an ID token and checks it. The token comes straight from Google's token endpoint over TLS,
 * which is what lets us read its claims without checking a signature (OpenID Connect Core, 3.1.3.7); we still
 * check who issued it, that it is for us, that it hasn't expired and that it answers this very sign-in.
 */
export async function exchangeGoogleCode(req: Request, code: string, s: GoogleState, now = Date.now()): Promise<GoogleProfile | null> {
  let res: Response;
  try {
    res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!.trim(),
        client_secret: process.env.GOOGLE_CLIENT_SECRET!.trim(),
        redirect_uri: googleRedirectUri(req),
        grant_type: "authorization_code",
        code_verifier: s.verifier,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return null;
  }
  if (!res.ok) return null;
  const idToken = ((await res.json().catch(() => null)) as { id_token?: unknown } | null)?.id_token;
  if (typeof idToken !== "string") return null;
  return readIdToken(idToken, s.nonce, now);
}

export function readIdToken(idToken: string, nonce: string, now = Date.now()): GoogleProfile | null {
  let claims: Record<string, unknown>;
  try {
    claims = JSON.parse(Buffer.from(idToken.split(".")[1] ?? "", "base64url").toString()) as Record<string, unknown>;
  } catch {
    return null;
  }
  const aud = claims.aud;
  const forUs = Array.isArray(aud) ? aud.includes(process.env.GOOGLE_CLIENT_ID?.trim()) : aud === process.env.GOOGLE_CLIENT_ID?.trim();
  if (!ISSUERS.has(String(claims.iss)) || !forUs || claims.nonce !== nonce) return null;
  if (typeof claims.exp !== "number" || claims.exp * 1000 < now - 60_000) return null;
  const { sub, email } = claims;
  // Google says "true" as a boolean in tokens, but older ones sent a string.
  if (typeof sub !== "string" || !sub || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return null;
  if (claims.email_verified !== true && claims.email_verified !== "true") return null;
  return { sub, email: email.toLowerCase() };
}

export type GoogleAccount =
  | { ok: true; parentId: string; familyId: string; email: string; created: boolean; linked: boolean; verifiedNow: boolean }
  | { ok: false; reason: GoogleError };

interface ParentRow {
  id: string;
  family_id: string;
  email: string;
  role: string | null;
  google_sub: string | null;
  email_verified_at: number | null;
}

const COLUMNS = "id, family_id, email, role, google_sub, email_verified_at";

/**
 * Finds the account for a Google sign-in, joining or making one when there isn't one yet:
 * the same Google person signs in again; the same email joins the existing account; a new email makes a new one.
 */
export async function accountForGoogle(profile: GoogleProfile, opts: { trialEndsAt?: number; referral?: string } = {}, now = Date.now()): Promise<GoogleAccount> {
  const admins = adminEmails();
  // Admin accounts keep to their own sign-in, whichever way the email got here.
  if (admins.has(profile.email)) return { ok: false, reason: "admin" };

  const bySub = (await query<ParentRow>(`SELECT ${COLUMNS} FROM parents WHERE google_sub = ?`, [profile.sub]))[0];
  if (bySub) {
    if (bySub.role === "student" || admins.has(bySub.email.toLowerCase())) return { ok: false, reason: "admin" };
    return { ok: true, parentId: bySub.id, familyId: bySub.family_id, email: bySub.email, created: false, linked: false, verifiedNow: false };
  }

  const byEmail = (await query<ParentRow>(`SELECT ${COLUMNS} FROM parents WHERE email = ?`, [profile.email]))[0];
  if (byEmail) {
    if ((byEmail.role ?? "parent") !== "parent") return { ok: false, reason: "failed" };
    // Already joined to a different Google person: that is somebody else's sign-in, not a way in.
    if (byEmail.google_sub) return { ok: false, reason: "other_google" };
    const unconfirmed = byEmail.email_verified_at == null;
    if (unconfirmed) {
      // Somebody may have signed up with this address and a password without owning it. Google has just shown
      // that this person does own it, so the address is confirmed, the password that might be the squatter's
      // stops working and every earlier sign-in is ended.
      const joined = await run("UPDATE parents SET google_sub = ?, email_verified_at = ?, password_hash = '!' WHERE id = ? AND google_sub IS NULL", [profile.sub, now, byEmail.id]);
      if (!joined) return { ok: false, reason: "failed" };
      await run("DELETE FROM sessions WHERE parent_id = ?", [byEmail.id]);
      await rewardReferrer(byEmail.family_id).catch((e) => console.error("[referral]", (e as Error).message));
    } else if (!(await run("UPDATE parents SET google_sub = ? WHERE id = ? AND google_sub IS NULL", [profile.sub, byEmail.id]))) {
      return { ok: false, reason: "failed" };
    }
    return { ok: true, parentId: byEmail.id, familyId: byEmail.family_id, email: byEmail.email, created: false, linked: true, verifiedNow: unconfirmed };
  }

  if (!(await isFlagOn("signups", null))) return { ok: false, reason: "paused" };
  const maxTrial = now + TRIAL_DAYS * 86_400_000;
  const trialEndsAt = Math.min(maxTrial, Math.max(now, Number(opts.trialEndsAt) || maxTrial));
  const code = normalizeReferralCode(opts.referral);
  const referrer = code ? await referrerFor(code) : null;
  const familyId = newId();
  const parentId = newId();
  try {
    await batch([
      { sql: "INSERT INTO families (id, created_at, trial_ends_at, plan, updated_at, referred_by) VALUES (?, ?, ?, 'trial', ?, ?)", args: [familyId, now, trialEndsAt, now, referrer] },
      // No password: '!' never matches one (see verifyPassword). Google has confirmed the email.
      { sql: "INSERT INTO parents (id, family_id, email, password_hash, created_at, email_verified_at, google_sub) VALUES (?, ?, ?, '!', ?, ?, ?)", args: [parentId, familyId, profile.email, now, now, profile.sub] },
    ]);
  } catch (e) {
    // Two sign-ins at once: the other one made the account, so this one is a plain sign-in to it.
    if (/UNIQUE|constraint/i.test(String((e as Error).message))) return accountForGoogle(profile, opts, now);
    throw e;
  }
  await rewardReferrer(familyId).catch((e) => console.error("[referral]", (e as Error).message));
  return { ok: true, parentId, familyId, email: profile.email, created: true, linked: false, verifiedNow: true };
}
