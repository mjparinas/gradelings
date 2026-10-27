// @vitest-environment jsdom
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FamilyInfo, Profile } from "@/lib/model";

// The real store boots from a faked device database. Each section has its own tests, so here they are
// stand-ins that show which page the parent area chose and what it was given.
const h = vi.hoisted(() => ({
  kv: {} as Record<string, unknown>,
  syncNow: vi.fn(),
  startBackgroundSync: vi.fn(),
  android: false,
  billing: [] as unknown[],
  billingPass: false,
}));
vi.mock("@/lib/billingReturn", () => ({ takeBillingPass: (hash: string) => h.billingPass && hash.startsWith("#/subscription") }));
vi.mock("@/lib/localdb", () => ({
  getKV: vi.fn(async (key: string) => h.kv[key]),
  setKV: vi.fn().mockResolvedValue(undefined),
  putEvents: vi.fn().mockResolvedValue(undefined),
  allEvents: vi.fn().mockResolvedValue([]),
  unsyncedEvents: vi.fn().mockResolvedValue([]),
  deleteProfileEvents: vi.fn().mockResolvedValue(undefined),
  clearAll: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("@/lib/sync", () => ({ syncNow: h.syncNow, startBackgroundSync: h.startBackgroundSync }));
vi.mock("@/lib/twa", () => ({ isStoreApp: () => h.android }));
vi.mock("next/link", () => ({ default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => <a href={href} className={className}>{children}</a> }));
vi.mock("./Gate", () => ({ Gate: ({ onPass }: { onPass: () => void }) => <button onClick={onPass}>Unlock</button> }));
vi.mock("./Overview", () => ({ Overview: () => <p>page:overview</p> }));
vi.mock("./Reports", () => ({ ReportsPage: ({ childId }: { childId?: string }) => <p>page:reports:{childId ?? "-"}</p> }));
vi.mock("./Placement", () => ({ PlacementPage: ({ childId }: { childId?: string }) => <p>page:placement:{childId ?? "-"}</p> }));
vi.mock("./Children", () => ({ ChildrenPage: () => <p>page:children</p> }));
vi.mock("./Settings", () => ({ SettingsPage: ({ childId }: { childId?: string }) => <p>page:settings:{childId ?? "-"}</p> }));
vi.mock("./Account", () => ({ AccountPage: () => <p>page:account</p>, AuthForm: ({ initialMode }: { initialMode?: string }) => <p>form:{initialMode}</p> }));
vi.mock("./ReportCards", () => ({ ReportCardsPage: ({ childId }: { childId?: string }) => <p>page:report-cards:{childId ?? "-"}</p> }));
vi.mock("./Subscription", () => ({
  SubscriptionPage: ({ billing }: { billing: unknown }) => {
    h.billing.push(billing);
    return <p>page:subscription</p>;
  },
}));

import { APP_NAME, SITE_HOST, WORDMARK_COLOURS } from "@/lib/brand";
import { useStore } from "@/lib/store";
import { ParentApp } from "./ParentApp";

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const fetchMock = vi.fn();
const account = { email: "p@example.com", familyId: "f", verified: true };
const trial = (days: number, over: Partial<FamilyInfo> = {}): FamilyInfo => ({ plan: "trial", trialEndsAt: Date.now() + days * 86_400_000 - 1000, updatedAt: 1, ...over });
const ava: Profile = { id: "a", name: "Ava", avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1 };

beforeEach(() => {
  h.kv = { family: trial(5), deviceId: "dev" };
  h.syncNow.mockReset().mockResolvedValue(undefined);
  h.startBackgroundSync.mockReset();
  h.android = false;
  h.billing = [];
  h.billingPass = false;
  // The server returns the same family the device has.
  fetchMock.mockReset().mockImplementation(async () => json({ family: h.kv.family, billing: { stripe: true, dev: false } }));
  vi.stubGlobal("fetch", fetchMock);
  // The router scrolls to the top on every hash change; jsdom has no scrolling.
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  window.location.hash = "#/";
  useStore.setState({ ready: false, profiles: [], events: [], family: trial(5), sync: { cursor: 0, status: "signed-out", dirtyProfiles: [], dirtyFamily: false } });
});
afterEach(() => vi.unstubAllGlobals());

/** Boots the app, passes the PIN gate and returns the header. */
async function open(hash = "#/") {
  window.location.hash = hash;
  render(<ParentApp />);
  await userEvent.click(await screen.findByRole("button", { name: "Unlock" }));
  // The first page waits for the children's lessons to download, which can be slow on a busy machine.
  return screen.findByRole("banner", {}, { timeout: 15_000 });
}

describe("ParentApp sign-in link", () => {
  it("opens the sign-in form without a PIN when this device has none yet", async () => {
    render(<ParentApp />);
    window.location.hash = "#/account?mode=signin";
    expect(await screen.findByText("form:signin")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Unlock" })).not.toBeInTheDocument();
  });

  it("still asks for the PIN when the device has one", async () => {
    h.kv.pin = { hash: "x", salt: "y" };
    window.location.hash = "#/account?mode=signin";
    render(<ParentApp />);
    expect(await screen.findByRole("button", { name: "Unlock" })).toBeInTheDocument();
    expect(screen.queryByText("form:signin")).not.toBeInTheDocument();
  });

  it("does not skip the PIN for other pages when there is no PIN", async () => {
    window.location.hash = "#/children";
    render(<ParentApp />);
    expect(await screen.findByRole("button", { name: "Unlock" })).toBeInTheDocument();
  });
});

describe("ParentApp", () => {
  it("loads the device's data, starts background sync, then asks for the PIN", async () => {
    render(<ParentApp />);
    expect(screen.getByText("Getting ready…")).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Unlock" })).toBeInTheDocument();
    expect(h.startBackgroundSync).toHaveBeenCalledTimes(1);
    // Signed out: no account check.
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByText("page:overview")).not.toBeInTheDocument();
  });

  it("checks a signed-in account at /api/auth/me/ and hands billing to the subscription page", async () => {
    h.kv.family = trial(5, { account });
    await open("#/subscription");
    expect(fetchMock).toHaveBeenCalledWith("/api/auth/me/", { credentials: "same-origin" });
    expect(screen.getByText("page:subscription")).toBeInTheDocument();
    expect(h.billing.at(-1)).toEqual({ stripe: true, dev: false });
  });

  it("takes the account from the server when it is back from Google, and takes ?google=1 out of the address", async () => {
    // The device has no account yet; the server signed this browser in on the way back.
    h.kv.family = trial(5);
    fetchMock.mockImplementation(async () => json({ family: trial(5, { account, plan: "premium" }), billing: { stripe: true, dev: false } }));
    window.history.replaceState(null, "", "/parents/?google=1#/subscription");
    render(<ParentApp />);
    await userEvent.click(await screen.findByRole("button", { name: "Unlock" }));
    expect(await screen.findByText("page:subscription", {}, { timeout: 15_000 })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/auth/me/", { credentials: "same-origin" });
    expect(useStore.getState().family.account?.email).toBe("p@example.com");
    expect(h.syncNow).toHaveBeenCalled();
    expect(window.location.search).toBe("");
    expect(window.location.hash).toBe("#/subscription");
    window.history.replaceState(null, "", "/");
  });

  it("takes the account from the server after an emailed sign-in link, and takes ?signedin=1 out of the address", async () => {
    h.kv.family = trial(5);
    fetchMock.mockImplementation(async () => json({ family: trial(5, { account, plan: "premium" }), billing: { stripe: true, dev: false } }));
    window.history.replaceState(null, "", "/parents/?signedin=1#/account");
    render(<ParentApp />);
    await userEvent.click(await screen.findByRole("button", { name: "Unlock" }));
    expect(await screen.findByText("page:account", {}, { timeout: 15_000 })).toBeInTheDocument();
    expect(useStore.getState().family.account?.email).toBe("p@example.com");
    expect(h.syncNow).toHaveBeenCalled();
    expect(window.location.search).toBe("");
    expect(window.location.hash).toBe("#/account");
    window.history.replaceState(null, "", "/");
  });

  it("skips the PIN on the way back from Stripe", async () => {
    h.kv.family = trial(5, { account });
    h.billingPass = true;
    window.location.hash = "#/subscription?portal=done";
    render(<ParentApp />);
    expect(await screen.findByText("page:subscription", {}, { timeout: 15_000 })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Unlock" })).not.toBeInTheDocument();
  });

  it("keeps class student accounts out of the parent area", async () => {
    h.kv.family = trial(5, { account: { ...account, student: true } });
    render(<ParentApp />);
    expect(await screen.findByRole("heading", { name: "This is a class account" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to learning" })).toHaveAttribute("href", "/play/");
    expect(screen.queryByRole("button", { name: "Unlock" })).not.toBeInTheDocument();
  });

  it.each([
    ["#/", "page:overview"],
    ["#/reports/b", "page:reports:b"],
    ["#/placement", "page:placement:-"],
    ["#/children", "page:children"],
    ["#/settings/a", "page:settings:a"],
    ["#/account", "page:account"],
    ["#/report-cards/a", "page:report-cards:a"],
    // Privacy & data moved into Account; the old link still opens it.
    ["#/privacy", "page:account"],
    ["#/no-such-page", "page:overview"],
  ])("routes %s to the right section", async (hash, text) => {
    await open(hash);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("follows hash changes without asking for the PIN again", async () => {
    await open("#/");
    await act(async () => {
      window.location.hash = "#/children";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    // The page follows once the tap has been painted.
    expect(await screen.findByText("page:children")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Unlock" })).not.toBeInTheDocument();
  });

  it("colours the name in the header letter by letter, like the other pages", async () => {
    const header = await open();
    const letters = [...within(header).getByTestId("wordmark").querySelectorAll<HTMLElement>("span[aria-hidden]")];
    expect(letters.map((el) => el.textContent).join("")).toBe(APP_NAME);
    const swatch = document.createElement("i");
    const css = (c: string) => ((swatch.style.color = c), swatch.style.color);
    expect(letters.map((el) => el.style.color)).toEqual([...APP_NAME].map((_, i) => css(WORDMARK_COLOURS[i % WORDMARK_COLOURS.length])));
  });

  it("has six sections, with Placement and Report card as views under Reports", async () => {
    await open("#/placement/a");
    const nav = screen.getByRole("navigation", { name: "Parent sections" });
    expect(within(nav).getAllByRole("link").map((l) => l.textContent?.trim())).toEqual(["🏠 Overview", "⭐ Subscribe", "📈 Reports", "🧒 Children", "⚙️ Settings", "☁️ Account"]);
    expect(within(nav).getByRole("link", { name: /Reports/ }).className).toContain("bg-[#253047]");
    const views = screen.getByRole("navigation", { name: "Report views" });
    expect(within(views).getByRole("link", { name: "Progress" })).toHaveAttribute("href", "#/reports/a");
    expect(within(views).getByRole("link", { name: "Placement test" })).toHaveAttribute("aria-current", "page");
    expect(within(views).getByRole("link", { name: "Report card" })).toHaveAttribute("href", "#/report-cards/a");
    expect(within(views).getByRole("link", { name: "Year in review" })).toHaveAttribute("href", "#/year/a");
  });

  it("shows no report views outside Reports, and marks Account for the old privacy link", async () => {
    await open("#/privacy");
    expect(screen.queryByRole("navigation", { name: "Report views" })).not.toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "Parent sections" })).getByRole("link", { name: /Account/ }).className).toContain("bg-[#253047]");
  });

  it("marks the current section in the navigation", async () => {
    await open("#/children");
    const nav = screen.getByRole("navigation", { name: "Parent sections" });
    expect(within(nav).getByRole("link", { name: /Children/ }).className).toContain("bg-[#253047]");
    expect(within(nav).getByRole("link", { name: /Reports/ }).className).not.toContain("bg-[#253047]");
  });

  it("offers Subscribe with the trial days left during the trial", async () => {
    const header = await open();
    expect(within(header).getByRole("link", { name: "Subscribe · 5 days left" })).toHaveAttribute("href", "#/subscription");
    expect(within(screen.getByRole("navigation")).getByRole("link", { name: /Subscribe$/ })).toHaveAttribute("href", "#/subscription");
  });

  it("says 1 day, singular, on the last day of the trial", async () => {
    h.kv.family = trial(1);
    const header = await open();
    expect(within(header).getByRole("link", { name: "Subscribe · 1 day left" })).toBeInTheDocument();
  });

  it("says just Subscribe after the trial", async () => {
    h.kv.family = trial(-1, { plan: "free" });
    await open();
    const top = screen.getAllByRole("link", { name: "Subscribe" })[0];
    expect(top).toHaveAttribute("href", "#/subscription");
    expect(screen.queryByRole("link", { name: /days? left/ })).not.toBeInTheDocument();
  });

  it("shows Premium, and the plain Subscription section, to a paying family", async () => {
    h.kv.family = trial(-1, { plan: "premium", account });
    const header = await open();
    expect(within(header).getByText("⭐ Premium")).toBeInTheDocument();
    expect(within(header).queryByRole("link", { name: /Subscribe/ })).not.toBeInTheDocument();
    expect(within(screen.getByRole("navigation")).getByRole("link", { name: /Subscription/ })).toBeInTheDocument();
  });

  it("shows no subscribe prompt or website inside the Android app (Google Play's payments rules)", async () => {
    h.android = true;
    const header = await open();
    expect(within(header).queryByText(new RegExp(SITE_HOST))).not.toBeInTheDocument();
    expect(within(header).queryByText(/Subscribe/)).not.toBeInTheDocument();
    expect(within(header).queryByRole("link", { name: /Subscribe/ })).not.toBeInTheDocument();
    expect(within(screen.getByRole("navigation")).getByRole("link", { name: /Subscription/ })).toBeInTheDocument();
  });

  it("shows the sync state in the header and syncs when tapped", async () => {
    const header = await open();
    const badge = within(header).getByRole("button", { name: /Saved on this device/ });
    await userEvent.click(badge);
    expect(h.syncNow).toHaveBeenCalled();

    const states: [Partial<ReturnType<typeof useStore.getState>["sync"]>, RegExp][] = [
      [{ status: "syncing" }, /Syncing…/],
      [{ status: "offline" }, /Offline · will sync later/],
      [{ status: "error" }, /Sync problem · retrying/],
      [{ status: "idle", lastSyncAt: undefined }, /Ready to sync/],
      [{ status: "idle", lastSyncAt: Date.now() }, /☁️ Synced /],
    ];
    act(() => useStore.setState({ family: { ...useStore.getState().family, account } }));
    for (const [sync, text] of states) {
      act(() => useStore.setState({ sync: { ...useStore.getState().sync, ...sync } }));
      expect(within(header).getByRole("button", { name: text })).toBeInTheDocument();
    }
  });

  it("downloads each child's lessons before showing a page", async () => {
    h.kv.profiles = [ava];
    await open("#/");
    expect(screen.getByText("page:overview")).toBeInTheDocument();
    const { isGradeLoaded } = await import("@/content");
    expect(isGradeLoaded("3", "ca-bc")).toBe(true);
  });
});
