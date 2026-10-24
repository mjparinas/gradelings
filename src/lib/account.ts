"use client";

import { grantBillingPass } from "./billingReturn";
import { rememberParent } from "./parentHint";
import type { FamilyInfo } from "./model";
import { clearReferralCode, forgetMyInvite, myInviteCode, rememberMyInvite, savedReferralCode } from "./referral";
import { useStore } from "./store";
import { syncNow } from "./sync";

// Parent account actions. All of these need a connection; the kids' side
// keeps working offline regardless.

async function post<T>(url: string, body?: unknown, method = "POST"): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      method,
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error("You're offline. Connect to the internet and try again.");
  }
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) throw new Error(data.error ?? `Something went wrong (${res.status}).`);
  return data;
}

function adopt(family: FamilyInfo) {
  if (family.account && !family.account.student) rememberParent();
  useStore.getState().setFamily(family, true);
  useStore.getState().setSync({ status: "idle" });
}

export async function signUp(email: string, password: string) {
  const { family } = await post<{ family: FamilyInfo }>("/api/auth/signup/", {
    email,
    password,
    trialEndsAt: useStore.getState().family.trialEndsAt,
    referralCode: savedReferralCode() ?? undefined,
  });
  clearReferralCode();
  adopt(family);
  await syncNow();
}

/**
 * "Send me the reports" from the end of a lesson: an account from an email alone, with the weekly report on.
 * This device is signed in at once and its progress uploads; the email asks the parent to confirm.
 */
export async function signUpForReports(email: string) {
  const { family } = await post<{ family: FamilyInfo }>("/api/auth/signup/", {
    email,
    passwordless: true,
    trialEndsAt: useStore.getState().family.trialEndsAt,
    referralCode: savedReferralCode() ?? undefined,
  });
  clearReferralCode();
  adopt(family);
  await syncNow();
}

export async function signIn(email: string, password: string) {
  const { family } = await post<{ family: FamilyInfo }>("/api/auth/login/", { email, password });
  // A fresh sign-in downloads the whole family history.
  useStore.getState().setSync({ cursor: 0 });
  adopt(family);
  await syncNow();
}

/**
 * Back from Google: the server has already signed this browser in, so take the family it answers with and
 * download the account's history, as a password sign-in does.
 */
export async function finishGoogleSignIn(): Promise<BillingInfo | null> {
  useStore.getState().setSync({ cursor: 0 });
  const billing = await refreshAccount();
  clearReferralCode();
  await syncNow();
  return billing;
}

/**
 * A student signs in with their own code (plus the class code, for cards printed before one-code
 * sign-in). This device then becomes that student's: anything already on it is cleared first, so
 * nobody's practice mixes with another child's.
 */
export async function signInStudent(code: string, classCode = "") {
  const state = useStore.getState();
  if (state.family.account) throw new Error("A grown-up is signed in on this device. Sign out in the grown-ups area first.");
  const { family } = await post<{ family: FamilyInfo }>("/api/students/login/", classCode ? { classCode, studentCode: code } : { code });
  await state.wipeDevice();
  useStore.getState().setSync({ cursor: 0 });
  adopt(family);
  await syncNow();
  const first = useStore.getState().profiles.find((p) => !p.deleted);
  if (first) useStore.getState().setActive(first.id);
}

/** Ends a class sign-in and clears the child's data from this device, so the next student starts clean. */
export async function signOutStudent() {
  await syncNow().catch(() => {});
  await post("/api/auth/logout/").catch(() => {});
  await useStore.getState().wipeDevice();
}

export async function forgotPassword(email: string): Promise<string> {
  const { message } = await post<{ message: string }>("/api/auth/forgot/", { email });
  return message;
}

/** Asks for an emailed sign-in link. Always answers the same way, so it never says whether an address has an account. */
export async function emailSignInLink(email: string, to: "parents" | "teachers" = "parents"): Promise<string> {
  const { message } = await post<{ message: string }>("/api/auth/magic/", { email, to });
  return message;
}

export async function resendVerification() {
  await post("/api/auth/resend-verification/");
}

export async function signOut() {
  await syncNow().catch(() => {});
  await post("/api/auth/logout/").catch(() => {});
  useStore.getState().setFamily({ account: undefined }, true);
  useStore.getState().setSync({ status: "signed-out" });
  forgetMyInvite();
  useStore.getState().mergeRemote({ events: [], profiles: [], settings: [], classwork: [] }); // Teacher work is for linked accounts only.
}

export interface BillingInfo {
  stripe: boolean;
  dev: boolean;
  /** The family has a Stripe customer, so the billing portal can open. Missing from older servers. */
  portal?: boolean;
}

export async function refreshAccount(): Promise<BillingInfo | null> {
  try {
    const res = await fetch("/api/auth/me/", { credentials: "same-origin" });
    if (res.status === 401) {
      if (useStore.getState().family.account) useStore.getState().setFamily({ account: undefined }, true);
      forgetMyInvite();
      return null;
    }
    if (!res.ok) return null;
    const data = (await res.json()) as { family: FamilyInfo; billing: BillingInfo };
    adopt(data.family);
    // Remember the parent's invite code once, so public pages' Share buttons can carry it.
    if (data.family.account && !data.family.account.student && !myInviteCode()) void loadReferral().then((r) => rememberMyInvite(r.code), () => {});
    return data.billing;
  } catch {
    return null;
  }
}

export async function startCheckout(interval: "month" | "year") {
  const { url } = await post<{ url: string }>("/api/billing/checkout/", { interval });
  goToStripe(url);
}

/** Leaves for a Stripe page; the way back skips the PIN gate once (src/lib/billingReturn.ts). */
export function goToStripe(url: string) {
  grantBillingPass();
  window.location.href = url;
}

/** A billing portal link for this family. Stripe's links are short-lived, so it is fetched when needed. */
export async function billingPortalUrl(): Promise<string> {
  return (await post<{ url: string }>("/api/billing/portal/")).url;
}

export async function openBillingPortal() {
  goToStripe(await billingPortalUrl());
}

export async function devBilling(action: "subscribe" | "cancel", interval: "month" | "year" = "month") {
  const { family } = await post<{ family: FamilyInfo }>("/api/billing/dev/", { action, interval });
  adopt(family);
}

/** A US parent agrees to the consent notice (src/lib/coppa.ts); their children's progress then starts syncing. */
export async function giveConsent() {
  const { family } = await post<{ family: FamilyInfo }>("/api/account/consent/", { agree: true });
  adopt(family);
  await syncNow();
}

/** A US parent withdraws consent: the server deletes their children's information. This device keeps its copy. */
export async function withdrawConsent() {
  const { family } = await post<{ family: FamilyInfo }>("/api/account/consent/", { withdraw: true });
  adopt(family);
}

export type RedeemResult = { kind: "access"; accessUntil: number } | { kind: "discount"; percentOff: number };

/** Uses a code for free access or a discount at the next checkout. */
export async function redeemCode(code: string): Promise<RedeemResult> {
  const { family, result } = await post<{ family: FamilyInfo; result: RedeemResult }>("/api/codes/redeem/", { code });
  adopt(family);
  return result;
}

/** Deletes the account. A Google-only account has no password, so it confirms with its email address instead. */
export async function deleteAccount(confirm: string, withEmail = false) {
  await post("/api/account/", withEmail ? { email: confirm } : { password: confirm }, "DELETE");
  await useStore.getState().wipeDevice();
}

export async function changePassword(current: string, password: string) {
  await post("/api/auth/password/", { current, password });
}

export interface DeviceSession {
  id: string;
  createdAt: number;
  device: string;
  current: boolean;
}

export async function loadSecurity(): Promise<{ sessions: DeviceSession[]; hasPassword: boolean }> {
  const res = await fetch("/api/auth/sessions/", { credentials: "same-origin" });
  if (!res.ok) throw new Error("Couldn't load your devices.");
  const data = (await res.json()) as { sessions: DeviceSession[]; hasPassword?: boolean };
  return { sessions: data.sessions, hasPassword: data.hasPassword !== false };
}

export async function listDevices(): Promise<DeviceSession[]> {
  return (await loadSecurity()).sessions;
}

/** Signs out one device, or every device but this one when no id is given. */
export async function signOutDevices(id?: string) {
  await post(`/api/auth/sessions/${id ? `?id=${encodeURIComponent(id)}` : ""}`, undefined, "DELETE");
}

export interface ReferralInfo {
  code: string;
  joined: number;
  rewarded: number;
  monthsEarned: number;
  maxMonths: number;
  bonusDays: number;
}

export async function loadReferral(): Promise<ReferralInfo> {
  const res = await fetch("/api/referral/", { credentials: "same-origin" });
  if (!res.ok) throw new Error("Couldn't load your invite link.");
  return (await res.json()) as ReferralInfo;
}
