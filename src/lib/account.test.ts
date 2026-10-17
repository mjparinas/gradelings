import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AppEvent, FamilyInfo, Profile } from "./model";

const local = vi.hoisted(() => ({ cleared: 0 }));
vi.mock("./localdb", () => ({
  setKV: vi.fn(),
  putEvents: vi.fn(),
  deleteProfileEvents: vi.fn(),
  clearAll: vi.fn(async () => void local.cleared++),
}));
// What the next sync brings down from the server; the sync engine itself is tested in sync.test.ts.
const remote = vi.hoisted(() => ({ profiles: [] as Profile[], fail: false }));
vi.mock("./sync", async () => {
  const { useStore } = await import("./store");
  return {
    syncNow: vi.fn(async () => {
      if (remote.fail) throw new Error("offline");
      useStore.getState().mergeRemote({ events: [], profiles: remote.profiles, settings: [] });
    }),
  };
});

import * as account from "./account";
import { useStore } from "./store";
import { syncNow } from "./sync";

const family = (patch: Partial<FamilyInfo> = {}): FamilyInfo => ({ plan: "trial", trialEndsAt: 5_000, updatedAt: 10, ...patch });
const signedIn = family({ plan: "premium", account: { email: "p@example.com", familyId: "f1", verified: true }, updatedAt: 99 });
const kid = (id: string, deleted = false): Profile => ({ id, name: id, avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1, deleted });

type Call = { url: string; method: string; body: unknown };
let calls: Call[];
let routes: Record<string, () => Response | Promise<Response>>;
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
let storage: Map<string, string>;
let location: { href: string };

beforeEach(() => {
  calls = [];
  routes = {};
  local.cleared = 0;
  remote.profiles = [];
  remote.fail = false;
  vi.mocked(syncNow).mockClear();
  storage = new Map();
  location = { href: "/parents/" };
  vi.stubGlobal("window", { location });
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => storage.get(k) ?? null,
    setItem: (k: string, v: string) => void storage.set(k, v),
    removeItem: (k: string) => void storage.delete(k),
  });
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit = {}) => {
      calls.push({ url, method: init.method ?? "GET", body: init.body ? JSON.parse(String(init.body)) : undefined });
      const route = routes[`${init.method ?? "GET"} ${url}`];
      if (!route) throw new TypeError("Failed to fetch");
      return route();
    }),
  );
  useStore.setState({
    ready: true,
    profiles: [],
    activeId: null,
    settings: {},
    events: [],
    family: family(),
    pin: null,
    classwork: [],
    sync: { cursor: 55, status: "signed-out", dirtyProfiles: [], dirtyFamily: false },
  });
});
afterEach(() => vi.unstubAllGlobals());

describe("signing up and in", () => {
  it("signs up with the device's trial end and a saved invite code, then syncs", async () => {
    storage.set("gradelings.referral", "ABCD2345");
    routes["POST /api/auth/signup/"] = () => json({ family: signedIn });
    await account.signUp("p@example.com", "correct horse");

    expect(calls[0]).toEqual({
      url: "/api/auth/signup/",
      method: "POST",
      body: { email: "p@example.com", password: "correct horse", trialEndsAt: 5_000, referralCode: "ABCD2345" },
    });
    expect(storage.has("gradelings.referral")).toBe(false);
    const s = useStore.getState();
    expect(s.family.account?.email).toBe("p@example.com");
    // The server's record is adopted as-is, not marked as a change to upload.
    expect(s.family.updatedAt).toBe(10);
    expect(s.sync.dirtyFamily).toBe(false);
    expect(s.sync.status).toBe("idle");
    expect(syncNow).toHaveBeenCalledOnce();
  });

  it("shows the server's reason when sign-up is refused, and stays signed out", async () => {
    routes["POST /api/auth/signup/"] = () => json({ error: "That email is already in use." }, 409);
    await expect(account.signUp("p@example.com", "pw")).rejects.toThrow("That email is already in use.");
    expect(useStore.getState().family.account).toBeUndefined();
    expect(syncNow).not.toHaveBeenCalled();
  });

  it("falls back to a status message when the error isn't JSON, and to an offline message without a network", async () => {
    routes["POST /api/auth/login/"] = () => new Response("<html>", { status: 502 });
    await expect(account.signIn("p@example.com", "pw")).rejects.toThrow("Something went wrong (502).");
    delete routes["POST /api/auth/login/"];
    await expect(account.signIn("p@example.com", "pw")).rejects.toThrow(/You're offline/);
  });

  it("downloads the whole family history after signing in", async () => {
    routes["POST /api/auth/login/"] = () => json({ family: signedIn });
    await account.signIn("p@example.com", "pw");
    expect(useStore.getState().sync.cursor).toBe(0);
    expect(useStore.getState().family.plan).toBe("premium");
    expect(syncNow).toHaveBeenCalledOnce();
  });
});

describe("Google sign-in", () => {
  it("takes the account the server signed this browser in to and downloads its whole history", async () => {
    routes["GET /api/auth/me/"] = () => json({ family: signedIn, billing: { stripe: true, dev: false } });
    useStore.getState().setSync({ cursor: 42 });
    const billing = await account.finishGoogleSignIn();
    expect(billing).toEqual({ stripe: true, dev: false });
    expect(useStore.getState().sync.cursor).toBe(0);
    expect(useStore.getState().family.account?.email).toBe("p@example.com");
    expect(syncNow).toHaveBeenCalledOnce();
  });

  it("confirms deleting a Google-only account with the email address instead of a password", async () => {
    useStore.setState({ family: signedIn, profiles: [kid("a")] });
    routes["DELETE /api/account/"] = () => json({ ok: true });
    await account.deleteAccount("p@example.com", true);
    expect(calls[0]).toEqual({ url: "/api/account/", method: "DELETE", body: { email: "p@example.com" } });
  });

  it("says whether the account has a password, treating an older server's answer as yes", async () => {
    routes["GET /api/auth/sessions/"] = () => json({ sessions: [], hasPassword: false });
    expect((await account.loadSecurity()).hasPassword).toBe(false);
    routes["GET /api/auth/sessions/"] = () => json({ sessions: [] });
    expect((await account.loadSecurity()).hasPassword).toBe(true);
  });
});

describe("class sign-in", () => {
  it("refuses while a grown-up is signed in on the device", async () => {
    useStore.setState({ family: signedIn });
    await expect(account.signInStudent("KID123", "CLASS1")).rejects.toThrow(/A grown-up is signed in/);
    expect(calls).toEqual([]);
  });

  it("clears the device, then makes the student's first profile active", async () => {
    useStore.setState({ profiles: [kid("old")], activeId: "old", events: [{ id: "e", profileId: "old", t: 1, type: "secret", code: "x" } as AppEvent] });
    remote.profiles = [kid("gone", true), kid("student")];
    routes["POST /api/students/login/"] = () => json({ family: family({ plan: "premium", account: { email: "", familyId: "s1", student: true } }) });
    await account.signInStudent("KID123", "CLASS1");

    expect(calls[0].body).toEqual({ classCode: "CLASS1", studentCode: "KID123" });
    expect(local.cleared).toBe(1);
    const s = useStore.getState();
    expect(s.events).toEqual([]);
    expect(s.profiles.map((p) => p.id)).toEqual(["gone", "student"]);
    expect(s.activeId).toBe("student");
    expect(s.family.account?.student).toBe(true);
    expect(s.sync.cursor).toBe(0);
  });

  it("a wrong code leaves the device untouched", async () => {
    useStore.setState({ profiles: [kid("old")] });
    routes["POST /api/students/login/"] = () => json({ error: "Those codes don't match." }, 401);
    await expect(account.signInStudent("NOPE")).rejects.toThrow("Those codes don't match.");
    expect(local.cleared).toBe(0);
    expect(useStore.getState().profiles).toHaveLength(1);
  });

  it("signing a student out wipes the device even when offline", async () => {
    remote.fail = true;
    useStore.setState({ profiles: [kid("student")], family: family({ account: { email: "", familyId: "s1", student: true } }) });
    await account.signOutStudent();
    expect(local.cleared).toBe(1);
    expect(useStore.getState().profiles).toEqual([]);
    expect(useStore.getState().family.account).toBeUndefined();
  });
});

describe("signing out", () => {
  it("uploads first, ends the session and drops teacher work, but keeps the children on the device", async () => {
    useStore.setState({
      family: signedIn,
      profiles: [kid("a")],
      classwork: [{ profileId: "a", classId: "c1", className: "Room 4", unitKeys: ["math/3/add"] }],
    });
    routes["POST /api/auth/logout/"] = () => json({});
    await account.signOut();
    expect(syncNow).toHaveBeenCalledOnce();
    expect(calls.map((c) => c.url)).toEqual(["/api/auth/logout/"]);
    const s = useStore.getState();
    expect(s.family.account).toBeUndefined();
    expect(s.sync.status).toBe("signed-out");
    expect(s.classwork).toEqual([]);
    expect(s.profiles.map((p) => p.id)).toEqual(["a"]);
  });

  it("still signs out on this device when the server can't be reached", async () => {
    remote.fail = true;
    useStore.setState({ family: signedIn });
    await account.signOut();
    expect(useStore.getState().family.account).toBeUndefined();
  });
});

describe("refreshAccount", () => {
  it("adopts the server's family and returns the billing mode", async () => {
    routes["GET /api/auth/me/"] = () => json({ family: signedIn, billing: { stripe: true, dev: false } });
    expect(await account.refreshAccount()).toEqual({ stripe: true, dev: false });
    expect(useStore.getState().family.plan).toBe("premium");
  });

  it("forgets an account the server signed out, and keeps it on other failures", async () => {
    useStore.setState({ family: signedIn });
    routes["GET /api/auth/me/"] = () => json({}, 500);
    expect(await account.refreshAccount()).toBeNull();
    expect(useStore.getState().family.account).toBeDefined();
    delete routes["GET /api/auth/me/"];
    expect(await account.refreshAccount()).toBeNull();
    expect(useStore.getState().family.account).toBeDefined();
    routes["GET /api/auth/me/"] = () => json({}, 401);
    expect(await account.refreshAccount()).toBeNull();
    expect(useStore.getState().family.account).toBeUndefined();
  });

  it("remembers the parent's own invite code for share links, and forgets it when signed out", async () => {
    routes["GET /api/auth/me/"] = () => json({ family: signedIn, billing: { stripe: true, dev: false } });
    routes["GET /api/referral/"] = () => json({ code: "ABCD2345", joined: 0, rewarded: 0, monthsEarned: 0, maxMonths: 6, bonusDays: 30 });
    await account.refreshAccount();
    await vi.waitFor(() => expect(storage.get("gradelings.myInvite")).toBe("ABCD2345"));
    // Known now, so it isn't asked for again.
    await account.refreshAccount();
    expect(calls.filter((c) => c.url === "/api/referral/")).toHaveLength(1);
    routes["GET /api/auth/me/"] = () => json({}, 401);
    await account.refreshAccount();
    expect(storage.has("gradelings.myInvite")).toBe(false);
    storage.set("gradelings.myInvite", "ABCD2345");
    routes["POST /api/auth/logout/"] = () => json({});
    await account.signOut();
    expect(storage.has("gradelings.myInvite")).toBe(false);
  });

  it("never asks for an invite code for a class student account", async () => {
    routes["GET /api/auth/me/"] = () => json({ family: family({ account: { email: "", familyId: "s", student: true }, updatedAt: 99 }), billing: { stripe: false, dev: false } });
    await account.refreshAccount();
    expect(calls.map((c) => c.url)).toEqual(["/api/auth/me/"]);
  });
});

describe("billing and codes", () => {
  it("sends the parent to Stripe Checkout and the Billing Portal", async () => {
    routes["POST /api/billing/checkout/"] = () => json({ url: "https://checkout.stripe.com/c/1" });
    routes["POST /api/billing/portal/"] = () => json({ url: "https://billing.stripe.com/p/1" });
    await account.startCheckout("year");
    expect(calls[0].body).toEqual({ interval: "year" });
    expect(location.href).toBe("https://checkout.stripe.com/c/1");
    await account.openBillingPortal();
    expect(calls[1].body).toBeUndefined();
    expect(location.href).toBe("https://billing.stripe.com/p/1");
  });

  it("doesn't leave the page when checkout fails", async () => {
    routes["POST /api/billing/checkout/"] = () => json({ error: "Confirm your email first." }, 403);
    await expect(account.startCheckout("month")).rejects.toThrow("Confirm your email first.");
    expect(location.href).toBe("/parents/");
  });

  it("simulated billing and redeemed codes update the family from the server", async () => {
    routes["POST /api/billing/dev/"] = () => json({ family: family({ plan: "premium", subscription: { status: "active", interval: "month" } }) });
    await account.devBilling("subscribe");
    expect(calls[0].body).toEqual({ action: "subscribe", interval: "month" });
    expect(useStore.getState().family.subscription?.status).toBe("active");

    routes["POST /api/codes/redeem/"] = () => json({ family: family({ accessUntil: 123 }), result: { kind: "access", accessUntil: 123 } });
    expect(await account.redeemCode("FREEMONTH")).toEqual({ kind: "access", accessUntil: 123 });
    expect(useStore.getState().family.accessUntil).toBe(123);
  });
});

describe("account management", () => {
  it("deletes the account with the password, then wipes the device", async () => {
    useStore.setState({ family: signedIn, profiles: [kid("a")] });
    routes["DELETE /api/account/"] = () => json({ ok: true });
    await account.deleteAccount("pw");
    expect(calls[0]).toEqual({ url: "/api/account/", method: "DELETE", body: { password: "pw" } });
    expect(local.cleared).toBe(1);
    expect(useStore.getState().profiles).toEqual([]);
  });

  it("keeps everything when the password is wrong", async () => {
    useStore.setState({ family: signedIn, profiles: [kid("a")] });
    routes["DELETE /api/account/"] = () => json({ error: "Wrong password." }, 403);
    await expect(account.deleteAccount("nope")).rejects.toThrow("Wrong password.");
    expect(local.cleared).toBe(0);
    expect(useStore.getState().profiles).toHaveLength(1);
  });

  it("passes on the server's messages for password help", async () => {
    routes["POST /api/auth/forgot/"] = () => json({ message: "If that address has an account, we sent a link." });
    expect(await account.forgotPassword("p@example.com")).toMatch(/we sent a link/);
    routes["POST /api/auth/password/"] = () => json({ error: "Your current password is wrong." }, 403);
    await expect(account.changePassword("a", "b")).rejects.toThrow("Your current password is wrong.");
    routes["POST /api/auth/resend-verification/"] = () => json({});
    await account.resendVerification();
    expect(calls.map((c) => c.url)).toContain("/api/auth/resend-verification/");
  });

  it("lists devices and signs out one or all of the others", async () => {
    const sessions = [{ id: "s 1", createdAt: 1, device: "iPad", current: false }];
    routes["GET /api/auth/sessions/"] = () => json({ sessions });
    routes["DELETE /api/auth/sessions/?id=s%201"] = () => json({});
    routes["DELETE /api/auth/sessions/"] = () => json({});
    expect(await account.listDevices()).toEqual(sessions);
    await account.signOutDevices("s 1");
    await account.signOutDevices();
    expect(calls.slice(1).map((c) => `${c.method} ${c.url}`)).toEqual(["DELETE /api/auth/sessions/?id=s%201", "DELETE /api/auth/sessions/"]);
    routes["GET /api/auth/sessions/"] = () => json({}, 500);
    await expect(account.listDevices()).rejects.toThrow("Couldn't load your devices.");
  });

  it("loads the invite link details", async () => {
    const info = { code: "ABCD2345", joined: 2, rewarded: 1, monthsEarned: 1, maxMonths: 6, bonusDays: 14 };
    routes["GET /api/referral/"] = () => json(info);
    expect(await account.loadReferral()).toEqual(info);
    routes["GET /api/referral/"] = () => json({}, 404);
    await expect(account.loadReferral()).rejects.toThrow("Couldn't load your invite link.");
  });
});
