// @vitest-environment jsdom
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});

import { computeMetrics } from "@/lib/adminMetrics";
import { APP_NAME } from "@/lib/brand";
import { AdminApp } from "./AdminApp";

const now = Date.now();
const stats = {
  ...computeMetrics({
    now,
    families: [{ createdAt: now - 86_400_000, plan: "premium", trialEndsAt: now, subscriptionStatus: "active", subscriptionInterval: "month", billingEventAt: now, accessUntil: null, referred: false, verified: true, practised: true }],
    parents: 1,
    children: 2,
    teachers: 0,
    students: 0,
    classes: 0,
    payments: [],
    activity: [],
    activeFamilies: { d1: 1, d7: 1, d30: 1 },
    guestDevices: { d1: 0, d7: 0, d30: 0 },
    monthlyCosts: 0,
    redemptions: 0,
    reports: 0,
  }),
  stripe: false,
};
const flag = { key: "shop", label: "Shop", description: "The pretend coin shop.", scope: "app", defaultOn: true, enabled: true, rollout: 100, changed: false, overrides: 0 };
const family = {
  family: { id: "fam-1", createdAt: 1, plan: "trial", trialEndsAt: Date.now() + 86_400_000, accessUntil: null, discountCode: null, stripeCustomer: null, subscriptionStatus: null, subscriptionInterval: null, currentPeriodEnd: null },
  parents: [{ id: "p-1", email: "pat@example.com", createdAt: 1, verified: false, weeklyReport: false }],
  children: [{ grade: "3", framework: "ca-on" }, { grade: "5", framework: "zz-unknown" }, { grade: "1", framework: "" }],
  activity: { events: 10, lastActive: null },
  sessions: { active: 1, lastSignIn: null },
  classes: 0,
  redemptions: [],
  overrides: {},
  experiments: {},
  sees: { premium: true, paid: false, trialDaysLeft: 12, flags: [] },
  notes: [],
  emails: [],
};

function asAdmin() {
  mocks.call.mockImplementation((url: string, method = "GET") => {
    if (url === "/api/admin/me/") return Promise.resolve({ email: "owner@example.com" });
    if (url === "/api/admin/queue/" && method === "GET") return Promise.resolve({ items: [] });
    if (url.startsWith("/api/admin/email/") && method === "GET") return Promise.resolve({ emails: [], counts30: {}, resendWebhook: true });
    if (url.startsWith("/api/admin/stats/?section=")) return Promise.resolve({ ...stats, customersEver: stats.revenue.customersEver });
    if (url === "/api/admin/flags/" && method === "GET") return Promise.resolve({ flags: [flag] });
    if (url.startsWith("/api/admin/users/?q=")) return Promise.resolve({ users: [{ familyId: "fam-1", email: "pat@example.com", createdAt: 1, plan: "trial", trialEndsAt: Date.now() + 86_400_000, accessUntil: null, subscriptionStatus: null }] });
    if (url === "/api/admin/users/?id=fam-1") return Promise.resolve(family);
    if (url.startsWith("/api/admin/billing/?familyId=")) return Promise.resolve({ stripe: false, customer: null, payments: [], subscriptions: [], stripeError: null });
    if (url === "/api/admin/stats/detail/?view=families")
      return Promise.resolve({ title: "Families", summary: [], tables: [{ columns: [{ label: "Account", kind: "account" }], rows: [{ familyId: "fam-1", cells: ["pat@example.com"] }], total: 1 }] });
    if (url === "/api/admin/codes/" && method === "GET") return Promise.resolve({ codes: [] });
    if (url === "/api/admin/codes/" && method === "POST") return Promise.resolve({ code: { display: "ABCD-EFGH-JKMN" } });
    if (url === "/api/admin/experiments/" && method === "GET") return Promise.resolve({ experiments: [] });
    return Promise.resolve({ ok: true });
  });
}

const sent = (url: string, method: string) => mocks.call.mock.calls.find(([u, m]) => u === url && m === method)?.[2];

beforeEach(() => {
  mocks.call.mockReset();
  // Tab clicks add history entries, so each test starts on the panel's own address.
  window.history.replaceState(null, "", "/admin/");
});

describe("AdminApp", () => {
  it("asks a signed-out visitor to sign in", async () => {
    mocks.call.mockImplementation(() => Promise.reject(new Error("Not found")));
    render(<AdminApp />);
    expect(await screen.findByRole("heading", { name: "Admin Sign In" })).toBeInTheDocument();
  });

  it("tells a signed-in account that isn't an admin", async () => {
    mocks.call.mockImplementation((url: string) => (url === "/api/admin/me/" ? Promise.reject(new Error("Not found")) : Promise.resolve({ family: {} })));
    render(<AdminApp />);
    expect(await screen.findByRole("heading", { name: "Not an Admin Account" })).toBeInTheDocument();
  });

  it("shows the overview and switches a flag off", async () => {
    asAdmin();
    const user = userEvent.setup();
    render(<AdminApp />);
    expect(await screen.findByText("Families")).toBeInTheDocument();
    expect(screen.getByText("1 monthly, 0 yearly")).toBeInTheDocument();
    // The header carries the site's coloured wordmark and an "Admin" pill.
    const header = screen.getByRole("banner");
    expect(within(header).getByText("Admin")).toHaveClass("rounded-full");
    expect(header.textContent!.startsWith(APP_NAME)).toBe(true);
    // The wordmark goes to the homepage.
    expect(within(header).getByRole("link", { name: APP_NAME })).toHaveAttribute("href", "/");
    await user.click(screen.getByRole("button", { name: "Flags" }));
    await user.click(await screen.findByRole("switch"));
    expect(sent("/api/admin/flags/", "PUT")).toEqual({ key: "shop", enabled: false, rollout: 100 });
  });

  it("shows a support account the Users tab and notes, with no admin actions", async () => {
    asAdmin();
    const base = mocks.call.getMockImplementation()!;
    mocks.call.mockImplementation((url: string, method = "GET", body?: unknown) =>
      url === "/api/admin/me/" ? Promise.resolve({ email: "help@example.com", role: "support" }) : base(url, method, body),
    );
    const user = userEvent.setup();
    render(<AdminApp />);
    expect(await screen.findByRole("heading", { name: "Users" })).toBeInTheDocument();
    expect(within(screen.getByRole("banner")).getByText("Support")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Flags" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Download accounts CSV" })).toBeNull();
    // Support staff never ask for the admin-only lists.
    expect(mocks.call.mock.calls.some(([u]) => u === "/api/admin/queue/" || u === "/api/admin/flags/")).toBe(false);
    await user.click(await screen.findByRole("button", { name: "pat@example.com" }));
    expect(await screen.findByRole("heading", { name: "What This Family Sees" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Private Notes" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Delete Account" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Extend Trial" })).toBeNull();
    await user.type(screen.getByLabelText("New note"), "Called about billing");
    await user.click(screen.getByRole("button", { name: "Save Note" }));
    expect(sent("/api/admin/users/", "POST")).toEqual({ familyId: "fam-1", action: "add-note", body: "Called about billing" });
  });

  it("makes a discount code with a limit", async () => {
    asAdmin();
    const user = userEvent.setup();
    render(<AdminApp />);
    await user.click(await screen.findByRole("button", { name: "Codes" }));
    await user.click(screen.getByRole("combobox", { name: "Kind" }));
    await user.click(await screen.findByRole("option", { name: "Discount at checkout" }));
    await user.clear(screen.getByLabelText("Percent off"));
    await user.type(screen.getByLabelText("Percent off"), "40");
    await user.type(screen.getByLabelText("Use limit (optional)"), "100");
    await user.type(screen.getByLabelText("Custom code (optional)"), "FALL40");
    await user.click(screen.getByRole("button", { name: "Make Code" }));
    expect(await screen.findByText("ABCD-EFGH-JKMN")).toBeInTheDocument();
    expect(sent("/api/admin/codes/", "POST")).toEqual({ kind: "discount", percentOff: 40, duration: "once", maxUses: 100, code: "FALL40", note: undefined });
  });

  it("saves an A/B test draft from the variants text", async () => {
    asAdmin();
    const user = userEvent.setup();
    render(<AdminApp />);
    await user.click(await screen.findByRole("button", { name: "A/B Tests" }));
    await user.type(screen.getByLabelText(/^Key/), "home-colours");
    await user.click(screen.getByRole("button", { name: "Save Draft" }));
    await waitFor(() => expect(sent("/api/admin/experiments/", "POST")).toEqual({ key: "home-colours", description: "", variants: [{ name: "control", weight: 50 }, { name: "variant", weight: 50 }] }));
  });

  it("opens a family and gives lifetime access, without showing children's names", async () => {
    asAdmin();
    const user = userEvent.setup();
    render(<AdminApp />);
    await user.click(await screen.findByRole("button", { name: "Users" }));
    await user.click(await screen.findByRole("button", { name: "pat@example.com" }));
    // An unknown province is shown as saved, not as the default; no province means the default.
    expect(await screen.findByText("Grade 3 (Ontario), Grade 5 (zz-unknown), Grade 1 (British Columbia)")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Give Lifetime Access" }));
    expect(sent("/api/admin/users/", "POST")).toEqual({ familyId: "fam-1", action: "grant-access", days: null });
    expect(await screen.findByText("Lifetime access given.")).toBeInTheDocument();
  });

  it("opens a family in Users from an email in a dashboard list", async () => {
    asAdmin();
    const user = userEvent.setup();
    render(<AdminApp />);
    await user.click(await screen.findByRole("button", { name: /^Families 1 / }));
    await user.click(await within(await screen.findByRole("dialog", { name: "Families" })).findByRole("button", { name: "pat@example.com" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("button", { name: "Users" })).toHaveAttribute("aria-current", "page");
    expect(await screen.findByText(/Grade 3 \(Ontario\)/)).toBeInTheDocument();
    // Going back to Users from the tabs shows the list again.
    await user.click(screen.getByRole("button", { name: "Overview" }));
    await user.click(screen.getByRole("button", { name: "Users" }));
    expect(await screen.findByRole("heading", { name: "Users" })).toBeInTheDocument();
  });

  it("shows a banner on every tab while maintenance mode is on, and turns it off from there", async () => {
    asAdmin();
    const base = mocks.call.getMockImplementation()!;
    mocks.call.mockImplementation((url: string, method = "GET", body?: unknown) => {
      if (url === "/api/admin/maintenance/" && method === "GET") return Promise.resolve({ on: true, since: Date.UTC(2026, 9, 12, 18) });
      if (url === "/api/admin/maintenance/" && method === "PUT") return Promise.resolve({ on: false, since: null });
      return base(url, method, body);
    });
    const user = userEvent.setup();
    render(<AdminApp />);
    const banner = await screen.findByRole("region", { name: /Maintenance Mode Is On/ });
    expect(banner).toHaveTextContent("Visitors only see the home page (on since");
    await user.click(screen.getByRole("button", { name: "Codes" }));
    expect(screen.getByRole("region", { name: /Maintenance Mode Is On/ })).toBeInTheDocument();
    await user.click(within(banner).getByRole("button", { name: "Turn Off Maintenance Mode" }));
    expect(sent("/api/admin/maintenance/", "PUT")).toEqual({ on: false });
    await waitFor(() => expect(screen.queryByRole("region", { name: /Maintenance Mode Is On/ })).not.toBeInTheDocument());
  });

  it("turns maintenance mode on from the System tab only after TURN ON is typed", async () => {
    asAdmin();
    const base = mocks.call.getMockImplementation()!;
    mocks.call.mockImplementation((url: string, method = "GET", body?: unknown) => {
      if (url === "/api/admin/maintenance/" && method === "GET") return Promise.resolve({ on: false, since: null });
      if (url === "/api/admin/maintenance/" && method === "PUT") return Promise.resolve({ on: true, since: Date.now() });
      if (url.startsWith("/api/admin/system/")) return Promise.reject(new Error("Not now"));
      return base(url, method, body);
    });
    const user = userEvent.setup();
    render(<AdminApp />);
    await screen.findByText("Families");
    expect(screen.queryByRole("region", { name: /Maintenance Mode Is On/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "System" }));
    const card = await screen.findByRole("region", { name: "Maintenance Mode" });
    expect(within(card).getByText("Off.")).toBeInTheDocument();
    await user.click(within(card).getByRole("button", { name: "Turn On Maintenance Mode…" }));
    const start = within(card).getByRole("button", { name: "Start Maintenance" });
    expect(start).toBeDisabled();
    await user.type(within(card).getByLabelText("Type TURN ON to confirm"), "TURN ON");
    await user.click(start);
    expect(sent("/api/admin/maintenance/", "PUT")).toEqual({ on: true, confirm: "TURN ON" });
    expect(await screen.findByRole("region", { name: /Maintenance Mode Is On/ })).toBeInTheDocument();
    expect(within(card).getByText("On now.")).toBeInTheDocument();
  });
});
