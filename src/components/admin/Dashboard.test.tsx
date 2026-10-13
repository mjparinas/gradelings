// @vitest-environment jsdom
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});

import { computeMetrics, type MetricsInput } from "@/lib/adminMetrics";
import { Dashboard } from "./Dashboard";

const DAY = 86_400_000;
const now = Date.UTC(2026, 5, 15, 12);

/** Every section's fields in one object, so any `?section=` request can be answered with it. */
function data(over: Partial<MetricsInput> = {}, stripe = false) {
  const m = computeMetrics({
      now,
      families: [
        { createdAt: now - 3 * DAY, plan: "premium", trialEndsAt: now, subscriptionStatus: "active", subscriptionInterval: "month", billingEventAt: now, accessUntil: null, referred: true, verified: true, practised: true },
        { createdAt: now - 2 * DAY, plan: "trial", trialEndsAt: now + 20 * DAY, subscriptionStatus: null, subscriptionInterval: null, billingEventAt: 0, accessUntil: null, referred: false, verified: false, practised: false },
      ],
      parents: 2,
      children: 3,
      teachers: 1,
      students: 4,
      classes: 1,
      payments: [{ familyId: "f", amount: 1499, refunded: 0, interval: "month", paidAt: now - DAY }],
      activity: [{ day: Math.floor(now / DAY), families: 2, answers: 30, ms: 300_000 }],
      activeFamilies: { d1: 2, d7: 2, d30: 2 },
      monthlyCosts: 50_000,
      redemptions: 1,
      reports: 0,
      ...over,
    });
  return { ...m, customersEver: m.revenue.customersEver, stripe };
}

const tile = (label: string) => screen.getByText(label, { selector: "span.text-ink-soft" }).closest("li")!;

beforeEach(() => {
  mocks.call.mockReset();
});

describe("admin dashboard", () => {
  it("shows customers, growth, practice and money with charts", async () => {
    mocks.call.mockResolvedValue(data());
    render(<Dashboard />);
    expect(await screen.findByRole("heading", { name: "Revenue and profit" })).toBeInTheDocument();
    expect(within(tile("Monthly recurring revenue")).getByText("$14.99")).toBeInTheDocument();
    expect(within(tile("Revenue this month")).getByText("$14.99")).toBeInTheDocument();
    // $500 of costs a month means June is losing money so far.
    expect(within(tile("Profit this month")).getByText(/^-\$/)).toBeInTheDocument();
    expect(within(tile("Paying")).getByText("1")).toBeInTheDocument();
    expect(within(tile("In free trial")).getByText("1")).toBeInTheDocument();
    expect(within(tile("Sign-ups this month")).getByText("2")).toBeInTheDocument();
    expect(within(tile("From a referral")).getByText("50% of families")).toBeInTheDocument();
    expect(within(tile("Questions answered, 30 days")).getByText("30")).toBeInTheDocument();
    for (const name of ["Revenue by month", "Profit by month", "Paying families by month", "Sign-ups per week", "Sign-ups per month", "Families practising per day", "Questions answered per day"]) {
      expect(screen.getByRole("img", { name })).toBeInTheDocument();
    }
    expect(screen.getByText("Where families are")).toBeInTheDocument();
    // Without Stripe there is nothing to import.
    expect(screen.queryByRole("button", { name: "Import payments from Stripe" })).toBeNull();
  });

  it("draws every section at once and fills each in as its numbers arrive", async () => {
    const held: Record<string, () => void> = {};
    mocks.call.mockImplementation((url: string) => {
      const section = new URL(url, "http://x").searchParams.get("section")!;
      if (section === "practice") return new Promise((resolve) => (held.practice = () => resolve(data())));
      return Promise.resolve(data());
    });
    render(<Dashboard />);
    for (const s of ["money", "customers", "growth", "practice"]) expect(mocks.call).toHaveBeenCalledWith(`/api/admin/stats/?section=${s}`);
    for (const name of ["Revenue and profit", "Customers", "Growth", "Practice"]) expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    expect(await screen.findByText("Monthly recurring revenue")).toBeInTheDocument();
    const practice = screen.getByRole("heading", { name: "Practice" }).closest("section")!;
    expect(practice.querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(within(practice).getByText("Loading…")).toBeInTheDocument();
    expect(screen.queryByText(/^Updated /)).toBeNull();
    await act(async () => held.practice());
    expect(practice.querySelector('[aria-busy="true"]')).toBeNull();
    expect(within(tile("Questions answered, 30 days")).getByText("30")).toBeInTheDocument();
  });

  it("saves the monthly costs and imports from Stripe", async () => {
    mocks.call.mockImplementation((_url: string, method = "GET", body?: { action: string }) =>
      Promise.resolve(method === "GET" ? data({}, true) : body?.action === "import" ? { seen: 7, stored: 3 } : { ok: true, monthlyCosts: 12_000 }),
    );
    const user = userEvent.setup();
    render(<Dashboard />);
    const costs = await screen.findByLabelText("Monthly running costs (CAD)");
    expect(costs).toHaveValue(500);
    await user.clear(costs);
    await user.type(costs, "120");
    await user.click(screen.getByRole("button", { name: "Save costs" }));
    expect(mocks.call).toHaveBeenCalledWith("/api/admin/stats/", "POST", { action: "costs", monthlyCosts: 120 });
    expect(await screen.findByText("Monthly costs saved.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Import payments from Stripe" }));
    expect(await screen.findByText("Checked 7 paid invoices; 3 belong to families here.")).toBeInTheDocument();
  });

  it("opens the list behind a tile in a window that Escape closes, and links emails to the family", async () => {
    const detail = {
      title: "Paying families",
      intro: "Every paying family.",
      summary: [{ label: "Recurring a month", value: 1499, kind: "money" }],
      tables: [
        {
          columns: [
            { label: "Account", kind: "account" },
            { label: "Renews", kind: "date" },
            { label: "Past due", kind: "yesno" },
          ],
          rows: [{ familyId: "fam-1", cells: ["payer@example.com", Date.UTC(2026, 6, 1), false] }],
          total: 250,
        },
      ],
    };
    mocks.call.mockImplementation((url: string) => Promise.resolve(url.startsWith("/api/admin/stats/detail/") ? detail : data()));
    const onOpenFamily = vi.fn();
    const user = userEvent.setup();
    render(<Dashboard onOpenFamily={onOpenFamily} />);
    await screen.findByRole("heading", { name: "Revenue and profit" });
    const opener = within(tile("Paying")).getByRole("button");
    await user.click(opener);
    const dialog = await screen.findByRole("dialog", { name: "Paying families" });
    expect(mocks.call).toHaveBeenCalledWith("/api/admin/stats/detail/?view=paying");
    expect(within(dialog).getByRole("button", { name: "Close" })).toHaveFocus();
    expect(within(dialog).getByText("$14.99")).toBeInTheDocument();
    expect(within(dialog).getByText("Jul 1, 2026")).toBeInTheDocument();
    expect(within(dialog).getByText("No")).toBeInTheDocument();
    expect(within(dialog).getByText(/Showing the first 1 of 250/)).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(opener).toHaveFocus();

    await user.click(opener);
    await user.click(await screen.findByRole("button", { name: "payer@example.com" }));
    expect(onOpenFamily).toHaveBeenCalledWith("fam-1");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("breaks profit down by month without asking the server", async () => {
    mocks.call.mockResolvedValue(data());
    const user = userEvent.setup();
    render(<Dashboard />);
    await screen.findByRole("heading", { name: "Revenue and profit" });
    mocks.call.mockClear();
    await user.click(within(tile("Profit this month")).getByRole("button"));
    const dialog = screen.getByRole("dialog", { name: "Profit by month" });
    expect(within(dialog).getAllByRole("row")).toHaveLength(13);
    expect(within(dialog).getByText("Projected profit")).toBeInTheDocument();
    expect(mocks.call).not.toHaveBeenCalled();
    await user.click(within(dialog).getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("says so when a list can't load", async () => {
    mocks.call.mockImplementation((url: string) => (url.startsWith("/api/admin/stats/detail/") ? Promise.reject(new Error("Not allowed")) : Promise.resolve(data())));
    const user = userEvent.setup();
    render(<Dashboard />);
    await screen.findByRole("heading", { name: "Revenue and profit" });
    await user.click(within(tile("Children")).getByRole("button"));
    expect(await within(screen.getByRole("dialog")).findByRole("alert")).toHaveTextContent("Not allowed");
  });

  it("shows an error when the numbers can't load", async () => {
    mocks.call.mockImplementation(() => Promise.reject(new Error("Stats unavailable")));
    render(<Dashboard />);
    // Each section says so on its own.
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(4);
    for (const a of alerts) expect(a).toHaveTextContent("Stats unavailable");
  });
});
