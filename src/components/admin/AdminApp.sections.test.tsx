// @vitest-environment jsdom
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});
// The overview's charts are tested in Dashboard.test.tsx.
vi.mock("./Dashboard", () => ({ Dashboard: () => <p>Dashboard</p> }));

import { AdminApp } from "./AdminApp";

const DAY = 86_400_000;
const flag = (over: Record<string, unknown> = {}) => ({ key: "shop", label: "Shop", description: "The pretend coin shop.", scope: "app", defaultOn: true, enabled: true, rollout: 100, changed: false, overrides: 0, ...over });
const family = (over: Record<string, unknown> = {}) => ({
  family: { id: "fam-1", createdAt: 1, plan: "premium", trialEndsAt: 1, accessUntil: Date.now() + 30 * DAY, discountCode: "FALL40", stripeCustomer: "cus_1", subscriptionStatus: "active", subscriptionInterval: "year", currentPeriodEnd: Date.now() + 200 * DAY },
  parents: [
    { id: "p-1", email: "pat@example.com", createdAt: 1, verified: true, weeklyReport: true },
    { id: "p-2", email: "sam@example.com", createdAt: 1, verified: false, weeklyReport: false },
  ],
  children: [{ grade: "k", framework: "ca-bc" }, { grade: "7", framework: "ca-nu" }],
  activity: { events: 12345, lastActive: Date.now() },
  sessions: { active: 2, lastSignIn: null },
  classes: 1,
  redemptions: [{ code: "ABCD", kind: "access", redeemedAt: 1 }, { code: "GONE", kind: null, redeemedAt: 1 }],
  overrides: { shop: false },
  experiments: { "home-colours": "variant" },
  emails: [],
  ...over,
});

type Handler = (url: string, method: string, body?: unknown) => unknown;
function asAdmin(extra: Handler = () => undefined) {
  mocks.call.mockImplementation((url: string, method = "GET", body?: unknown) => {
    const custom = extra(url, method, body);
    if (custom !== undefined) return custom instanceof Promise ? custom : Promise.resolve(custom);
    if (url === "/api/admin/me/") return Promise.resolve({ email: "owner@example.com" });
    if (url === "/api/admin/queue/" && method === "GET") return Promise.resolve({ items: [] });
    if (url.startsWith("/api/admin/email/") && method === "GET") return Promise.resolve({ emails: [], counts30: {}, resendWebhook: true });
    if (url === "/api/admin/inbox/" && method === "GET") return Promise.resolve({ configured: true, items: [], hasMore: false });
    if (url === "/api/admin/flags/" && method === "GET") return Promise.resolve({ flags: [flag()] });
    if (url.startsWith("/api/admin/users/?q=")) return Promise.resolve({ users: [] });
    if (url.startsWith("/api/admin/billing/?familyId=")) return Promise.resolve({ stripe: false, customer: null, payments: [], subscriptions: [], stripeError: null });
    if (url === "/api/admin/codes/" && method === "GET") return Promise.resolve({ codes: [] });
    if (url === "/api/admin/experiments/" && method === "GET") return Promise.resolve({ experiments: [] });
    if (url === "/api/admin/reports/" && method === "GET") return Promise.resolve({ reports: [] });
    if (url === "/api/admin/audit/") return Promise.resolve({ entries: [] });
    return Promise.resolve({ ok: true });
  });
}

const sent = (url: string, method: string) => mocks.call.mock.calls.findLast(([u, m]) => u === url && m === method)?.[2];

async function openTab(name: string) {
  const user = userEvent.setup();
  render(<AdminApp />);
  await user.click(await screen.findByRole("button", { name }));
  expect(screen.getByRole("button", { name })).toHaveAttribute("aria-current", "page");
  return user;
}

beforeEach(() => {
  mocks.call.mockReset();
});

describe("AdminApp sign-in", () => {
  it("signs in and opens the panel", async () => {
    let signedIn = false;
    mocks.call.mockImplementation((url: string, method = "GET") => {
      if (url === "/api/admin/me/") return signedIn ? Promise.resolve({ email: "owner@example.com" }) : Promise.reject(new Error("Not found"));
      if (url === "/api/auth/me/") return Promise.reject(new Error("Please sign in."));
      if (url === "/api/auth/login/" && method === "POST") {
        signedIn = true;
        return Promise.resolve({});
      }
      if (url === "/api/admin/flags/") return Promise.resolve({ flags: [] });
      return Promise.resolve({});
    });
    const user = userEvent.setup();
    render(<AdminApp />);
    await user.type(await screen.findByLabelText("Email"), "owner@example.com");
    await user.type(screen.getByLabelText("Password"), "secret-password");
    await user.click(screen.getByRole("button", { name: "Sign In" }));
    expect(mocks.call).toHaveBeenCalledWith("/api/auth/login/", "POST", { email: "owner@example.com", password: "secret-password" });
    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByText("owner@example.com")).toBeInTheDocument();
  });

  it("shows a wrong password and signs an admin out", async () => {
    mocks.call.mockImplementation((url: string) => {
      if (url === "/api/admin/me/" || url === "/api/auth/me/") return Promise.reject(new Error("Please sign in."));
      if (url === "/api/auth/login/") return Promise.reject(new Error("Email or password is incorrect."));
      return Promise.resolve({});
    });
    const user = userEvent.setup();
    render(<AdminApp />);
    await user.type(await screen.findByLabelText("Email"), "owner@example.com");
    await user.type(screen.getByLabelText("Password"), "wrong");
    await user.click(screen.getByRole("button", { name: "Sign In" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Email or password is incorrect.");
    expect(screen.getByRole("button", { name: "Sign In" })).toBeEnabled();
  });

  it("signs out back to the sign-in form", async () => {
    asAdmin();
    const user = userEvent.setup();
    render(<AdminApp />);
    await user.click(await screen.findByRole("button", { name: "Sign Out" }));
    expect(await screen.findByRole("heading", { name: "Admin Sign In" })).toBeInTheDocument();
    expect(mocks.call).toHaveBeenCalledWith("/api/auth/logout/", "POST");
  });
});

describe("AdminApp users", () => {
  it("lists accounts with their plan and code access, and says when nothing matches", async () => {
    const now = Date.now();
    asAdmin((url) => {
      if (url === "/api/admin/users/?q=") {
        return {
          users: [
            { familyId: "a", email: "paying@example.com", createdAt: now, plan: "premium", trialEndsAt: 0, accessUntil: null, subscriptionStatus: "past_due" },
            { familyId: "b", email: "trial@example.com", createdAt: now, plan: "trial", trialEndsAt: now + 5 * DAY, accessUntil: now + 100 * 365 * DAY, subscriptionStatus: null },
            { familyId: "c", email: "free@example.com", createdAt: now, plan: "trial", trialEndsAt: now - DAY, accessUntil: now - DAY, subscriptionStatus: null },
          ],
        };
      }
      if (url === "/api/admin/users/?q=nobody%40example.com") return { users: [] };
    });
    const user = await openTab("Users");
    const rows = within(await screen.findByRole("table")).getAllByRole("row").slice(1);
    const cells = rows.map((r) => [...r.children].map((c) => c.textContent));
    expect(cells[0][2]).toBe("Paying (past_due)");
    expect(cells[0][3]).toBe("—");
    expect(cells[1][2]).toMatch(/^Trial until /);
    expect(cells[1][3]).toBe("Lifetime");
    expect(cells[2][2]).toBe("Free");
    expect(cells[2][3]).toMatch(/^Ended /);

    await user.type(screen.getByLabelText("Search by email or family id"), "nobody@example.com");
    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(await screen.findByText("No accounts match.")).toBeInTheDocument();
  });

  it("shows a search error", async () => {
    asAdmin((url) => (url.startsWith("/api/admin/users/?q=") ? Promise.reject(new Error("Search failed.")) : undefined));
    await openTab("Users");
    expect(await screen.findByRole("alert")).toHaveTextContent("Search failed.");
  });

  it("shows a family's details without names, and runs each account action", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/users/?q=") return { users: [{ familyId: "fam-1", email: "pat@example.com", createdAt: 1, plan: "premium", trialEndsAt: 1, accessUntil: null, subscriptionStatus: "active" }] };
      if (url === "/api/admin/users/?id=fam-1") return family();
      if (url === "/api/admin/flags/" && method === "GET") return { flags: [flag({ rollout: 40 })] };
    });
    const user = await openTab("Users");
    await user.click(await screen.findByRole("button", { name: "pat@example.com" }));
    const heading = await screen.findByRole("heading", { name: "pat@example.com, sam@example.com" });
    const details = heading.parentElement!;
    expect(details).toHaveTextContent(/Subscription: active, yearly, renews /);
    expect(details).toHaveTextContent("Waiting discount: FALL40");
    expect(details).toHaveTextContent("(12,345 events)");
    expect(details).toHaveTextContent("Signed in on: 2 devices");
    // Only grade and province, never a child's name.
    expect(details).toHaveTextContent("Kindergarten (British Columbia), Grade 7 (Nunavut)");
    expect(details).toHaveTextContent("ABCD (access)");
    expect(details).toHaveTextContent("GONE (deleted)");
    expect(details).toHaveTextContent("home-colours: variant");

    await user.clear(screen.getByLabelText("Extend trial by (days)"));
    await user.type(screen.getByLabelText("Extend trial by (days)"), "7");
    await user.click(screen.getByRole("button", { name: "Extend Trial" }));
    expect(sent("/api/admin/users/", "POST")).toEqual({ familyId: "fam-1", action: "extend-trial", days: 7 });
    expect(await screen.findByText("Trial extended.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add Days" }));
    expect(sent("/api/admin/users/", "POST")).toEqual({ familyId: "fam-1", action: "grant-access", days: 365 });

    await user.click(screen.getByRole("button", { name: "Remove Access" }));
    expect(sent("/api/admin/users/", "POST")).toEqual({ familyId: "fam-1", action: "remove-access" });

    // Only the unconfirmed parent can be confirmed by hand.
    expect(screen.getAllByRole("button", { name: "Mark Email Confirmed" })).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "Mark Email Confirmed" }));
    expect(sent("/api/admin/users/", "POST")).toEqual({ familyId: "fam-1", action: "verify-email", parentId: "p-2" });

    await user.click(screen.getByRole("button", { name: "Sign Out Everywhere" }));
    expect(sent("/api/admin/users/", "POST")).toEqual({ familyId: "fam-1", action: "sign-out" });
    expect(await screen.findByText("Signed out on every device.")).toBeInTheDocument();
  });

  it("forces a flag for one family or returns it to the site-wide setting", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/users/?q=") return { users: [{ familyId: "fam-1", email: "pat@example.com", createdAt: 1, plan: "trial", trialEndsAt: 1, accessUntil: null, subscriptionStatus: null }] };
      if (url === "/api/admin/users/?id=fam-1") return family();
      if (url === "/api/admin/flags/" && method === "GET") return { flags: [flag({ rollout: 40 })] };
    });
    const user = await openTab("Users");
    await user.click(await screen.findByRole("button", { name: "pat@example.com" }));
    const menu = await screen.findByRole("combobox", { name: "Shop for this family" });
    expect(menu).toHaveTextContent("Always off");
    await user.click(menu);
    expect(screen.getByRole("option", { name: "Site-wide (40%)" })).toBeInTheDocument();
    await user.click(screen.getByRole("option", { name: "Always on" }));
    expect(sent("/api/admin/users/", "POST")).toEqual({ familyId: "fam-1", action: "override", key: "shop", enabled: true });
    expect(await screen.findByText("Shop: forced on.")).toBeInTheDocument();

    await user.click(screen.getByRole("combobox", { name: "Shop for this family" }));
    await user.click(screen.getByRole("option", { name: "Site-wide (40%)" }));
    expect(sent("/api/admin/users/", "POST")).toEqual({ familyId: "fam-1", action: "override", key: "shop", enabled: null });
  });

  it("deletes an account only after the email is typed, then goes back to the list", async () => {
    asAdmin((url) => {
      if (url === "/api/admin/users/?q=") return { users: [{ familyId: "fam-1", email: "pat@example.com", createdAt: 1, plan: "trial", trialEndsAt: 1, accessUntil: null, subscriptionStatus: null }] };
      if (url === "/api/admin/users/?id=fam-1") return family({ family: { ...family().family, accessUntil: null, subscriptionStatus: null, discountCode: null }, children: [], redemptions: [], experiments: {} });
    });
    const user = await openTab("Users");
    await user.click(await screen.findByRole("button", { name: "pat@example.com" }));
    expect(await screen.findByText("None yet.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Remove Access" })).not.toBeInTheDocument();
    const del = screen.getByRole("button", { name: "Delete Account" });
    expect(del).toBeDisabled();
    await user.type(screen.getByLabelText("Type the account's email to confirm"), "pat@example.com");
    await user.click(del);
    expect(sent("/api/admin/users/", "POST")).toEqual({ familyId: "fam-1", action: "delete", confirm: "pat@example.com" });
    expect(await screen.findByText("The account and all its data were deleted.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Back to Users" }));
    expect(await screen.findByRole("heading", { name: "Users" })).toBeInTheDocument();
  });

  it("keeps the account when deleting fails, and says why", async () => {
    asAdmin((url, method, body) => {
      if (url === "/api/admin/users/?q=") return { users: [{ familyId: "fam-1", email: "pat@example.com", createdAt: 1, plan: "trial", trialEndsAt: 1, accessUntil: null, subscriptionStatus: null }] };
      if (url === "/api/admin/users/?id=fam-1") return family();
      if (url === "/api/admin/users/" && method === "POST" && (body as { action: string }).action === "delete") return Promise.reject(new Error("The email doesn't match."));
    });
    const user = await openTab("Users");
    await user.click(await screen.findByRole("button", { name: "pat@example.com" }));
    await user.type(await screen.findByLabelText("Type the account's email to confirm"), "wrong@example.com");
    await user.click(screen.getByRole("button", { name: "Delete Account" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("The email doesn't match.");
    expect(screen.queryByText("The account and all its data were deleted.")).not.toBeInTheDocument();
  });

  it("shows why a family couldn't be loaded", async () => {
    asAdmin((url) => {
      if (url === "/api/admin/users/?q=") return { users: [{ familyId: "gone", email: "gone@example.com", createdAt: 1, plan: "trial", trialEndsAt: 1, accessUntil: null, subscriptionStatus: null }] };
      if (url === "/api/admin/users/?id=gone") return Promise.reject(new Error("No such family."));
    });
    const user = await openTab("Users");
    await user.click(await screen.findByRole("button", { name: "gone@example.com" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("No such family.");
  });
});

describe("AdminApp codes", () => {
  const code = (over: Record<string, unknown>) => ({ code: "c", display: "CODE", kind: "access", days: 30, percent_off: null, duration: null, months: null, max_uses: null, uses: 0, expires_at: null, note: null, created_at: 1, disabled_at: null, ...over });

  it("describes what each code gives and disables one", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/codes/" && method === "GET") {
        return {
          codes: [
            code({ code: "a", display: "AAAA", days: 30, uses: 3, max_uses: 10, note: "Newsletter" }),
            code({ code: "b", display: "BBBB", days: null, expires_at: Date.now() + DAY }),
            code({ code: "c", display: "CCCC", kind: "discount", days: null, percent_off: 25, duration: "once" }),
            code({ code: "d", display: "DDDD", kind: "discount", days: null, percent_off: 10, duration: "repeating", months: 3 }),
            code({ code: "e", display: "EEEE", kind: "discount", days: null, percent_off: 50, duration: "forever", disabled_at: 1 }),
          ],
        };
      }
    });
    const user = await openTab("Codes");
    const rows = within(await screen.findByRole("table")).getAllByRole("row").slice(1);
    const cells = rows.map((r) => [...r.children].map((c) => c.textContent));
    expect(cells.map((c) => c[1])).toEqual(["30 days free", "Lifetime access", "25% off first payment", "10% off 3 months", "50% off every payment"]);
    expect(cells[0].slice(2, 5)).toEqual(["3 of 10", "Never", "Newsletter"]);
    expect(cells[1][3]).not.toBe("Never");
    expect(cells[4][5]).toMatch(/^Disabled /);

    await user.click(within(rows[0]).getByRole("button", { name: "Disable" }));
    expect(sent("/api/admin/codes/", "DELETE")).toEqual({ code: "a" });
    expect(await screen.findByText("AAAA disabled.")).toBeInTheDocument();
  });

  it("makes a lifetime access code with an expiry and a note", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/codes/" && method === "POST") return { code: { display: "LIFE-TIME-CODE" } };
    });
    const user = await openTab("Codes");
    expect(await screen.findByText("No codes yet.")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Lifetime"));
    expect(screen.queryByLabelText("Days")).not.toBeInTheDocument();
    await user.type(screen.getByLabelText("Note (who it's for, optional)"), "Pilot school");
    await user.click(screen.getByRole("button", { name: "Expires (optional)" }));
    await user.click(within(screen.getByRole("dialog", { name: "Expires (optional)" })).getByRole("button", { name: /^28 / }));
    await user.click(screen.getByRole("button", { name: "Make Code" }));
    expect(await screen.findByText("LIFE-TIME-CODE")).toBeInTheDocument();
    const body = sent("/api/admin/codes/", "POST") as Record<string, unknown>;
    expect(body).toMatchObject({ kind: "access", note: "Pilot school", code: undefined });
    expect(body.days).toBeUndefined();
    // Codes expire at the end of the chosen day.
    const expires = new Date(body.expiresAt as number);
    expect([expires.getDate(), expires.getHours(), expires.getMinutes()]).toEqual([28, 23, 59]);
    // The note is cleared for the next code.
    expect(screen.getByLabelText("Note (who it's for, optional)")).toHaveValue("");
  });

  it("makes a discount for a number of months, and shows a refusal", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/codes/" && method === "POST") return Promise.reject(new Error("That code is taken."));
    });
    const user = await openTab("Codes");
    await user.click(screen.getByRole("combobox", { name: "Kind" }));
    await user.click(await screen.findByRole("option", { name: "Discount at checkout" }));
    await user.click(screen.getByRole("combobox", { name: "For" }));
    await user.click(await screen.findByRole("option", { name: "A number of months" }));
    await user.clear(screen.getByLabelText("Months"));
    await user.type(screen.getByLabelText("Months"), "6");
    await user.click(screen.getByRole("button", { name: "Make Code" }));
    expect(sent("/api/admin/codes/", "POST")).toMatchObject({ kind: "discount", percentOff: 25, duration: "repeating", months: 6 });
    expect(await screen.findByRole("alert")).toHaveTextContent("That code is taken.");
  });
});

describe("AdminApp flags", () => {
  it("describes each flag and saves a new rollout", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/flags/" && method === "GET") return { flags: [flag({ overrides: 2 }), flag({ key: "weekly-email", label: "Weekly email", scope: "server", defaultOn: false, enabled: false, overrides: 1 })] };
    });
    const user = await openTab("Flags");
    const items = within(await screen.findByRole("list")).getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Kids' app · default on · 2 family overrides");
    expect(items[1]).toHaveTextContent("Server · default off · 1 family override");
    // A switched-off flag has no rollout to set.
    expect(within(items[1]).queryByLabelText("Rollout (% of families)")).not.toBeInTheDocument();
    expect(within(items[1]).getByRole("switch")).not.toBeChecked();

    const save = within(items[0]).getByRole("button", { name: "Save Rollout" });
    expect(save).toBeDisabled();
    await user.clear(within(items[0]).getByLabelText("Rollout (% of families)"));
    await user.type(within(items[0]).getByLabelText("Rollout (% of families)"), "25");
    await user.click(save);
    expect(sent("/api/admin/flags/", "PUT")).toEqual({ key: "shop", enabled: true, rollout: 25 });
  });

  it("shows a save error next to the flag", async () => {
    asAdmin((url, method) => (url === "/api/admin/flags/" && method === "PUT" ? Promise.reject(new Error("Not allowed.")) : undefined));
    const user = await openTab("Flags");
    await user.click(await screen.findByRole("switch"));
    expect(await screen.findByRole("alert")).toHaveTextContent("Not allowed.");
  });
});

describe("AdminApp A/B tests", () => {
  const exp = (over: Record<string, unknown>) => ({
    key: "home-colours",
    description: "Warmer home screen",
    status: "running",
    variants: [{ name: "control", weight: 1 }, { name: "warm", weight: 3 }],
    winner: null,
    createdAt: 1,
    startedAt: Date.now() - 7 * DAY,
    stoppedAt: null,
    results: [
      { variant: "control", families: 40, paid: 4, active: 20, paidP: null, activeP: null },
      { variant: "warm", families: 120, paid: 30, active: 90, paidP: 0.0004, activeP: 0.2 },
    ],
    ...over,
  });

  it("shows results with significance and stops a running test with a winner", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/experiments/" && method === "GET") return { experiments: [exp({})] };
    });
    const user = await openTab("A/B Tests");
    const card = (await screen.findByRole("heading", { name: "home-colours" })).closest("li")!;
    expect(card).toHaveTextContent("Running since");
    expect(card).toHaveTextContent("Variants: control 25% (control), warm 75%");
    const rows = within(card).getAllByRole("row").slice(1).map((r) => [...r.children].map((c) => c.textContent));
    expect(rows[0]).toEqual(["control", "40", "4 · 10%", "20 · 50%"]);
    expect(rows[1]).toEqual(["warm", "120", "30 · 25% (p < 0.001, significant)", "90 · 75% (p = 0.20)"]);

    await user.click(within(card).getByRole("combobox", { name: "Everyone sees" }));
    await user.click(screen.getByRole("option", { name: "warm" }));
    await user.click(within(card).getByRole("button", { name: "Stop Test" }));
    expect(sent("/api/admin/experiments/", "PATCH")).toEqual({ key: "home-colours", action: "stop", winner: "warm" });
    expect(await screen.findByText("Stopped.")).toBeInTheDocument();
  });

  it("names the leader and makes it everyone's with one tap", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/experiments/" && method === "GET") return { experiments: [exp({})] };
    });
    const user = await openTab("A/B Tests");
    const card = (await screen.findByRole("heading", { name: "home-colours" })).closest("li")!;
    expect(within(card).getByRole("status")).toHaveTextContent(/warm is ahead: 25% of families paying against 10%/);
    await user.click(within(card).getByRole("button", { name: "Use warm for Everyone" }));
    expect(sent("/api/admin/experiments/", "PATCH")).toEqual({ key: "home-colours", action: "stop", winner: "warm" });
    expect(await within(card).findByText("Stopped. Everyone now sees warm.")).toBeInTheDocument();
  });

  it("says it's too early with few families, and offers no winner", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/experiments/" && method === "GET") return { experiments: [exp({ results: [{ variant: "control", families: 5, paid: 0, active: 0, paidP: null, activeP: null }, { variant: "warm", families: 6, paid: 3, active: 3, paidP: 0.1, activeP: 0.1 }] })] };
    });
    await openTab("A/B Tests");
    const card = (await screen.findByRole("heading", { name: "home-colours" })).closest("li")!;
    expect(within(card).getByRole("status")).toHaveTextContent(/Too early to call/);
    expect(within(card).queryByRole("button", { name: /for everyone/ })).not.toBeInTheDocument();
  });

  it("starts a draft and deletes a test only after confirming", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/experiments/" && method === "GET") return { experiments: [exp({ status: "draft", startedAt: null, results: [], description: "" })] };
    });
    const user = await openTab("A/B Tests");
    const card = (await screen.findByRole("heading", { name: "home-colours" })).closest("li")!;
    expect(card).toHaveTextContent("Draft");
    expect(within(card).queryByRole("table")).not.toBeInTheDocument();
    await user.click(within(card).getByRole("button", { name: "Start" }));
    expect(sent("/api/admin/experiments/", "PATCH")).toEqual({ key: "home-colours", action: "start" });

    await user.click(within(card).getByRole("button", { name: "Delete" }));
    await user.click(within(card).getByRole("button", { name: "Yes, Delete home-colours" }));
    expect(mocks.call).toHaveBeenCalledWith("/api/admin/experiments/?key=home-colours", "DELETE", undefined);
  });

  it("describes a stopped test and lets the winner change", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/experiments/" && method === "GET") {
        return { experiments: [exp({ status: "stopped", stoppedAt: Date.now(), winner: "warm" }), exp({ key: "old-test", status: "stopped", stoppedAt: Date.now(), winner: null, results: [{ variant: "control", families: 0, paid: 0, active: 0, paidP: 0.03, activeP: null }] })] };
      }
    });
    const user = await openTab("A/B Tests");
    const card = (await screen.findByRole("heading", { name: "home-colours" })).closest("li")!;
    expect(card).toHaveTextContent(/Stopped .*, everyone sees warm/);
    const old = screen.getByRole("heading", { name: "old-test" }).closest("li")!;
    expect(old).toHaveTextContent("everyone sees the control");
    // No families yet: no percentage to show.
    expect(within(old).getAllByRole("row")[1]).toHaveTextContent("0 · — (p = 0.030, significant)");
    await user.click(within(card).getByRole("button", { name: "Change Winner" }));
    expect(await within(card).findByText("Saved.")).toBeInTheDocument();
  });

  it("says when there are no tests yet", async () => {
    asAdmin();
    await openTab("A/B Tests");
    expect(await screen.findByText("No tests yet.")).toBeInTheDocument();
  });
});

describe("AdminApp question reports and change log", () => {
  it("lists reported questions, most reported first, and clears one", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/reports/" && method === "GET") {
        return { reports: [{ unitKey: "3/math/counting", prompt: "How many apples?", reason: "Wrong answer", count: 3, latest: Date.now() }, { unitKey: "2/language/rhymes", prompt: "Which rhymes?", reason: "Confusing", count: 1, latest: Date.now() }] };
      }
    });
    const user = await openTab("Reports");
    const items = await screen.findAllByRole("listitem");
    expect(items[0]).toHaveTextContent("3/math/counting");
    expect(items[0]).toHaveTextContent(/Wrong answer · 3 reports · last /);
    expect(items[1]).toHaveTextContent(/Confusing · 1 report · last /);
    await user.click(within(items[0]).getByRole("button", { name: "Clear" }));
    expect(sent("/api/admin/reports/", "DELETE")).toEqual({ unitKey: "3/math/counting", prompt: "How many apples?" });
    expect(await screen.findByText("Cleared.")).toBeInTheDocument();
  });

  it("says when nothing is reported", async () => {
    asAdmin();
    await openTab("Reports");
    expect(await screen.findByText("Nothing reported.")).toBeInTheDocument();
  });

  it("shows who changed what, and when there is nothing yet", async () => {
    asAdmin((url) => {
      if (url === "/api/admin/audit/") return { entries: [{ id: 1, at: Date.now(), admin: "owner@example.com", action: "flag", target: "shop", detail: '{"enabled":false}' }, { id: 2, at: Date.now(), admin: "owner@example.com", action: "code", target: null, detail: null }] };
    });
    await openTab("Log");
    const rows = within(await screen.findByRole("table")).getAllByRole("row").slice(1);
    expect([...rows[0].children].slice(1).map((c) => c.textContent)).toEqual(["owner@example.com", "flag shop", '{"enabled":false}']);
    expect([...rows[1].children].slice(1).map((c) => c.textContent)).toEqual(["owner@example.com", "code ", ""]);
  });

  it("says the log is empty", async () => {
    asAdmin();
    await openTab("Log");
    expect(await screen.findByText("No changes yet.")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("table")).not.toBeInTheDocument());
  });
});

describe("AdminApp engagement", () => {
  it("shows how many to-do items wait, and opens a message from the list in the inbox", async () => {
    asAdmin((url, method) => {
      if (url === "/api/admin/queue/" && method === "GET")
        return {
          items: [
            { key: "inbox:m1", kind: "inbox", title: "Email waiting for an answer", detail: "“Help” from Lee", at: 1, action: { type: "inbox", id: "m1" } },
            { key: "reports", kind: "reports", title: "Question Reports", detail: "2 waiting.", at: 1, action: { type: "reports" } },
          ],
        };
      if (url === "/api/admin/inbox/?id=m1") return { message: { id: "m1", from: "lee@example.com", fromEmail: "lee@example.com", subject: "Help", receivedAt: 1, attachments: 0, familyId: null, handledAt: null, repliedAt: null, text: "Hi", replyTo: "lee@example.com", attachmentNames: [] } };
    });
    const user = userEvent.setup();
    render(<AdminApp />);
    const todo = await screen.findByRole("button", { name: /^To Do\s*2\s*waiting$/ });
    await user.click(todo);
    await user.click(await screen.findByRole("button", { name: "Read and Reply" }));
    expect(screen.getByRole("button", { name: "Inbox" })).toHaveAttribute("aria-current", "page");
    expect(await screen.findByRole("heading", { name: "Help" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^To Do/ }));
    await user.click(await screen.findByRole("button", { name: "Open Reports" }));
    expect(screen.getByRole("button", { name: "Reports" })).toHaveAttribute("aria-current", "page");
  });

  it("shows how many emails wait on the Inbox tab, and updates it when the list loads", async () => {
    const mail = (id: string, handledAt: number | null) => ({ id, from: "lee@example.com", fromEmail: "lee@example.com", subject: `Mail ${id}`, receivedAt: 1, attachments: 0, familyId: null, handledAt, repliedAt: null });
    asAdmin((url, method) => {
      if (url === "/api/admin/inbox/?count=1") return { waiting: 2 };
      if (url === "/api/admin/inbox/" && method === "GET") return { configured: true, items: [mail("a", null), mail("b", 1)], hasMore: false };
    });
    const user = userEvent.setup();
    render(<AdminApp />);
    const tab = await screen.findByRole("button", { name: /^Inbox\s*2\s*waiting$/ });
    await user.click(tab);
    expect(await screen.findByRole("button", { name: /^Inbox\s*1\s*waiting$/ })).toHaveAttribute("aria-current", "page");
  });

  it("leaves the Inbox tab plain when nothing waits", async () => {
    asAdmin((url) => (url === "/api/admin/inbox/?count=1" ? { waiting: 0 } : undefined));
    render(<AdminApp />);
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/admin/inbox/?count=1"));
    expect(await screen.findByRole("button", { name: "Inbox" })).toBeInTheDocument();
  });

  it("shows last sign-in and practice in Users, and emailing on a family's page", async () => {
    const now = Date.now();
    asAdmin((url) => {
      if (url === "/api/admin/users/?q=")
        return { users: [{ familyId: "fam-1", email: "pat@example.com", createdAt: now, plan: "trial", trialEndsAt: now + DAY, accessUntil: null, subscriptionStatus: null, lastLogin: now - 2 * DAY, lastPractice: null }] };
      if (url === "/api/admin/users/?id=fam-1")
        return family({
          parents: [{ id: "p-1", email: "pat@example.com", createdAt: 1, verified: true, weeklyReport: true, practiceReminders: false, newsAndTips: true, bouncedAt: null, lastLogin: now - 2 * DAY }],
          emails: [{ id: "e1", familyId: "fam-1", email: "pat@example.com", kind: "admin", label: "Ollie misses {children}!", status: "delivered", sentAt: now - 3 * DAY, sentBy: "owner@example.com" }],
        });
    });
    const user = await openTab("Users");
    const row = within(await screen.findByRole("table")).getAllByRole("row")[1];
    expect([...row.children].slice(4).map((c) => c.textContent)).toEqual(["2 days ago", "Never"]);
    await user.click(screen.getByRole("button", { name: "pat@example.com" }));
    expect(await screen.findByRole("heading", { name: "Email This Family" })).toBeInTheDocument();
    expect(screen.getByText(/Last emailed from here 3 days ago/)).toBeInTheDocument();
    expect(screen.getByText(/news and tips on/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Send Email" }));
    expect(sent("/api/admin/email/", "POST")).toMatchObject({ action: "send", familyId: "fam-1" });
  });
  it("emails the group stuck at a funnel step from the Emails tab", async () => {
    asAdmin((url) => {
      if (url === "/api/admin/funnel/?days=90") return { steps: [100, 80, 40, 30, 10, 5].map((count, i) => ({ id: `s${i}`, label: `Step ${i}`, count, ofStart: count / 100, ofPrevious: 1 })) };
      if (url === "/api/admin/email/?segment=no-child") return { total: 3, ready: 3, batch: 3, skipped: { unconfirmed: 0, unsubscribed: 0, bounced: 0, recent: 0 }, sample: [] };
    });
    const user = await openTab("Funnel");
    await user.click(await screen.findByRole("button", { name: "Email the Families Who Haven't Added a Child" }));
    expect(screen.getByRole("button", { name: "Emails" })).toHaveAttribute("aria-current", "page");
    expect(await screen.findByRole("combobox", { name: "Group" })).toHaveTextContent("No child added");
    expect(mocks.call).toHaveBeenCalledWith("/api/admin/email/?segment=no-child");
  });

  it("opens straight on a family from a link in an alert, with its billing", async () => {
    window.history.replaceState(null, "", "/admin/?family=fam-1");
    try {
      asAdmin((url) => {
        if (url === "/api/admin/users/?id=fam-1") return family({ family: { ...family().family, subscriptionStatus: "past_due" } });
      });
      render(<AdminApp />);
      expect(await screen.findByRole("heading", { name: "Billing" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Users" })).toHaveAttribute("aria-current", "page");
      expect(screen.getByText("Their last payment failed.")).toBeInTheDocument();
    } finally {
      window.history.replaceState(null, "", "/");
    }
  });

  it("opens a tab from a link written before the tab names were capitalized", async () => {
    window.history.replaceState(null, "", "/admin/?tab=a%2Fb%20tests");
    try {
      asAdmin();
      render(<AdminApp />);
      expect(await screen.findByRole("button", { name: "A/B Tests" })).toHaveAttribute("aria-current", "page");
    } finally {
      window.history.replaceState(null, "", "/");
    }
  });

  it("opens the tab named in the link, and offers the CSV downloads", async () => {
    window.history.replaceState(null, "", "/admin/?tab=Users");
    try {
      asAdmin();
      render(<AdminApp />);
      expect(await screen.findByRole("link", { name: "Download accounts CSV" })).toHaveAttribute("href", "/api/admin/export/?type=users");
      expect(screen.getByRole("link", { name: "Download payments CSV" })).toHaveAttribute("href", "/api/admin/export/?type=payments");
    } finally {
      window.history.replaceState(null, "", "/");
    }
  });
});
