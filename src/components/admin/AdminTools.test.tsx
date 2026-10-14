// @vitest-environment jsdom
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ call: vi.fn() }));
vi.mock("@/lib/classroom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/classroom")>();
  return { ...actual, call: mocks.call };
});

import { APP_NAME } from "@/lib/brand";
import { DEFAULT_REPLIES } from "@/lib/savedReplies";
import { Automations } from "./Automations";
import { FamilyBilling, parseCents } from "./Billing";
import { Inbox } from "./Engage";
import { Funnel } from "./Funnel";

// The admin panel's action tools on screen: the billing panel, the funnel, automations and saved replies.

type Handler = (url: string, method: string, body?: unknown) => unknown;
const respond = (h: Handler) =>
  mocks.call.mockImplementation((url: string, method = "GET", body?: unknown) => {
    const r = h(url, method, body);
    return r instanceof Error ? Promise.reject(r) : Promise.resolve(r ?? { ok: true });
  });
const sent = (url: string, method = "POST") => mocks.call.mock.calls.findLast(([u, m]) => u === url && m === method)?.[2];
const DAY = 86_400_000;

beforeEach(() => {
  mocks.call.mockReset();
  // Tab clicks add history entries, so each test starts on the panel's own address.
  window.history.replaceState(null, "", "/admin/");
});

describe("FamilyBilling", () => {
  const data = {
    stripe: true,
    customer: "cus_1",
    payments: [{ id: "pay-1", amount: 11999, refunded: 0, currency: "CAD", interval: "year", paidAt: Date.now() - DAY }],
    subscriptions: [{ id: "sub_1", status: "active", cancelAtPeriodEnd: false, currentPeriodEnd: Date.now() + 300 * DAY }],
    stripeError: null,
  };

  it("reads dollar amounts", () => {
    expect(parseCents("12")).toBe(1200);
    expect(parseCents("$12.5")).toBe(1250);
    expect(parseCents(" 0.05 ")).toBe(5);
    expect(parseCents("12.345")).toBeNull();
    expect(parseCents("-3")).toBeNull();
    expect(parseCents("abc")).toBeNull();
  });

  it("refunds only after REFUND is typed, and never more than was paid", async () => {
    respond((url) => (url.startsWith("/api/admin/billing/?") ? data : undefined));
    const user = userEvent.setup();
    render(<FamilyBilling familyId="fam-1" pastDue={false} />);
    await user.click(await screen.findByRole("button", { name: "Refund" }));
    const go = screen.getByRole("button", { name: "Refund Now" });
    expect(go).toBeDisabled();
    await user.type(screen.getByLabelText("Type REFUND to confirm"), "REFUND");
    expect(go).toBeEnabled();
    const amount = screen.getByLabelText("Amount (CAD)");
    await user.clear(amount);
    await user.type(amount, "200");
    expect(go).toBeDisabled();
    await user.clear(amount);
    await user.type(amount, "20");
    await user.click(go);
    expect(sent("/api/admin/billing/")).toEqual({ familyId: "fam-1", action: "refund", paymentId: "pay-1", amount: 2000, confirm: "REFUND" });
    expect(await screen.findByText("Refunded $20.00 CAD.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open in Stripe" })).toHaveAttribute("href", "https://dashboard.stripe.com/customers/cus_1");
  });

  it("cancels at the end of the period, or now after CANCEL is typed", async () => {
    respond((url) => (url.startsWith("/api/admin/billing/?") ? data : undefined));
    const user = userEvent.setup();
    render(<FamilyBilling familyId="fam-1" pastDue={false} />);
    await user.click(await screen.findByRole("button", { name: "Cancel at the End of the Period" }));
    expect(sent("/api/admin/billing/")).toEqual({ familyId: "fam-1", action: "cancel-at-end", subscriptionId: "sub_1" });
    await user.click(screen.getByRole("button", { name: "Cancel Now" }));
    const end = screen.getByRole("button", { name: "End It Now" });
    expect(end).toBeDisabled();
    await user.type(screen.getByLabelText("Type CANCEL to confirm"), "CANCEL");
    await user.click(end);
    expect(sent("/api/admin/billing/")).toEqual({ familyId: "fam-1", action: "cancel-now", subscriptionId: "sub_1", confirm: "CANCEL" });
  });

  it("offers undoing a cancellation", async () => {
    respond((url) => (url.startsWith("/api/admin/billing/?") ? { ...data, subscriptions: [{ ...data.subscriptions[0], cancelAtPeriodEnd: true }] } : undefined));
    const user = userEvent.setup();
    render(<FamilyBilling familyId="fam-1" pastDue={false} />);
    expect(await screen.findByText(/Cancels on/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Undo the Cancellation" }));
    expect(sent("/api/admin/billing/")).toEqual({ familyId: "fam-1", action: "resume", subscriptionId: "sub_1" });
  });

  it("emails a family whose payment failed", async () => {
    respond((url) => (url.startsWith("/api/admin/billing/?") ? data : undefined));
    const user = userEvent.setup();
    render(<FamilyBilling familyId="fam-1" pastDue />);
    await user.click(screen.getByRole("button", { name: "Email Them to Update Their Card" }));
    expect(sent("/api/admin/billing/")).toEqual({ familyId: "fam-1", action: "card-email" });
    expect(await screen.findByText("Email sent with a link to update their card.")).toBeInTheDocument();
  });

  it("says when Stripe isn't set up and offers no refunds", async () => {
    respond((url) => (url.startsWith("/api/admin/billing/?") ? { ...data, stripe: false, customer: null, subscriptions: [] } : undefined));
    render(<FamilyBilling familyId="fam-1" pastDue={false} />);
    expect(await screen.findByText(/Stripe isn't set up/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Refund" })).not.toBeInTheDocument();
  });
});

describe("Funnel", () => {
  it("shows every step under its name while the numbers load", () => {
    mocks.call.mockImplementation(() => new Promise(() => {}));
    render(<Funnel onEmailGroup={() => {}} />);
    for (const name of ["1. Signed Up", "2. Confirmed Their Email", "3. Added a Child"]) expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    expect(screen.getByRole("list")).toHaveAttribute("aria-busy", "true");
  });

  const steps = (counts: number[]) => ({ steps: counts.map((count, i) => ({ id: `s${i}`, label: ["Signed up", "Confirmed their email", "Added a child", "A child practised", "Practised on 3 or more days", "Paid"][i], count, ofStart: count / counts[0], ofPrevious: i ? count / counts[i - 1] : 1 })) });

  it("shows each step, the biggest drop and an email link per stuck group", async () => {
    respond((url) => (url.startsWith("/api/admin/funnel/") ? steps([100, 80, 40, 30, 10, 5]) : undefined));
    const user = userEvent.setup();
    const onEmail = vi.fn();
    render(<Funnel onEmailGroup={onEmail} />);
    expect(await screen.findByRole("status")).toHaveTextContent("Most families stop before “practised on 3 or more days”: only 33%");
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(6);
    expect(items[2]).toHaveTextContent("40 · 40% of sign-ups · 50% of the step before");
    await user.click(screen.getByRole("button", { name: "Email the Families Practising Often but Not Paying" }));
    expect(onEmail).toHaveBeenCalledWith("engaged-not-paying");
    await user.click(screen.getByRole("combobox", { name: "Families who signed up in the last" }));
    await user.click(screen.getByRole("option", { name: "30 days" }));
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith("/api/admin/funnel/?days=30"));
  });

  it("says when nobody signed up", async () => {
    respond(() => steps([0, 0, 0, 0, 0, 0]));
    render(<Funnel onEmailGroup={vi.fn()} />);
    expect(await screen.findByText("Nobody signed up in this period yet.")).toBeInTheDocument();
  });
});

describe("Automations", () => {
  const status = (over: Record<string, unknown> = {}) => ({
    id: "quiet-7",
    config: { on: false, message: { subject: "Ollie misses {children}!", body: "Come back.", button: null }, dailyCap: 20, onBy: null, onAt: null },
    nextRun: 12,
    waiting: 12,
    sent7: 0,
    lastSentAt: null,
    ...over,
  });
  const data = (s = status()) => ({ automations: [s], alerts: { instant: true, digest: false }, alertRecipients: 1 });

  it("shows every card under its name while the settings load", async () => {
    mocks.call.mockImplementation(() => new Promise(() => {}));
    render(<Automations />);
    expect(screen.getByRole("heading", { name: "Alerts to You" })).toBeInTheDocument();
    for (const name of ["Ollie Misses You", "Add Your Child", "Come Back After a Try", "Free Lessons Are Waiting"]) expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    expect(screen.getByText("Loading…").closest('[aria-busy="true"]')).not.toBeNull();
  });

  it("turns a nudge on only after TURN ON is typed", async () => {
    respond((url, method) => (url === "/api/admin/automations/" && method === "GET" ? data() : undefined));
    const user = userEvent.setup();
    render(<Automations />);
    const card = (await screen.findByRole("heading", { name: "Ollie Misses You", level: 3 })).closest("li")!;
    expect(card).toHaveTextContent("Off");
    expect(card).toHaveTextContent("If it were on, the next daily run would email 12 of the 12 families waiting (limit 20 a day).");
    await user.click(within(card).getByRole("button", { name: "Turn On" }));
    const start = within(card).getByRole("button", { name: "Start Sending" });
    expect(start).toBeDisabled();
    await user.type(within(card).getByLabelText("Type TURN ON to confirm"), "TURN ON");
    await user.click(start);
    expect(sent("/api/admin/automations/")).toEqual({ id: "quiet-7", action: "switch", on: true, confirm: "TURN ON" });
  });

  it("turns a nudge off, and saves an edited email and limit", async () => {
    const on = status({ config: { ...status().config, on: true, onAt: Date.now(), onBy: "owner@example.com" } });
    respond((url, method) => (url === "/api/admin/automations/" && method === "GET" ? data(on) : undefined));
    const user = userEvent.setup();
    render(<Automations />);
    const card = (await screen.findByRole("heading", { name: "Ollie Misses You", level: 3 })).closest("li")!;
    expect(card).toHaveTextContent("(owner@example.com)");
    await user.click(within(card).getByRole("button", { name: "Turn Off" }));
    expect(sent("/api/admin/automations/")).toEqual({ id: "quiet-7", action: "switch", on: false });
    await user.click(within(card).getByRole("button", { name: "Edit the Email" }));
    const subject = within(card).getByLabelText("Subject");
    await user.clear(subject);
    await user.type(subject, "We miss you");
    const cap = within(card).getByLabelText("Most families a day (1 to 50)");
    await user.clear(cap);
    await user.type(cap, "5");
    await user.click(within(card).getByRole("button", { name: "Save" }));
    expect(sent("/api/admin/automations/")).toEqual({ id: "quiet-7", action: "save", message: { subject: "We miss you", body: "Come back.", button: null }, dailyCap: 5 });
  });

  it("switches the alerts and the digest", async () => {
    respond((url, method) => (url === "/api/admin/automations/" && method === "GET" ? data() : undefined));
    const user = userEvent.setup();
    render(<Automations />);
    await user.click(await screen.findByRole("checkbox", { name: /Alerts when something goes wrong/ }));
    expect(sent("/api/admin/automations/")).toEqual({ action: "alerts", instant: false, digest: false });
  });
});

describe("Saved Replies", () => {
  const item = { id: "m1", from: "lee@example.com", fromEmail: "lee@example.com", subject: "Help", receivedAt: Date.now(), attachments: 0, familyId: null, handledAt: null, repliedAt: null };
  const handler: Handler = (url, method) => {
    if (url === "/api/admin/replies/" && method === "GET") return { replies: DEFAULT_REPLIES };
    if (url === "/api/admin/inbox/" && method === "GET") return { configured: true, items: [item], hasMore: false };
    if (url === "/api/admin/inbox/?id=m1") return { message: { ...item, text: "Hi", replyTo: "lee@example.com", attachmentNames: [] } };
    return undefined;
  };

  it("inserts a saved reply with the app's name filled in", async () => {
    respond(handler);
    const user = userEvent.setup();
    render(<Inbox initialId="m1" onOpenFamily={vi.fn()} />);
    await user.type(await screen.findByLabelText("Your reply"), "Hi Lee,");
    await user.click(await screen.findByRole("combobox", { name: "Insert a saved reply" }));
    await user.click(screen.getByRole("option", { name: "Thanks for the feedback" }));
    const text = (screen.getByLabelText("Your reply") as HTMLTextAreaElement).value;
    expect(text.startsWith("Hi Lee,\n\nThank you so much")).toBe(true);
    expect(text).toContain(`what we build next in ${APP_NAME}.`);
    expect(text).not.toContain("{app}");
  });

  it("edits, removes and adds replies, saving the whole list", async () => {
    respond(handler);
    const user = userEvent.setup();
    render(<Inbox onOpenFamily={vi.fn()} />);
    await user.click(await screen.findByRole("button", { name: `Edit (${DEFAULT_REPLIES.length})` }));
    expect(screen.getByRole("button", { name: "Save Replies" })).toBeDisabled();
    await user.click(screen.getAllByRole("button", { name: "Remove" })[0]);
    await user.click(screen.getByRole("button", { name: "Add a Reply" }));
    const titles = screen.getAllByLabelText("Title");
    await user.clear(titles[titles.length - 1]);
    await user.type(titles[titles.length - 1], "Hours");
    const bodies = screen.getAllByLabelText("Reply");
    await user.type(bodies[bodies.length - 1], "We answer within a day.");
    await user.click(screen.getByRole("button", { name: "Save Replies" }));
    const body = sent("/api/admin/replies/", "PUT") as { replies: { id: string; title: string; body: string }[] };
    expect(body.replies.map((r) => r.title)).toEqual([...DEFAULT_REPLIES.slice(1).map((r) => r.title), "Hours"]);
    expect(body.replies.at(-1)!.body).toBe("We answer within a day.");
    expect(await screen.findByText("Saved replies updated.")).toBeInTheDocument();
  });
});
